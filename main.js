
import { mockData } from './data.js';
import {
  renderDashboard, renderJobs, renderSidebar, renderBottomNav, renderStaff, renderClients,
  renderFinance, renderTax, renderSync, renderMonthPicker, renderNAS, renderModalOverlay,
  renderCalendar, renderTrash, renderSettings, renderDeadlineEdit, renderEditVideo, renderHistory,
  renderLoginScreen, renderEditorPortal, renderAnalytics, renderKanban, renderWatermark, renderStaffPortal, renderEditPhoto,
  renderGalleryClient, renderPortfolioAdmin
} from './components.js';

import { initFirebase, syncToFirebase, loadFromFirebase, watchPortfolios, triggerForceSync, watchForceSync, watchFullState } from './firebase.js';

// ============================================================
// STATE INITIALIZATION & FIREBASE
// ============================================================
const STORAGE_KEY = 'haru_state_v2';
const RESET_FLAG_KEY = 'haru_reset_2026_sync_v2';

// Mặc định ban đầu
export const state = {
  activePage: 'dashboard',
  currentMonth: new Date().getMonth() + 1,
  currentYear: new Date().getFullYear(),
  modal: { isOpen: false, type: null, data: null },
  history: [{ time: new Date().toISOString(), action: 'Khởi tạo hệ thống', user: 'Admin' }],
  notificationLog: [], // Phase 3 #8: notification bell log (max 50)
  deadlineFilter: 'TẤT CẢ',
  staffFilter: 'TẤT CẢ',
  statusFilter: 'TẤT CẢ',
  searchQuery: '',
  extraMonth: null, // Multi-month filter: e.g. { month: 3, year: 2026 } to combine with currentMonth
  staffViewMode: 'all',
  editVideoFilter: 'TẤT CẢ',
  editVideoMissingLink: false, // Phase 3 #6: audit link filter
  editPhotoMissingLink: false, // Phase 3 #6: audit link filter
  currentUser: null, // { username, role, displayName }
  syncLogs: [],
  lastSyncResult: null,
  jobs: [...mockData.jobs],
  staff: [...mockData.staff],
  financeMetadata: { ...mockData.financeMetadata },
  manualTransactions: [],
  settings: {
    taxRate: 0.1,
    depositPercent: 0.2,
    firebaseConfig: '',
    eventCategories: ['QUAY PS', 'CHỤP PS', 'QUAY TT', 'CHỤP TT'],
    serviceRoles: ['QUAY PS', 'CHỤP PS', 'QUAY TT', 'CHỤP TT', 'Quay Flycam', 'Editor', 'Hỗ trợ', 'Quản lý', 'Khác', 'CTV'],
    rates: mockData.settings?.rates || {},
    accounts: [
      { username: 'ADMIN', password: 'ADMIN', role: 'admin', displayName: 'Admin' },
      { username: 'EDIT', password: 'EDIT', role: 'editor', displayName: 'Editor' }
    ]
  },
  clients: [], // Phase 3 CRM
  portfolios: [] // Phase 6 Gallery
};

// Mặc định tháng hiện tại (không ghi đè theo job mới nhất)
// state.currentMonth và state.currentYear đã được set = new Date() ở trên

// One-time hotfix: clear stale client cache from older builds
(function oneTimeCacheReset() {
  try {
    if (!localStorage.getItem(RESET_FLAG_KEY)) {
      localStorage.removeItem('haru_state_v1');
      localStorage.removeItem('haru_state_v2');
      localStorage.removeItem('haru_theme');
      localStorage.setItem(RESET_FLAG_KEY, '1');
    }
  } catch (e) {
    console.warn('Cache reset skipped:', e.message);
  }
})();

// Deliverables migration moved to bootload() — runs after real data loads

// ============================================================
// FIREBASE PUBLIC CONFIG FALLBACK (for shared/public access)
// ============================================================
function parseFirebaseConfig(raw) {
  if (!raw) return null;
  if (typeof raw === 'object') return raw;
  try { return JSON.parse(raw); } catch { return null; }
}

function getPublicFirebaseConfig() {
  // 1) Global injected config (firebase-public-config.js)
  const globalCfg = parseFirebaseConfig(window.HARU_PUBLIC_FIREBASE_CONFIG || window.HARU_FIREBASE_CONFIG);
  if (globalCfg?.apiKey && globalCfg?.databaseURL) return globalCfg;

  // 2) Legacy localStorage key used by some builds
  try {
    const legacy = parseFirebaseConfig(localStorage.getItem('haru_app_state_v2'));
    const cfg = parseFirebaseConfig(legacy?.settings?.firebaseConfig || legacy?.firebaseConfig);
    if (cfg?.apiKey && cfg?.databaseURL) return cfg;
  } catch { }

  return null;
}

// ============================================================
// PERSISTENCE — localStorage + Firebase
// ============================================================
export function saveState() {
  try {
    const payload = {
      jobs: state.jobs,
      staff: state.staff,
      financeMetadata: state.financeMetadata,
      manualTransactions: state.manualTransactions || [],
      settings: state.settings || {},
      history: (state.history || []).slice(0, 200),
      clients: state.clients || [],
      portfolios: state.portfolios || []
    };

    // Save to LocalStorage for offline speed
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));

    // Save async to Firebase
    syncToFirebase(state);

  } catch (err) {
    console.warn('[Haru] Không thể lưu state:', err.message);
  }
}

// ============================================================
// THEME (force light mode)
// ============================================================
function initTheme() {
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.setItem('haru_theme', 'light');
}

window.toggleTheme = function () {
  // Dark mode disabled by request.
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.setItem('haru_theme', 'light');
};

window.getThemeIcon = function () {
  return '🌤️';
};

initTheme();

// ============================================================
// PUSH NOTIFICATIONS
// ============================================================
window.requestNotifPermission = async () => {
  if (!('Notification' in window)) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  const result = await Notification.requestPermission();
  return result;
};

window.sendNotification = (title, body, icon = '🔔') => {
  // Browser notification
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body, icon: '/vite.svg', badge: '/vite.svg', tag: title });
  }
  // In-app toast
  showToast(`${icon} ${title}: ${body}`);
};

function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = 'position:fixed;top:1rem;right:1rem;z-index:99999;display:flex;flex-direction:column;gap:0.5rem;max-width:360px';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.style.cssText = 'background:var(--bg-card,#fff);border:1px solid var(--border);border-left:4px solid #f59e0b;padding:0.6rem 1rem;border-radius:8px;font-size:0.82rem;color:var(--text-main);box-shadow:0 4px 12px rgba(0,0,0,0.15);animation:slideIn 0.3s ease;cursor:pointer';
  toast.textContent = message;
  toast.onclick = () => toast.remove();
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 8000);
}

window.checkDeadlines = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const notified = JSON.parse(localStorage.getItem('haru_notified') || '{}');
  const todayKey = today.toISOString().split('T')[0];

  // Clear old notified entries
  Object.keys(notified).forEach(k => { if (k < todayKey) delete notified[k]; });

  state.jobs.forEach(job => {
    if (job.status === 'Đã hoàn thành') return;
    const jDate = new Date(job.date);
    jDate.setHours(0, 0, 0, 0);

    // Photo deadline = event + 15 days, Video = event + 30 days
    const photoDeadline = new Date(jDate); photoDeadline.setDate(photoDeadline.getDate() + 15);
    const videoDeadline = new Date(jDate); videoDeadline.setDate(videoDeadline.getDate() + 30);

    const photoDays = Math.ceil((photoDeadline - today) / (1000 * 60 * 60 * 24));
    const videoDays = Math.ceil((videoDeadline - today) / (1000 * 60 * 60 * 24));

    const nKey = `${job.id}_${todayKey}`;
    if (notified[nKey]) return;

    if (photoDays <= 0) {
      window.sendNotification('⚠️ TRỄ Photo', `${job.client} — trễ ${Math.abs(photoDays)} ngày!`, '🚨');
      notified[nKey] = true;
    } else if (photoDays <= 3) {
      window.sendNotification('📸 Sắp hết hạn Photo', `${job.client} — còn ${photoDays} ngày`, '⏰');
      notified[nKey] = true;
    }

    if (videoDays <= 0) {
      window.sendNotification('⚠️ TRỄ Video', `${job.client} — trễ ${Math.abs(videoDays)} ngày!`, '🚨');
      notified[nKey] = true;
    } else if (videoDays <= 5) {
      window.sendNotification('🎬 Sắp hết hạn Video', `${job.client} — còn ${videoDays} ngày`, '⏰');
      notified[nKey] = true;
    }
  });

  localStorage.setItem('haru_notified', JSON.stringify(notified));
};

// Auto-check every 30 minutes
setInterval(() => { if (state.currentUser) window.checkDeadlines(); }, 30 * 60 * 1000);

// ============================================================
// QR PREVIEW
// ============================================================
window.openQR = (jobId) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;

  const existing = document.getElementById('qr-panel-overlay');
  if (existing) existing.remove();

  // Generate preview URL (placeholder - would be real URL in production)
  const previewUrl = `${window.location.origin}/preview/${job.id}`;

  const overlay = document.createElement('div');
  overlay.id = 'qr-panel-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:9999;display:flex;align-items:center;justify-content:center';
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const bg = isDark ? '#162816' : '#fff';

  const panel = document.createElement('div');
  panel.style.cssText = `background:${bg};border-radius:16px;padding:2rem;max-width:380px;width:90vw;text-align:center;box-shadow:0 8px 32px rgba(0,0,0,0.3)`;

  // Generate QR
  let qrHtml = '';
  if (typeof qrcode === 'function') {
    const qr = qrcode(0, 'M');
    qr.addData(previewUrl);
    qr.make();
    qrHtml = qr.createSvgTag({ scalable: true });
  } else {
    qrHtml = '<div style="width:200px;height:200px;background:#f0f0f0;border-radius:8px;display:flex;align-items:center;justify-content:center;margin:auto">QR Library không sẵn sàng</div>';
  }

  const statusColor = { 'Đã hoàn thành': '#22c55e', 'Nhận feedback': '#3b82f6', 'Chưa gửi': '#f59e0b', 'Sắp diễn ra': '#ef4444' }[job.status] || '#94a3b8';

  panel.innerHTML = `
    <div style="font-size:1.3rem;font-weight:900;color:var(--text-main);margin-bottom:0.3rem">📱 QR Preview</div>
    <div style="font-size:0.8rem;color:var(--text-dim);margin-bottom:1.2rem">Quét mã để xem album khách hàng</div>
    <div style="display:inline-block;padding:1rem;background:#fff;border-radius:12px;margin-bottom:1rem">
      <div style="width:180px;height:180px">${qrHtml}</div>
    </div>
    <div style="margin-bottom:1rem">
      <div style="font-size:1rem;font-weight:800;color:var(--text-main)">${job.client}</div>
      <div style="font-size:0.75rem;color:var(--text-dim)">${new Date(job.date).toLocaleDateString('vi-VN')} · ${job.eventType || 'Sự kiện'}</div>
      <span style="font-size:0.65rem;font-weight:800;padding:0.15rem 0.5rem;border-radius:10px;background:${statusColor}20;color:${statusColor};margin-top:0.3rem;display:inline-block">${job.status}</span>
    </div>
    <div style="font-size:0.65rem;color:var(--text-dim);word-break:break-all;padding:0.4rem;background:var(--accent-soft);border-radius:6px;margin-bottom:1rem">${previewUrl}</div>
    <div style="display:flex;gap:0.5rem;justify-content:center">
      <button onclick="navigator.clipboard.writeText('${previewUrl}');this.textContent='✅ Đã copy!';setTimeout(()=>this.textContent='📋 Copy Link',1500)" style="background:var(--primary);color:#fff;border:none;padding:0.5rem 1rem;border-radius:8px;font-weight:700;cursor:pointer;font-family:inherit;font-size:0.82rem">📋 Copy Link</button>
      <button onclick="this.closest('#qr-panel-overlay').remove()" style="background:var(--accent-soft);color:var(--text-main);border:1px solid var(--border);padding:0.5rem 1rem;border-radius:8px;font-weight:700;cursor:pointer;font-family:inherit;font-size:0.82rem">Đóng</button>
    </div>
  `;
  overlay.appendChild(panel);
  document.body.appendChild(overlay);
};

async function bootload() {
  // 1. Cố gắng Load từ LocalStorage trước cho nhanh
  let localData = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.jobs) && Array.isArray(parsed.staff)) {
        // Guard: bỏ cache cũ nếu số job quá ít hơn data gốc đã sync
        const parsedJobs = parsed.jobs.length;
        const baselineJobs = Array.isArray(mockData.jobs) ? mockData.jobs.length : 0;
        const shouldUseLocal = parsedJobs >= Math.min(5, baselineJobs || 5);

        if (shouldUseLocal) {
          localData = parsed;
          Object.assign(state, {
            jobs: localData.jobs,
            staff: localData.staff,
            financeMetadata: localData.financeMetadata || state.financeMetadata,
            manualTransactions: localData.manualTransactions || [],
            settings: localData.settings || state.settings,
            history: localData.history || state.history,
            clients: localData.clients || [],
            portfolios: localData.portfolios || []
          });
        } else {
          console.warn('[Haru] Bỏ qua local cache vì dữ liệu quá ít:', parsedJobs);
        }
      }
    }
  } catch (e) { console.warn('Local Load Err:', e); }

  // 2. Kích hoạt Firebase nếu có config
  let envFirebaseConfig = null;
  try {
    envFirebaseConfig = import.meta.env.VITE_FIREBASE_CONFIG;
    if (typeof envFirebaseConfig === 'string') {
      JSON.parse(envFirebaseConfig); // validate
    }
  } catch (e) {
    console.warn("Invalid VITE_FIREBASE_CONFIG in .env", e);
    envFirebaseConfig = null;
  }

  // ──────────────────────────────────────────────────────────
  // FIX: Luôn ưu tiên window.HARU_PUBLIC_FIREBASE_CONFIG
  // (được load từ /firebase-public-config.js trước main.js)
  // Điều này đảm bảo BẤT KỲ thiết bị nào mở app đều có config
  // đúng, không phụ thuộc localStorage hay settings của máy đó.
  // ──────────────────────────────────────────────────────────
  const publicWindowCfg = parseFirebaseConfig(
    window.HARU_PUBLIC_FIREBASE_CONFIG || window.HARU_FIREBASE_CONFIG
  );

  // Thứ tự ưu tiên: public window config > settings > env
  const effectiveFirebaseConfig = publicWindowCfg
    || parseFirebaseConfig(state.settings.firebaseConfig)
    || parseFirebaseConfig(envFirebaseConfig);

  // ──────────────────────────────────────────────────────────
  // FIX: Validate & canonicalize databaseURL
  // Ensure dùng đúng endpoint mặc định (không phải asia-southeast1)
  // ──────────────────────────────────────────────────────────
  if (effectiveFirebaseConfig && effectiveFirebaseConfig.databaseURL) {
    // Nếu databaseURL dùng regional host sai, ghi đè về default
    if (effectiveFirebaseConfig.databaseURL.includes('asia-southeast1.firebasedatabase.app')) {
      const projectId = effectiveFirebaseConfig.projectId;
      if (projectId) {
        effectiveFirebaseConfig.databaseURL = `https://${projectId}-default-rtdb.firebaseio.com`;
        console.warn(`[Haru] Fixed databaseURL → ${effectiveFirebaseConfig.databaseURL}`);
      }
    }
  }

  // Fallback an toàn MẠNH (BLOCKING): nếu dữ liệu rỗng HOÀN TOÀN,
  // khôi phục từ new_state.json ngay từ đầu (TRƯỚC KHI BẬT FIREBASE)
  // để tránh Firebase watch listener đè thành mảng rỗng do race condition.
  if (!Array.isArray(state.jobs) || state.jobs.length === 0) {
    try {
      console.log('🔄 Auto-fetching initial state from new_state.json (Strict Before Firebase)...');
      const res = await fetch('/new_state.json?t=' + Date.now());
      if (res.ok) {
        const liveData = await res.json();
        state.jobs = liveData.jobs || [];
        if (liveData.staff && liveData.staff.length > 0) state.staff = liveData.staff;
        console.log('✅ Auto-loaded', state.jobs.length, 'jobs from new_state.json successfully.');
      } else {
        throw new Error("HTTP Fetch failed");
      }
    } catch (err) {
      console.warn('⚠️ Auto-fetch new_state.json failed, falling back to static mockData', err);
      state.jobs = [...mockData.jobs];
      if (!Array.isArray(state.staff) || state.staff.length === 0) state.staff = [...mockData.staff];
    }
  }

  const isHubMode = urlParams.get('hub') === 'haru' || Boolean(urlParams.get('gallery'));
  // Hub/gallery mode ALWAYS needs Firebase, regardless of enableFirebaseSync setting
  const shouldUseFirebase = Boolean(effectiveFirebaseConfig) &&
    (state.settings.enableFirebaseSync === true || !!envFirebaseConfig || !!publicWindowCfg || isHubMode);

  if (shouldUseFirebase) {
    // Gán config chuẩn hóa vào state để các hàm khác dùng được
    const cfgStr = typeof effectiveFirebaseConfig === 'string'
      ? effectiveFirebaseConfig
      : JSON.stringify(effectiveFirebaseConfig);
    state.settings.firebaseConfig = cfgStr;

    const isOk = initFirebase(cfgStr);
    if (isOk) {
      // Fetch latest từ Firebase đè lên (nếu có)
      const fbData = await loadFromFirebase();
      console.log("🔥 PRE-MERGE FIREBASE DATA:", fbData?.portfolios);
      console.log("🔥 PRE-MERGE LOCAL DATA:", state.portfolios);
      if (fbData && fbData.jobs) {
        Object.assign(state, {
          jobs: fbData.jobs || state.jobs,
          staff: fbData.staff || state.staff,
          financeMetadata: fbData.financeMetadata || state.financeMetadata,
          manualTransactions: fbData.manualTransactions || state.manualTransactions,
          settings: { ...fbData.settings, firebaseConfig: cfgStr }, // giữ config đúng
          history: fbData.history || state.history,
          clients: fbData.clients || state.clients,
          portfolios: fbData.portfolios || state.portfolios
        });
        console.log("🔥 Đã tải dữ liệu mới nhất từ Firebase! Portfolios:", state.portfolios);
      } else {
        console.log("🔥 Firebase init successful, but no valid fbData.jobs block found. Portfolios not merged.");
      }

      // Lắng nghe real-time toàn bộ thay đổi Firebase data từ các user/thiết bị khác

      watchFullState((freshData) => {
        if (!freshData || !freshData.jobs) return;

        // Nếu người dùng đang mở một Modal (nhập liệu dở), ta CHỈ cập nhật ngầm data
        // NHƯNG KHÔNG gọi updateUI() để tránh giật form của họ.
        const isEditing = state.modal && state.modal.isOpen;

        Object.assign(state, {
          jobs: freshData.jobs || state.jobs,
          staff: freshData.staff || state.staff,
          financeMetadata: freshData.financeMetadata || state.financeMetadata,
          manualTransactions: freshData.manualTransactions || state.manualTransactions,
          // Không đè settings chứa firebaseConfig local
          settings: { ...freshData.settings, firebaseConfig: cfgStr },
          history: freshData.history || state.history,
          clients: freshData.clients || state.clients,
          portfolios: freshData.portfolios || state.portfolios
        });

        if (!isEditing) {
          // Chỉ render lại giao diện nếu ko bị vướng edit input
          updateUI();
        } else {
          // Báo cho user biết có bản cập nhật mới vừa chìm xuống background
          const toastEl = document.getElementById('toast-container');
          if (!toastEl || !toastEl.innerHTML.includes('Dữ liệu vừa được đồng bộ')) {
            window.showToast('⬇️ Dữ liệu vừa được đồng bộ ngầm. Sẽ hiển thị khi đóng hộp thoại.', 'var(--primary)');
          }
        }
      });
    }
  }
  // (Fallback cũ đã được dời lên trên dòng Firebase Init)

  // Deduplicate services for existing jobs (fixes API merged cells bug data retention)
  if (Array.isArray(state.jobs)) {
    state.jobs.forEach(job => {
      if (Array.isArray(job.services)) {
        const seen = new Set();
        job.services = job.services.filter(svc => {
          const key = `${svc.service}_${svc.staff}_${svc.cost}_${svc.date}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
      }
    });
  }

  // Auto-migrate old services to deliverables (runs AFTER real data loads)
  let migratedDel = false;
  state.jobs.forEach(job => {
    if (!job.deliverables || job.deliverables.length === 0) {
      const deliverables = [];
      const quayCount = (job.services || []).filter(s => (s.service || '').toLowerCase().includes('quay')).length;
      if (quayCount === 1) deliverables.push({ name: 'Clip Phóng sự', type: 'Video', quantity: 1, editStatus: 'Chưa bắt đầu' });
      else if (quayCount >= 2) {
        deliverables.push({ name: 'Clip Phóng sự', type: 'Video', quantity: 1, editStatus: 'Chưa bắt đầu' });
        deliverables.push({ name: 'Clip Truyền thống', type: 'Video', quantity: 1, editStatus: 'Chưa bắt đầu' });
      }
      const chupCount = (job.services || []).filter(s => (s.service || '').toLowerCase().includes('chụp')).length;
      for (let ci = 0; ci < chupCount; ci++) {
        deliverables.push({ name: chupCount === 1 ? 'Bộ Hình' : `Bộ Hình ${ci + 1}`, type: 'Photo', quantity: 1, editStatus: 'Chưa bắt đầu' });
      }
      if (deliverables.length > 0) {
        const firstQuay = (job.services || []).find(s => (s.service || '').toLowerCase().includes('quay'));
        if (firstQuay) deliverables.filter(d => d.type === 'Video').forEach(d => { d.editor = firstQuay.editStaff || ''; d.editStatus = firstQuay.editStatus || 'Chưa bắt đầu'; d.editDriveLink = firstQuay.editDriveLink || ''; });
        const firstChup = (job.services || []).find(s => (s.service || '').toLowerCase().includes('chụp'));
        if (firstChup) deliverables.filter(d => d.type === 'Photo').forEach(d => { d.editor = firstChup.editStaff || ''; d.editStatus = firstChup.editStatus || 'Chưa bắt đầu'; d.editDriveLink = firstChup.editDriveLink || ''; });
        job.deliverables = deliverables;
        migratedDel = true;
      }
    }
  });
  // Rename old names
  state.jobs.forEach(job => {
    (job.deliverables || []).forEach(d => {
      if (d.name === 'Ảnh Tiệc') d.name = 'Ảnh Phóng sự';
    });
  });
  if (migratedDel) {
    console.log('[Haru] Migrated deliverables after data load');
    saveState();
  }

  // === Feature #B: Reminder — jobs sắp đến trong 3 ngày tới ===
  try {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const in3Days = new Date(today); in3Days.setDate(in3Days.getDate() + 3);
    const upcoming = state.jobs.filter(j => {
      if (j.isTrash) return false;
      if ((j.status || '').includes('hoàn thành')) return false;
      const d = new Date(j.date); d.setHours(0, 0, 0, 0);
      return d >= today && d <= in3Days;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
    if (upcoming.length > 0) {
      const names = upcoming.map(j => `${j.client} (${new Date(j.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })})`).join(', ');
      const msg = `⚠️ ${upcoming.length} job sắp đến: ${names}`;
      if (!state.notificationLog) state.notificationLog = [];
      // Tránh duplicate: chỉ thêm nếu chưa có cùng message hôm nay
      const todayStr = today.toISOString().slice(0, 10);
      const alreadyAdded = state.notificationLog.some(n => n.action === msg && (n.time || '').startsWith(todayStr));
      if (!alreadyAdded) {
        state.notificationLog.unshift({ time: new Date().toISOString(), action: msg, user: 'Tự động', read: false });
        if (state.notificationLog.length > 50) state.notificationLog.pop();
        // Toast nhắc nhở
        setTimeout(() => {
          if (window.showToast) {
            window.showToast(msg, 'var(--warning)');
          } else {
            const t = document.createElement('div');
            t.style.cssText = 'position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);z-index:9999;background:#f59e0b;color:#fff;padding:0.6rem 1.25rem;border-radius:12px;font-size:0.85rem;font-weight:700;box-shadow:0 4px 20px rgba(0,0,0,0.15);max-width:90vw;text-align:center';
            t.textContent = msg;
            document.body.appendChild(t);
            setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity 0.4s'; setTimeout(() => t.remove(), 400); }, 5000);
          }
        }, 1500);
      }
    }
  } catch (e) { console.warn('[Haru] Reminder check error:', e); }

  // Khởi động UI Component render
  updateUI();

  // 3. Auto-sync từ Google Sheet (background, không block UI)
  const sheetUrl = state.settings?.sheetSyncUrl || '';
  if (sheetUrl && (sheetUrl.includes('script.google.com') || sheetUrl.includes('script.googleusercontent.com'))) {
    try {
      const { runFullSync, getSyncLogs } = await import('./sync.js');
      const result = await runFullSync(state.jobs, '/Volumes/HARUwedding', [], sheetUrl);
      state.syncLogs = getSyncLogs();
      state.lastSyncResult = result;
      const totalAdded = (result.sheetAdded || 0);
      if (totalAdded > 0) {
        console.log(`📊 Auto - sync: +${totalAdded} dự án mới từ Google Sheet`);
        saveState();
        updateUI();
      }
    } catch (e) { console.warn('Auto-sync Sheet error:', e.message); }
  }
}

// Bắt đầu boot
bootload();

// ============================================================
// HELPERS
// ============================================================
const app = document.getElementById('app');

window.addHistory = (action, details = null) => {
  const session = JSON.parse(localStorage.getItem('haru_session') || '{}');
  const entry = { time: new Date().toISOString(), action, user: session.displayName || 'Admin' };
  if (details) entry.details = details;
  state.history.unshift(entry);
  if (state.history.length > 500) state.history = state.history.slice(0, 500);

  // Phase 3 #8: push to notification log
  if (!state.notificationLog) state.notificationLog = [];
  state.notificationLog.unshift({ id: Date.now(), time: entry.time, action, user: entry.user, read: false });
  if (state.notificationLog.length > 50) state.notificationLog = state.notificationLog.slice(0, 50);
  // Update bell badge without full re-render
  const badge = document.getElementById('notif-bell-badge');
  if (badge) {
    const unread = state.notificationLog.filter(n => !n.read).length;
    badge.textContent = unread > 9 ? '9+' : unread;
    badge.style.display = unread > 0 ? 'flex' : 'none';
  }
};

// Phase 3 #10: Floating Save Indicator
window.showFloatingSaveStatus = (status) => {
  let el = document.getElementById('haru-floating-save');
  if (!el) {
    el = document.createElement('div');
    el.id = 'haru-floating-save';
    el.style.cssText = 'position:fixed;bottom:1.25rem;left:50%;transform:translateX(-50%);z-index:99998;display:flex;align-items:center;gap:0.5rem;padding:0.45rem 1.1rem;border-radius:100px;font-size:0.82rem;font-weight:700;box-shadow:0 4px 20px rgba(0,0,0,0.15);transition:all 0.3s;pointer-events:none;opacity:0';
    document.body.appendChild(el);
  }
  clearTimeout(el._hideTimer);
  if (status === 'saving') {
    el.style.background = '#3b82f6';
    el.style.color = '#fff';
    el.innerHTML = '<span style="animation:spin 1s linear infinite;display:inline-block">⟳</span> Đang lưu...';
    el.style.opacity = '1';
  } else if (status === 'saved') {
    el.style.background = '#22c55e';
    el.style.color = '#fff';
    el.innerHTML = '✓ Đã đồng bộ';
    el.style.opacity = '1';
    el._hideTimer = setTimeout(() => { el.style.opacity = '0'; }, 3000);
  } else if (status === 'error') {
    el.style.background = '#ef4444';
    el.style.color = '#fff';
    el.innerHTML = '✕ Lỗi lưu dữ liệu';
    el.style.opacity = '1';
    el._hideTimer = setTimeout(() => { el.style.opacity = '0'; }, 4000);
  }
};

window.haruConfirm = (message, onConfirm) => {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:999999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);animation:fadeIn 0.2s';

  const box = document.createElement('div');
  box.style.cssText = 'background:var(--bg-card);padding:1.5rem;border-radius:16px;width:90%;max-width:320px;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,0.3);animation:slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)';

  box.innerHTML = `
    <div style="font-size:3rem;margin-bottom:0.5rem;line-height:1">🗑️</div>
    <div style="font-weight:900;font-size:1.15rem;margin-bottom:0.5rem;color:var(--text-main)">Xác nhận xóa</div>
    <div style="font-size:0.9rem;color:var(--text-dim);margin-bottom:1.5rem;line-height:1.4">${message}</div>
    <div style="display:flex;gap:0.5rem">
      <button id="hc-cancel" style="flex:1;padding:0.7rem;border:1px solid var(--border);border-radius:8px;background:var(--bg-card);color:var(--text-main);font-weight:800;font-size:0.9rem;cursor:pointer">Hủy</button>
      <button id="hc-confirm" style="flex:1;padding:0.7rem;border:none;border-radius:8px;background:#ef4444;color:#fff;font-weight:800;font-size:0.9rem;cursor:pointer">Xóa ngay</button>
    </div>
  `;

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  box.querySelector('#hc-cancel').onclick = () => overlay.remove();
  box.querySelector('#hc-confirm').onclick = () => {
    overlay.remove();
    onConfirm();
  };
};

// Phase 3 #8: Notification actions
window.markNotifsRead = () => {
  if (!state.notificationLog) return;
  state.notificationLog.forEach(n => { n.read = true; });
  const badge = document.getElementById('notif-bell-badge');
  if (badge) badge.style.display = 'none';
  updateUI();
};
window.clearNotifLog = () => {
  state.notificationLog = [];
  updateUI();
};
window.toggleNotifPanel = () => {
  const panel = document.getElementById('notif-dropdown-panel');
  if (!panel) return;
  const isOpen = panel.style.display !== 'none';
  panel.style.display = isOpen ? 'none' : 'block';
  if (!isOpen) window.markNotifsRead();
};

// Phase 3 #6: Missing Link filter
window.setMissingLinkFilter = (type, val) => {
  if (type === 'video') state.editVideoMissingLink = val;
  else if (type === 'photo') state.editPhotoMissingLink = val;
  updateUI();
};

// ============================================================
// BACKUP & RESTORE
// ============================================================
window.exportBackup = () => {
  const data = JSON.stringify(state, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const now = new Date();
  a.href = url;
  a.download = `haru_backup_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}.json`;
  a.click();
  URL.revokeObjectURL(url);
  window.addHistory('Xuất backup dữ liệu');
  saveState();
};

window.importBackup = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target.result);
        if (!imported.jobs || !Array.isArray(imported.jobs)) {
          alert('❌ File backup không hợp lệ (thiếu jobs)');
          return;
        }
        if (!confirm(`⚠️ Nhập backup sẽ GHI ĐÈ toàn bộ dữ liệu hiện tại!\n\nFile: ${file.name} \nSố jobs: ${imported.jobs.length} \nSố nhân sự: ${(imported.staff || []).length} \n\nBạn chắc chắn ? `)) return;
        Object.assign(state, imported);
        state.history.unshift({ time: new Date().toISOString(), action: `Nhập backup từ ${file.name} `, user: 'Admin' });
        saveState();
        updateUI();
      } catch (err) {
        alert('❌ Lỗi đọc file: ' + err.message);
      }
    };
    reader.readAsText(file);
  };
  input.click();
};

// ============================================================
// CHAT / COMMENT SYSTEM
// ============================================================
window.addComment = (jobId, text, service = null) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job || !text.trim()) return;
  if (!job.comments) job.comments = [];
  const session = JSON.parse(localStorage.getItem('haru_session') || '{}');
  job.comments.push({
    user: session.displayName || 'Admin',
    text: text.trim(),
    time: new Date().toISOString(),
    service: service || null
  });
  saveState();
};

window.openChat = (jobId) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;

  // Remove existing chat panel
  const existing = document.getElementById('chat-panel-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'chat-panel-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:9999;display:flex;justify-content:flex-end';
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };

  const comments = job.comments || [];
  const session = JSON.parse(localStorage.getItem('haru_session') || '{}');
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const bg = isDark ? '#162816' : '#fff';
  const inputBg = isDark ? '#0f1f0f' : '#f8fdf8';

  const panel = document.createElement('div');
  panel.style.cssText = `width: 380px; max - width: 90vw; background:${bg}; height: 100 %; display: flex; flex - direction: column; box - shadow: -4px 0 24px rgba(0, 0, 0, 0.2); animation:slideIn 0.2s ease`;
  panel.innerHTML = `
            < div style = "padding:1rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center" >
      <div>
        <h3 style="font-size:1rem;font-weight:800;color:var(--text-main)">💬 ${job.client}</h3>
        <span style="font-size:0.72rem;color:var(--text-dim)">${comments.length} tin nhắn</span>
      </div>
      <button onclick="this.closest('#chat-panel-overlay').remove()" style="background:none;border:none;font-size:1.2rem;cursor:pointer;color:var(--text-dim)">✕</button>
    </div >
    <div id="chat-messages" style="flex:1;overflow-y:auto;padding:0.8rem;display:flex;flex-direction:column;gap:0.5rem">
      ${comments.length === 0 ? '<div style="text-align:center;color:var(--text-dim);font-size:0.8rem;margin-top:2rem">Chưa có tin nhắn nào.<br>Gửi ghi chú đầu tiên!</div>' : ''}
      ${comments.map(c => {
    const isMe = c.user === (session.displayName || 'Admin');
    return `<div style="display:flex;flex-direction:column;align-items:${isMe ? 'flex-end' : 'flex-start'};max-width:85%${isMe ? ';align-self:flex-end' : ''}">
          <div style="font-size:0.6rem;color:var(--text-dim);margin-bottom:0.15rem">${c.user} · ${new Date(c.time).toLocaleString('vi-VN')}</div>
          <div style="background:${isMe ? 'var(--primary-glow)' : 'var(--accent-soft)'};padding:0.5rem 0.8rem;border-radius:${isMe ? '12px 12px 0 12px' : '12px 12px 12px 0'};font-size:0.82rem;color:var(--text-main);line-height:1.4">${c.text}</div>
          ${c.service ? `<span style="font-size:0.55rem;color:var(--text-dim);margin-top:0.1rem">📹 ${c.service}</span>` : ''}
        </div>`;
  }).join('')}
    </div>
    <div style="padding:0.6rem;border-top:1px solid var(--border);display:flex;gap:0.4rem">
      <input id="chat-input" type="text" placeholder="Nhập ghi chú..." style="flex:1;padding:0.5rem 0.8rem;border:1px solid var(--border);border-radius:8px;font-family:inherit;font-size:0.85rem;background:${inputBg};color:var(--text-main)" />
      <button id="chat-send-btn" style="background:var(--primary);color:#fff;border:none;padding:0.5rem 1rem;border-radius:8px;font-weight:700;cursor:pointer;font-family:inherit;font-size:0.85rem">Gửi</button>
    </div>
          `;
  overlay.appendChild(panel);
  document.body.appendChild(overlay);

  // Scroll to bottom
  const msgBox = document.getElementById('chat-messages');
  if (msgBox) msgBox.scrollTop = msgBox.scrollHeight;

  // Send handler
  const sendMsg = () => {
    const input = document.getElementById('chat-input');
    if (input && input.value.trim()) {
      window.addComment(jobId, input.value);
      overlay.remove();
      window.openChat(jobId); // Re-render
    }
  };
  document.getElementById('chat-send-btn').onclick = sendMsg;
  document.getElementById('chat-input').onkeydown = (e) => { if (e.key === 'Enter') sendMsg(); };
};

function showValidationError(errors) {
  const errDiv = document.getElementById('form-validation-errors');
  if (errDiv) {
    errDiv.innerHTML = errors.map(e => `< div >• ${e}</div > `).join('');
    errDiv.style.display = 'block';
    setTimeout(() => { errDiv.style.display = 'none'; }, 6000);
  } else {
    alert('⚠️ Kiểm tra lại thông tin:\n\n• ' + errors.join('\n• '));
  }
}

// ============================================================
// NAVIGATION & MODAL
// ============================================================
window.navigate = (page) => {
  state.activePage = page;
  state.modal.isOpen = false;
  updateUI();
};

// ============================================================
// EMERGENCY SYNC (bấm nút → đồng bộ toàn hệ thống ngay lập tức)
// ============================================================
window.emergencySync = async () => {
  const btn = document.getElementById('emergency-sync-btn');
  if (btn) { btn.disabled = true; btn.innerHTML = '⟳'; btn.style.animation = 'spin 1s linear infinite'; }
  window.showFloatingSaveStatus('saving');
  try {
    // 1. Đẩy state hiện tại lên Firebase ngay
    await syncToFirebase(state);
    // 2. Ghi tín hiệu ForceSync để tất cả client khác reload
    await triggerForceSync();
    window.showFloatingSaveStatus('saved');
    if (btn) { btn.disabled = false; btn.innerHTML = '🚨'; btn.style.animation = ''; }
    window.showToast && window.showToast('✅ Đã đồng bộ khẩn cấp! Tất cả thiết bị đang cập nhật...');
  } catch (e) {
    window.showFloatingSaveStatus('error');
    if (btn) { btn.disabled = false; btn.innerHTML = '🚨'; btn.style.animation = ''; }
    console.error('Emergency sync error:', e);
  }
};

// ============================================================
// MIGRATE LOCAL PORTFOLIOS → FIREBASE (1 chạm)
// Dùng khi máy này có album local mà Firebase chưa có
// ============================================================
window.migrateLocalToFirebase = async () => {
  const localPortfolios = state.portfolios || [];
  if (localPortfolios.length === 0) {
    alert('⚠️ Không có portfolio nào trong local để migrate!');
    return;
  }
  const confirmed = await new Promise(resolve => {
    window.haruConfirm
      ? window.haruConfirm(`Migrate ${localPortfolios.length} album lên Firebase để tất cả thiết bị thấy?`, () => resolve(true))
      : resolve(confirm(`Migrate ${localPortfolios.length} album lên Firebase?`));
  });
  if (!confirmed) return;

  window.showFloatingSaveStatus('saving');
  try {
    await syncToFirebase(state);     // đẩy toàn bộ state (có portfolios)
    await triggerForceSync();         // báo tất cả client reload
    window.showFloatingSaveStatus('saved');
    window.showToast && window.showToast(`🚀 Đã migrate ${localPortfolios.length} album lên Firebase! Tất cả thiết bị đang cập nhật...`);
  } catch (e) {
    window.showFloatingSaveStatus('error');
    alert('❌ Lỗi migrate: ' + e.message);
  }
};




window.openModal = (type, data = null) => {
  state.modal.isOpen = true;
  state.modal.type = type;
  state.modal.data = data;
  updateUI();
};

window.openQuickPreview = (id) => window.openModal('quick_preview', id);

window.closeModal = () => {
  if (state.modal.type === 'quick_preview' && window._quickPreviewCloseFn) {
    window._quickPreviewCloseFn();
    return;
  }
  state.modal.isOpen = false;
  state.modal.type = null;
  state.modal.data = null;
  state.globalSearchQuery = '';
  state.globalSearchResults = [];
  updateUI();
};

window.checkStaffConflict = (staffName, dateStr, excludeJobId = null) => {
  if (!staffName || staffName === 'Chưa xếp' || staffName === '' || !dateStr) return [];
  const conflicts = [];
  const targetDate = new Date(dateStr);
  targetDate.setHours(0, 0, 0, 0);

  state.jobs.forEach(job => {
    if (job.isTrash || job.status === 'Đã hoàn thành') return;
    if (job.id === excludeJobId) return;

    let isConflict = false;

    // Multi-day events handling
    if (job.eventDays && job.eventDays.length > 0) {
      job.eventDays.forEach((day, idx) => {
        const dDate = new Date(day.date || job.date);
        dDate.setHours(0, 0, 0, 0);
        if (dDate.getTime() === targetDate.getTime()) {
          // Check services matching this day
          const dayServices = (job.services || []).filter(s => s.date === (day.date || job.date) || (!s.date && idx === 0));
          if (dayServices.some(s => s.staff && s.staff.toLowerCase().includes(staffName.toLowerCase()))) {
            isConflict = true;
          }
        }
      });
    } else {
      // Single day job
      const jDate = new Date(job.date);
      jDate.setHours(0, 0, 0, 0);
      if (jDate.getTime() === targetDate.getTime()) {
        if ((job.services || []).some(s => s.staff && s.staff.toLowerCase().includes(staffName.toLowerCase()))) {
          isConflict = true;
        }
      }
    }

    if (isConflict) conflicts.push(job);
  });

  return conflicts;
};

window._checkConflictUI = (selectEl) => {
  const staffName = selectEl.value;
  // Fallback to searching nearby date inputs if data-date is not statically available
  let dateStr = selectEl.getAttribute('data-date');
  if (!dateStr || dateStr === 'undefined') {
    // For Add Job Modal: find the closest date input
    const container = selectEl.closest('.form-group') || selectEl.closest('.day-tab-content') || document;
    const dateInput = container.querySelector('input[type="date"]');
    if (dateInput) dateStr = dateInput.value;
  }

  const jobId = selectEl.getAttribute('data-job-id');
  const warningEl = selectEl.parentElement.querySelector('.conflict-warning');

  if (!warningEl) return;

  if (staffName === 'Chưa xếp' || staffName === '' || !dateStr) {
    warningEl.style.display = 'none';
    return;
  }

  const conflicts = window.checkStaffConflict(staffName, dateStr, jobId);
  if (conflicts.length > 0) {
    const jobStr = conflicts.map(j => `#${j.jobNo || j.id.slice(0, 4)} ${j.client}`).join(', ');
    warningEl.innerHTML = `⚠️ Trùng: ${jobStr}`;
    warningEl.style.display = 'block';
  } else {
    warningEl.style.display = 'none';
  }
};

// ==========================================
// GLOBAL SEARCH LOGIC
// ==========================================
window.openGlobalSearch = () => {
  state.globalSearchQuery = '';
  state.globalSearchResults = [];
  window.openModal('global_search');
};

window._handleGlobalSearchInput = (query) => {
  state.globalSearchQuery = query;

  // Phase 3 #7: Detect command shortcuts (prefix '>')
  if (query.startsWith('>')) {
    const cmd = query.slice(1).trim().toLowerCase();
    state.globalSearchResults = [];
    // Show command hints in results via special marker
    state.globalSearchCommandHint = cmd;
    updateUI();
    return;
  }

  state.globalSearchCommandHint = null;
  if (!query || query.length < 2) {
    state.globalSearchResults = [];
  } else {
    const q = query.toLowerCase();
    state.globalSearchResults = state.jobs.filter(j => !j.isTrash && (
      j.client.toLowerCase().includes(q) ||
      (j.phone && j.phone.includes(q)) ||
      j.id.toLowerCase().includes(q) ||
      (j.venue && j.venue.toLowerCase().includes(q))
    )).slice(0, 50); // Mới nhất lên đầu (nếu mảng sort rồi), giới hạn 50
  }
  updateUI();
};

// Phase 3 #7: Execute command shortcut
window._executeCommand = (cmd) => {
  window.closeModal();
  setTimeout(() => {
    if (cmd.includes('tạo') || cmd.includes('tao') || cmd.includes('job') || cmd.includes('thêm') || cmd.includes('them')) {
      window.openModal('add_job');
    } else if (cmd.includes('lịch') || cmd.includes('lich') || cmd.includes('calendar')) {
      window.navigate('calendar');
    } else if (cmd.includes('kanban')) {
      window.navigate('kanban');
    } else if (cmd.includes('analytics') || cmd.includes('thống') || cmd.includes('thong')) {
      window.navigate('analytics');
    } else if (cmd.includes('edit video') || cmd.includes('video')) {
      window.navigate('edit_video');
    } else if (cmd.includes('ảnh') || cmd.includes('photo')) {
      window.navigate('edit_photo');
    } else if (cmd.includes('nhân sự') || cmd.includes('nhan su') || cmd.includes('staff')) {
      window.navigate('staff');
    } else if (cmd.includes('tài chính') || cmd.includes('tai chinh') || cmd.includes('finance')) {
      window.navigate('finance');
    }
  }, 100);
};

// Phase 3 #5: Bulk mark done
window.bulkMarkDone = (jobIds) => {
  if (!jobIds || jobIds.length === 0) return;
  let count = 0;
  jobIds.forEach(info => {
    const [jobId, sIdx] = info.split('::');
    const job = state.jobs.find(j => j.id === jobId);
    if (!job) return;
    const dIdx = parseInt(sIdx, 10);
    const d = job.deliverables?.[dIdx];
    if (d && d.editStatus !== 'Hoàn thành') {
      d.editStatus = 'Hoàn thành';
      count++;
    }
  });
  if (count > 0) {
    window.addHistory(`Đánh dấu hoàn thành hàng loạt: ${count} thành phẩm`);
    saveState();
    window.showFloatingSaveStatus('saved');
    updateUI();
  }
};

// Phase 3 #5: Sync floating bulk-action bar visibility
window._syncBulkBar = () => {
  const checked = [...document.querySelectorAll('.ev-multi-cb:checked')];
  let bar = document.getElementById('haru-bulk-bar');
  if (checked.length === 0) {
    if (bar) bar.remove();
    return;
  }
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'haru-bulk-bar';
    bar.style.cssText = 'position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);z-index:99997;background:#1e293b;color:#fff;padding:0.6rem 1.2rem;border-radius:100px;display:flex;align-items:center;gap:0.8rem;font-size:0.85rem;font-weight:700;box-shadow:0 8px 24px rgba(0,0,0,0.25);animation:slideIn 0.25s ease';
    document.body.appendChild(bar);
  }
  const keys = checked.map(cb => cb.dataset.key);
  bar.innerHTML = `<span style="background:rgba(255,255,255,0.15);padding:0.2rem 0.6rem;border-radius:20px">${checked.length} đã chọn</span>
    <button onclick="window.bulkMarkDone(${JSON.stringify(keys)})" style="background:#22c55e;color:#fff;border:none;padding:0.35rem 1rem;border-radius:20px;font-weight:800;font-size:0.8rem;cursor:pointer">✅ Đánh dấu Hoàn thành</button>
    <button onclick="document.querySelectorAll('.ev-multi-cb').forEach(cb=>cb.checked=false);window._syncBulkBar()" style="background:rgba(255,255,255,0.1);color:#fff;border:none;padding:0.35rem 0.7rem;border-radius:20px;font-size:0.8rem;cursor:pointer">✕</button>`;
};


window._jumpToJob = (jobId) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;

  // Chuyển tháng và năm về đúng tháng của dự án
  const d = new Date(job.date);
  state.currentMonth = d.getMonth() + 1;
  state.currentYear = d.getFullYear();

  // Navigate về dashboard 
  window.navigate('dashboard');

  // Mở modal
  window.openModal('job_detail', { id: jobId });
};

// Lắng nghe Cmd/Ctrl + K
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    if (state.modal.isOpen && state.modal.type === 'global_search') {
      window.closeModal();
    } else {
      window.openGlobalSearch();
    }
  }
});

// ============================================================
// CLIENT RATING & TAGS
// ============================================================
window.updateClientRating = (jobId, rating) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (job) {
    job.clientRating = parseInt(rating);
    saveState();
    updateUI();
  }
};

window.toggleJobComplete = (jobId) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (job) {
    job.status = (job.status === 'Đã hoàn thành' || job.status === 'Nhận Feedback') ? 'Sắp diễn ra' : 'Đã hoàn thành';
    saveState();
    updateUI();
    window.addHistory && window.addHistory(`${job.client}: ${job.status} `);
  }
};

window.toggleClientTag = (jobId, tag) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (job) {
    if (!job.clientTags) job.clientTags = [];
    const idx = job.clientTags.indexOf(tag);
    if (idx >= 0) job.clientTags.splice(idx, 1);
    else job.clientTags.push(tag);
    saveState();
    updateUI();
  }
};

// ============================================================
// VALIDATION (dùng chung cho addJob + saveJobDetail)
// ============================================================
function validateJobData(jobData, services = []) {
  const errors = [];
  if (!jobData.client || String(jobData.client).trim() === '')
    errors.push('Tên khách hàng (CD-CR) không được để trống');
  if (!jobData.date)
    errors.push('Ngày tổ chức không được để trống');
  if (!jobData.package || Number(jobData.package) <= 0)
    errors.push('Giá trị gói phải lớn hơn 0');
  if (services.length > 0) {
    const validServices = services.filter(s => s.staff && s.staff !== '' && s.cost > 0);
    if (validServices.length === 0)
      errors.push('Cần ít nhất 1 dòng dịch vụ có nhân sự và chi phí > 0');
  }
  return errors;
}

// ============================================================
// JOB ACTIONS
// ============================================================
window.addJob = (jobData) => {
  const errors = validateJobData(jobData, jobData.services || []);
  // Validate timeline: nếu check Lễ sáng/Tiệc mà không có giờ
  if (jobData.timeline) {
    if (jobData.timeline.le_sang && !jobData.timeline.le)
      errors.push('Lễ sáng: cần nhập giờ bắt đầu');
    if (jobData.timeline.tiec_trua && !jobData.timeline.tiec_trua_time)
      errors.push('Tiệc trưa: cần nhập giờ bắt đầu');
    if (jobData.timeline.tiec_toi && !jobData.timeline.tiec)
      errors.push('Tiệc tối: cần nhập giờ bắt đầu');
  }
  if (errors.length > 0) { showValidationError(errors); return; }

  jobData.id = jobData.id || generateId();
  state.jobs.push(jobData);
  window.addHistory(`Thêm dự án mới: ${jobData.client} (${jobData.id})`);
  saveState();
  updateUI();
};

window.updateJob = (jobId, updatedData, skipUpdateUI = false) => {
  const index = state.jobs.findIndex(j => j.id === jobId);
  if (index !== -1) {
    state.jobs[index] = { ...state.jobs[index], ...updatedData };
    window.addHistory(`Cập nhật dự án: ${state.jobs[index].client} `);
    saveState();
    if (!skipUpdateUI) {
      updateUI();
    }
  }
};

// saveJobDetail: đọc DOM form trong modal, validate, rồi updateJob
window.saveJobDetail = (jobId, closeModalAfter = true) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;

  // Đọc fields từ DOM
  const client = document.getElementById('edit-job-client')?.value || job.client;
  const status = document.getElementById('edit-job-status')?.value || job.status;
  const date = document.getElementById('edit-job-date')?.value || job.date;
  const eventType = document.getElementById('edit-job-type')?.value || job.eventType;
  const phone = document.getElementById('edit-job-phone')?.value || job.phone;
  const packageVal = parseInt(document.getElementById('edit-job-package')?.value) || job.package;
  const depositVal = parseInt(document.getElementById('edit-job-deposit')?.value) || job.deposit || 0;
  const notes = document.getElementById('edit-job-notes')?.value || job.notes;
  const linkCustomer = document.getElementById('edit-job-link-customer')?.value || job.linkCustomer;
  const linkNAS = document.getElementById('edit-job-link-nas')?.value || job.linkNAS;
  const linkDrive = document.getElementById('edit-job-link-drive')?.value || job.linkDrive;

  // ── Đọc eventDays từ multi-day tabs ──
  const modal = document.querySelector('.modal-container');
  const dayContents = modal?.querySelectorAll('.day-tab-content') || [];
  const eventDays = [];
  const parsedServices = []; // Thay thế #services-table-edit cũ

  dayContents.forEach((dayEl, idx) => {
    const dayLabel = dayEl.querySelector('.day-label-input')?.value || '';
    const dayDate = dayEl.querySelector('.day-date-input')?.value || '';
    const boyHouse = dayEl.querySelector('.day-boy-house-input')?.value || '';
    const girlHouse = dayEl.querySelector('.day-girl-house-input')?.value || '';
    const venue = dayEl.querySelector('.day-venue-input')?.value || '';

    // Timeline checkboxes & times
    const tlChecks = dayEl.querySelectorAll('.day-tl-check');
    const tlTimes = dayEl.querySelectorAll('.day-tl-time');
    const timeline = { le_sang: false, le: '05:00', tiec_trua: false, tiec_trua_time: '11:00', tiec_toi: false, tiec: '18:00' };
    tlChecks.forEach(chk => {
      const tlName = chk.getAttribute('data-tl');
      if (tlName) timeline[tlName] = chk.checked;
    });
    tlTimes.forEach(inp => {
      const tlTimeName = inp.getAttribute('data-tl-time');
      if (tlTimeName) timeline[tlTimeName] = inp.value;
    });

    // Categories
    const catChecks = dayEl.querySelectorAll('.day-cat-check');
    const categories = [];
    catChecks.forEach(chk => { if (chk.checked) categories.push(chk.value); });

    eventDays.push({ dayLabel, date: dayDate, boyHouse, girlHouse, venue, timeline, categories });

    // Đọc Services được gán cho Ngày này
    const svcRows = dayEl.querySelectorAll('.day-service-row');
    svcRows.forEach(row => {
      const roleInp = row.querySelector('.svc-role-input');
      const staffInp = row.querySelector('.svc-staff-input');
      const costInp = row.querySelector('.svc-cost-input');
      const editInp = row.querySelector('.svc-edit-input');

      const svc = roleInp ? roleInp.value.trim() : '';
      const stf = staffInp ? staffInp.value.trim() : '';
      const cst = parseInt(costInp?.value) || 0;
      const edt = parseInt(editInp?.value) || 0;
      let paid = false;
      const sIdx = row.getAttribute('data-sidx');
      if (sIdx != null && job.services && job.services[sIdx]) {
        paid = !!job.services[sIdx].paid;
      }

      if (svc && stf) {
        parsedServices.push({ service: svc, staff: stf, cost: cst, edit: edt, paid, date: dayDate });
      }
    });
  });

  // Fallback: nếu không đọc được tabs, dùng metadata cũ
  const finalEventDays = eventDays.length > 0 ? eventDays : (job.eventDays || []);
  const firstDay = finalEventDays[0] || {};
  const finalDate = firstDay.date || date;
  const finalVenue = firstDay.venue || job.venue || '';
  const finalTimeline = firstDay.timeline || job.timeline || {};

  let services = parsedServices.length > 0 ? parsedServices : (job.services || []);

  // ── Đọc Deliverables (Sản phẩm đầu ra) ──
  const delRows = modal?.querySelectorAll('.deliverable-row') || [];
  const deliverables = [];
  delRows.forEach((row, dIdx) => {
    const nameInp = row.querySelector('.del-name-input');
    const typeInp = row.querySelector('.del-type-input');
    const qtyInp = row.querySelector('.del-qty-input');

    // Giữ nguyên các thông tin hậu kỳ đã chia nếu có (cho file sau này)
    const existing = (job.deliverables && job.deliverables[dIdx]) ? job.deliverables[dIdx] : {};

    const name = nameInp ? nameInp.value.trim() : '';
    const type = typeInp ? typeInp.value.trim() : 'Khác';
    const quantity = parseInt(qtyInp?.value) || 1;

    if (name) {
      deliverables.push({ ...existing, name, type, quantity });
    }
  });

  // Validate
  const errors = validateJobData({ client, date: finalDate, package: packageVal }, services);
  if (errors.length > 0) { showValidationError(errors); return; }

  // Update
  window.updateJob(jobId, {
    client, status, date: finalDate, eventType, phone, package: packageVal, deposit: depositVal,
    venue: finalVenue, notes, linkCustomer, linkNAS, linkDrive,
    timeline: finalTimeline, services, eventDays: finalEventDays, deliverables
  }, !closeModalAfter);
  // Nếu !closeModalAfter = false (tức là close) -> skipUpdateUI = false (sẽ updateUI)
  // Nếu !closeModalAfter = true (tức là không close) -> skipUpdateUI = true (sẽ KHÔNG updateUI tránh giật form)

  // Xử lý Hậu UI update hoặc Toast
  if (closeModalAfter) {
    window.closeModal();
    window.showFloatingSaveStatus('saved');
  } else {
    // Auto-save: show floating indicator
    window.showFloatingSaveStatus('saved');
  }
};

// ============================================================
// JOB CHAT (Trao đổi nội bộ)
// ============================================================
window.addJobComment = (jobId) => {
  const inputEl = document.getElementById('job-chat-input');
  if (!inputEl) return;
  const text = inputEl.value.trim();
  if (!text) return;

  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;

  if (!job.comments) job.comments = [];

  const currentUser = window.state?.currentUser?.displayName || window.state?.currentUser?.username || 'Ẩn danh';
  const newComment = {
    user: currentUser,
    text: text,
    time: new Date().toISOString()
  };
  job.comments.push(newComment);

  saveState();
  inputEl.value = '';

  const msgContainer = document.getElementById('job-chat-messages');
  if (msgContainer) {
    const timeStr = new Date(newComment.time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const htmlObj = `
      <div style="display: flex; flex-direction: column; gap: 0.2rem; align-items: flex-end">
         <div style="font-size: 0.65rem; color: var(--text-dim); font-weight: 700; padding: 0 0.2rem">${newComment.user} <span style="font-weight: 400; opacity: 0.8">• ${timeStr}</span></div>
         <div style="background: var(--primary); color: #fff; padding: 0.5rem 0.75rem; border-radius: 12px; font-size: 0.85rem; max-width: 90%; line-height: 1.4; word-wrap: break-word; border-bottom-right-radius: 2px">${newComment.text}</div>
      </div>
    `;
    if (job.comments.length === 1) {
      msgContainer.innerHTML = '';
    }
    msgContainer.insertAdjacentHTML('beforeend', htmlObj);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }
};

// ============================================================
// MULTI-DAY TAB HELPERS (for renderJobDetailModal)
// ============================================================
window._switchDayTab = (idx) => {
  const tabs = document.querySelectorAll('#event-day-tabs .day-tab-btn:not(.add-day-btn)');
  const contents = document.querySelectorAll('#event-day-contents .day-tab-content');
  tabs.forEach(t => t.classList.remove('active'));
  contents.forEach(c => c.classList.remove('active'));
  if (tabs[idx]) tabs[idx].classList.add('active');
  if (contents[idx]) contents[idx].classList.add('active');
};

window._addDayTab = () => {
  const contentsWrap = document.getElementById('event-day-contents');
  const tabsWrap = document.getElementById('event-day-tabs');
  if (!contentsWrap || !tabsWrap) return;

  const existingCount = contentsWrap.querySelectorAll('.day-tab-content').length;
  const newIdx = existingCount;
  const newLabel = 'Ngày ' + (newIdx + 1);

  // Add tab button before the "+ Thêm ngày" button
  const addBtn = tabsWrap.querySelector('.add-day-btn');
  const newTabBtn = document.createElement('button');
  newTabBtn.type = 'button';
  newTabBtn.className = 'day-tab-btn';
  newTabBtn.setAttribute('data-day-idx', newIdx);
  newTabBtn.textContent = newLabel;
  newTabBtn.onclick = () => window._switchDayTab(newIdx);
  tabsWrap.insertBefore(newTabBtn, addBtn);

  // Add tab content
  const newContent = document.createElement('div');
  newContent.className = 'day-tab-content';
  newContent.setAttribute('data-day-idx', newIdx);
  newContent.innerHTML = `
          < div class="day-form-panel" >
      <div class="day-header">
        <h4>📋 ${newLabel}</h4>
        <button type="button" class="remove-day-btn" onclick="window._removeDayTab(${newIdx})">✕ Xóa ngày này</button>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem">
        <div>
          <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Tên nhãn ngày</label>
          <input type="text" class="form-control day-label-input" data-day="${newIdx}" value="${newLabel}" placeholder="VD: Lễ gia tiên, Tiệc cưới..."
            style="font-size: 0.92rem; padding: 0.45rem 0.7rem; background: #fff; border: 1.5px solid var(--border); color: var(--primary); font-weight: 700">
        </div>
        <div>
          <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Ngày tổ chức</label>
          <input type="date" class="form-control day-date-input" data-day="${newIdx}"
            style="font-size: 0.92rem; padding: 0.45rem 0.7rem; background: #fff; border: 1.5px solid var(--border); color: var(--text-main)">
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem">
        <div>
          <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">🏠 Nhà Trai</label>
          <input type="text" class="form-control day-boy-house-input" data-day="${newIdx}" placeholder="Địa chỉ nhà trai"
            style="font-size: 0.88rem; padding: 0.45rem 0.7rem; background: #fff; border: 1.5px solid var(--border); color: var(--text-main)">
        </div>
        <div>
          <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">🏠 Nhà Gái</label>
          <input type="text" class="form-control day-girl-house-input" data-day="${newIdx}" placeholder="Địa chỉ nhà gái"
            style="font-size: 0.88rem; padding: 0.45rem 0.7rem; background: #fff; border: 1.5px solid var(--border); color: var(--text-main)">
        </div>
        <div>
          <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">🏨 Venue / Tiệc</label>
          <input type="text" class="form-control day-venue-input" data-day="${newIdx}" placeholder="Nhà hàng / địa điểm"
            style="font-size: 0.88rem; padding: 0.45rem 0.7rem; background: #fff; border: 1.5px solid var(--border); color: var(--accent); font-weight: 700">
        </div>
      </div>
      <div>
        <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.4rem">⏰ Lịch trình</label>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.6rem">
          <div style="background: #fff; border: 1.5px solid var(--border); border-radius: 10px; padding: 0.6rem">
            <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.82rem; font-weight: 700; color: var(--text-dim); margin-bottom: 0.35rem; cursor: pointer">
              <input type="checkbox" class="day-tl-check" data-day="${newIdx}" data-tl="le_sang"> Lễ sáng
            </label>
            <input type="time" class="form-control day-tl-time" data-day="${newIdx}" data-tl-time="le" value="05:00"
              style="padding: 0.25rem 0.4rem; font-size: 0.85rem; font-weight: 700; background: #fff; border: 1px solid var(--border); color: #f97316">
          </div>
          <div style="background: #fff; border: 1.5px solid var(--border); border-radius: 10px; padding: 0.6rem">
            <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.82rem; font-weight: 700; color: var(--text-dim); margin-bottom: 0.35rem; cursor: pointer">
              <input type="checkbox" class="day-tl-check" data-day="${newIdx}" data-tl="tiec_trua"> Tiệc trưa
            </label>
            <input type="time" class="form-control day-tl-time" data-day="${newIdx}" data-tl-time="tiec_trua_time" value="11:00"
              style="padding: 0.25rem 0.4rem; font-size: 0.85rem; font-weight: 700; background: #fff; border: 1px solid var(--border); color: #22c55e">
          </div>
          <div style="background: #fff; border: 1.5px solid var(--border); border-radius: 10px; padding: 0.6rem">
            <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.82rem; font-weight: 700; color: var(--text-dim); margin-bottom: 0.35rem; cursor: pointer">
              <input type="checkbox" class="day-tl-check" data-day="${newIdx}" data-tl="tiec_toi"> Tiệc tối
            </label>
            <input type="time" class="form-control day-tl-time" data-day="${newIdx}" data-tl-time="tiec" value="18:00"
              style="padding: 0.25rem 0.4rem; font-size: 0.85rem; font-weight: 700; background: #fff; border: 1px solid var(--border); color: #3b82f6">
          </div>
        </div>
      </div>
      <div>
        <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.4rem">🎬 Hạng mục quay/chụp</label>
        <div style="display: flex; flex-wrap: wrap; gap: 0.35rem">
          ${(window.state?.settings?.eventCategories || []).map(cat => `<label style="display: flex; align-items: center; gap: 0.3rem; font-size: 0.78rem; font-weight: 700; padding: 0.3rem 0.65rem; border-radius: 8px; cursor: pointer; border: 1.5px solid var(--border); background: #fff; color: var(--text-dim); transition: all 0.2s">
            <input type="checkbox" class="day-cat-check" data-day="${newIdx}" value="${cat}" style="display:none"> ${cat}
          </label>`).join('')}
        </div>
      </div>
    </div >
          `;
  contentsWrap.appendChild(newContent);

  // Also add remove buttons to day 1 if it didn't have one
  const firstDayHeader = contentsWrap.querySelector('.day-tab-content[data-day-idx="0"] .day-header');
  if (firstDayHeader && !firstDayHeader.querySelector('.remove-day-btn')) {
    const rmBtn = document.createElement('button');
    rmBtn.type = 'button';
    rmBtn.className = 'remove-day-btn';
    rmBtn.textContent = '✕ Xóa ngày này';
    rmBtn.onclick = () => window._removeDayTab(0);
    firstDayHeader.appendChild(rmBtn);
  }

  // Switch to new tab
  window._switchDayTab(newIdx);
};

window._removeDayTab = (idx) => {
  const contentsWrap = document.getElementById('event-day-contents');
  const tabsWrap = document.getElementById('event-day-tabs');
  if (!contentsWrap || !tabsWrap) return;

  const contents = contentsWrap.querySelectorAll('.day-tab-content');
  const tabs = tabsWrap.querySelectorAll('.day-tab-btn:not(.add-day-btn)');
  if (contents.length <= 1) { alert("Không thể xóa ngày cuối cùng"); return; }
  if (!confirm('Xóa ngày này khỏi lịch trình?')) return;

  if (contents[idx]) contents[idx].remove();
  if (tabs[idx]) tabs[idx].remove();

  // Re-index remaining tabs and contents
  const remainingContents = contentsWrap.querySelectorAll('.day-tab-content');
  const remainingTabs = tabsWrap.querySelectorAll('.day-tab-btn:not(.add-day-btn)');
  remainingContents.forEach((c, i) => c.setAttribute('data-day-idx', i));
  remainingTabs.forEach((t, i) => {
    t.setAttribute('data-day-idx', i);
    t.onclick = () => window._switchDayTab(i);
  });

  // If only 1 day left, remove its delete button
  if (remainingContents.length === 1) {
    const rmBtn = remainingContents[0].querySelector('.remove-day-btn');
    if (rmBtn) rmBtn.remove();
  }

  // Activate first tab
  window._switchDayTab(0);
};

window.toggleTrash = (jobId) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (job) {
    job.isTrash = !job.isTrash;
    window.addHistory(`${job.isTrash ? 'Xóa' : 'Khôi phục'} dự án: ${job.client} `);
    saveState();
    updateUI();
  }
};

// Xóa job (chuyển vào thùng rác) — Custom Confirm popup
window.deleteJob = (jobId) => {
  window.haruConfirm('Bạn có chắc chắn muốn xóa dự án này vào thùng rác không? Bạn có thể khôi phục lại trong cài đặt.', () => {
    const job = state.jobs.find(j => j.id === jobId);
    if (!job) { console.error('[Haru] Job not found:', jobId); return; }
    // 1. Mark as trash + save immediately
    job.isTrash = true;
    window.addHistory(`Xóa dự án: ${job.client}`);
    saveState();
    console.log(`[Haru] Đã xóa dự án: ${job.client} (id: ${jobId})`);

    // 2. Force-remove all modals/overlays
    document.querySelectorAll('.modal-overlay').forEach(el => el.remove());

    // 3. Reset modal state
    state.modal.isOpen = false;
    state.modal.type = null;
    state.modal.data = null;
    window._quickPreviewCloseFn = null;

    // 4. Refresh UI
    updateUI();
  });
};

// ============================================================
// QUICK PAYMENT TOGGLE — toggle service.paid instantly
// ============================================================
window.toggleServicePaid = (jobId, serviceIndex, newPaidState, checkboxEl) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job || !job.services[serviceIndex]) {
    // Rollback checkbox to previous state
    if (checkboxEl) checkboxEl.checked = !newPaidState;
    return;
  }

  const oldPaid = job.services[serviceIndex].paid;
  job.services[serviceIndex].paid = newPaidState;

  try {
    saveState();
  } catch (err) {
    // Rollback on save failure
    job.services[serviceIndex].paid = oldPaid;
    if (checkboxEl) checkboxEl.checked = oldPaid;
    showPaymentToast('❌ Lỗi lưu dữ liệu – đã hoàn tác', 'var(--danger)');
    return;
  }

  // Micro-update: staff cards (Đã trả / Còn nợ) without full re-render
  _updateStaffPaymentMetrics(job.services[serviceIndex].staff);

  // Micro-update: row highlight in modal/table
  if (checkboxEl) {
    const row = checkboxEl.closest('tr');
    if (row) {
      row.style.background = newPaidState
        ? 'rgba(21,128,61,0.06)'
        : '';
    }
  }

  showPaymentToast(newPaidState ? '✓ Đã đánh dấu thanh toán' : '● Đã bỏ đánh dấu thanh toán',
    newPaidState ? 'var(--success)' : 'var(--text-dim)');

  window.addHistory(`${newPaidState ? 'Đánh dấu' : 'Bỏ'} thanh toán: ${job.client} — ${job.services[serviceIndex].staff} `);
};

// Micro-update staff card payment metrics in DOM (no full re-render)
function _updateStaffPaymentMetrics(staffName) {
  if (!staffName) return;
  const memberJobs = state.jobs.filter(j => !j.isTrash && j.services.some(s => (Array.isArray(s.staff) ? s.staff.join(', ') : (s.staff || '')).includes(staffName)));
  const total = memberJobs.reduce((s, j) => s + j.services.filter(sv => (Array.isArray(sv.staff) ? sv.staff.join(', ') : (sv.staff || '')).includes(staffName)).reduce((ss, sv) => ss + (sv.cost || 0), 0), 0);
  const paid = memberJobs.reduce((s, j) => s + j.services.filter(sv => (Array.isArray(sv.staff) ? sv.staff.join(', ') : (sv.staff || '')).includes(staffName) && sv.paid).reduce((ss, sv) => ss + (sv.cost || 0), 0), 0);
  const unpaid = total - paid;
  const fmt = n => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);

  // Staff card lives inside #staff-card-<name>
  const card = document.getElementById(`staff-card-${staffName.replace(/'/g, "\\'")}`);
  if (!card) return; // not visible right now, skip
  const vals = card.querySelectorAll('.payment-metric');
  // vals[0]=Tổng thu, vals[1]=Đã trả, vals[2]=Còn nợ (set during renderStaff)
  if (vals[0]) vals[0].textContent = fmt(total);
  if (vals[1]) vals[1].textContent = fmt(paid);
  if (vals[2]) vals[2].textContent = fmt(unpaid);
}

// Shared payment toast (short-lived, minimal)
function showPaymentToast(msg, color) {
  const existing = document.getElementById('haru-pay-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'haru-pay-toast';
  toast.style.cssText = `
        position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 9999;
        background: ${color}; color: #fff;
        padding: 0.6rem 1.25rem; border-radius: 100px;
        font-size: 0.9rem; font-weight: 700;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        pointer-events: none;
        `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}
window.showPaymentToast = showPaymentToast;



// ============================================================
// FINANCE METADATA & SETTINGS
// ============================================================
window.updateReportMeta = (monthKey, ads, office) => {
  if (!state.financeMetadata[monthKey]) state.financeMetadata[monthKey] = {};
  state.financeMetadata[monthKey].ads = parseInt(ads) || 0;
  state.financeMetadata[monthKey].office = parseInt(office) || 0;
  window.addHistory(`Cập nhật chi phí tháng: ${monthKey} `);
  saveState();
  updateUI();
};

// PA3: Lưu chi phí tháng
window.saveMonthlyReport = (monthKey) => {
  const adsEl = document.getElementById(`ads - input - ${monthKey} `);
  const offEl = document.getElementById(`off - input - ${monthKey} `);
  if (!adsEl || !offEl) return;
  window.updateReportMeta(monthKey, adsEl.value, offEl.value);
  // Toast
  const toast = document.createElement('div');
  toast.style.cssText = 'position:fixed;bottom:2rem;right:2rem;background:#22c55e;color:#fff;padding:0.75rem 1.5rem;border-radius:12px;font-weight:700;z-index:9999;font-size:0.9rem';
  toast.textContent = '✓ Đã lưu chi phí tháng';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};

// PA3: Xem báo cáo
window.viewPA3Report = (monthKey) => {
  window.openModal('pa3_report', monthKey);
};

// Cập nhật tax rate
window.updateTaxRate = (rate) => {
  const r = parseFloat(rate);
  if (isNaN(r) || r < 0 || r > 1) { alert('Thuế suất phải từ 0 đến 1 (VD: 0.1 = 10%)'); return; }
  if (!state.settings) state.settings = {};
  state.settings.taxRate = r;
  window.addHistory(`Cập nhật thuế suất: ${(r * 100).toFixed(1)}% `);
  saveState();
  updateUI();
};

// ── Deadline Edit Status ─────────────────────────────────────
// Persist service.editStatus when user changes the select in Deadline view
window.updateEditStatus = (jobId, dIdx, newStatus, skipUpdateUI = false) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;
  const parsedIdx = parseInt(dIdx, 10);
  const deliverable = job.deliverables?.[parsedIdx];
  if (!deliverable) return;

  const oldStatus = deliverable.editStatus;
  deliverable.editStatus = newStatus;

  // Also update job.status if all services "Hoàn thành"
  const allDone = (job.deliverables || []).every(d => (d.editStatus || '') === 'Hoàn thành');
  if (allDone && newStatus === 'Hoàn thành' && job.deliverables && job.deliverables.length > 0) {
    job.status = 'Đã hoàn thành';
  }

  try {
    saveState();
  } catch (err) {
    deliverable.editStatus = oldStatus;
    showPaymentToast('❌ Lỗi lưu – đã hoàn tác', 'var(--danger)');
    return;
  }

  window.addHistory(`Cập nhật trạng thái edit: ${job.client} – ${deliverable.name} → ${newStatus}`);
  showPaymentToast(`✓ Cập nhật: ${newStatus}`, newStatus === 'Hoàn thành' ? 'var(--success)' : 'var(--primary)');

  // Delay updateUI so SortableJS drag animation finishes before DOM re-render
  if (!skipUpdateUI) {
    setTimeout(() => updateUI(), 350);
  }
};

// ── Video Edit Tab Functions ───────────────────────────────
window.updateVideoEditor = (jobId, dIdx, editorName) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;
  const deliverable = job.deliverables?.[parseInt(dIdx, 10)];
  if (!deliverable) return;
  deliverable.editor = editorName;
  saveState();
  window.addHistory(`Gán editor: ${editorName} cho ${job.client} – ${deliverable.name}`);
  showPaymentToast(`✓ Editor: ${editorName || 'Đã xóa'}`, 'var(--primary)');
};

window.updateVideoEditStatus = (jobId, dIdx, newStatus, skipUpdateUI = false) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;
  const deliverable = job.deliverables?.[parseInt(dIdx, 10)];
  if (!deliverable) return;
  deliverable.editStatus = newStatus;

  if (newStatus === 'Hoàn thành') {
    const allDone = (job.deliverables || []).every(d => (d.editStatus || '') === 'Hoàn thành');
    if (allDone && job.deliverables && job.deliverables.length > 0) job.status = 'Đã hoàn thành';
  }

  saveState();
  window.addHistory(`Edit video: ${job.client} – ${deliverable.name} → ${newStatus}`);
  showPaymentToast(`✓ ${newStatus}`, newStatus === 'Hoàn thành' ? 'var(--success)' : 'var(--primary)');

  if (!skipUpdateUI) {
    updateUI();
  }
};

window.deleteVideoClip = (jobId, dIdx) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;
  const parsedIdx = parseInt(dIdx, 10);
  const deliverable = job.deliverables?.[parsedIdx];
  if (!deliverable) return;
  job.deliverables.splice(parsedIdx, 1);
  saveState();
  window.addHistory(`Xoá thành phẩm: ${job.client} – ${deliverable.name}`);
  showPaymentToast('🗑️ Đã xoá thành phẩm', 'var(--danger)');
  updateUI();
};

window.updateVideoEditLink = (jobId, dIdx, link) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;
  const deliverable = job.deliverables?.[parseInt(dIdx, 10)];
  if (!deliverable) return;
  if (deliverable.editDriveLink === link) return;
  deliverable.editDriveLink = link;
  saveState();
  if (link) {
    window.addHistory(`Thêm link Drive: ${job.client} – ${deliverable.name}`);
    showPaymentToast('✓ Đã lưu link Drive', 'var(--success)');
  }
};

window.updateEditorChecklist = (jobId, dIdx, key, checked) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;
  const deliverable = job.deliverables?.[parseInt(dIdx, 10)];
  if (!deliverable) return;
  if (!deliverable.editChecklist) deliverable.editChecklist = { footage: false, rough: false, color: false, audio: false, export: false };
  deliverable.editChecklist[key] = checked;
  saveState();
};

window.updateEditorNote = (jobId, dIdx, note) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;
  const deliverable = job.deliverables?.[parseInt(dIdx, 10)];
  if (!deliverable) return;
  deliverable.editorNote = note;
  saveState();
};

window.updateJobLink = (jobId, field, value) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;
  job[field] = value;
  saveState();
  if (value) showPaymentToast('✓ Đã lưu link', 'var(--success)');
};

window.markJobFullyPaid = (jobId) => {
  if (!confirm('Xác nhận khách đã thanh toán toàn bộ số tiền còn lại (Cọc = Giá gói)?')) return;
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;
  job.deposit = job.package;
  saveState();
  window.addHistory(`Xác nhận khách đã tất toán (${job.package.toLocaleString()}đ): ${job.client}`);

  // Update the UI directly if the modal is open, to trigger Auto-save organically
  const depositInput = document.getElementById('edit-job-deposit');
  if (depositInput) {
    depositInput.value = job.package;
    window.saveJobDetail(jobId, false);
    updateUI(); // re-render layout to reflect 0 remaining
  } else {
    updateUI();
  }
};

// ============================================================
// JOB CHECKLIST TOGGLE (tích/bỏ tích các bước quan trọng)
// ============================================================
window.toggleJobChecklist = (jobId, key, checked) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;
  if (!job.checklist) job.checklist = {};
  job.checklist[key] = checked;
  saveState();
  // Nếu Firebase sync bật, push ngay
  if (window._firebaseSyncEnabled !== false) {
    import('./firebase.js').then(fb => {
      if (fb.syncToFirebase) fb.syncToFirebase(state);
    }).catch(() => { });
  }
};




// ============================================================
// STAFF CRUD
// ============================================================
window.addStaff = (data) => {
  if (!data.name || data.name.trim() === '') { alert('Vui lòng nhập tên nhân sự'); return; }
  const duplicate = state.staff.find(s => s.name.trim().toLowerCase() === data.name.trim().toLowerCase());
  if (duplicate) { alert(`Nhân sự "${data.name}" đã tồn tại`); return; }
  state.staff.push({
    name: data.name.trim(),
    role: data.role || 'Quay phim',
    phone: data.phone || '',
    bank: data.bank || { no: '', name: '', bank: '' }
  });
  window.addHistory(`Thêm nhân sự: ${data.name} `);
  saveState();
  updateUI();
};

window.removeStaff = (name) => {
  const role = state.currentUser?.role || '';
  if (role !== 'admin') { alert('Chỉ Admin mới có quyền xóa nhân sự.'); return; }
  if (!confirm(`Xóa nhân sự "${name}" khỏi hệ thống ?\n\nLưu ý: Dữ liệu công việc liên quan vẫn được giữ.`)) return;
  state.staff = state.staff.filter(s => s.name !== name);
  window.addHistory(`Xóa nhân sự: ${name} `);
  saveState();
  updateUI();
};

window.showEditStaff = (name) => {
  const form = document.getElementById(`edit-form-${name}`);
  if (form) form.style.display = form.style.display === 'none' ? 'block' : 'none';
};

window.saveStaffEdit = (originalName) => {
  const member = state.staff.find(s => s.name === originalName);
  if (!member) return;
  const newName = document.getElementById(`edit-name-${originalName}`)?.value?.trim() || member.name;
  const newRole = document.getElementById(`edit-role-${originalName}`)?.value || member.role;
  const newPhone = document.getElementById(`edit-phone-${originalName}`)?.value || member.phone;
  const newBankNo = document.getElementById(`edit-bankno-${originalName}`)?.value || '';
  const newBankBank = document.getElementById(`edit-bankname-${originalName}`)?.value || '';
  if (!newName) { alert('Tên nhân sự không được để trống'); return; }
  member.name = newName;
  member.role = newRole;
  member.phone = newPhone;
  member.bank = { no: newBankNo, name: member.bank?.name || newName, bank: newBankBank };
  window.addHistory(`Cập nhật nhân sự: ${newName} `);
  saveState();
  updateUI();
};

window.setStaffViewMode = (mode) => { state.staffViewMode = mode; updateUI(); };

// ============================================================
// FILTERS
// ============================================================
window.setDeadlineFilter = (filter) => { state.deadlineFilter = filter; updateUI(); };
window.setStaffFilter = (staff) => { state.staffFilter = staff; updateUI(); };
window.setStatusFilter = (status) => { state.statusFilter = status; updateUI(); };
window.setSearchQuery = (query) => { state.searchQuery = query; updateUI(); };
window.setEditVideoFilter = (filter) => { state.editVideoFilter = filter; updateUI(); };
window.setEditPhotoFilter = (filter) => { state.editPhotoFilter = filter; updateUI(); };
window.setEditPhotoStatusFilter = (filter) => { state.editPhotoStatusFilter = filter; updateUI(); };
window.toggleEditPhotoView = (view) => { state.editPhotoView = view; updateUI(); };
window.setEditVideoStatusFilter = (filter) => { state.editVideoStatusFilter = filter; updateUI(); };
window.toggleEditVideoView = (view) => { state.editVideoView = view; updateUI(); };
window.setKanbanEditorFilter = (editor) => { state.kanbanEditorFilter = editor; updateUI(); };

// ============================================================
// MANUAL TRANSACTIONS
// ============================================================
window.addTransaction = (data) => {
  if (!state.manualTransactions) state.manualTransactions = [];
  if (!data.description || data.description.trim() === '') { alert('Vui lòng nhập nội dung giao dịch'); return; }
  if (!data.amount || parseInt(data.amount) <= 0) { alert('Số tiền phải > 0'); return; }
  state.manualTransactions.push({
    id: Date.now(),
    date: data.date || new Date().toISOString().split('T')[0],
    description: data.description || '',
    amount: parseInt(data.amount) || 0,
    type: data.type || 'chi',
    category: data.category || 'Khác'
  });
  window.addHistory(`Thêm giao dịch: ${data.description} `);
  saveState();
  updateUI();
};

window.deleteTransaction = (id) => {
  if (!confirm('Bạn có chắc muốn xóa giao dịch này?')) return;
  state.manualTransactions = state.manualTransactions.filter(t => t.id !== id);
  window.addHistory('Xóa giao dịch thủ công');
  saveState();
  updateUI();
};

// ============================================================
// DATA EXPORT / IMPORT / RESET
// ============================================================
window.exportCSV = () => {
  const rows = [['Ngày', 'Dự án', 'Khách hàng', 'Nội dung', 'Loại', 'Số tiền', 'Trạng thái']];
  state.jobs.filter(j => !j.isTrash).forEach(job => {
    job.services.forEach(s => {
      rows.push([job.date, job.id, job.client, `${s.service} - ${Array.isArray(s.staff) ? s.staff.join(', ') : s.staff} `, 'Chi thợ', s.cost, s.paid ? 'Đã trả' : 'Chưa trả']);
    });
    rows.push([job.date, job.id, job.client, 'Gói dịch vụ', 'Thu', job.package, 'Đã ký']);
  });
  if (state.manualTransactions) {
    state.manualTransactions.forEach(t => rows.push([t.date, '-', '-', t.description, t.type, t.amount, '-']));
  }
  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url;
  a.download = `haru_finance_T${state.currentMonth}_${state.currentYear}.csv`;
  a.click(); URL.revokeObjectURL(url);
  window.addHistory('Xuất CSV tài chính');
};

window.exportJSON = () => {
  const data = { jobs: state.jobs, staff: state.staff, financeMetadata: state.financeMetadata, manualTransactions: state.manualTransactions || [], settings: state.settings };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url;
  a.download = `haru_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click(); URL.revokeObjectURL(url);
  window.addHistory('Xuất backup JSON');
};

window.importJSON = () => {
  const input = document.createElement('input');
  input.type = 'file'; input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        if (!Array.isArray(data.jobs)) throw new Error('Định dạng không hợp lệ (thiếu jobs)');
        if (data.jobs) state.jobs = data.jobs;
        if (data.staff) state.staff = data.staff;
        if (data.financeMetadata) state.financeMetadata = data.financeMetadata;
        if (data.manualTransactions) state.manualTransactions = data.manualTransactions;
        if (data.settings) state.settings = { ...state.settings, ...data.settings };
        window.addHistory(`Nhập backup từ ${file.name} (${data.jobs.length} dự án)`);
        saveState();
        updateUI();
        alert(`✓ Nhập thành công!\n${data.jobs.length} dự án, ${(data.staff || []).length} nhân sự`);
      } catch (err) { alert('❌ Lỗi đọc file JSON:\n' + err.message); }
    };
    reader.readAsText(file);
  };
  input.click();
};

window.resetAllData = () => {
  const confirm1 = confirm('⚠️ CẢNH BÁO: Xóa toàn bộ dữ liệu?\n\nHành động này KHÔNG THỂ hoàn tác!\nHãy Export JSON trước khi tiếp tục.');
  if (!confirm1) return;
  const confirm2 = confirm('Xác nhận lần 2: Bạn chắc chắn muốn xóa TẤT CẢ dữ liệu?');
  if (!confirm2) return;
  state.jobs = [];
  state.staff = [];
  state.manualTransactions = [];
  state.financeMetadata = {};
  state.history = [{ time: new Date().toISOString(), action: 'Reset toàn bộ dữ liệu', user: 'Admin' }];
  localStorage.removeItem(STORAGE_KEY);
  updateUI();
};

// ============================================================
// SERVICE ROWS (Job Detail modal)
// ============================================================
window.addServiceRowInModal = () => {
  const table = document.getElementById('services-table-edit');
  if (!table) return;
  const tbody = table.querySelector('tbody');
  if (!tbody) return;
  const staffOptions = state.staff.map(s => `<option value="${s.name}">${s.name}</option>`).join('');
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td><select class="form-control" style="font-size:0.8rem;padding:0.3rem">
      ${(window.state?.settings?.serviceRoles || []).map(opt => `<option>${opt}</option>`).join('')}
    </select></td>
    <td><select class="form-control" style="font-size:0.8rem;padding:0.3rem">
      <option value="">-- Chọn thợ --</option>${staffOptions}
    </select></td>
    <td><input type="number" class="form-control" value="0" style="font-size:0.8rem;padding:0.3rem"></td>
    <td><input type="number" class="form-control" value="0" style="font-size:0.8rem;padding:0.3rem"></td>
    <td><input type="checkbox" class="service-paid-check"></td>
  `;
  tbody.appendChild(newRow);
};

window.removeServiceRowInModal = () => {
  const tbody = document.querySelector('#services-table-edit tbody');
  if (!tbody || tbody.rows.length <= 1) { alert('Phải có ít nhất 1 dòng dịch vụ'); return; }
  tbody.removeChild(tbody.lastElementChild);
};

// ============================================================
// SYNC (giữ, không thay đổi logic)
// ============================================================
window.runSync = async () => {
  try {
    const sheetUrlInput = document.getElementById('sync-sheet-url');
    const nasRootInput = document.getElementById('sync-nas-root');
    const driveApiInput = document.getElementById('sync-drive-api');

    const sheetUrl = sheetUrlInput ? sheetUrlInput.value.trim() : '';
    const nasRoot = nasRootInput && nasRootInput.value.trim() ? nasRootInput.value.trim() : '/Volumes/HARUwedding';
    const driveApiUrl = driveApiInput ? driveApiInput.value.trim() : '';

    const { runFullSync, getSyncLogs } = await import('./sync.js');

    document.body.style.cursor = 'wait';
    if (sheetUrlInput) sheetUrlInput.disabled = true;
    if (nasRootInput) nasRootInput.disabled = true;
    if (driveApiInput) driveApiInput.disabled = true;

    let driveFolders = [];
    if (driveApiUrl) {
      try {
        const resp = await fetch(driveApiUrl);
        if (!resp.ok) throw new Error(`Drive API HTTP ${resp.status}`);
        const payload = await resp.json();
        if (Array.isArray(payload)) driveFolders = payload;
        else if (Array.isArray(payload.folders)) driveFolders = payload.folders;
        else if (Array.isArray(payload.data)) driveFolders = payload.data;
      } catch (e) {
        console.warn('Drive folders API error:', e.message);
      }
    }

    const result = await runFullSync(state.jobs, nasRoot, driveFolders, sheetUrl);

    // Lưu sheet URL vào settings để auto-sync lần sau
    if (sheetUrl) {
      if (!state.settings) state.settings = {};
      state.settings.sheetSyncUrl = sheetUrl;
    }

    document.body.style.cursor = 'default';
    if (sheetUrlInput) sheetUrlInput.disabled = false;
    if (nasRootInput) nasRootInput.disabled = false;
    if (driveApiInput) driveApiInput.disabled = false;

    state.syncLogs = getSyncLogs();
    state.lastSyncResult = result;
    const addedCount = result.nasAdded + result.driveAdded + (result.sheetAdded || 0);
    window.addHistory(`Sync hoàn tất: +${addedCount} mục mới`);
    saveState();
    updateUI();
  } catch (err) {
    document.body.style.cursor = 'default';
    const sheetUrlInput = document.getElementById('sync-sheet-url');
    const nasRootInput = document.getElementById('sync-nas-root');
    const driveApiInput = document.getElementById('sync-drive-api');
    if (sheetUrlInput) sheetUrlInput.disabled = false;
    if (nasRootInput) nasRootInput.disabled = false;
    if (driveApiInput) driveApiInput.disabled = false;

    console.error('Sync error:', err);
    alert('Lỗi sync: ' + err.message);
  }
};

window.sendZaloReminder = (jobId, svcIdx) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;
  const svc = job.services[svcIdx];
  if (!svc || !svc.staff) return;

  const staff = state.staff.find(s => s.name === svc.staff);
  if (!staff || !staff.phone) {
    alert(`Vui lòng cập nhật Số điện thoại (Zalo) cho nhân sự ${svc.staff} trong tab Nhân Sự trước khi gửi!`);
    return;
  }

  const dateStr = new Date(job.date).toLocaleDateString('vi-VN');
  let timeStr = '';
  if (job.timeline) {
    const times = [];
    if (job.timeline.le_sang && job.timeline.le) times.push(`Lễ: ${job.timeline.le}`);
    if (job.timeline.tiec_trua && job.timeline.tiec_trua_time) times.push(`Tiệc trưa: ${job.timeline.tiec_trua_time}`);
    if (job.timeline.tiec_toi && job.timeline.tiec) times.push(`Tiệc tối: ${job.timeline.tiec}`);
    if (times.length > 0) timeStr = `\n⏰ Thời gian:\n- ${times.join('\n- ')}`;
  }

  const msg = `LỊCH ĐI SHOW HARU STUDIO 📸\n\n📌 Khách hàng: ${job.client}\n📅 Ngày: ${dateStr}${timeStr}\n📍 Địa điểm: ${job.venue || 'Chưa cập nhật'}\n\n🎬 Nhiệm vụ của bạn: ${svc.service}\n💰 Thù lao (tạm tính): ${new Intl.NumberFormat('vi-VN').format(svc.cost)}đ\n\nVui lòng confirm lại tin nhắn này nhé!`;

  // Tùy chọn 1: Copy to clipboard và mở Zalo Web/App (Miễn phí 100%, không cần setup OA)
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(msg).then(() => {
      // Mở Zalo
      window.open(`https://zalo.me/${staff.phone}`, '_blank');
      // Toast báo thành công
      window.addHistory(`Đã tạo lịch Zalo cho ${staff.name} (Job ${job.client})`);
      alert('✅ Đã COPY tin nhắn nhắc lịch!\n\nTrình duyệt sẽ mở cuộc trò chuyện Zalo của ' + staff.name + ', bạn chỉ cần bấm Dán (Ctrl+V / Cmd+V) để gửi đi.');
    }).catch(err => {
      alert('Không thể copy tự động, bạn hãy làm bằng tay:\n\n' + msg);
    });
  } else {
    // Fallback if clipboard API is blocked
    alert('Vui lòng copy đoạn sau và gửi qua Zalo:\n\n' + msg);
    window.open(`https://zalo.me/${staff.phone}`, '_blank');
  }
};

window.saveStudioInfo = () => {
  const name = document.getElementById('setting-studio-name')?.value?.trim();
  const phone = document.getElementById('setting-studio-phone')?.value?.trim();
  const address = document.getElementById('setting-studio-address')?.value?.trim();
  state.settings.studioName = name || 'Haru Wedding Film';
  state.settings.studioPhone = phone || '';
  state.settings.studioAddress = address || '';
  window.addHistory('Cập nhật thông tin Studio');
  saveState();
  window.showFloatingSaveStatus('saved');
};

// ============================================================
// ADMIN DEBUG TOOLS
// ============================================================
window._debugLogs = [];
const _origConsoleLog = console.log;
const _origConsoleWarn = console.warn;
const _origConsoleError = console.error;
console.log = (...args) => { window._debugLogs.push({ level: 'log', msg: args.map(String).join(' '), time: new Date().toLocaleTimeString() }); if (window._debugLogs.length > 100) window._debugLogs.shift(); _origConsoleLog(...args); };
console.warn = (...args) => { window._debugLogs.push({ level: 'warn', msg: args.map(String).join(' '), time: new Date().toLocaleTimeString() }); if (window._debugLogs.length > 100) window._debugLogs.shift(); _origConsoleWarn(...args); };
console.error = (...args) => { window._debugLogs.push({ level: 'error', msg: args.map(String).join(' '), time: new Date().toLocaleTimeString() }); if (window._debugLogs.length > 100) window._debugLogs.shift(); _origConsoleError(...args); };

window.runHealthCheck = () => {
  const issues = [];
  const jobs = state.jobs.filter(j => !j.isTrash);
  // Check deliverables
  const noDeliverables = jobs.filter(j => !j.deliverables || j.deliverables.length === 0);
  if (noDeliverables.length) issues.push({ type: '⚠️', msg: `${noDeliverables.length} job thiếu thành phẩm đầu ra`, items: noDeliverables.map(j => j.client) });
  // Check staff empty
  const noStaff = jobs.filter(j => !j.services || j.services.length === 0);
  if (noStaff.length) issues.push({ type: '👤', msg: `${noStaff.length} job chưa có nhân sự`, items: noStaff.map(j => j.client) });
  // Check missing date
  const noDate = jobs.filter(j => !j.date || isNaN(new Date(j.date).getTime()));
  if (noDate.length) issues.push({ type: '📅', msg: `${noDate.length} job thiếu ngày`, items: noDate.map(j => j.client || j.id) });
  // Check old service roles
  const oldRoles = ['Quay phim', 'Chụp ảnh', 'Cinema', 'Trợ lý'];
  const badRoles = jobs.filter(j => (j.services || []).some(s => oldRoles.includes(s.service)));
  if (badRoles.length) issues.push({ type: '🔄', msg: `${badRoles.length} job có vai trò cũ (Quay phim/Chụp ảnh)`, items: badRoles.map(j => j.client) });
  // Check no package
  const noPackage = jobs.filter(j => !j.package || j.package === 0);
  if (noPackage.length) issues.push({ type: '💰', msg: `${noPackage.length} job chưa có giá gói`, items: noPackage.map(j => j.client) });

  // Render
  const el = document.getElementById('debug-health-result');
  if (el) {
    if (issues.length === 0) {
      el.innerHTML = '<div style="color:#22c55e;font-weight:800;padding:0.5rem">✅ Hệ thống khỏe mạnh! Không phát hiện vấn đề.</div>';
    } else {
      el.innerHTML = issues.map(i => `
        <div style="margin-bottom:0.5rem;padding:0.5rem;background:rgba(255,200,0,0.1);border-radius:6px;border-left:3px solid #f59e0b">
          <div style="font-weight:800;font-size:0.85rem">${i.type} ${i.msg}</div>
          <div style="font-size:0.72rem;color:var(--text-dim);margin-top:0.2rem">${i.items.slice(0, 5).join(', ')}${i.items.length > 5 ? '...' : ''}</div>
        </div>
      `).join('');
    }
  }
};

window.showDebugLogs = () => {
  const el = document.getElementById('debug-console-result');
  if (el) {
    const logs = (window._debugLogs || []).slice(-30).reverse();
    if (logs.length === 0) {
      el.innerHTML = '<div style="color:var(--text-dim);padding:0.5rem;font-size:0.8rem">Chưa có log nào.</div>';
    } else {
      const colors = { log: '#888', warn: '#f59e0b', error: '#ef4444' };
      el.innerHTML = logs.map(l => `<div style="font-family:monospace;font-size:0.7rem;padding:0.2rem 0.4rem;border-bottom:1px solid rgba(0,0,0,0.05);color:${colors[l.level] || '#888'}"><span style="opacity:0.5">[${l.time}]</span> ${l.msg}</div>`).join('');
    }
  }
};

window.forceMigration = () => {
  if (!confirm('Chạy lại migration thành phẩm cho TẤT CẢ job chưa có deliverables?')) return;
  let count = 0;
  state.jobs.forEach(job => {
    if (!job.deliverables || job.deliverables.length === 0) {
      const deliverables = [];
      const quayCount = (job.services || []).filter(s => (s.service || '').toLowerCase().includes('quay')).length;
      if (quayCount === 1) deliverables.push({ name: 'Clip Phóng sự', type: 'Video', quantity: 1, editStatus: 'Chưa bắt đầu' });
      else if (quayCount >= 2) {
        deliverables.push({ name: 'Clip Phóng sự', type: 'Video', quantity: 1, editStatus: 'Chưa bắt đầu' });
        deliverables.push({ name: 'Clip Truyền thống', type: 'Video', quantity: 1, editStatus: 'Chưa bắt đầu' });
      }
      const chupCount = (job.services || []).filter(s => (s.service || '').toLowerCase().includes('chụp')).length;
      for (let ci = 0; ci < chupCount; ci++) {
        deliverables.push({ name: chupCount === 1 ? 'Bộ Hình' : `Bộ Hình ${ci + 1}`, type: 'Photo', quantity: 1, editStatus: 'Chưa bắt đầu' });
      }
      if (deliverables.length > 0) {
        const firstQuay = (job.services || []).find(s => (s.service || '').toLowerCase().includes('quay'));
        if (firstQuay) deliverables.filter(d => d.type === 'Video').forEach(d => { d.editor = firstQuay.editStaff || ''; d.editStatus = firstQuay.editStatus || 'Chưa bắt đầu'; d.editDriveLink = firstQuay.editDriveLink || ''; });
        const firstChup = (job.services || []).find(s => (s.service || '').toLowerCase().includes('chụp'));
        if (firstChup) deliverables.filter(d => d.type === 'Photo').forEach(d => { d.editor = firstChup.editStaff || ''; d.editStatus = firstChup.editStatus || 'Chưa bắt đầu'; d.editDriveLink = firstChup.editDriveLink || ''; });
        job.deliverables = deliverables;
        count++;
      }
    }
  });
  // Rename old names
  state.jobs.forEach(job => { (job.deliverables || []).forEach(d => { if (d.name === 'Ảnh Tiệc') d.name = 'Ảnh Phóng sự'; }); });
  saveState();
  updateUI();
  alert(`✅ Migration hoàn tất!\n${count} job đã được tạo thành phẩm.`);
};

window.saveFirebaseConfig = () => {
  const el = document.getElementById('setting-firebase-config');
  if (!el) return;
  const configStr = el.value.trim();

  if (!configStr) {
    state.settings.firebaseConfig = '';
    saveState();
    alert('Đã xóa cấu hình Firebase. Ứng dụng về chế độ Offline.');
    return;
  }

  try {
    // Validate JSON
    JSON.parse(configStr);

    state.settings.firebaseConfig = configStr;
    state.settings.enableFirebaseSync = true;
    saveState();
    alert('Đã lưu cấu hình Đám Mây! Vui lòng tải lại trang (F5) để kết nối Database.');
  } catch (err) {
    alert('Lỗi: Cấu hình JSON không hợp lệ. Vui lòng kiểm tra lại!');
  }
};

window.migrateLocalPortfolioToFirebase = async () => {
  try {
    const collectFromState = Array.isArray(state.portfolios) ? state.portfolios : [];

    const collectFromLegacy = [];
    const legacyKeys = ['haru_state_v1', 'haru_state_v2', 'haru_app_state_v2'];
    for (const key of legacyKeys) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed?.portfolios)) {
          collectFromLegacy.push(...parsed.portfolios);
        }
      } catch { }
    }

    const merged = [...collectFromState, ...collectFromLegacy].filter(Boolean);
    const uniqueMap = new Map();
    for (const p of merged) {
      const k = String(p.id || p.slug || p.title || Math.random());
      if (!uniqueMap.has(k)) uniqueMap.set(k, p);
    }
    const portfolios = Array.from(uniqueMap.values());

    if (!portfolios.length) {
      alert('Không tìm thấy portfolio local để migrate.');
      return;
    }

    let configRaw = state.settings.firebaseConfig;
    if (!configRaw) {
      const envCfg = (() => {
        try { return import.meta.env?.VITE_FIREBASE_CONFIG || null; } catch { return null; }
      })();
      const publicCfg = window.HARU_PUBLIC_FIREBASE_CONFIG || window.HARU_FIREBASE_CONFIG || null;
      configRaw = envCfg || (publicCfg ? JSON.stringify(publicCfg) : '');
    }

    if (!configRaw) {
      alert('Thiếu Firebase Config. Vào Cài đặt dán config trước khi migrate.');
      return;
    }

    const ok = initFirebase(configRaw);
    if (!ok) {
      alert('Không thể kết nối Firebase. Kiểm tra lại cấu hình.');
      return;
    }

    state.settings.firebaseConfig = typeof configRaw === 'string' ? configRaw : JSON.stringify(configRaw);
    state.settings.enableFirebaseSync = true;
    state.portfolios = portfolios;

    await syncToFirebase(state);
    saveState();

    alert(`✅ Đã migrate ${portfolios.length} portfolio lên Firebase.`);
  } catch (err) {
    console.error('migrateLocalPortfolioToFirebase error:', err);
    alert('Migrate thất bại. Xem console để biết chi tiết.');
  }
};

// ============================================================
// AUTH SYSTEM
// ============================================================
const SESSION_KEY = 'haru_session';

// Restore session on boot
(function restoreSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      const session = JSON.parse(raw);
      if (session && session.username && session.role) {
        state.currentUser = session;
      }
    }
  } catch (e) { /* ignore */ }
})();

window.login = (username, password) => {
  // Hardcoded admin/editor accounts
  const HARDCODED_ACCOUNTS = [
    { username: 'ADMIN', password: 'ADMIN', role: 'admin', displayName: 'Admin' },
    { username: 'EDIT', password: 'EDIT', role: 'editor', displayName: 'Editor' }
  ];
  let account = HARDCODED_ACCOUNTS.find(a => a.username.toLowerCase() === username.toLowerCase() && a.password === password);

  // Auto-generate staff/ctv accounts: username = tên, password = phone hoặc '1234'
  if (!account) {
    const staffMember = state.staff.find(s => s.name.toLowerCase() === username.toLowerCase());
    if (staffMember) {
      const staffPwd = staffMember.phone || '1234';
      if (password === staffPwd || password === '1234') {
        const roleStr = (staffMember.role || '').toLowerCase();
        const isEditor = roleStr.includes('edit');
        const isCTV = roleStr.includes('ctv');
        let accountRole = 'staff';
        if (isEditor) accountRole = 'editor';
        else if (isCTV) accountRole = 'ctv';

        account = {
          username: staffMember.name,
          password: staffPwd,
          role: accountRole,
          displayName: staffMember.name,
          staffName: staffMember.name
        };
      }
    }
  }

  if (!account) {
    return false;
  }
  state.currentUser = { username: account.username, role: account.role, displayName: account.displayName, staffName: account.staffName || null };
  localStorage.setItem(SESSION_KEY, JSON.stringify(state.currentUser));
  if (['editor', 'staff', 'ctv'].includes(account.role)) {
    state.activePage = 'workspace';
  } else {
    state.activePage = 'dashboard';
  }
  window.addHistory(`Đăng nhập: ${account.displayName} (${account.role})`);
  updateUI();
  return true;
};

window.logout = () => {
  window.addHistory(`Đăng xuất: ${state.currentUser?.displayName || 'Unknown'}`);
  state.currentUser = null;
  localStorage.removeItem(SESSION_KEY);
  updateUI();
};

// ============================================================
// EXPOSE GLOBALS
// ============================================================
window.state = state;
window.saveState = saveState;

// ============================================================
// RENDER LOOP
// ============================================================
function generateId() {
  return Math.random().toString(36).substr(2, 4).toUpperCase() + '-' + Date.now().toString(36).substr(-4).toUpperCase();
}

function updateMonth(month, year) {
  state.currentMonth = month;
  state.currentYear = year;
  updateUI();
}

function updateUI() {
  window.updateUI = updateUI;
  app.innerHTML = '';

  // ── Phase 6: Cổng Trưng Bày Tự Động (Haru Gallery) ──
  const urlParams = new URLSearchParams(window.location.search);
  const galleryId = urlParams.get('gallery');
  const hubParam = urlParams.get('hub');

  if (galleryId || hubParam === 'haru') {
    document.body.style.overflowY = 'auto'; // Cho phép scroll
    app.style.display = 'block';
    app.style.gridTemplateColumns = 'none';
    // Đổi Title
    document.title = galleryId ? "Haru Gallery - Khám phá Album" : "Haru Studio - Portfolio Hub";
    // Tắt các thuộc tính nền body
    document.body.style.background = '#0a0a0a';

    // Khởi tạo container trống, sau đó chờ Load Data (vì Firebase Load bất đồng bộ)
    const container = document.createElement('div');
    container.id = 'gallery-root';
    app.appendChild(container);

    // Render ban đầu với dữ liệu hiện có (sau khi bootload đã load Firebase)
    const doRender = () => {
      container.innerHTML = '';
      const resultEl = renderGalleryClient(galleryId || 'home', window.state);
      container.appendChild(resultEl);
    };

    // Chờ 500ms cho Firebase bootload hoàn tất rồi render
    setTimeout(doRender, 500);

    // ──────────────────────────────────────────────────────────
    // FIX: REST fallback fetch — khi portfolios vẫn rỗng sau 1s
    // (Firebase SDK lỗi hoặc chưa init), fetch thẳng từ RTDB REST API
    // Endpoint này không cần auth vì Firebase Rules cho phép read public
    // ──────────────────────────────────────────────────────────
    setTimeout(async () => {
      if (Array.isArray(state.portfolios) && state.portfolios.filter(p => p.isVisible).length > 0) {
        return; // đã có data, không cần fallback
      }
      try {
        const cfg = window.HARU_PUBLIC_FIREBASE_CONFIG;
        if (!cfg || !cfg.databaseURL) return;
        const rtdbUrl = cfg.databaseURL.replace(/\/$/, '');
        const resp = await fetch(`${rtdbUrl}/haru_state/portfolios.json`);
        if (!resp.ok) return;
        const portfolios = await resp.json();
        if (Array.isArray(portfolios) && portfolios.length > 0) {
          console.log('🌐 [REST Fallback] Lấy được', portfolios.length, 'portfolios từ RTDB REST');
          state.portfolios = portfolios;
          doRender();
        }
      } catch (e) {
        console.warn('[REST Fallback] Lỗi fetch portfolios:', e.message);
      }
    }, 1500);

    // Nếu là hub mode (không phải single gallery), lắng nghe real-time
    // để tự cập nhật khi thiết bị khác thêm/sửa album
    if (!galleryId) {
      let _hubRenderTimer = null;
      watchPortfolios((newPortfolios) => {
        // Debounce 300ms để tránh re-render liên tục
        clearTimeout(_hubRenderTimer);
        _hubRenderTimer = setTimeout(() => {
          if (Array.isArray(newPortfolios)) {
            const changed = JSON.stringify(newPortfolios) !== JSON.stringify(state.portfolios);
            if (changed) {
              state.portfolios = newPortfolios;
              // Chỉ re-render phần gallery-root, không updateUI() toàn bộ
              const root = document.getElementById('gallery-root');
              if (root) {
                root.innerHTML = '';
                root.appendChild(renderGalleryClient('home', window.state));
              }
            }
          }
        }, 300);
      });
    }

    return;
  }


  // ── Nếu chưa login → hiển thị Login Screen ──
  if (!state.currentUser) {
    app.style.display = 'flex';
    app.style.gridTemplateColumns = 'none';
    const loginEl = renderLoginScreen();
    app.appendChild(loginEl);
    return;
  }

  // ── Nếu role STAFF → hiển thị Staff Portal riêng ──
  if (state.currentUser.role === 'staff') {
    document.body.style.overflowY = 'auto';
    app.style.display = 'block';
    app.style.gridTemplateColumns = 'none';
    const portal = renderStaffPortal(state);
    app.appendChild(portal);
    return;
  }

  // ── Nếu role EDITOR → hiển thị Editor Portal riêng (2 tháng liền) ──
  if (state.currentUser.role === 'editor') {
    document.body.style.overflowY = 'auto';
    app.style.display = 'block';
    app.style.gridTemplateColumns = 'none';
    // Lấy tháng hiện tại + tháng trước
    const m1 = state.currentMonth;
    const y1 = state.currentYear;
    const prevDate = new Date(y1, m1 - 2, 1); // tháng trước
    const m0 = prevDate.getMonth() + 1;
    const y0 = prevDate.getFullYear();
    const twoMonthJobs = state.jobs.filter(job => {
      const d = new Date(job.date);
      const jm = d.getMonth() + 1, jy = d.getFullYear();
      return (jm === m1 && jy === y1) || (jm === m0 && jy === y0);
    });
    const periodState = { ...state, jobs: twoMonthJobs, prevMonth: m0, prevYear: y0 };
    const portal = renderEditorPortal(periodState);
    app.appendChild(portal);
    return;
  }

  // ── Role ADMIN → giao diện đầy đủ ──
  const isMobile = window.innerWidth <= 900;
  document.body.style.overflowY = isMobile ? 'auto' : 'hidden';
  if (isMobile) {
    app.style.display = 'block';
    app.style.gridTemplateColumns = 'none';
  } else {
    app.style.display = 'grid';
    app.style.gridTemplateColumns = '270px 1fr';
  }

  const sidebar = renderSidebar(state.activePage, window.navigate);
  app.appendChild(sidebar);

  const bottomNav = renderBottomNav(state.activePage, window.navigate);
  app.appendChild(bottomNav);

  const contentArea = document.createElement('main');
  contentArea.className = 'main-content';

  if (state.activePage !== 'settings' && state.activePage !== 'staff' && state.activePage !== 'portfolio') {
    const header = document.createElement('div');
    header.className = 'view-header';
    header.appendChild(renderMonthPicker(state, updateMonth));
    contentArea.appendChild(header);
  }

  // Monthly Filter (supports multi-month)
  const filteredJobs = state.jobs.filter(job => {
    const jobDate = new Date(job.date);
    const jm = jobDate.getMonth() + 1;
    const jy = jobDate.getFullYear();
    if (jm === state.currentMonth && jy === state.currentYear) return true;
    if (state.extraMonth && jm === state.extraMonth.month && jy === state.extraMonth.year) return true;
    return false;
  });

  const periodState = { ...state, jobs: filteredJobs };

  switch (state.activePage) {
    case 'workspace': contentArea.appendChild(renderWorkspace(periodState)); break;
    case 'dashboard': contentArea.appendChild(renderDashboard(periodState, window.navigate)); break;
    case 'jobs': contentArea.appendChild(renderJobs(periodState)); break;
    case 'clients': contentArea.appendChild(renderClients(state)); break;
    case 'staff': contentArea.appendChild(renderStaff(state)); break;
    case 'finance': contentArea.appendChild(renderFinance(periodState)); break;
    case 'tax': contentArea.appendChild(renderTax(periodState)); break;
    case 'edit': contentArea.appendChild(renderDeadlineEdit(periodState)); break;
    case 'edit_video': contentArea.appendChild(renderEditVideo(periodState)); break;
    case 'edit_photo': contentArea.appendChild(renderEditPhoto(periodState)); break;
    case 'calendar': contentArea.appendChild(renderCalendar(state)); break;
    case 'trash': contentArea.appendChild(renderTrash(state)); break;
    case 'portfolio': contentArea.appendChild(renderPortfolioAdmin(state)); break;
    case 'settings': contentArea.appendChild(renderSettings(state)); break;
    case 'sync': contentArea.appendChild(renderSync(state)); break;
    case 'nas': contentArea.appendChild(renderNAS(state)); break;
    case 'watermark': contentArea.appendChild(renderWatermark(state)); break;
    case 'kanban': contentArea.appendChild(renderKanban(state)); break;
    case 'analytics': contentArea.appendChild(renderAnalytics(state)); break;
    case 'history': contentArea.appendChild(renderHistory(state)); break;
    default: contentArea.appendChild(renderDashboard(periodState, window.navigate));
  }

  app.appendChild(contentArea);

  // Helper to visually update kanban column counts instantly
  const updateKanbanCounts = (fromCol, toCol) => {
    if (!fromCol || !toCol || fromCol === toCol) return;

    // Look for a header element that has the text containing `(N)`
    const updateHeader = (col) => {
      // Find the header element. In our DOM it's usually the previous sibling or first child
      let header = col.previousElementSibling;
      if (!header || !header.textContent.includes('(')) {
        header = col.parentElement?.querySelector('div[style*="font-weight:800"]');
      }

      if (header) {
        // Find existing number in parentheses like (5)
        const match = header.textContent.match(/\((\d+)\)/);
        if (match) {
          // Calculate active children excluding the sortable ghost
          const count = Array.from(col.children).filter(c => !c.classList.contains('sortable-ghost') && !c.classList.contains('kanban-ghost')).length;
          header.textContent = header.textContent.replace(/\(\d+\)/, `(${count})`);
        }
      }
    };

    updateHeader(fromCol);
    updateHeader(toCol);
  };

  // ── Initialize SortableJS for ALL kanban views AFTER DOM attach ──
  requestAnimationFrame(() => {
    setTimeout(() => {
      if (typeof Sortable === 'undefined') return;
      // Main Kanban board
      document.querySelectorAll('.kanban-list').forEach(list => {
        if (list._sortableInstance) list._sortableInstance.destroy();
        list._sortableInstance = new Sortable(list, {
          group: 'kanban', animation: 150, ghostClass: 'kanban-ghost',
          onEnd: (evt) => {
            const card = evt.item;
            const newStatus = evt.to.dataset.status;
            if (window.updateVideoEditStatus) {
              window.updateVideoEditStatus(card.dataset.jobId, card.dataset.svc, newStatus, true);
              updateKanbanCounts(evt.from, evt.to);
            }
          }
        });
      });
      // Edit Video kanban
      document.querySelectorAll('.ev-col-cards').forEach(col => {
        if (col._sortableInstance) col._sortableInstance.destroy();
        col._sortableInstance = new Sortable(col, {
          group: 'editVideoKanban', animation: 200, ghostClass: 'sortable-ghost',
          onEnd: (evt) => {
            const card = evt.item;
            const newStatus = evt.to.dataset.status;
            const jobId = card.dataset.jobid;
            const sIdx = parseInt(card.dataset.sidx);
            const job = state.jobs.find(j => j.id === jobId);
            if (job && job.services[sIdx]) {
              if (window.updateVideoEditStatus) window.updateVideoEditStatus(jobId, job.services[sIdx].service, newStatus, true);
              updateKanbanCounts(evt.from, evt.to);
            }
          }
        });
      });
      // Edit Photo kanban
      document.querySelectorAll('.ep-col-cards').forEach(col => {
        if (col._sortableInstance) col._sortableInstance.destroy();
        col._sortableInstance = new Sortable(col, {
          group: 'editPhoto', animation: 200, ghostClass: 'sortable-ghost',
          onEnd: (evt) => {
            const card = evt.item;
            const newStatus = evt.to.closest('.ep-col').dataset.status;
            const jobId = card.dataset.jobid;
            const sIdx = card.dataset.svcname; // Sửa bug Edit Photo: dùng index
            if (window.updateEditStatus) {
              window.updateEditStatus(jobId, sIdx, newStatus, true);
              updateKanbanCounts(evt.from.closest('.ep-col'), evt.to.closest('.ep-col'));
            }
          }
        });
      });
      // Editor kanban (ep-kanban-list)
      document.querySelectorAll('.ep-kanban-list').forEach(list => {
        if (list._sortableInstance) list._sortableInstance.destroy();
        list._sortableInstance = new Sortable(list, {
          group: 'editor-kanban', animation: 150, ghostClass: 'kanban-ghost', dragClass: 'kanban-drag',
          onEnd: (evt) => {
            const card = evt.item;
            const newStatus = evt.to.dataset.status;
            const jobId = card.dataset.jobid; // Sửa lại thành jobid theo chuẩn DOM lowercase
            const dIdx = card.dataset.sidx; // Update theo chuẩn mới
            if (window.updateVideoEditStatus) {
              window.updateVideoEditStatus(jobId, dIdx, newStatus, true);
              // Editor kanban doesn't have explicit count format like ` (N)` by default, but we handles it safely inside helper
              updateKanbanCounts(evt.from, evt.to);
            }
          }
        });
      });
    }, 100);
  });

  if (state.modal.isOpen) {
    const modalOverlay = renderModalOverlay(state, window.closeModal);
    app.appendChild(modalOverlay);
  }

  // Nút Đồng bộ khẩn cấp — chỉ hiện cho admin, luôn nằm ở góc phải dưới
  if (state.currentUser?.role === 'admin') {
    const existingBtn = document.getElementById('emergency-sync-btn');
    if (!existingBtn) {
      const syncBtn = document.createElement('button');
      syncBtn.id = 'emergency-sync-btn';
      syncBtn.title = 'Đồng bộ khẩn cấp — đẩy data lên tất cả thiết bị ngay lập tức';
      syncBtn.onclick = () => window.emergencySync();
      syncBtn.style.cssText = [
        'position: fixed',
        'bottom: 5.5rem',
        'right: 1.25rem',
        'z-index: 99999',
        'width: 48px',
        'height: 48px',
        'border-radius: 50%',
        'border: none',
        'background: linear-gradient(135deg, #ef4444, #dc2626)',
        'color: #fff',
        'font-size: 1.2rem',
        'cursor: pointer',
        'box-shadow: 0 4px 16px rgba(239,68,68,0.45)',
        'display: flex',
        'align-items: center',
        'justify-content: center',
        'transition: transform 0.2s, box-shadow 0.2s',
      ].join(';');
      syncBtn.innerHTML = '🚨';
      syncBtn.onmouseenter = () => {
        syncBtn.style.transform = 'scale(1.1)';
        syncBtn.style.boxShadow = '0 6px 24px rgba(239,68,68,0.6)';
      };
      syncBtn.onmouseleave = () => {
        syncBtn.style.transform = '';
        syncBtn.style.boxShadow = '0 4px 16px rgba(239,68,68,0.45)';
      };
      document.body.appendChild(syncBtn);
    }
  } else {
    // Xóa nút nếu không phải admin
    const oldBtn = document.getElementById('emergency-sync-btn');
    if (oldBtn) oldBtn.remove();
  }
}


// ============================================================
// PHASE 3: CLIENT & CRM FUNCTIONS
// ============================================================
window.exportInvoiceToPDF = (jobId) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;

  const total = job.package || 0;
  const deposit = job.deposit || 0;
  const remaining = total - deposit;
  const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
  const f = n => formatter.format(n);

  const servicesList = (job.services || []).map(s => `<li>${s.service}</li>`).join('');

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>Hóa Đơn - ${job.client}</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; line-height: 1.5; padding: 2rem; max-width: 800px; margin: 0 auto; }
          .header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #16a34a; padding-bottom: 1rem; margin-bottom: 2rem; }
          .brand h1 { margin: 0; color: #16a34a; font-size: 2.5rem; letter-spacing: -1px; }
          .brand p { margin: 0; color: #666; font-size: 0.9rem; }
          .invoice-meta { text-align: right; }
          .invoice-meta div { margin-bottom: 0.3rem; }
          .bill-to h3 { margin: 0 0 0.5rem 0; color: #16a34a; font-size: 1.1rem; text-transform: uppercase; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; background: #f8fafc; padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 2rem; }
          th { background: #16a34a; color: white; padding: 0.75rem; text-align: left; font-weight: 600; }
          td { padding: 0.75rem; border-bottom: 1px solid #e2e8f0; }
          .text-right { text-align: right; }
          .summary { border-top: 2px solid #e2e8f0; padding-top: 1rem; width: 60%; float: right; }
          .summary-row { display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 1.1rem; }
          .summary-row.total { font-size: 1.3rem; font-weight: bold; color: #16a34a; margin-top: 0.5rem; border-top: 1px solid #e2e8f0; padding-top: 0.5rem; }
          .summary-row.rem { font-size: 1.3rem; font-weight: bold; color: #ea580c; }
          .footer { margin-top: 4rem; text-align: center; color: #666; font-size: 0.85rem; border-top: 1px solid #e2e8f0; padding-top: 1rem; clear: both; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="brand">
            <h1>HARU STUDIO</h1>
            <p>Dịch vụ Quay/Chụp Sự kiện & Ngày Cưới</p>
          </div>
          <div class="invoice-meta">
            <div style="font-size: 1.5rem; font-weight: bold; color: #333; margin-bottom: 0.5rem">HÓA ĐƠN DỊCH VỤ</div>
            <div><strong>Mã Hóa Đơn:</strong> #${job.jobNo || job.id.split('-')[1] || '0000'}</div>
            <div><strong>Ngày lập:</strong> ${new Date().toLocaleDateString('vi-VN')}</div>
          </div>
        </div>

        <div class="info-grid">
          <div>
            <h3>Khách Hàng</h3>
            <div style="font-size: 1.2rem; font-weight: bold; margin-bottom: 0.2rem">${job.client}</div>
            <div><strong>SĐT:</strong> ${job.phone || 'Chưa cung cấp'}</div>
          </div>
          <div>
            <h3>Thông Tin Sự Kiện</h3>
            <div><strong>Ngày tổ chức:</strong> ${new Date(job.date).toLocaleDateString('vi-VN')}</div>
            <div><strong>Loại hình:</strong> ${job.eventType || 'Wedding'}</div>
            <div><strong>Địa điểm:</strong> ${job.venue || 'Chưa cập nhật'}</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Chi Tiết Dịch Vụ</th>
              <th class="text-right">Phí Dịch Vụ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div style="font-weight: bold; margin-bottom: 0.5rem">Gói Quay/Chụp Tổng Hợp</div>
                <ul style="margin: 0; padding-left: 1.2rem; color: #555">
                  ${servicesList}
                </ul>
              </td>
              <td class="text-right" style="vertical-align: top; font-weight: bold">Trọn gói</td>
            </tr>
          </tbody>
        </table>

        <div class="summary">
          <div class="summary-row">
            <span>Tổng Giá Trị Gói:</span>
            <span>${f(total)}</span>
          </div>
          <div class="summary-row">
            <span>Đã Đặt Cọc:</span>
            <span>${f(deposit)}</span>
          </div>
          <div class="summary-row rem">
            <span>Còn Lại Cần Thanh Toán:</span>
            <span>${f(remaining)}</span>
          </div>
        </div>

        <div class="footer">
          <p>Cảm ơn quý khách đã tin tưởng và sử dụng dịch vụ của Haru Studio!</p>
          <p>Mọi thắc mắc vui lòng liên hệ hotline hoặc inbox trực tiếp qua Fanpage.</p>
        </div>
        <script>
          setTimeout(() => { window.print(); window.close(); }, 500);
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
};
window._promptEditLink = (type, title) => {
  const inputId = `edit-job-link-${type}`;
  const inputEl = document.getElementById(inputId);
  if (!inputEl) return;

  const currentVal = inputEl.value;
  const newVal = prompt(`Nhập ${title}:`, currentVal);

  if (newVal !== null) {
    inputEl.value = newVal;
    // Tạm thời update job link trực tiếp trong state để re-render modal ngay lập tức
    // Lưu ý: data thực sự chỉ được save vào DB khi bấm nút "Lưu dự án" ở modal
    if (state.modal.type === 'job_detail' && state.modal.data && state.modal.data.id) {
      const job = state.jobs.find(j => j.id === state.modal.data.id);
      if (job) {
        if (type === 'customer') job.linkCustomer = newVal;
        if (type === 'nas') job.linkNAS = newVal;
        if (type === 'drive') job.linkDrive = newVal;

        // Cập nhật lại UI modal lập tức
        updateUI();
      }
    }
  }
};

window.addClientPrompt = () => {
  const name = prompt('Tên khách hàng:');
  if (!name) return;
  const phone = prompt('Số điện thoại (Tuỳ chọn):') || '';
  const newClient = { id: 'CUST-' + Math.random().toString(36).substr(2, 6).toUpperCase(), name, phone, jobs: [] };
  state.clients = state.clients || [];
  state.clients.push(newClient);
  window.addHistory('Thêm khách hàng mới: ' + name);
  saveState();
  updateUI();
};

window.editClientPrompt = (id) => {
  const client = state.clients.find(c => c.id === id);
  if (!client) return;
  const name = prompt('Tên khách hàng mới:', client.name);
  if (!name) return;
  const phone = prompt('SĐT mới:', client.phone || '');

  // NẾU SỬA TÊN, CẬP NHẬT LẠI TÊN TRONG JOBS (Đồng bộ)
  if (name !== client.name && confirm(`Cập nhật tên khách hàng này trong tất cả dự án liên quan?`)) {
    state.jobs.forEach(j => {
      if (j.client === client.name) j.client = name;
    });
  }

  client.name = name;
  client.phone = phone || '';
  window.addHistory('Sửa khách hàng: ' + name);
  saveState();
  updateUI();
};

window.removeClient = (id) => {
  state.clients = state.clients.filter(c => c.id !== id);
  window.addHistory('Xóa khách hàng ID: ' + id);
  saveState();
  updateUI();
};

window.saveCategories = () => {
  const catInput = document.getElementById('setting-event-categories');
  const roleInput = document.getElementById('setting-service-roles');

  if (catInput && roleInput) {
    const categories = catInput.value.split(',').map(s => s.trim()).filter(Boolean);
    const roles = roleInput.value.split(',').map(s => s.trim()).filter(Boolean);

    state.settings.eventCategories = categories;
    state.settings.serviceRoles = roles;

    window.addHistory('Cập nhật Danh mục & Vai trò');
    saveState();
    window.sendNotification('Thành công', 'Đã lưu cấu hình danh mục sự kiện và nhân sự!', '✅');
    updateUI();
  }
};

// ============================================================
// BOOT & GO-LIVE IMPORT
// ============================================================
window.importGoLiveData = async () => {
  if (!confirm("BẠN CÓ CHẮC CHẮN MUỐN NẠP DỮ LIỆU GO-LIVE?\n\nHành động này sẽ tải 13 Dự án thật từ Google Sheets.\n\nĐặc biệt: Hệ thống tự động PHỤC HỒI Dữ liệu Tháng 1 và Tháng 2 mặc định của bạn.")) return;

  try {
    const res = await fetch('/new_state.json?t=' + Date.now());
    const data = await res.json();

    // KIẾN TRÚC MỚI: Luôn cào Dữ liệu T1, T2 từ file gốc data.js 
    // Tránh việc người dùng bấm nhầm xóa mất trong Cache cũ
    const recoveredJanFebJobs = mockData.jobs.filter(j => {
      if (!j.date) return false;
      const m = new Date(j.date).getMonth() + 1;
      return m === 1 || m === 2;
    });

    // Ghi đè State: Data T1, T2 Gốc + Data Go-Live Mới (T3->T7)
    state.jobs = [...recoveredJanFebJobs, ...(data.jobs || [])];
    state.clients = data.clients || [];
    state.history = [{ time: new Date().toISOString(), action: 'Khởi tạo hệ thống Go-Live (Đã phục hồi T1, T2)', user: 'Admin' }];
    state.financeMetadata = {};
    state.manualTransactions = [];

    // Lưu và Đồng bộ
    saveState();
    updateUI();

    alert("🎉 NẠP DỮ LIỆU THÀNH CÔNG!\n\n13 Dự án mới đã được nạp. Toàn bộ dữ liệu Tháng 1 & 2 đã được phục hồi nguyên vẹn.");
  } catch (err) {
    console.error(err);
    alert("Lỗi khi nạp dữ liệu: " + err.message);
  }
};

// ============================================================
// PHASE 6: PORTFOLIO MANAGEMENT
// ============================================================
window._openPortfolioModal = (id = null, importData = null) => {
  let p = {
    id: 'PF-' + Date.now(),
    jobName: importData?.description || '',
    category: 'Sự kiện',
    description: importData?.url ? `Tự động nhập từ: ${importData.url}` : '',
    date: new Date().toISOString().split('T')[0],
    thumbnail: importData?.images?.[0] || '',
    videoLink: '',
    photoLink: '',
    images: importData?.images || [],
    isVisible: true
  };

  if (id) {
    const existing = state.portfolios?.find(x => x.id === id);
    if (existing) p = JSON.parse(JSON.stringify(existing));
  }

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay portfolio-modal';
  overlay.innerHTML = `
    <div class="modal" style="width: 95%; max-width: 900px; max-height: 90vh; overflow-y: auto; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
      <div class="modal-header" style="border-bottom: 1px solid var(--border); padding-bottom: 1rem; margin-bottom: 1.5rem;">
         <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--text-main); margin: 0;">${id ? 'Chỉnh sửa Portfolio' : 'Tạo Portfolio mới'}</h3>
         <button onclick="this.closest('.modal-overlay').remove()" style="background: var(--bg-body); border: 1px solid var(--border); border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text-dim); transition: all 0.2s;">
            <i class="fas fa-times"></i>
         </button>
      </div>
      <div class="modal-body" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem">
         
         <!-- CỘT TRÁI: THÔNG TIN CƠ BẢN -->
         <div style="display:flex; flex-direction:column; gap:1.25rem">
            <div class="form-group">
               <label style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem; display: block;">Tên Bộ sưu tập (Tên KH / Sự kiện) <span style="color: var(--danger)">*</span></label>
               <input type="text" id="pf-name" class="form-control" value="${p.jobName}" placeholder="VD: Đám cưới Duy & Trinh" style="border-radius: 8px; padding: 0.75rem; border: 1px solid var(--border); box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem">
              <div class="form-group">
                 <label style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem; display: block;">Phân loại <span style="color: var(--danger)">*</span></label>
                 <select id="pf-category" class="form-control" style="border-radius: 8px; padding: 0.75rem; border: 1px solid var(--border); box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                    ${(state.settings?.eventCategories || ['Pre-wedding', 'Phóng sự', 'Sự kiện', 'Khác']).map(c => `
                       <option value="${c}" ${p.category === c ? 'selected' : ''}>${c}</option>
                    `).join('')}
                 </select>
              </div>
              <div class="form-group">
                 <label style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem; display: block;">Ngày thực hiện</label>
                 <input type="date" id="pf-date" class="form-control" value="${p.date ? p.date.split('T')[0] : ''}" style="border-radius: 8px; padding: 0.75rem; border: 1px solid var(--border); box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
              </div>
            </div>

            <div class="form-group">
               <label style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem; display: block;">Ảnh Bìa (Thumbnail HTML) <span style="color: var(--danger)">*</span></label>
               <div style="display:flex; gap:0.5rem; align-items:center;">
                 <input type="url" id="pf-thumbnail" class="form-control" value="${p.thumbnail}" placeholder="https://domain.com/anh-bia.jpg" style="flex:1; border-radius: 8px; padding: 0.75rem; border: 1px solid var(--border); box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                 <label for="pf-thumb-upload" class="btn" style="cursor:pointer; padding: 0.75rem 1rem; white-space:nowrap; border:1px solid var(--border); background:var(--bg-body); border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); transition: background 0.2s;">
                    <i class="fas fa-image" style="color: var(--primary); margin-right: 0.4rem;"></i> Tải ảnh
                 </label>
                 <input type="file" id="pf-thumb-upload" accept="image/*" style="display:none" onchange="window._handleThumbnailUpload(event)">
               </div>
               
               <div id="pf-thumb-preview" style="display:${p.thumbnail ? 'block' : 'none'}; width:100%; height:160px; border-radius:12px; background:url('${p.thumbnail}') center/cover; border:1px solid var(--border); margin-top:0.75rem; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);"></div>
               <div id="pf-thumb-status" style="font-size:0.85rem; font-weight:600; color:var(--primary); display:none; margin-top:0.5rem; display:flex; align-items:center; gap:0.4rem;"><i class="fas fa-spinner fa-spin"></i> Đang tải lên...</div>
               <div style="font-size:0.8rem; color:var(--text-dim); margin-top:0.5rem"><i class="fas fa-info-circle"></i> Khuyên dùng ảnh ngang 16:9 chất lượng cao.</div>
            </div>

            <div class="form-group">
               <label style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem; display: block;">Link Video Youtube / Vimeo (Tùy chọn)</label>
               <input type="url" id="pf-video" class="form-control" value="${p.videoLink || ''}" placeholder="https://youtube.com/watch?v=..." style="border-radius: 8px; padding: 0.75rem; border: 1px solid var(--border); box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
            </div>
            
            <div class="form-group">
               <label style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.5rem; display: block;">Mô tả / Lời dẫn (Tùy chọn)</label>
               <textarea id="pf-desc" class="form-control" rows="3" placeholder="Vài dòng cảm nghĩ về bộ ảnh..." style="border-radius: 8px; padding: 0.75rem; border: 1px solid var(--border); box-shadow: 0 1px 2px rgba(0,0,0,0.05); resize: vertical;">${p.description || ''}</textarea>
            </div>
            
            <div class="form-group" style="display:flex; align-items:center; gap:0.75rem; margin-top: 0.5rem; background: var(--bg-body); padding: 1rem; border-radius: 12px; border: 1px solid var(--primary); box-shadow: 0 2px 5px rgba(22, 163, 74, 0.1);">
               <input type="checkbox" id="pf-visible" ${p.isVisible ? 'checked' : ''} style="width: 20px; height: 20px; accent-color: var(--primary); cursor: pointer;">
               <div>
                 <label for="pf-visible" style="margin:0; font-weight:800; cursor:pointer; color: var(--primary); display:block; font-size: 1rem;">Công khai Bộ sưu tập này</label>
                 <div style="font-size: 0.8rem; color: var(--text-dim); margin-top: 0.2rem;">Khách hàng sẽ nhìn thấy bộ sưu tập này trên trang Haru Portfolio Hub.</div>
               </div>
            </div>
         </div>

         <!-- CỘT PHẢI: QUẢN LÝ ẢNH (MASONRY GRID) -->
         <div style="display:flex; flex-direction:column; gap:1.25rem; background: #f8fafc; padding: 1.5rem; border-radius: 16px; border: 1px dashed #cbd5e1;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start">
               <div>
                 <label style="font-weight:800; font-size: 1.1rem; color:var(--text-main); display:block; margin-bottom:0.3rem">Kho Ảnh Triển Lãm</label>
                 <div style="font-size: 0.85rem; color: var(--text-dim); line-height: 1.4;">Ảnh tải lên sẽ được hiển thị tự do đa kích thước trên trang Gallery. (Khuyên dùng ảnh dọc/ngang xáo trộn)</div>
               </div>
               <label for="pf-upload" class="btn btn-primary" style="padding: 0.6rem 1.2rem; cursor:pointer; font-size:0.9rem; font-weight: 600; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(22, 163, 74, 0.2);">
                  <i class="fas fa-cloud-upload-alt" style="margin-right: 0.4rem;"></i> Tải nhiều ảnh
               </label>
               <input type="file" id="pf-upload" multiple accept="image/*" style="display:none" onchange="window._handleImgBBUpload(event, '${id || ''}')">
            </div>

            <div id="pf-upload-status" style="font-size:0.9rem; font-weight:600; padding: 0.75rem; background: #dcfce7; color:var(--primary); text-align:center; border-radius: 8px; display:none; align-items:center; justify-content:center; gap:0.5rem;">
               <i class="fas fa-spinner fa-spin"></i> <span>Đang xử lý...</span>
            </div>

            <div id="pf-gallery-preview" style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; overflow-y:auto; max-height:500px; padding-right:0.5rem; align-content: start;">
               <!-- Images will be rendered here -->
               ${p.images.length === 0 ? `
                  <div style="grid-column: 1/-1; text-align:center; padding: 3rem 1rem; color:var(--text-dim); border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap: 1rem;">
                     <div style="width: 64px; height: 64px; background: #e2e8f0; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-images" style="font-size: 1.5rem; color: #94a3b8;"></i>
                     </div>
                     <div>
                        <div style="font-weight: 600; color: #64748b; margin-bottom: 0.25rem;">Chưa có ảnh nào được thêm</div>
                        <div style="font-size: 0.85rem;">Bấm "Tải nhiều ảnh" để bắt đầu nạp ảnh vào thư viện.</div>
                     </div>
                  </div>
               ` : ''}
               ${p.images.map((imgUrl, i) => `
                 <div class="pf-img-item" style="position:relative; padding-bottom:100%; border-radius:10px; overflow:hidden; background:url('${imgUrl}') center/cover; border:1px solid var(--border); box-shadow: 0 2px 4px rgba(0,0,0,0.05); transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                   <button type="button" onclick="this.parentElement.remove()" style="position:absolute; top:6px; right:6px; width:28px; height:28px; border-radius:50%; background:rgba(239,68,68,0.9); border:none; color:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 2px 5px rgba(0,0,0,0.3); backdrop-filter: blur(4px); transition: background 0.2s;" onmouseover="this.style.background='#dc2626'" onmouseout="this.style.background='rgba(239,68,68,0.9)'">
                      <i class="fas fa-times" style="font-size: 0.8rem;"></i>
                   </button>
                   <input type="hidden" class="pf-img-url" value="${imgUrl}">
                 </div>
               `).join('')}
            </div>
         </div>

      </div>
      <div class="modal-footer" style="margin-top:2.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border); display:flex; justify-content:flex-end; gap: 1rem;">
         <button class="btn" onclick="this.closest('.modal-overlay').remove()" style="padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 600;">Huỷ bỏ</button>
         <button class="btn btn-primary" onclick="window._savePortfolio('${p.id}')" style="padding: 0.75rem 2rem; border-radius: 8px; font-weight: 600; box-shadow: 0 4px 6px -1px rgba(22, 163, 74, 0.2);">
            <i class="fas fa-check-circle" style="margin-right: 0.4rem;"></i> Lưu Bộ Sưu Tập
         </button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Need to add 'active' class so the modal is visible (transition from opacity 0 to 1)
  requestAnimationFrame(() => {
    overlay.classList.add('active');
  });
};

// Upload queue removed for stability

// Removed _processPfUploadQueue for blocking upload rollback

window._handleImgBBUpload = async (e, portfolioId) => {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  const statusEl = document.getElementById('pf-upload-status');
  const previewContainer = document.getElementById('pf-gallery-preview');

  // ImgBB API Key
  const IMGBB_API_KEY = '06a22bc9051f55716fb1cd1d54658ba3';

  statusEl.style.display = 'block';
  statusEl.style.color = 'var(--primary)';
  statusEl.innerText = `Đang xử lý ${files.length} ảnh...`;

  if (previewContainer.innerHTML.includes('Chưa có ảnh nào')) previewContainer.innerHTML = '';

  let successCount = 0;
  for (let i = 0; i < files.length; i++) {
    statusEl.innerText = `Đang tải lên ${i + 1}/${files.length}...`;
    try {
      const formData = new FormData();
      formData.append('image', files[i]);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error?.message || 'Upload failed');

      const imageUrl = data.data.url;

      // Auto set thumbnail = ảnh đầu tiên nếu thumbnail đang trống
      const thumbInput = document.getElementById('pf-thumbnail');
      const thumbPreview = document.getElementById('pf-thumb-preview');
      if (thumbInput && !thumbInput.value.trim()) {
        thumbInput.value = imageUrl;
        if (thumbPreview) {
          thumbPreview.style.display = 'block';
          thumbPreview.style.backgroundImage = `url('${imageUrl}')`;
        }
      }

      const div = document.createElement('div');
      div.className = 'pf-img-item';
      div.style.cssText = `position:relative; padding-bottom:100%; border-radius:8px; overflow:hidden; background:url('${imageUrl}') center/cover; border:1px solid var(--border); box-shadow: 0 4px 10px rgba(0,0,0,0.1)`;
      div.innerHTML = `
        <button type="button" onclick="this.parentElement.remove()" style="position:absolute; top:4px; right:4px; width:24px; height:24px; border-radius:50%; background:rgba(239,68,68,0.9); border:none; color:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 2px 5px rgba(0,0,0,0.3)">×</button>
        <input type="hidden" class="pf-img-url" value="${imageUrl}">
      `;
      previewContainer.appendChild(div);
      successCount++;
    } catch (err) {
      console.error("Upload failed for file", files[i].name, err);
    }
  }

  statusEl.innerText = `Đã tải xong ${successCount} ảnh!`;
  setTimeout(() => { statusEl.style.display = 'none'; }, 3000);
  e.target.value = '';
};

window._handleThumbnailUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const statusEl = document.getElementById('pf-thumb-status');
  const previewEl = document.getElementById('pf-thumb-preview');
  const inputEl = document.getElementById('pf-thumbnail');

  const IMGBB_API_KEY = '06a22bc9051f55716fb1cd1d54658ba3';

  statusEl.style.display = 'block';
  statusEl.style.color = 'var(--primary)';
  statusEl.innerText = 'Đang tải lên ảnh bìa...';

  try {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.error?.message || 'Upload failed');

    const imageUrl = data.data.url;
    inputEl.value = imageUrl;
    previewEl.style.display = 'block';
    previewEl.style.backgroundImage = `url('${imageUrl}')`;
    statusEl.innerText = 'Tải lên thành công!';
  } catch (err) {
    console.error("Upload failed for thumbnail", file.name, err);
    statusEl.innerText = 'Lỗi tải lên: ' + err.message;
    statusEl.style.color = 'var(--danger)';
  }

  setTimeout(() => {
    if (statusEl.innerText === 'Tải lên thành công!') statusEl.style.display = 'none';
  }, 3000);
  e.target.value = '';
};

window._savePortfolio = async (id) => {
  const jobName = document.getElementById('pf-name').value.trim();
  const category = document.getElementById('pf-category').value;
  const rawThumbnail = document.getElementById('pf-thumbnail').value.trim();

  // Thu thập danh sách ảnh
  const imageInputs = document.querySelectorAll('.pf-img-url');
  const images = Array.from(imageInputs).map(inp => inp.value).filter(Boolean);

  // Fallback thumbnail: nếu thiếu thì lấy ảnh đầu tiên
  const thumbnail = rawThumbnail || images[0] || '';

  if (!jobName || !thumbnail) {
    alert("Vui lòng nhập Tên bộ sưu tập và ít nhất 1 ảnh bìa/ảnh trong bộ sưu tập!");
    return;
  }

  const pf = {
    id,
    jobName,
    category,
    date: document.getElementById('pf-date').value || new Date().toISOString(),
    thumbnail,
    videoLink: document.getElementById('pf-video')?.value?.trim() || '',
    photoLink: document.getElementById('pf-photo')?.value?.trim() || '',
    description: document.getElementById('pf-desc').value.trim(),
    images,
    isVisible: document.getElementById('pf-visible').checked
  };

  if (!state.portfolios) state.portfolios = [];
  const idx = state.portfolios.findIndex(x => x.id === id);
  if (idx > -1) {
    state.portfolios[idx] = pf;
    window.addHistory('Sửa Portfolio: ' + jobName);
  } else {
    state.portfolios.push(pf);
    window.addHistory('Tạo Portfolio mới: ' + jobName);
  }

  // Lưu local trước
  saveState();

  // Cố gắng đồng bộ Firebase ngay khi lưu để máy khác thấy liền
  try {
    await syncToFirebase(state);
  } catch (e) {
    console.warn('Sync Firebase sau khi lưu portfolio thất bại:', e?.message || e);
  }

  updateUI();
  document.querySelector('.portfolio-modal')?.remove();
};

window._deletePortfolio = (id) => {
  const pf = (state.portfolios || []).find(x => x.id === id);
  if (!pf) return;

  window.haruConfirm(`Xóa vĩnh viễn bộ sưu tập "${pf.jobName}"? (Không thể khôi phục)`, () => {
    state.portfolios = state.portfolios.filter(x => x.id !== id);
    window.addHistory('Xóa Portfolio: ' + pf.jobName);
    saveState();
    updateUI();
  });
};

// ============================================================
// PHASE 6: CLIENT GALLERY LIGHTBOX
// ============================================================
let lightboxImages = [];
let currentLightboxIndex = 0;

window._openLightbox = (index) => {
  // Extract images from DOM directly from portfolio-masonry-item img tags
  // because we don't pass the `portfolio` object down here easily without polluting window
  const imgs = Array.from(document.querySelectorAll('.portfolio-masonry-item img')).map(el => el.src);
  if (imgs.length === 0) return;

  lightboxImages = imgs;
  currentLightboxIndex = index;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.id = 'pf-lightbox';
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.95); z-index: 99999;
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: opacity 0.3s;
  `;

  overlay.innerHTML = `
    <button onclick="window._closeLightbox()" style="position:absolute; top: 20px; right: 20px; background:none; border:none; color:#fff; font-size: 2rem; cursor:pointer; z-index: 10">×</button>
    
    <button onclick="window._lightboxNav(-1)" style="position:absolute; left: 20px; top: 50%; transform: translateY(-50%); background:rgba(255,255,255,0.1); border:none; color:#fff; width: 50px; height: 50px; border-radius: 50%; font-size: 1.5rem; cursor:pointer; z-index: 10; display:flex; align-items:center; justify-content:center; backdrop-filter: blur(4px)">❮</button>
    
    <img id="pf-lightbox-img" src="${lightboxImages[currentLightboxIndex]}" style="max-width: 90vw; max-height: 90vh; object-fit: contain; transition: opacity 0.2s" />
    
    <div id="pf-lightbox-counter" style="position:absolute; bottom: 20px; left: 50%; transform: translateX(-50%); color: rgba(255,255,255,0.7); font-size: 0.9rem; font-family: sans-serif; letter-spacing: 2px">
      ${currentLightboxIndex + 1} / ${lightboxImages.length}
    </div>

    <button onclick="window._lightboxNav(1)" style="position:absolute; right: 20px; top: 50%; transform: translateY(-50%); background:rgba(255,255,255,0.1); border:none; color:#fff; width: 50px; height: 50px; border-radius: 50%; font-size: 1.5rem; cursor:pointer; z-index: 10; display:flex; align-items:center; justify-content:center; backdrop-filter: blur(4px)">❯</button>
  `;

  document.body.appendChild(overlay);

  // Trigger fade in
  requestAnimationFrame(() => {
    overlay.style.opacity = '1';
  });

  // Keyboard navigation
  window._lightboxKeydownHandler = (e) => {
    if (e.key === 'Escape') window._closeLightbox();
    if (e.key === 'ArrowRight') window._lightboxNav(1);
    if (e.key === 'ArrowLeft') window._lightboxNav(-1);
  };
  document.addEventListener('keydown', window._lightboxKeydownHandler);
};

window._closeLightbox = () => {
  const el = document.getElementById('pf-lightbox');
  if (el) {
    el.style.opacity = '0';
    setTimeout(() => {
      el.remove();
      document.removeEventListener('keydown', window._lightboxKeydownHandler);
    }, 300);
  }
};

window._lightboxNav = (dir) => {
  if (lightboxImages.length === 0) return;

  currentLightboxIndex += dir;
  if (currentLightboxIndex < 0) currentLightboxIndex = lightboxImages.length - 1;
  if (currentLightboxIndex >= lightboxImages.length) currentLightboxIndex = 0;

  const imgEl = document.getElementById('pf-lightbox-img');
  const counterEl = document.getElementById('pf-lightbox-counter');

  if (imgEl && counterEl) {
    imgEl.style.opacity = '0';
    setTimeout(() => {
      imgEl.src = lightboxImages[currentLightboxIndex];
      counterEl.innerText = `${currentLightboxIndex + 1} / ${lightboxImages.length}`;
      imgEl.style.opacity = '1';
    }, 150);
  }
};

updateUI();

// ============================================================
// EXTENSION IMPORT LISTENER
// ============================================================

window.addEventListener('haruExternalImport', (e) => {
  const data = e.detail;
  if (data) {
    window.showPage('portfolios');
    window._openPortfolioModal(null, data);
  }
});

// Check local storage on load with a slight delay to ensure UI is ready
setTimeout(() => {
  const fbDataStr = localStorage.getItem('haru_fb_import');
  if (fbDataStr) {
    try {
      const fbData = JSON.parse(fbDataStr);
      localStorage.removeItem('haru_fb_import');
      window.showPage('portfolios');
      window._openPortfolioModal(null, fbData);
    } catch (err) {
      console.error("Error parsing FB Import data:", err);
    }
  }
}, 1500);
