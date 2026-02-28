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

/**
 * Ghi state lên Firebase bằng Cập nhật từng phần (Granular Updates - update)
 * Giúp tránh ghi đè dữ liệu khi 2 máy cùng lưu tại 1 thời điểm.
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

        // 2) Update các phần state khác bằng Granular Updates
        const updates = {};

        // Chuyển đổi array thành object để update từng id riêng rẽ cho Jobs
        if (Array.isArray(state.jobs)) {
            state.jobs.forEach(job => {
                if (job && job.id) {
                    updates[`haru_state/jobs/${job.id}`] = job;
                }
            });
        }

        // Tương tự cho Staff
        if (Array.isArray(state.staff)) {
            state.staff.forEach(s => {
                if (s && s.id) {
                    updates[`haru_state/staff/${s.id}`] = s;
                } else if (s && s.name) {
                    updates[`haru_state/staff/${s.name}`] = s;
                }
            });
        }

        // Cập nhật các node khác
        if (state.financeMetadata) updates['haru_state/financeMetadata'] = state.financeMetadata;
        if (state.manualTransactions) updates['haru_state/manualTransactions'] = state.manualTransactions;
        if (state.settings) updates['haru_state/settings'] = state.settings;
        if (state.history) updates['haru_state/history'] = state.history;
        if (state.clients) updates['haru_state/clients'] = state.clients;

        // Cập nhật timestamp lần sync cuối
        updates['haru_state/lastUpdated'] = Date.now();

        await update(ref(db), updates);
        console.log("🔥 Firebase Granular Update Xong!");
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

