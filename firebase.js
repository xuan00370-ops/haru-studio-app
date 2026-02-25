import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue, off } from "firebase/database";

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
        const payload = {
            jobs: state.jobs,
            staff: state.staff,
            financeMetadata: state.financeMetadata,
            manualTransactions: state.manualTransactions || [],
            settings: state.settings || {},
            history: state.history,
            clients: state.clients || [], // Chuẩn bị cho Phase 3: CRM
            portfolios: state.portfolios || []
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
