import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue, off, update } from "firebase/database";

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
 * Ghi toàn bộ state lên Firebase
 */
export async function syncToFirebase(state) {
    if (!isInitialized || !db) return;
    try {
        // Merge portfolios với remote để tránh mất album khi nhiều thiết bị cùng ghi.
        let mergedPortfolios = state.portfolios || [];
        try {
            const remoteSnap = await get(ref(db, 'haru_state/portfolios'));
            const remotePortfolios = remoteSnap.exists() && Array.isArray(remoteSnap.val()) ? remoteSnap.val() : [];
            const byId = new Map();

            const put = (p) => {
                if (!p) return;
                const id = p.id || `PF-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
                const old = byId.get(id);
                if (!old) {
                    byId.set(id, { ...p, id });
                } else {
                    // Ưu tiên bản có thumbnail/images đầy đủ hơn
                    const oldScore = (old.thumbnail ? 1 : 0) + ((old.images || []).length > 0 ? 1 : 0);
                    const newScore = (p.thumbnail ? 1 : 0) + ((p.images || []).length > 0 ? 1 : 0);
                    byId.set(id, newScore >= oldScore ? { ...old, ...p, id } : { ...p, ...old, id });
                }
            };

            remotePortfolios.forEach(put);
            (state.portfolios || []).forEach(put);
            mergedPortfolios = Array.from(byId.values());
        } catch (e) {
            console.warn('Firebase portfolio merge fallback to local only:', e?.message || e);
        }

        const payload = {
            jobs: state.jobs,
            staff: state.staff,
            financeMetadata: state.financeMetadata,
            manualTransactions: state.manualTransactions || [],
            settings: state.settings || {},
            history: state.history,
            clients: state.clients || [], // Chuẩn bị cho Phase 3: CRM
            portfolios: mergedPortfolios
        };
        await set(ref(db, 'haru_state'), payload);
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
            return snapshot.val();
        }
    } catch (err) {
        console.error("Firebase load error:", err);
    }
    return null;
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
            onUpdate(data);
        }
    }, (err) => {
        console.warn("watchFullState error:", err);
    });

    return unsubscribe;
}

