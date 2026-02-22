
import { mockData } from './data.js';
import {
  renderDashboard, renderJobs, renderSidebar, renderBottomNav, renderStaff, renderClients,
  renderFinance, renderTax, renderSync, renderMonthPicker, renderNAS, renderModalOverlay,
  renderCalendar, renderTrash, renderSettings, renderDeadlineEdit, renderHistory
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
    rates: mockData.settings?.rates || {}
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

window.addHistory = (action) => {
  state.history.unshift({ time: new Date().toISOString(), action, user: 'Admin' });
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
    date, eventType, phone, package: packageVal, deposit: depositVal,
    venue, notes, linkCustomer, linkNAS, linkDrive, services
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
position: fixed; bottom: 1.5rem; right: 1.5rem; z - index: 9999;
background: ${color}; color: #fff;
padding: 0.6rem 1.25rem; border - radius: 100px;
font - size: 0.9rem; font - weight: 700;
box - shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
animation: toastIn 0.25s cubic - bezier(0.16, 1, 0.3, 1);
pointer - events: none;
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
  const form = document.getElementById(`edit - form - ${name} `);
  if (form) form.style.display = form.style.display === 'none' ? 'block' : 'none';
};

window.saveStaffEdit = (originalName) => {
  const member = state.staff.find(s => s.name === originalName);
  if (!member) return;
  const newName = document.getElementById(`edit - name - ${originalName} `)?.value?.trim() || member.name;
  const newRole = document.getElementById(`edit - role - ${originalName} `)?.value || member.role;
  const newPhone = document.getElementById(`edit - phone - ${originalName} `)?.value || member.phone;
  const newBankNo = document.getElementById(`edit - bankno - ${originalName} `)?.value || '';
  const newBankBank = document.getElementById(`edit - bankname - ${originalName} `)?.value || '';
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
    case 'calendar': contentArea.appendChild(renderCalendar(state)); break;
    case 'trash': contentArea.appendChild(renderTrash(state)); break;
    case 'settings': contentArea.appendChild(renderSettings(state)); break;
    case 'sync': contentArea.appendChild(renderSync(state)); break;
    case 'nas': contentArea.appendChild(renderNAS(state)); break;
    case 'history': contentArea.appendChild(renderHistory(state)); break;
    default: contentArea.appendChild(renderDashboard(periodState, window.navigate));
  }

  app.appendChild(contentArea);

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
