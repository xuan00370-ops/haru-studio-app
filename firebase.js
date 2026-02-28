import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue, off, update, runTransaction } from "firebase/database";

let db = null;
let isInitialized = false;
let _portfoliosUnsubscribe = null; // Real-time listener handle

/**
 * Khởi tạo Firebase từ chuỗi JSON Config
 */
export function initFirebase(configStr) {
    try {
        if (!configStr) return false;
        const config = JSON.parse(configStr);
        const app = initializeApp(config);
        db = getDatabase(app);
        isInitialized = true;
        console.log("🔥 Firebase Realtime Database Initialized");
        return true;
    } catch (err) {
        console.error("Firebase init error:", err);
        return false;
    }
}

// ────────────────────────────────────────────────────────────
// DIFF-BASED SYNCHRONIZATION HELPERS
// ────────────────────────────────────────────────────────────
let _lastSyncedState = {};

/**
 * Deep equality check cho object. Giúp phát hiện thay đổi thật sự.
 */
function deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true;
    if (obj1 == null || typeof obj1 !== 'object' || obj2 == null || typeof obj2 !== 'object') return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
    }
    return true;
}

/**
 * Cập nhật baseline (bản gốc) sau khi tải từ Firebase hoặc sau khi sync thành công.
 * Quan trọng: Clone dữ liệu để tránh tham chiếu bộ nhớ.
 */
export function updateBaselineState(state) {
    if (!state) return;
    _lastSyncedState = {
        jobs: state.jobs ? JSON.parse(JSON.stringify(state.jobs)) : [],
        staff: state.staff ? JSON.parse(JSON.stringify(state.staff)) : [],
        financeMetadata: state.financeMetadata ? JSON.parse(JSON.stringify(state.financeMetadata)) : {},
        manualTransactions: state.manualTransactions ? JSON.parse(JSON.stringify(state.manualTransactions)) : [],
        settings: state.settings ? JSON.parse(JSON.stringify(state.settings)) : {},
        history: state.history ? JSON.parse(JSON.stringify(state.history)) : [],
        clients: state.clients ? JSON.parse(JSON.stringify(state.clients)) : []
    };
    try {
        localStorage.setItem('haru_baseline', JSON.stringify(_lastSyncedState));
    } catch (e) { console.warn('Cannot save baseline to localStorage', e); }
}


/**
 * Ghi state lên Firebase bằng Cập nhật từng phần (Granular Updates - update)
 * Sử dụng thuật toán Diff-Based Sync: CHỈ gửi những records thực sự bị thay đổi,
 * nhằm bảo toàn những thay đổi do máy khác gửi lên cùng lúc.
 */
export async function syncToFirebase(state) {
    if (!isInitialized || !db) return;
    try {
        // 1) Đồng bộ portfolios bằng transaction để tránh race-condition giữa nhiều thiết bị.
        const localPortfolios = Array.isArray(state.portfolios) ? state.portfolios : [];
        await runTransaction(ref(db, 'haru_state/portfolios'), (current) => {
            const remotePortfolios = Array.isArray(current) ? current : [];
            const byId = new Map();

            const put = (p) => {
                if (!p) return;
                const id = p.id || `PF-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
                const old = byId.get(id);
                if (!old) {
                    byId.set(id, { ...p, id });
                } else {
                    const oldScore = (old.thumbnail ? 1 : 0) + ((old.images || []).length > 0 ? 1 : 0);
                    const newScore = (p.thumbnail ? 1 : 0) + ((p.images || []).length > 0 ? 1 : 0);
                    byId.set(id, newScore >= oldScore ? { ...old, ...p, id } : { ...p, ...old, id });
                }
            };

            remotePortfolios.forEach(put);
            localPortfolios.forEach(put);
            return Array.from(byId.values());
        });

        // 2) Update các phần state khác bằng Diff-Based Granular Updates
        const updates = {};
        let hasChanges = false;

        // Compare JOBS
        if (Array.isArray(state.jobs)) {
            const baselineJobs = _lastSyncedState.jobs || [];
            const baselineJobMap = new Map(baselineJobs.map(j => [j.id, j]));

            state.jobs.forEach(job => {
                if (job && job.id) {
                    const baselineJob = baselineJobMap.get(job.id);
                    if (!baselineJob || !deepEqual(baselineJob, job)) {
                        updates[`haru_state/jobs/${job.id}`] = job;
                        hasChanges = true;
                    }
                }
            });
        }

        // Compare STAFF
        if (Array.isArray(state.staff)) {
            const baselineStaff = _lastSyncedState.staff || [];
            const baselineStaffMap = new Map(baselineStaff.map(s => [s.id || s.name, s]));

            state.staff.forEach(s => {
                const key = s && (s.id || s.name);
                if (key) {
                    const baselineS = baselineStaffMap.get(key);
                    if (!baselineS || !deepEqual(baselineS, s)) {
                        updates[`haru_state/staff/${key}`] = s;
                        hasChanges = true;
                    }
                }
            });
        }

        // Compare OTHER TOP-LEVEL NODES
        if (!deepEqual(_lastSyncedState.financeMetadata, state.financeMetadata)) {
            updates['haru_state/financeMetadata'] = state.financeMetadata || {};
            hasChanges = true;
        }
        if (!deepEqual(_lastSyncedState.manualTransactions, state.manualTransactions)) {
            updates['haru_state/manualTransactions'] = state.manualTransactions || [];
            hasChanges = true;
        }
        if (!deepEqual(_lastSyncedState.settings, state.settings)) {
            updates['haru_state/settings'] = state.settings || {};
            hasChanges = true;
        }
        if (!deepEqual(_lastSyncedState.clients, state.clients)) {
            updates['haru_state/clients'] = state.clients || [];
            hasChanges = true;
        }

        // History is tricky, we can just push it if length changed, or just overwrite it
        if (!deepEqual(_lastSyncedState.history, state.history)) {
            updates['haru_state/history'] = state.history || [];
            hasChanges = true;
        }

        if (hasChanges) {
            // Cập nhật timestamp lần sync cuối
            updates['haru_state/lastUpdated'] = Date.now();
            await update(ref(db), updates);
            console.log("🔥 Firebase Diff-Based Update Xong! Bắn payload size:", Object.keys(updates).length, "nodes");

            // Tự cập nhật baseline cục bộ để lần sau không gửi lại những phần vừa gửi
            updateBaselineState(state);
        } else {
            // Không log để tránh spam (khi load ban đầu state cũng tự saveState)
            // console.log("🔥 Không có dữ liệu mới để đồng bộ, bỏ qua việc ghi lên Firebase.");
        }
    } catch (err) {
        console.error("Firebase sync error:", err);
    }
}

/**
 * Đọc toàn bộ state từ Firebase lúc khởi động
 */
export async function loadFromFirebase() {
    if (!isInitialized || !db) return null;
    try {
        const snapshot = await get(ref(db, 'haru_state'));
        if (snapshot.exists()) {
            const data = snapshot.val();
            // Khôi phục Object về Array cho jobs và staff do lúc sync ta parse thành Object
            if (data.jobs && typeof data.jobs === 'object' && !Array.isArray(data.jobs)) {
                data.jobs = Object.values(data.jobs);
            }
            if (data.staff && typeof data.staff === 'object' && !Array.isArray(data.staff)) {
                data.staff = Object.values(data.staff);
            }
            return data;
        }
    } catch (err) {
        console.error("Firebase load error:", err);
    }
    return null;
}

/**
 * Khóa Job (Pessimistic Locking) báo hiệu user đang chỉnh sửa
 */
export async function lockJob(jobId, username) {
    if (!isInitialized || !db) return;
    try {
        await set(ref(db, `haru_state/locks/${jobId}`), username);
    } catch (err) {
        console.warn("Lock job error:", err);
    }
}

/**
 * Mở khóa Job
 */
export async function unlockJob(jobId) {
    if (!isInitialized || !db) return;
    try {
        await set(ref(db, `haru_state/locks/${jobId}`), null);
    } catch (err) {
        console.warn("Unlock job error:", err);
    }
}

/**
 * Lắng nghe khóa
 */
export function watchLocks(onUpdate) {
    if (!isInitialized || !db) return () => { };
    const refLocks = ref(db, 'haru_state/locks');
    return onValue(refLocks, (snapshot) => {
        onUpdate(snapshot.val() || {});
    });
}

/**
 * Trình theo dõi hiện diện (Presence System)
 */
export function trackUserPresence(username) {
    if (!isInitialized || !db || !username) return;

    // Yêu cầu import thêm onDisconnect từ firebase/database
    import('firebase/database').then(({ onDisconnect }) => {
        const myConnectionsRef = ref(db, `haru_state/presence/${username}`);
        const connectedRef = ref(db, '.info/connected');

        onValue(connectedRef, (snap) => {
            if (snap.val() === true) {
                // Đã kết nối
                const con = onDisconnect(myConnectionsRef);
                con.remove().then(() => {
                    set(myConnectionsRef, {
                        online: true,
                        last_active: Date.now()
                    });
                });
            }
        });
    }).catch(err => console.warn("Lỗi tải onDisconnect:", err));
}

export function watchPresence(onUpdate) {
    if (!isInitialized || !db) return () => { };
    const presenceRef = ref(db, 'haru_state/presence');
    return onValue(presenceRef, (snapshot) => {
        onUpdate(snapshot.val() || {});
    });
}


/**
 * Lắng nghe real-time thay đổi portfolios từ Firebase.
 * Dùng cho Hub/Gallery mode để tự cập nhật khi thiết bị khác thêm album.
 * @param {Function} onUpdate - callback(portfolios: Array) khi có dữ liệu mới
 * @returns {Function} unsubscribe - gọi để dừng lắng nghe
 */
export function watchPortfolios(onUpdate) {
    if (!isInitialized || !db) return () => { };

    // Dừng listener cũ nếu có
    if (_portfoliosUnsubscribe) {
        _portfoliosUnsubscribe();
        _portfoliosUnsubscribe = null;
    }

    const portfoliosRef = ref(db, 'haru_state/portfolios');

    const unsubscribe = onValue(portfoliosRef, (snapshot) => {
        if (snapshot.exists()) {
            const portfolios = snapshot.val();
            if (Array.isArray(portfolios)) {
                console.log("🔥 [Real-time] Portfolios updated:", portfolios.length, "albums");
                onUpdate(portfolios);
            }
        } else {
            onUpdate([]);
        }
    }, (err) => {
        console.warn("Firebase watchPortfolios error:", err);
    });

    _portfoliosUnsubscribe = unsubscribe;
    return unsubscribe;
}

/**
 * Kích hoạt đồng bộ khẩn cấp — ghi timestamp lên Firebase để báo cho tất cả client.
 * Admin bấm nút → tất cả thiết bị đang mở app sẽ tự động reload data từ Firebase.
 */
export async function triggerForceSync() {
    if (!isInitialized || !db) return false;
    try {
        await update(ref(db, 'haru_state'), {
            forceSyncAt: Date.now(),
            forceSyncBy: 'admin'
        });
        console.log("🚨 ForceSync triggered!");
        return true;
    } catch (err) {
        console.error("triggerForceSync error:", err);
        return false;
    }
}

/**
 * Lắng nghe tín hiệu đồng bộ khẩn cấp từ Firebase.
 * Mọi client (admin, hub, mobile,...) gọi hàm này lúc boot.
 * @param {Function} onSignal - callback() khi có tín hiệu force sync
 * @returns {Function} unsubscribe
 */
export function watchForceSync(onSignal) {
    if (!isInitialized || !db) return () => { };

    let lastKnown = null;
    const syncRef = ref(db, 'haru_state/forceSyncAt');

    const unsubscribe = onValue(syncRef, (snapshot) => {
        const val = snapshot.val();
        if (val && val !== lastKnown) {
            if (lastKnown !== null) {
                // Chỉ trigger nếu đây không phải lần đọc đầu tiên
                console.log("🚨 [ForceSync] Signal received — reloading data...");
                onSignal(val);
            }
            lastKnown = val;
        }
    }, (err) => {
        console.warn("watchForceSync error:", err);
    });

    return unsubscribe;
}

/**
 * Lắng nghe real-time toàn bộ trạng thái hệ thống.
 * Mọi client gọi hàm này để tự động cập nhật data nếu có thiết bị khác lưu.
 * @param {Function} onUpdate - callback(stateSnapshot: Object)
 * @returns {Function} unsubscribe
 */
export function watchFullState(onUpdate) {
    if (!isInitialized || !db) return () => { };

    const stateRef = ref(db, 'haru_state');

    const unsubscribe = onValue(stateRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            // Khôi phục Object về Array cho jobs và staff do lúc sync ta parse thành Object
            if (data.jobs && typeof data.jobs === 'object' && !Array.isArray(data.jobs)) {
                data.jobs = Object.values(data.jobs);
            }
            if (data.staff && typeof data.staff === 'object' && !Array.isArray(data.staff)) {
                data.staff = Object.values(data.staff);
            }
            onUpdate(data);
        }
    }, (err) => {
        console.warn("watchFullState error:", err);
    });

    return unsubscribe;
}

