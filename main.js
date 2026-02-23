
import { mockData } from './data.js';
import {
  renderDashboard, renderJobs, renderSidebar, renderBottomNav, renderStaff, renderClients,
  renderFinance, renderTax, renderSync, renderMonthPicker, renderNAS, renderModalOverlay,
  renderCalendar, renderTrash, renderSettings, renderDeadlineEdit, renderEditVideo, renderHistory,
  renderLoginScreen, renderEditorPortal, renderAnalytics, renderKanban, renderWatermark, renderStaffPortal, renderEditPhoto
} from './components.js';

import { initFirebase, syncToFirebase, loadFromFirebase } from './firebase.js';

// ============================================================
// STATE INITIALIZATION & FIREBASE
// ============================================================
const STORAGE_KEY = 'haru_state_v1';

// Mặc định ban đầu
export const state = {
  activePage: 'dashboard',
  currentMonth: new Date().getMonth() + 1,
  currentYear: new Date().getFullYear(),
  modal: { isOpen: false, type: null, data: null },
  history: [{ time: new Date().toISOString(), action: 'Khởi tạo hệ thống', user: 'Admin' }],
  deadlineFilter: 'TẤT CẢ',
  staffFilter: 'TẤT CẢ',
  statusFilter: 'TẤT CẢ',
  searchQuery: '',
  staffViewMode: 'all',
  editVideoFilter: 'TẤT CẢ',
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
    rates: mockData.settings?.rates || {},
    accounts: [
      { username: 'ADMIN', password: 'ADMIN', role: 'admin', displayName: 'Admin' },
      { username: 'EDIT', password: 'EDIT', role: 'editor', displayName: 'Editor' }
    ]
  },
  clients: [] // Phase 3 CRM
};

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
      clients: state.clients || []
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
// DARK MODE
// ============================================================
function initTheme() {
  const saved = localStorage.getItem('haru_theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

window.toggleTheme = function () {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('haru_theme', next);
};

window.getThemeIcon = function () {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
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
        localData = parsed;
        Object.assign(state, {
          jobs: localData.jobs,
          staff: localData.staff,
          financeMetadata: localData.financeMetadata || state.financeMetadata,
          manualTransactions: localData.manualTransactions || [],
          settings: localData.settings || state.settings,
          history: localData.history || state.history,
          clients: localData.clients || []
        });
      }
    }
  } catch (e) { console.warn('Local Load Err:', e); }

  // 2. Kích hoạt Firebase nếu có config
  if (state.settings.firebaseConfig) {
    const isOk = initFirebase(state.settings.firebaseConfig);
    if (isOk) {
      // Fetch latest từ Firebase đè lên
      const fbData = await loadFromFirebase();
      if (fbData && fbData.jobs) {
        Object.assign(state, {
          jobs: fbData.jobs || state.jobs,
          staff: fbData.staff || state.staff,
          financeMetadata: fbData.financeMetadata || state.financeMetadata,
          manualTransactions: fbData.manualTransactions || state.manualTransactions,
          settings: fbData.settings || state.settings,
          history: fbData.history || state.history,
          clients: fbData.clients || state.clients
        });
        console.log("🔥 Đã tải dữ liệu mới nhất từ Firebase!");
      }
    }
  }

  // Khởi động UI Component render
  updateUI();
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
        if (!confirm(`⚠️ Nhập backup sẽ GHI ĐÈ toàn bộ dữ liệu hiện tại!\n\nFile: ${file.name}\nSố jobs: ${imported.jobs.length}\nSố nhân sự: ${(imported.staff || []).length}\n\nBạn chắc chắn?`)) return;
        Object.assign(state, imported);
        state.history.unshift({ time: new Date().toISOString(), action: `Nhập backup từ ${file.name}`, user: 'Admin' });
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
  panel.style.cssText = `width:380px;max-width:90vw;background:${bg};height:100%;display:flex;flex-direction:column;box-shadow:-4px 0 24px rgba(0,0,0,0.2);animation:slideIn 0.2s ease`;
  panel.innerHTML = `
    <div style="padding:1rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center">
      <div>
        <h3 style="font-size:1rem;font-weight:800;color:var(--text-main)">💬 ${job.client}</h3>
        <span style="font-size:0.72rem;color:var(--text-dim)">${comments.length} tin nhắn</span>
      </div>
      <button onclick="this.closest('#chat-panel-overlay').remove()" style="background:none;border:none;font-size:1.2rem;cursor:pointer;color:var(--text-dim)">✕</button>
    </div>
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

window.openModal = (type, data = null) => {
  state.modal.isOpen = true;
  state.modal.type = type;
  state.modal.data = data;
  updateUI();
};

window.closeModal = () => {
  state.modal.isOpen = false;
  state.modal.type = null;
  state.modal.data = null;
  updateUI();
};

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
    window.addHistory && window.addHistory(`${job.client}: ${job.status}`);
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

window.updateJob = (jobId, updatedData) => {
  const index = state.jobs.findIndex(j => j.id === jobId);
  if (index !== -1) {
    state.jobs[index] = { ...state.jobs[index], ...updatedData };
    window.addHistory(`Cập nhật dự án: ${state.jobs[index].client} `);
    saveState();
    updateUI();
  }
};

// saveJobDetail: đọc DOM form trong modal, validate, rồi updateJob
window.saveJobDetail = (jobId) => {
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
  const venue = document.getElementById('edit-job-venue')?.value || job.venue;
  const notes = document.getElementById('edit-job-notes')?.value || job.notes;
  const linkCustomer = document.getElementById('edit-job-link-customer')?.value || job.linkCustomer;
  const linkNAS = document.getElementById('edit-job-link-nas')?.value || job.linkNAS;
  const linkDrive = document.getElementById('edit-job-link-drive')?.value || job.linkDrive;

  // Đọc timeline — tách riêng tiệc trưa và tiệc tối
  const modal = document.querySelector('.modal-container');
  const timeline = {
    le_sang: modal?.querySelector('input[name="le_sang"]')?.checked || false,
    tiec_trua: modal?.querySelector('input[name="tiec_trua"]')?.checked || false,
    tiec_toi: modal?.querySelector('input[name="tiec_toi"]')?.checked || false,
    le: modal?.querySelector('input[name="le_time"]')?.value || job.timeline?.le || '05:00',
    tiec_trua_time: modal?.querySelector('input[name="tiec_time_trua"]')?.value || job.timeline?.tiec_trua_time || '11:00',
    tiec: modal?.querySelector('input[name="tiec_time_toi"]')?.value || job.timeline?.tiec || '18:00'
  };

  // Đọc service rows từ table
  const table = document.getElementById('services-table-edit');
  let services = job.services; // fallback về services cũ
  if (table) {
    const rows = table.querySelectorAll('tbody tr');
    const parsedServices = [];
    rows.forEach((row, idx) => {
      const cells = row.querySelectorAll('td');
      if (cells.length >= 5) {
        const select0 = cells[0].querySelector('select');
        const select1 = cells[1].querySelector('select');
        const inp2 = cells[2].querySelector('input');
        const inp3 = cells[3].querySelector('input');
        const chk4 = cells[4].querySelector('input[type=checkbox]');
        // Row tĩnh (text)
        const svc = select0 ? select0.value : cells[0].textContent.trim();
        const stf = select1 ? select1.value : cells[1].textContent.trim();
        const cst = parseInt(inp2 ? inp2.value : 0) || parseInt(job.services[idx]?.cost) || 0;
        const edt = parseInt(inp3 ? inp3.value : 0) || parseInt(job.services[idx]?.edit) || 0;
        const paid = chk4 ? chk4.checked : (job.services[idx]?.paid || false);
        if (svc && stf) parsedServices.push({ service: svc, staff: stf, cost: cst, edit: edt, paid, date });
      }
    });
    if (parsedServices.length > 0) services = parsedServices;
  }

  // Validate
  const errors = validateJobData({ client, date, package: packageVal }, services);
  if (errors.length > 0) { showValidationError(errors); return; }

  window.updateJob(jobId, {
    client, status, date, eventType, phone, package: packageVal, deposit: depositVal,
    venue, notes, linkCustomer, linkNAS, linkDrive, timeline, services
  });
  window.closeModal();
  // Toast thành công
  const toast = document.createElement('div');
  toast.style.cssText = 'position:fixed;bottom:2rem;right:2rem;background:#22c55e;color:#fff;padding:0.75rem 1.5rem;border-radius:12px;font-weight:700;z-index:9999;font-size:0.9rem';
  toast.textContent = '✓ Đã lưu thay đổi';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
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

// Xóa job (chuyển vào thùng rác) — với confirm
window.deleteJob = (jobId) => {
  if (!confirm('Xóa dự án này vào thùng rác?')) return;
  const job = state.jobs.find(j => j.id === jobId);
  if (job) {
    job.isTrash = true;
    window.addHistory(`Xóa dự án: ${job.client} `);
    saveState();
    window.closeModal();
    updateUI();
  }
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
  const memberJobs = state.jobs.filter(j => !j.isTrash && j.services.some(s => s.staff.includes(staffName)));
  const total = memberJobs.reduce((s, j) => s + j.services.filter(sv => sv.staff.includes(staffName)).reduce((ss, sv) => ss + (sv.cost || 0), 0), 0);
  const paid = memberJobs.reduce((s, j) => s + j.services.filter(sv => sv.staff.includes(staffName) && sv.paid).reduce((ss, sv) => ss + (sv.cost || 0), 0), 0);
  const unpaid = total - paid;
  const fmt = n => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);

  // Staff card lives inside #staff-card-<name>
  const card = document.getElementById(`staff - card - ${staffName.replace(/'/g, "\\'")} `);
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
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
animation: toastIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
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
  const adsEl = document.getElementById(`ads-input-${monthKey}`);
  const offEl = document.getElementById(`off-input-${monthKey}`);
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
window.updateEditStatus = (jobId, serviceName, newStatus) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;
  const svc = job.services.find(s => s.service === serviceName);
  if (!svc) return;

  const oldStatus = svc.editStatus;
  svc.editStatus = newStatus;

  // Also update job.status if all services "Hoàn thành"
  const allDone = job.services.every(s => (s.editStatus || '') === 'Hoàn thành');
  if (allDone && newStatus === 'Hoàn thành') {
    job.status = 'Đã hoàn thành';
  }

  try {
    saveState();
  } catch (err) {
    svc.editStatus = oldStatus;
    showPaymentToast('❌ Lỗi lưu – đã hoàn tác', 'var(--danger)');
    return;
  }

  window.addHistory(`Cập nhật trạng thái edit: ${job.client} – ${serviceName} → ${newStatus} `);
  showPaymentToast(`✓ Cập nhật: ${newStatus} `, newStatus === 'Hoàn thành' ? 'var(--success)' : 'var(--primary)');

  // Micro-update: if job status changed, refresh card without full re-render
  if (allDone && newStatus === 'Hoàn thành') {
    updateUI();
  }
};

// ── Video Edit Tab Functions ───────────────────────────────
window.updateVideoEditor = (jobId, serviceName, editorName) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;
  const svc = job.services.find(s => s.service === serviceName);
  if (!svc) return;
  svc.editStaff = editorName;
  saveState();
  window.addHistory(`Gán editor: ${editorName} cho ${job.client} – ${serviceName}`);
  showPaymentToast(`✓ Editor: ${editorName || 'Đã xóa'}`, 'var(--primary)');
};

window.updateVideoEditStatus = (jobId, serviceName, newStatus) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;
  const svc = job.services.find(s => s.service === serviceName);
  if (!svc) return;
  svc.editStatus = newStatus;
  if (newStatus === 'Hoàn thành') {
    const allDone = job.services.every(s => (s.editStatus || '') === 'Hoàn thành');
    if (allDone) job.status = 'Đã hoàn thành';
  }
  saveState();
  window.addHistory(`Edit video: ${job.client} – ${serviceName} → ${newStatus}`);
  showPaymentToast(`✓ ${newStatus}`, newStatus === 'Hoàn thành' ? 'var(--success)' : 'var(--primary)');
  if (newStatus === 'Hoàn thành') updateUI();
};

window.updateVideoEditLink = (jobId, serviceName, link) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;
  const svc = job.services.find(s => s.service === serviceName);
  if (!svc) return;
  if (svc.editDriveLink === link) return;
  svc.editDriveLink = link;
  saveState();
  if (link) {
    window.addHistory(`Thêm link Drive: ${job.client} – ${serviceName}`);
    showPaymentToast('✓ Đã lưu link Drive', 'var(--success)');
  }
};

window.updateEditorChecklist = (jobId, serviceName, key, checked) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;
  const svc = job.services.find(s => s.service === serviceName);
  if (!svc) return;
  if (!svc.editChecklist) svc.editChecklist = { footage: false, rough: false, color: false, audio: false, export: false };
  svc.editChecklist[key] = checked;
  saveState();
};

window.updateEditorNote = (jobId, serviceName, note) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;
  const svc = job.services.find(s => s.service === serviceName);
  if (!svc) return;
  svc.editorNote = note;
  saveState();
};

window.updateJobLink = (jobId, field, value) => {
  const job = state.jobs.find(j => j.id === jobId);
  if (!job) return;
  job[field] = value;
  saveState();
  if (value) showPaymentToast('✓ Đã lưu link', 'var(--success)');
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

// ============================================================
// DATA EXPORT / IMPORT / RESET
// ============================================================
window.exportCSV = () => {
  const rows = [['Ngày', 'Dự án', 'Khách hàng', 'Nội dung', 'Loại', 'Số tiền', 'Trạng thái']];
  state.jobs.filter(j => !j.isTrash).forEach(job => {
    job.services.forEach(s => {
      rows.push([job.date, job.id, job.client, `${s.service} - ${s.staff} `, 'Chi thợ', s.cost, s.paid ? 'Đã trả' : 'Chưa trả']);
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
      <option>QUAY PS</option><option>CHỤP PS</option><option>QUAY TT</option><option>CHỤP TT</option>
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
    // Actually we imported initFirebase at top of main.js

    // We can't easily dynamically re-import since it's an ES6 module, but we already imported it.
    // However, it's safer to just set the state and reload the page.
    state.settings.firebaseConfig = configStr;
    saveState();
    alert('Đã lưu cấu hình Đám Mây! Vui lòng tải lại trang (F5) để kết nối Database.');
  } catch (err) {
    alert('Lỗi: Cấu hình JSON không hợp lệ. Vui lòng kiểm tra lại!');
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

  // Auto-generate staff accounts: username = tên, password = phone hoặc '1234'
  if (!account) {
    const staffMember = state.staff.find(s => s.name.toLowerCase() === username.toLowerCase());
    if (staffMember) {
      const staffPwd = staffMember.phone || '1234';
      if (password === staffPwd || password === '1234') {
        const isEditor = (staffMember.role || '').toLowerCase().includes('edit');
        account = {
          username: staffMember.name,
          password: staffPwd,
          role: isEditor ? 'editor' : 'staff',
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
  if (account.role === 'editor') {
    state.activePage = 'edit_video';
  } else if (account.role === 'staff') {
    state.activePage = 'staff_portal';
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

  if (state.activePage !== 'settings' && state.activePage !== 'staff') {
    const header = document.createElement('div');
    header.className = 'view-header';
    header.appendChild(renderMonthPicker(state, updateMonth));
    contentArea.appendChild(header);
  }

  // Monthly Filter
  const filteredJobs = state.jobs.filter(job => {
    const jobDate = new Date(job.date);
    return (jobDate.getMonth() + 1) === state.currentMonth && jobDate.getFullYear() === state.currentYear;
  });

  const periodState = { ...state, jobs: filteredJobs };

  switch (state.activePage) {
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

  // ── Initialize SortableJS for ALL kanban views AFTER DOM attach ──
  if (typeof Sortable !== 'undefined') {
    // Main Kanban board
    document.querySelectorAll('.kanban-list').forEach(list => {
      new Sortable(list, {
        group: 'kanban', animation: 150, ghostClass: 'kanban-ghost',
        onEnd: (evt) => {
          const card = evt.item;
          const newStatus = evt.to.dataset.status;
          if (window.updateVideoEditStatus) window.updateVideoEditStatus(card.dataset.jobId, card.dataset.svc, newStatus);
        }
      });
    });
    // Edit Video kanban
    document.querySelectorAll('.ev-col-cards').forEach(col => {
      new Sortable(col, {
        group: 'editVideoKanban', animation: 200, ghostClass: 'sortable-ghost',
        onEnd: (evt) => {
          const card = evt.item;
          const newStatus = evt.to.dataset.status;
          const jobId = card.dataset.jobid;
          const sIdx = parseInt(card.dataset.sidx);
          const job = state.jobs.find(j => j.id === jobId);
          if (job && job.services[sIdx]) {
            window.updateVideoEditStatus && window.updateVideoEditStatus(jobId, job.services[sIdx].service, newStatus);
          }
        }
      });
    });
    // Edit Photo kanban
    document.querySelectorAll('.ep-col-cards').forEach(col => {
      new Sortable(col, {
        group: 'editPhoto', animation: 200, ghostClass: 'sortable-ghost',
        onEnd: (evt) => {
          const card = evt.item;
          const newStatus = evt.to.closest('.ep-col').dataset.status;
          const jobId = card.dataset.jobid;
          const sIdx = parseInt(card.dataset.sidx);
          const job = state.jobs.find(j => j.id === jobId);
          if (job && job.services[sIdx]) {
            window.updateEditStatus && window.updateEditStatus(jobId, job.services[sIdx].service, newStatus);
          }
        }
      });
    });
  }

  if (state.modal.isOpen) {
    const modalOverlay = renderModalOverlay(state, window.closeModal);
    app.appendChild(modalOverlay);
  }
}

// ============================================================
// PHASE 3: CLIENT & CRM FUNCTIONS
// ============================================================
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

// ============================================================
// BOOT & GO-LIVE IMPORT
// ============================================================
window.importGoLiveData = async () => {
  if (!confirm("BẠN CÓ CHẮC CHẮN MUỐN NẠP DỮ LIỆU GO-LIVE?\n\nHành động này sẽ tải 13 Dự án thật từ Google Sheets.\n\nĐặc biệt: Hệ thống tự động PHỤC HỒI Dữ liệu Tháng 1 và Tháng 2 mặc định của bạn.")) return;

  try {
    const res = await fetch('/new_state.json');
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

updateUI();
