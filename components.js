import { normalizeServiceName, calculateDeadlines, formatCurrency, generateId } from './logic.js';

// Helper: staff field có thể là string hoặc array (từ sync). Normalize về string.
function _staffStr(staff) {
  if (Array.isArray(staff)) return staff.join(', ');
  return staff || '';
}

function isValidServiceRow(svc) {
  const name = String(svc?.service || '').trim();
  if (!name) return false;
  // Loại các dòng số tiền/ghi chú bị lẫn vào cột dịch vụ
  if (/^\d[\d\.,\s]*đ?$/i.test(name)) return false;
  if (/^(tổng giá trị hợp đồng|chênh lệch|giá trị gói|số tiền cọc|ghi chú|chi phí phát sinh)$/i.test(name)) return false;
  return true;
}

export function renderSidebar(activePage, navigate) {
  const aside = document.createElement('aside');
  aside.className = 'sidebar';
  const notifLog = (window.state?.notificationLog) || [];
  const unreadCount = notifLog.filter(n => !n.read).length;
  aside.innerHTML = `
    <div class="sidebar-brand" style="display:flex;align-items:center;gap:0.55rem;justify-content:space-between">
      <div style="display:flex;align-items:center;gap:0.55rem">
        <img src="/haru-job-logo.png" alt="Haru Job" style="width:24px;height:24px;object-fit:contain;border-radius:6px" />
        <span>HARU JOB</span>
      </div>
      <!-- Phase 3 #8: Notification Bell -->
      <div style="position:relative;cursor:pointer" onclick="window.toggleNotifPanel()" title="Thông báo">
        <span style="font-size:1.1rem">&#128276;</span>
        <span id="notif-bell-badge" style="position:absolute;top:-4px;right:-4px;background:#ef4444;color:#fff;font-size:0.55rem;font-weight:900;min-width:16px;height:16px;border-radius:50%;display:${unreadCount > 0 ? 'flex' : 'none'};align-items:center;justify-content:center;border:2px solid var(--bg-sidebar)">${unreadCount > 9 ? '9+' : unreadCount}</span>
      </div>
    </div>

    <!-- Phase 3 #8: Notification Dropdown Panel -->
    <div id="notif-dropdown-panel" style="display:none;position:absolute;top:60px;left:0;right:0;z-index:9999;background:var(--bg-card);border:1px solid var(--border);border-radius:10px;margin:0 0.5rem;box-shadow:0 8px 24px rgba(0,0,0,0.12);max-height:340px;overflow-y:auto">
      <div style="padding:0.6rem 0.9rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:0.8rem;font-weight:800">&#128276; Lịch sử hoạt động</span>
        <button onclick="event.stopPropagation();window.clearNotifLog()" style="background:none;border:none;font-size:0.68rem;color:var(--text-dim);cursor:pointer;font-weight:700">Xóa tất cả</button>
      </div>
      ${notifLog.length === 0 ? '<div style="padding:1rem;text-align:center;font-size:0.8rem;color:var(--text-dim)">Chưa có hoạt động nào</div>' : notifLog.slice(0, 20).map(n => `
        <div style="padding:0.5rem 0.9rem;border-bottom:1px solid var(--border);${!n.read ? 'background:rgba(59,130,246,0.05)' : ''}">
          <div style="font-size:0.75rem;font-weight:700;color:var(--text-main)">${n.action}</div>
          <div style="font-size:0.62rem;color:var(--text-dim);margin-top:0.15rem">${new Date(n.time).toLocaleTimeString('vi-VN')} • ${n.user}</div>
        </div>`).join('')}
    </div>

    <nav class="sidebar-nav">
      <div class="nav-item" onclick="window.openGlobalSearch()" style="background: rgba(22,163,74,0.1); border: 1px dashed rgba(22,163,74,0.3); margin-bottom: 0.5rem; justify-content: space-between">
        <span><span class="icon">&#128270;</span> Tìm kiếm</span>
        <span style="font-size: 0.65rem; padding: 0.15rem 0.3rem; background: rgba(0,0,0,0.05); border-radius: 4px; color: var(--text-dim)">Cmd+K</span>
      </div>

      ${(window.state?.currentUser?.role === 'admin' || !window.state?.currentUser) ? `
      <div class="nav-item ${activePage === 'portfolio' ? 'active' : ''}" onclick="window.navigate('portfolio')" style="background: rgba(249,115,22,0.1); border: 1px solid rgba(249,115,22,0.25); margin-bottom: 0.75rem; font-weight: 800;">
        <span class="icon">🖼️</span> Album
        <span style="font-size:0.6rem;background:rgba(249,115,22,0.15);color:#f97316;padding:0.15rem 0.4rem;border-radius:6px;font-weight:900;margin-left:auto">HUB</span>
      </div>` : ''}

      <div style="font-size: 0.82rem; font-weight: 800; color: var(--text-dim); margin: 1rem 0 0.5rem 0.75rem; text-transform: uppercase;">&#272;iều hành</div>
      ${window.state?.currentUser?.role !== 'admin' ? `
      <div class="nav-item ${activePage === 'workspace' ? 'active' : ''}" onclick="window.navigate('workspace')" style="background: rgba(168,85,247,0.1); border-left: 3px solid #a855f7; margin-bottom: 0.5rem; justify-content: space-between;">
        <span><span class="icon">🚀</span> Không gian làm việc</span>
      </div>
      ` : ''}
      <div class="nav-item ${activePage === 'dashboard' ? 'active' : ''}" onclick="window.navigate('dashboard')">
        <span class="icon">&#128202;</span> Dự án
      </div>
      <div class="nav-item ${activePage === 'edit' ? 'active' : ''}" onclick="window.navigate('edit')">
        <span class="icon">&#127916;</span> Deadline EDIT
      </div>
      <div class="nav-item ${activePage === 'edit_video' ? 'active' : ''}" onclick="window.navigate('edit_video')">
        <span class="icon">&#127902;&#65039;</span> Edit Video
      </div>
      <div class="nav-item ${activePage === 'edit_photo' ? 'active' : ''}" onclick="window.navigate('edit_photo')">
        <span class="icon">&#128247;</span> Edit Photo
      </div>
      <div class="nav-item ${activePage === 'kanban' ? 'active' : ''}" onclick="window.navigate('kanban')">
        <span class="icon">&#128203;</span> Kanban
      </div>
      <div class="nav-item ${activePage === 'calendar' ? 'active' : ''}" onclick="window.navigate('calendar')">
        <span class="icon">&#128197;</span> Lịch / Nhắc việc
      </div>

      ${(window.state?.currentUser?.role === 'admin' || !window.state?.currentUser) ? `
      <div style="font-size: 0.82rem; font-weight: 800; color: var(--text-dim); margin: 1.5rem 0 0.5rem 0.75rem; text-transform: uppercase;">Quản lý</div>
      <div class="nav-item ${activePage === 'jobs' ? 'active' : ''}" onclick="window.navigate('jobs')">
        <span class="icon">&#128193;</span> Lưu trữ dự án
      </div>
      <div class="nav-item ${activePage === 'clients' ? 'active' : ''}" onclick="window.navigate('clients')">
        <span class="icon">&#129309;</span> Khách hàng
      </div>
      <div class="nav-item ${activePage === 'finance' ? 'active' : ''}" onclick="window.navigate('finance')">
        <span class="icon">&#128210;</span> Giao dịch
      </div>
      <div class="nav-item ${activePage === 'tax' ? 'active' : ''}" onclick="window.navigate('tax')">
        <span class="icon">&#127974;</span> Thuế
      </div>
      <div class="nav-item ${activePage === 'staff' ? 'active' : ''}" onclick="window.navigate('staff')">
        <span class="icon">&#127917;</span> Nhân sự
      </div>

      <div class="nav-item ${activePage === 'analytics' ? 'active' : ''}" onclick="window.navigate('analytics')">
        <span class="icon">&#128202;</span> Analytics
      </div>
      <div class="nav-item ${activePage === 'watermark' ? 'active' : ''}" onclick="window.navigate('watermark')">
        <span class="icon">&#127916;</span> Watermark
      </div>

      <div style="font-size: 0.82rem; font-weight: 800; color: var(--text-dim); margin: 1.5rem 0 0.5rem 0.75rem; text-transform: uppercase;">Hệ thống</div>
      <div class="nav-item ${activePage === 'sync' ? 'active' : ''}" onclick="window.navigate('sync')">
        <span class="icon">&#128260;</span> Sync dữ liệu
      </div>
      <div class="nav-item ${activePage === 'nas' ? 'active' : ''}" onclick="window.navigate('nas')">
        <span class="icon">&#9729;&#65039;</span> NAS / Drive
      </div>
      <div class="nav-item ${activePage === 'history' ? 'active' : ''}" onclick="window.navigate('history')">
        <span class="icon">&#128220;</span> Lịch sử
      </div>
      <div class="nav-item ${activePage === 'trash' ? 'active' : ''}" onclick="window.navigate('trash')">
        <span class="icon">&#128465;&#65039;</span> Thùng rác
      </div>
      <div class="nav-item ${activePage === 'settings' ? 'active' : ''}" onclick="window.navigate('settings')">
        <span class="icon">👑</span> Admin Center
      </div>` : ''}


      <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--border)">
        <div class="nav-item" onclick="window.toggleTheme();window.updateUI()" style="cursor:pointer">
          <span class="icon">${document.documentElement.getAttribute('data-theme') === 'dark' ? '&#9728;&#65039;' : '&#127769;'}</span> ${document.documentElement.getAttribute('data-theme') === 'dark' ? 'Sáng' : 'Tối'}
        </div>
        <div class="nav-item" onclick="window.logout()" style="color: #ef4444">
          <span class="icon">&#128682;</span> Đăng xuất
        </div>
      </div>
    </nav>
  `;
  // Close notif panel when clicking outside
  setTimeout(() => {
    document.addEventListener('click', function _closeNotif(e) {
      const panel = document.getElementById('notif-dropdown-panel');
      if (panel && panel.style.display !== 'none' && !aside.contains(e.target)) {
        panel.style.display = 'none';
        document.removeEventListener('click', _closeNotif);
      }
    });
  }, 100);
  return aside;
}

export function renderBottomNav(activePage, navigate) {
  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';

  // Chỉ hiện các nút quan trọng nhất cho Mobile
  const items = [
    { id: 'dashboard', icon: '📊', label: 'Dự án' },
    { id: 'staff', icon: '🎭', label: 'Nhân sự' },
    { id: 'edit_video', icon: '🎞️', label: 'Edit' },
    { id: 'calendar', icon: '📅', label: 'Lịch' }
  ];
  if (window.state?.staffViewMode !== 'staff') {
    items.push({ id: 'finance', icon: '📒', label: 'Tiền' });
    items.push({ id: 'jobs', icon: '📁', label: 'Lưu trữ' });
  }

  nav.innerHTML = items.map(item => `
    <div class="bottom-nav-item ${activePage === item.id ? 'active' : ''}" onclick="window.navigate('${item.id}')">
      <span class="icon">${item.icon}</span>
      <span>${item.label}</span>
    </div>
  `).join('') + `
    <div class="bottom-nav-item" onclick="window.logout()" style="color:#ef4444">
      <span class="icon">🚪</span>
      <span>Thoát</span>
    </div>
  `;

  return nav;
}

export function renderMonthPicker(state, updateMonth) {
  const picker = document.createElement('div');
  picker.className = 'month-picker';
  const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];

  // Multi-month label
  const em = state.extraMonth;
  const multiLabel = em ? `T${state.currentMonth} + T${em.month}` : '';

  picker.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 0.5rem">
      <div style="display: flex; align-items: center; gap: 0.5rem;">
         <button class="picker-btn" id="prev-year">←</button>
         <div class="year-label" style="font-size: 1.1rem; padding: 0.2rem; font-weight: 900">${state.currentYear}</div>
         <button class="picker-btn" id="next-year">→</button>
      </div>
      <select id="month-select" class="form-control" style="font-size: 0.95rem; font-weight: 700; padding: 0.4rem 1rem; background: var(--surface); color: var(--text-main); border: 1.5px solid var(--primary); border-radius: 8px; flex-grow: 1; max-width: 150px; cursor: pointer; outline: none; appearance: auto">
        ${months.map((m, i) => `
          <option value="${i + 1}" ${state.currentMonth === i + 1 ? 'selected' : ''}>Tháng ${i + 1}</option>
        `).join('')}
      </select>
      <button id="multi-month-btn" style="font-size:0.72rem;padding:0.3rem 0.6rem;border-radius:16px;cursor:pointer;font-weight:700;font-family:inherit;border:1.5px solid ${em ? 'var(--primary)' : 'var(--border)'};background:${em ? 'var(--primary)' : 'var(--surface)'};color:${em ? '#fff' : 'var(--text-dim)'}" title="Gộp thêm 1 tháng kế tiếp">${em ? multiLabel : '+1T'}</button>
    </div>
  `;

  picker.querySelector('#month-select').onchange = (e) => {
    state.extraMonth = null; // Reset multi-month when changing primary
    updateMonth(parseInt(e.target.value), state.currentYear);
  };

  picker.querySelector('#prev-year').onclick = () => { state.extraMonth = null; updateMonth(state.currentMonth, state.currentYear - 1); };
  picker.querySelector('#next-year').onclick = () => { state.extraMonth = null; updateMonth(state.currentMonth, state.currentYear + 1); };

  // Multi-month toggle
  picker.querySelector('#multi-month-btn').onclick = () => {
    if (state.extraMonth) {
      state.extraMonth = null;
    } else {
      // Add next month
      let nm = state.currentMonth + 1;
      let ny = state.currentYear;
      if (nm > 12) { nm = 1; ny++; }
      state.extraMonth = { month: nm, year: ny };
    }
    if (window.updateUI) window.updateUI();
  };

  return picker;
}
// ============================================================
// MY WORKSPACE (STAFF/EDITOR DASHBOARD)
// ============================================================
export function renderWorkspace(state) {
  const container = document.createElement('div');
  container.className = 'view-container reveal';

  const user = state.currentUser || {};
  const myName = user.staffName || user.username || 'Nhân sự';
  const role = user.role === 'editor' ? 'Editor' : 'Staff';

  // Helper to check if a staff string includes myName
  const isMe = (staffStr) => {
    if (!staffStr) return false;
    return staffStr.toLowerCase().includes(myName.toLowerCase());
  };

  // 1. Upcoming Shoots
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const upcomingShoots = state.jobs.filter(job => {
    if (job.isTrash) return false;

    let assigned = false;
    if (job.services) {
      if (job.services.some(s => isMe(s.staff))) assigned = true;
    }
    if (job.eventDays) {
      job.eventDays.forEach(day => {
        if (day.services && day.services.some(s => isMe(s.staff))) assigned = true;
      });
    }

    // Only future or today jobs
    if (assigned) {
      const d = new Date(job.date);
      d.setHours(0, 0, 0, 0);
      if (d >= todayDate) return true;
    }
    return false;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  // 2. Editing Tasks
  const editingTasks = [];
  state.jobs.forEach(job => {
    if (job.isTrash) return;
    (job.deliverables || []).forEach((del, dIdx) => {
      if (isMe(del.editor)) {
        editingTasks.push({ job, del, dIdx });
      }
    });
  });

  // Sort editing tasks by deadline (closest first)
  editingTasks.sort((a, b) => {
    const da = new Date(a.job.date);
    const db = new Date(b.job.date);
    return da - db;
  });

  const shootsHtml = upcomingShoots.length === 0
    ? `<div style="padding:1.5rem;text-align:center;color:var(--text-dim);background:var(--bg-sidebar);border-radius:12px;font-size:0.85rem">Không có lịch đi quay/chụp nào sắp tới.</div>`
    : `<div style="display:grid;gap:0.75rem">
        ${upcomingShoots.map(j => {
      const d = new Date(j.date);
      const theDate = d.toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit' });
      return `
          <div class="glass-panel" style="padding:1rem;display:flex;align-items:center;justify-content:space-between;cursor:pointer" onclick="window.openModal('job_detail', '${j.id}')">
            <div>
              <div style="font-weight:800;color:var(--text-main);font-size:1rem;margin-bottom:0.25rem">${j.client}</div>
              <div style="font-size:0.75rem;color:var(--text-dim)">📍 ${j.venue || 'Chưa rõ địa điểm'}</div>
            </div>
            <div style="text-align:right">
              <div style="font-size:0.85rem;font-weight:900;color:var(--primary);background:rgba(22,163,74,0.1);padding:0.25rem 0.6rem;border-radius:8px">${theDate}</div>
            </div>
          </div>
          `;
    }).join('')}
       </div>`;

  const editsHtml = editingTasks.length === 0
    ? `<div style="padding:1.5rem;text-align:center;color:var(--text-dim);background:var(--bg-sidebar);border-radius:12px;font-size:0.85rem">Không có task hậu kỳ nào cần xử lý.</div>`
    : `<div style="display:grid;gap:0.75rem;grid-template-columns:repeat(auto-fill,minmax(280px,1fr))">
        ${editingTasks.map(t => {
      const statusColors = {
        'Chưa bắt đầu': '#94a3b8',
        'Đang cắt': '#3b82f6',
        'Demo 1': '#f59e0b',
        'Chỉnh sửa': '#8b5cf6',
        'Hoàn thành': '#22c55e'
      };
      const color = statusColors[t.del.editStatus || 'Chưa bắt đầu'] || '#94a3b8';
      return `
          <div class="glass-panel" style="padding:1rem;border-left:4px solid ${color}">
            <div style="font-size:0.75rem;color:var(--text-dim);margin-bottom:0.3rem">K/H: <span style="font-weight:700;color:var(--text-main)">${t.job.client}</span></div>
            <div style="font-weight:800;font-size:0.95rem;margin-bottom:0.75rem">${t.del.name} <span style="font-weight:500;font-size:0.7rem;color:var(--text-dim)">(${t.del.quantity || 1})</span></div>
            
            <div style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.75rem">
              <select class="input-modern" style="padding:0.3rem 0.6rem;font-size:0.75rem;flex:1;background:var(--bg-sidebar)" onchange="window.updateEditStatus('${t.job.id}', '${t.del.name}', this.value)">
                ${Object.keys(statusColors).map(s => `<option value="${s}" ${t.del.editStatus === s ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
            </div>
            
            <button class="btn btn-secondary btn-sm" style="width:100%;font-size:0.7rem" onclick="window.openModal('job_detail', '${t.job.id}')">Xem chi tiết Job</button>
          </div>
          `;
    }).join('')}
       </div>`;

  container.innerHTML = `
    <div style="padding:1.5rem;border-bottom:1px solid var(--border);margin-bottom:1.5rem">
      <h1 style="font-size:1.6rem;font-weight:900;background:-webkit-linear-gradient(-45deg,#a855f7,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:0.25rem">Xin chào, ${myName}!</h1>
      <div style="font-size:0.85rem;color:var(--text-dim)">Đây là không gian làm việc của bạn. Vai trò: <strong>${role}</strong></div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:2rem">
      <div>
        <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:1rem">
          <div style="width:32px;height:32px;border-radius:10px;background:rgba(22,163,74,0.1);color:#16a34a;display:flex;align-items:center;justify-content:center;font-size:1.1rem">🎥</div>
          <h2 style="font-size:1.1rem;font-weight:800;margin:0">Lịch quay/chụp sắp tới</h2>
        </div>
        ${shootsHtml}
      </div>

      <div>
        <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:1rem">
          <div style="width:32px;height:32px;border-radius:10px;background:rgba(168,85,247,0.1);color:#a855f7;display:flex;align-items:center;justify-content:center;font-size:1.1rem">💻</div>
          <h2 style="font-size:1.1rem;font-weight:800;margin:0">Hậu kỳ đang được giao</h2>
        </div>
        ${editsHtml}
      </div>
    </div>
  `;
  return container;
}

export function renderDashboard(state, navigate) {
  const container = document.createElement('div');
  container.className = 'view-container reveal';

  const monthKey = `${state.currentYear}-${state.currentMonth}`;
  const meta = state.financeMetadata[monthKey] || { ads: 0, office: 0 };

  // Get all unique staff names for filter chips
  const allStaffNames = [...new Set(state.jobs.flatMap(j => j.services.map(s => s.staff)))].sort();

  // Apply filters
  let monthJobs = state.jobs.filter(j => !j.isTrash);

  const isOverdueJob = (job) => {
    if (!job?.date) return false;
    if ((job.status || '').toLowerCase().includes('hoàn thành')) return false;
    const eventDate = new Date(job.date);
    if (Number.isNaN(eventDate.getTime())) return false;
    const deadline = new Date(eventDate);
    deadline.setDate(deadline.getDate() + 30);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);
    return deadline < today;
  };

  if (state.staffFilter && state.staffFilter !== 'TẤT CẢ') {
    monthJobs = monthJobs.filter(j => j.services.some(s => s.staff === state.staffFilter));
  }
  if (state.statusFilter && state.statusFilter !== 'TẤT CẢ') {
    if (state.statusFilter === 'QUÁ HẠN') {
      monthJobs = monthJobs.filter(isOverdueJob);
    } else {
      monthJobs = monthJobs.filter(j => j.status === state.statusFilter);
    }
  }
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    monthJobs = monthJobs.filter(j =>
      j.client.toLowerCase().includes(q) ||
      j.id.toLowerCase().includes(q) ||
      (j.venue || '').toLowerCase().includes(q) ||
      (j.notes || '').toLowerCase().includes(q)
    );
  }

  const revenue = monthJobs.reduce((sum, j) => sum + j.package, 0);
  const staffCosts = monthJobs.reduce((sum, j) => sum + (j.services || []).filter(isValidServiceRow).reduce((s, ser) => s + (ser.cost || 0), 0), 0);
  const editCosts = monthJobs.reduce((sum, j) => sum + (j.services || []).filter(isValidServiceRow).reduce((s, ser) => s + (ser.edit || 0), 0), 0);

  const totalCost = staffCosts + editCosts + (meta.ads || 0) + (meta.office || 0);
  const netProfit = revenue - totalCost;

  // Unique statuses for dropdown + smart status
  const allStatuses = [...new Set(state.jobs.map(j => j.status))].sort();
  const overdueCount = state.jobs.filter(j => !j.isTrash).filter(isOverdueJob).length;

  container.innerHTML = `
    <header class="section-header">
      <div>
        <h1 class="view-title">Danh sách Dự án</h1>
        <p style="color: var(--text-dim); font-size: 0.9rem;">Quản lý tiến độ, tổng kết và tình trạng dự án của bạn</p>
      </div>
      <div style="display: flex; gap: 0.75rem; align-items: center">
         <div onclick="window.openGlobalSearch()" style="background: #fff; border: 1.5px solid var(--border); color: var(--text-dim); padding: 0.4rem 0.75rem; border-radius: 8px; font-size: 0.85rem; width: 220px; cursor: pointer; display: flex; align-items: center; justify-content: space-between">
           <span><i class="fas fa-search" style="margin-right:0.4rem"></i> Tìm kiếm toàn cục...</span>
           <span style="font-size: 0.65rem; background: var(--bg-hover); padding: 0.1rem 0.3rem; border-radius: 4px">Cmd+K</span>
         </div>
         <select onchange="window.setStatusFilter(this.value)"
           style="background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: var(--text-main); background: #fff; padding: 0.4rem 0.5rem; border-radius: 6px; font-size: 0.7rem">
           <option value="TẤT CẢ" ${state.statusFilter === 'TẤT CẢ' ? 'selected' : ''}>Tất cả trạng thái</option>
           <option value="QUÁ HẠN" ${state.statusFilter === 'QUÁ HẠN' ? 'selected' : ''}>Quá hạn (${overdueCount})</option>
           ${allStatuses.map(s => `<option value="${s}" ${state.statusFilter === s ? 'selected' : ''}>${s}</option>`).join('')}
         </select>

         <button class="btn btn-primary" onclick="window.openModal('add_job')">
           <i class="fas fa-plus"></i> Thêm Dự Án
         </button>
      </div>
    </header>

    <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 1rem">
      <button onclick="window.setStaffFilter('TẤT CẢ')" class="btn btn-sm" style="font-size: 0.82rem; padding: 0.2rem 0.6rem; border-radius: 20px; ${state.staffFilter === 'TẤT CẢ' ? 'background: var(--accent); color: #000; border: none' : 'background: rgba(255,255,255,0.05); color: var(--text-dim); border: 1px solid var(--border)'}">Tất cả</button>
      ${allStaffNames.map(name => `
        <button onclick="window.setStaffFilter('${name}')" class="btn btn-sm" style="font-size: 0.82rem; padding: 0.2rem 0.6rem; border-radius: 20px; ${state.staffFilter === name ? 'background: var(--accent); color: #000; border: none' : 'background: rgba(255,255,255,0.05); color: var(--text-dim); border: 1px solid var(--border)'}">${name}</button>
      `).join('')}
    </div>

    ${state.staffFilter && state.staffFilter !== 'TẤT CẢ' ? (() => {
      const sName = state.staffFilter;
      const totalEarnings = monthJobs.reduce((sum, j) => sum + j.services.filter(s => s.staff && _staffStr(s.staff).includes(sName)).reduce((s, ser) => s + ser.cost, 0), 0);
      const paidEarnings = monthJobs.reduce((sum, j) => sum + j.services.filter(s => s.staff && _staffStr(s.staff).includes(sName) && s.paid).reduce((s, ser) => s + ser.cost, 0), 0);
      const unpaidEarnings = totalEarnings - paidEarnings;
      return `
        <div class="staff-quick-view reveal" style="margin-top: 1.5rem; padding: 1.25rem 1.5rem; background: rgba(22,163,74,0.05); border: 1px solid rgba(22,163,74,0.15); border-radius: 12px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 4px 15px rgba(0,0,0,0.02)">
           <div style="display: flex; align-items: center; gap: 1rem">
              <div style="width: 48px; height: 48px; background: rgba(22,163,74,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--success); font-weight: 800">
                 ${sName.charAt(0)}
              </div>
              <div>
                 <div style="font-size: 1.15rem; font-weight: 800; color: var(--text-main)">${sName}</div>
                 <div style="font-size: 0.85rem; color: var(--text-dim)">Tham gia ${monthJobs.length} dự án trong tháng ${state.currentMonth}</div>
              </div>
           </div>
           <div style="display: flex; gap: 2.5rem; border-left: 1px solid rgba(22,163,74,0.15); padding-left: 2.5rem">
              <div>
                 <div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 800; color: var(--text-dim); margin-bottom: 0.2rem">Tổng thu nhập</div>
                 <div class="payment-metric" style="font-size: 1.15rem; font-weight: 900; color: var(--text-main)">${formatCurrency(totalEarnings)}</div>
              </div>
              <div>
                 <div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 800; color: var(--text-dim); margin-bottom: 0.2rem">Đã thanh toán</div>
                 <div class="payment-metric" style="font-size: 1.15rem; font-weight: 900; color: var(--success)">${formatCurrency(paidEarnings)}</div>
              </div>
              <div>
                 <div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 800; color: var(--text-dim); margin-bottom: 0.2rem">Còn nợ</div>
                 <div class="payment-metric" style="font-size: 1.15rem; font-weight: 900; color: var(--danger)">${formatCurrency(unpaidEarnings)}</div>
              </div>
           </div>
        </div>
      `;
    })() : ''}

    <div class="monthly-report glass-panel" style="margin-top: 0.5rem; padding: 0.6rem 0.8rem; border: 1px solid var(--border-bright)">
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap">
        <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap">
          <div class="stat-card" style="min-width:50px">
            <span class="label" style="font-size: 0.5rem">Tổng Dự án</span>
            <div class="value" style="font-size: 0.9rem; font-weight: 800">${monthJobs.length}</div>
          </div>
          <div style="width:1px;height:28px;background:var(--border)"></div>
          <div style="display: flex; gap: 0.8rem; flex-wrap: wrap">
            <div style="min-width: 80px">
              <span style="font-size: 0.5rem; text-transform: uppercase; font-weight: 800; color:var(--text-dim); display:block">Doanh thu</span>
              <div style="font-size: 0.85rem; font-weight: 800">${formatCurrency(revenue)}</div>
            </div>
            <div style="min-width: 80px">
              <span style="font-size: 0.5rem; text-transform: uppercase; font-weight: 800; color:var(--text-dim); display:block">Nhân sự/Edit</span>
              <div style="font-size: 0.85rem; font-weight: 800">${formatCurrency(staffCosts + editCosts)}</div>
            </div>
            <div style="min-width: 80px">
              <span style="font-size: 0.5rem; text-transform: uppercase; font-weight: 800; color:var(--text-dim); display:block">Ads/Office</span>
              <div style="font-size: 0.85rem; font-weight: 800">${formatCurrency((meta.ads || 0) + (meta.office || 0))}</div>
            </div>
            <div style="min-width: 80px">
              <span style="font-size: 0.5rem; text-transform: uppercase; font-weight: 800; color:var(--text-dim); display:block">Lợi nhuận ròng</span>
              <div style="font-size: 1rem; font-weight: 900; color: ${netProfit >= 0 ? 'var(--success)' : 'var(--danger)'}">${formatCurrency(netProfit)}</div>
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; align-items: center; background: rgba(0,0,0,0.03); padding: 0.4rem 0.6rem; border-radius: 8px">
          <span style="font-size: 0.75rem; color: var(--text-dim); font-weight: 600">Ads:</span>
          <input type="number" id="ads-input-${monthKey}" value="${meta.ads}" style="background: #fff; border: 1px solid var(--border); font-size: 0.78rem; width: 80px; color: var(--text-main); font-weight: 700; border-radius: 6px; padding: 0.25rem 0.4rem">
          <span style="font-size: 0.75rem; color: var(--text-dim); font-weight: 600">Off:</span>
          <input type="number" id="off-input-${monthKey}" value="${meta.office}" style="background: #fff; border: 1px solid var(--border); font-size: 0.78rem; width: 80px; color: var(--text-main); font-weight: 700; border-radius: 6px; padding: 0.25rem 0.4rem">
          <button class="btn btn-secondary btn-sm" style="font-size: 0.75rem; padding: 0.25rem 0.6rem" onclick="window.saveMonthlyReport('${monthKey}')">💾 Lưu</button>
        </div>
      </div>
    </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 0.5rem">
         <button class="btn btn-primary btn-sm" onclick="window.viewPA3Report('${monthKey}')">📊 Xem PA3</button>
      </div>
    </div>

    <div class="job-grid" style="margin-top: 1.5rem">
      ${monthJobs.length > 0 ? monthJobs.slice().sort((a, b) => new Date(a.date) - new Date(b.date)).map(job => renderJobCard(job)).join('') : '<div class="empty-state">Chưa có dự án nào được ghi nhận</div>'}
    </div>
  `;

  return container;
}

function renderJobCard(job) {
  const deadlines = calculateDeadlines(job.date);
  const statusClass = job.status.toLowerCase().replace(/\s+/g, '-');

  const validServices = (job.services || []).filter(isValidServiceRow);
  const staffCosts = validServices.reduce((sum, s) => sum + (s.cost || 0), 0);
  const editCosts = validServices.reduce((sum, s) => sum + (s.edit || 0), 0);
  const profit = job.package - (staffCosts + editCosts);

  // High-Precision Metrics
  const photoCount = validServices.filter(s => (s.service || '').toLowerCase().includes('chụp')).length;
  const videoCount = validServices.filter(s => (s.service || '').toLowerCase().includes('quay')).length;

  const isCompleted = job.status === 'Đã hoàn thành' || job.status === 'Nhận Feedback';
  return `
    <div class="job-card glass-panel" onclick="window.openQuickPreview('${job.id}')" style="${isCompleted ? 'border-left: 4px solid #22c55e; opacity: 0.85; background: rgba(34,197,94,0.03)' : ''}">
      <div class="job-card-header" style="margin-bottom: 0.5rem">
        <div style="display: flex; flex-direction: column; gap: 0.1rem">
          <h3 class="job-card-title" style="font-size: 1.08rem; color: var(--text-main)">${job.client}</h3>
          <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap">
            <span style="font-size: 0.85rem; color: var(--text-dim)">${(() => {
      const days = job.eventDays && job.eventDays.length > 1 ? job.eventDays : null;
      if (days) {
        const dates = days.map(d => d.date).filter(Boolean).sort();
        return dates.length > 1 ? new Date(dates[0]).toLocaleDateString('vi-VN') + ' → ' + new Date(dates[dates.length - 1]).toLocaleDateString('vi-VN') : new Date(job.date).toLocaleDateString('vi-VN');
      }
      return new Date(job.date).toLocaleDateString('vi-VN');
    })()}</span>
            ${job.eventDays && job.eventDays.length > 1 ? `<span class="multi-day-badge">📅 ${job.eventDays.length} ngày</span>` : ''}
            ${job.clientRating ? `<span style="font-size: 0.7rem; letter-spacing: 1px">${'⭐'.repeat(job.clientRating)}${'☆'.repeat(5 - job.clientRating)}</span>` : ''}
            ${(job.clientTags || []).map(t => {
      const tc = { VIP: '#eab308', ['Khó tính']: '#ef4444', ['Dễ thương']: '#22c55e', ['Quay lại']: '#3b82f6', ['Mới']: '#8b5cf6' };
      return `<span style="font-size:0.55rem;font-weight:800;padding:0.1rem 0.35rem;border-radius:4px;background:${(tc[t] || '#64748b')}15;color:${tc[t] || '#64748b'};border:1px solid ${(tc[t] || '#64748b')}25">${t}</span>`;
    }).join('')}
          </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.25rem">
           <div style="display: flex; gap: 0.3rem">
              ${!job.visibility ? '<span class="badge" style="background: rgba(239,68,68,0.1); color: #ef4444; font-size: 0.55rem">Ẩn</span>' : ''}
              <div class="job-id-badge" style="font-size: 0.55rem">#${job.jobNo || 0}</div>
           </div>
           <div class="job-status-pill status-${statusClass}">${job.status}</div>
        </div>
      </div>

      <div class="job-card-body" style="border-top: 1px solid var(--border); padding-top: 0.5rem">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem">
           <div style="display: flex; flex-direction: column">
              <span style="font-size: 0.9rem; font-weight: 800; color: var(--accent)">${job.eventType || 'Dự án Wedding'}</span>
              <span style="font-size: 0.65rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.3rem">
                <i class="fas fa-location-dot" style="font-size: 0.82rem"></i> ${job.venue || 'Chưa cập địa điểm'}
              </span>
           </div>
           <div style="text-align: right">
              <span style="font-size: 0.82rem; color: var(--text-dim); display: block">chụp ${photoCount} · quay ${videoCount}</span>
              <span style="font-size: 0.82rem; font-weight: 600; color: var(--text-dim)">${job.phone || ''}</span>
           </div>
        </div>

        <div style="display: flex; gap: 1rem; margin-bottom: 0.5rem; background: rgba(255,255,255,0.02); padding: 0.5rem; border-radius: 6px">
           ${(() => {
      const tl = (job.eventDays && job.eventDays.length > 0) ? job.eventDays[0].timeline : job.timeline;
      return `<div style="flex: 1">
              <label style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-dim); font-weight:700; display: block">Lễ Ceremony</label>
              <span style="font-size: 0.9rem; font-weight: 800; color: #f97316">${tl?.le || '--:--'}</span>
           </div>
           <div style="flex: 1">
              <label style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-dim); font-weight:700; display: block">Tiệc Party</label>
              <span style="font-size: 0.9rem; font-weight: 800; color: #f97316">${tl?.tiec || '--:--'}</span>
           </div>`;
    })()}
        </div>

        <div class="job-details-list" style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem">
          ${(() => {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const jDate = new Date(job.date); jDate.setHours(0, 0, 0, 0);
      const pDate = new Date(jDate); pDate.setDate(pDate.getDate() + 15);
      const vDate = new Date(jDate); vDate.setDate(vDate.getDate() + 30);
      const isPending = job.status !== 'Đã hoàn thành' && job.status !== 'Nhận Feedback';
      const pWarn = isPending && pDate < today;
      const vWarn = isPending && vDate < today;

      return `
               <div style="background: ${pWarn ? 'rgba(239,68,68,0.1)' : 'rgba(59,130,246,0.05)'}; padding: 0.3rem; border-radius: 4px; border: 1px solid ${pWarn ? 'rgba(239,68,68,0.3)' : 'transparent'}">
                 <label style="font-size: 0.72rem; color: ${pWarn ? '#ef4444' : 'var(--text-dim)'}; font-weight: ${pWarn ? '800' : '600'}">${pWarn ? '⚠️ DL Photo' : 'DL Photo'}</label>
                 <span style="font-size: 0.82rem; font-weight: 800; font-family: monospace; display: block; color: ${pWarn ? '#ef4444' : 'inherit'}">${deadlines.photo}</span>
               </div>
               <div style="background: ${vWarn ? 'rgba(239,68,68,0.1)' : 'rgba(236,72,153,0.05)'}; padding: 0.3rem; border-radius: 4px; border: 1px solid ${vWarn ? 'rgba(239,68,68,0.3)' : 'transparent'}">
                 <label style="font-size: 0.72rem; color: ${vWarn ? '#ef4444' : 'var(--text-dim)'}; font-weight: ${vWarn ? '800' : '600'}">${vWarn ? '⚠️ DL Video' : 'DL Video'}</label>
                 <span style="font-size: 0.82rem; font-weight: 800; font-family: monospace; display: block; color: ${vWarn ? '#ef4444' : 'inherit'}">${deadlines.video}</span>
               </div>
             `;
    })()}
        </div>

        <div style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-dim)">
           <i class="fas fa-users-viewfinder" style="margin-right: 0.3rem; color:var(--text-dim)"></i>
           ${renderStaffChips(job)}</div>
      </div>

      <div class="job-card-footer" style="margin-top: 0.75rem; border-top: 1px dashed var(--border); padding-top: 0.5rem">
         ${window.state?.currentUser?.role !== 'admin' ? '' : `
         <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem">
            <div style="font-size: 0.82rem"><span style="color: var(--text-dim)">Gói:</span> ${formatCurrency(job.package)}</div>
            <div style="font-size: 0.82rem"><span style="color: var(--text-dim)">Cọc</span> ${formatCurrency(job.deposit || 0)}</div>
            <div style="font-size: 0.82rem"><span style="color: var(--text-dim)">Thợ:</span> ${formatCurrency(staffCosts)}</div>
            <div style="font-size: 0.82rem"><span style="color: var(--text-dim)">Edit:</span> ${formatCurrency(editCosts || 0)}</div>
         </div>
         <div class="profit-estimate" style="background: rgba(22,163,74,0.07); padding: 0.4rem 0.6rem; border-radius: 8px; border: 1px solid rgba(22,163,74,0.12); display: flex; justify-content: space-between; align-items: center">
            <label style="font-size: 0.82rem; font-weight: 700">Lợi / Lỗ (tạm tính):</label>
            <span class="value" style="font-size: 0.85rem; font-weight: 900; color: ${profit >= 0 ? 'var(--success)' : 'var(--danger)'}">${formatCurrency(profit)}</span>
         </div>
         `}
         <div style="display:flex;gap:0.4rem;justify-content:flex-end;align-items:center;margin-top:0.5rem" onclick="event.stopPropagation()">
            ${job.linkNAS ? `<a href="${job.linkNAS}" target="_blank" class="btn btn-sm" style="font-size:0.68rem;padding:0.2rem 0.5rem;background:#2563eb15;color:#2563eb;border:1px solid #2563eb30;border-radius:6px;text-decoration:none">📁 NAS</a>` : ''}
            ${job.linkDrive ? `<a href="${job.linkDrive}" target="_blank" class="btn btn-sm" style="font-size:0.68rem;padding:0.2rem 0.5rem;background:#16a34a15;color:#15803d;border:1px solid #16a34a30;border-radius:6px;text-decoration:none">🔗 Drive</a>` : ''}
         </div>
         <div class="view-detail-link" style="font-size: 0.82rem; text-align: center; margin-top: 0.35rem; opacity: 0.7">Xem chi tiết &rarr;</div>
         <div onclick="event.stopPropagation()" style="margin-top:0.5rem"><button onclick="window.toggleJobComplete&&window.toggleJobComplete('${job.id}')" style="width:100%;padding:0.35rem;border-radius:6px;font-size:0.72rem;font-weight:800;cursor:pointer;border:none;font-family:inherit;transition:all 0.2s;${isCompleted ? 'background:#22c55e;color:#fff' : 'background:#22c55e15;color:#22c55e;border:1px solid #22c55e30'}">${isCompleted ? '✅ Đã hoàn thành' : '⭕ Đánh dấu hoàn thành'}</button></div>
      </div>

      <div onclick="event.stopPropagation()" style="border-top:1px solid var(--border);padding-top:0.4rem;margin-top:0.3rem">
        <div style="display:flex;align-items:center;gap:0.3rem;margin-bottom:0.3rem">
          <span style="font-size:0.65rem;color:var(--text-dim);font-weight:700">Đánh giá:</span>
          ${[1, 2, 3, 4, 5].map(i => `<span onclick="window.updateClientRating('${job.id}',${i})" style="cursor:pointer;font-size:0.85rem;opacity:${(job.clientRating || 0) >= i ? 1 : 0.3}">${(job.clientRating || 0) >= i ? '⭐' : '☆'}</span>`).join('')}
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:0.2rem">
          ${['VIP', 'Khó tính', 'Dễ thương', 'Quay lại', 'Mới'].map(t => {
      const active = (job.clientTags || []).includes(t);
      const tc = { VIP: '#eab308', 'Khó tính': '#ef4444', 'Dễ thương': '#22c55e', 'Quay lại': '#3b82f6', 'Mới': '#8b5cf6' };
      return `<span onclick="window.toggleClientTag('${job.id}','${t}')" style="cursor:pointer;font-size:0.58rem;font-weight:800;padding:0.15rem 0.35rem;border-radius:4px;border:1px solid ${tc[t]}${active ? '' : '30'};background:${tc[t]}${active ? '20' : '05'};color:${tc[t]};opacity:${active ? 1 : 0.5};transition:all 0.2s">${t}</span>`;
    }).join('')}
          <span onclick="window.openChat('${job.id}')" style="cursor:pointer;font-size:0.58rem;font-weight:800;padding:0.15rem 0.4rem;border-radius:4px;background:var(--primary-glow);color:var(--primary);border:1px solid var(--border-bright);margin-left:auto">💬 ${(job.comments || []).length}</span>
          <span onclick="window.openQR('${job.id}')" style="cursor:pointer;font-size:0.58rem;font-weight:800;padding:0.15rem 0.4rem;border-radius:4px;background:#8b5cf620;color:#8b5cf6;border:1px solid #8b5cf630">📱 QR</span>
        </div>
      </div>
    </div>
  `;
}

export function renderModalOverlay(state, closeModal) {
  if (state.modal.type === 'quick_preview') {
    return renderQuickPreviewModal(state, closeModal);
  }

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay active';
  overlay.onclick = (e) => { if (e.target === overlay) closeModal(); };

  const container = document.createElement('div');
  container.className = 'modal-container';

  switch (state.modal.type) {
    case 'job_detail':
      container.appendChild(renderJobDetailModal(state));
      break;
    case 'add_job':
      container.appendChild(renderAddJobModal(state));
      break;
    case 'pa3_report':
      container.appendChild(renderPA3ReportModal(state));
      break;
    case 'global_search':
      container.appendChild(renderGlobalSearchModal(state));
      break;
  }

  overlay.appendChild(container);
  return overlay;
}

function renderQuickPreviewModal(state, closeModal) {
  const job = state.jobs.find(j => j.id === state.modal.data);
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:9999;transition:opacity 0.3s';
  overlay.onclick = (e) => { if (e.target === overlay) closeModal(); };

  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;top:0;right:0;bottom:0;width:400px;max-width:100%;background:var(--bg-main);box-shadow:-4px 0 24px rgba(0,0,0,0.1);z-index:10000;transform:translateX(100%);transition:transform 0.3s cubic-bezier(0.16,1,0.3,1);display:flex;flex-direction:column;overflow-y:auto';

  setTimeout(() => { container.style.transform = 'translateX(0)'; }, 10);

  if (!job) return overlay;

  const validServices = (job.services || []).filter(s => s.staff && s.service);
  const deliverables = job.deliverables || [];
  const statusColor = job.status === 'Đã hoàn thành' ? '#15803d' : job.status === 'Đang edit' ? '#db2777' : '#4a6b4a';

  container.innerHTML = `
    <div style="background:var(--bg-card);padding:1.5rem;border-bottom:1px solid var(--border);position:sticky;top:0;z-index:10">
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          <div style="font-size:0.75rem;font-weight:800;color:var(--primary);margin-bottom:0.2rem">#${job.jobNo || '00'}</div>
          <h2 style="font-size:1.3rem;font-weight:900;color:var(--text-main);margin:0 0 0.3rem 0">${job.client}</h2>
          <span style="font-size:0.72rem;font-weight:700;color:${statusColor};background:${statusColor}15;padding:0.15rem 0.5rem;border-radius:4px">${job.status}</span>
        </div>
        <button onclick="window.closeModal()" style="background:none;border:none;font-size:1.2rem;cursor:pointer;color:var(--text-dim)">&times;</button>
      </div>
    </div>
    <div style="padding:1.5rem;flex:1;display:flex;flex-direction:column;gap:1.5rem">
      <div>
        <h4 style="font-size:0.8rem;text-transform:uppercase;color:var(--text-dim);font-weight:800;margin:0 0 0.5rem 0">📌 Thông tin chung</h4>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.8rem">
          <div><label style="font-size:0.65rem;color:var(--text-dim)">Ngày lễ</label><div style="font-size:0.85rem;font-weight:700">${new Date(job.date).toLocaleDateString('vi-VN')}</div></div>
          <div><label style="font-size:0.65rem;color:var(--text-dim)">Loại sự kiện</label><div style="font-size:0.85rem;font-weight:700;color:var(--accent)">${job.eventType || 'Wedding'}</div></div>
          <div style="grid-column:1/3"><label style="font-size:0.65rem;color:var(--text-dim)">Liên hệ</label><div style="font-size:0.85rem;font-weight:700">${job.phone || '—'}</div></div>
        </div>
      </div>
      <div>
        <h4 style="font-size:0.8rem;text-transform:uppercase;color:var(--text-dim);font-weight:800;margin:0 0 0.5rem 0">📹 Nhân sự đi quay/chụp</h4>
        ${validServices.length > 0 ? validServices.map(s => `
          <div style="display:flex;justify-content:space-between;padding:0.4rem 0;border-bottom:1px solid var(--border)">
            <span style="font-size:0.8rem;color:var(--text-main)">${s.service}</span>
            <span style="font-size:0.8rem;font-weight:700">📷 ${s.staff}</span>
          </div>`).join('') : '<div style="font-size:0.75rem;color:var(--text-dim)">Chưa có dữ liệu</div>'}
      </div>
      <div>
        <h4 style="font-size:0.8rem;text-transform:uppercase;color:var(--text-dim);font-weight:800;margin:0 0 0.5rem 0">🎬 Tiến độ Thành phẩm</h4>
        ${deliverables.length > 0 ? deliverables.map(d => `
          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:6px;padding:0.6rem;margin-bottom:0.4rem">
            <div style="display:flex;justify-content:space-between;margin-bottom:0.2rem">
              <span style="font-size:0.8rem;font-weight:700">${d.name} <span style="font-size:0.65rem;color:var(--text-dim)">(x${d.quantity || 1})</span></span>
              <span style="font-size:0.65rem;color:${d.editStatus === 'Hoàn thành' ? '#22c55e' : '#f97316'};font-weight:700">${d.editStatus || 'Chưa bắt đầu'}</span>
            </div>
            <div style="font-size:0.7rem;color:var(--text-dim)">Nhân sự: <b>${d.editor || 'Trống'}</b></div>
          </div>`).join('') : '<div style="font-size:0.75rem;color:var(--text-dim)">Không có thành phẩm đầu ra</div>'}
      </div>
      <div style="margin-top:0.75rem">
        ${(() => {
      const totalD = deliverables.length;
      const doneD = deliverables.filter(d => d.editStatus === 'Hoàn thành').length;
      if (totalD === 0) return '<div style="font-size:0.72rem;color:var(--text-dim)">Không có thành phẩm</div>';
      const pct = Math.round((doneD / totalD) * 100);
      const barColor = pct === 100 ? '#22c55e' : pct >= 50 ? '#f97316' : '#ef4444';
      return `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.3rem">
              <span style="font-size:0.68rem;font-weight:700;color:var(--text-dim)">Tiến độ dự án</span>
              <span style="font-size:0.75rem;font-weight:900;color:${barColor}">${doneD}/${totalD} · ${pct}%</span>
            </div>
            <div style="width:100%;height:8px;background:var(--border);border-radius:4px;overflow:hidden;margin-bottom:0.6rem">
              <div style="width:${pct}%;height:100%;background:${barColor};border-radius:4px;transition:width 0.4s ease"></div>
            </div>
          `;
    })()}
      </div>
      ${job.linkNAS ? `<div style="padding:0.5rem 0.8rem;background:rgba(59,130,246,0.06);border:1px solid rgba(59,130,246,0.2);border-radius:6px;margin-top:0.25rem"><div style="font-size:0.62rem;color:var(--text-dim);margin-bottom:0.15rem">📂 NAS Path</div><div style="font-size:0.72rem;font-weight:700;color:#3b82f6;word-break:break-all">${job.linkNAS}</div></div>` : ''}
      <div style="margin-top:auto;padding-top:1rem;display:flex;flex-direction:column;gap:0.5rem">
        <button onclick="window.closeModal(); setTimeout(() => window.openModal('job_detail', '${job.id}'), 100)" style="width:100%;padding:0.8rem;background:var(--primary);color:#fff;border:none;border-radius:8px;font-weight:800;font-size:0.9rem;cursor:pointer;box-shadow:0 4px 12px rgba(22,163,74,0.2)">✏️ Chỉnh sửa nâng cao</button>
        <button onclick="window.deleteJob('${job.id}')" style="width:100%;padding:0.6rem;background:transparent;color:var(--danger);border:1.5px solid var(--danger);border-radius:8px;font-weight:700;font-size:0.85rem;cursor:pointer">🗑 Xóa dự án</button>
      </div>

    </div>
  `;

  overlay.appendChild(container);

  // Ghi đè phương thức close của riêng modal này để tạo hiệu ứng trượt ra
  overlay.dataset.closeFn = 'quickPreviewClose';
  window._quickPreviewCloseFn = () => {
    container.style.transform = 'translateX(100%)';
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.remove();
      state.modal.isOpen = false;
      state.modal.type = null;
    }, 300);
  };

  return overlay;
}

function renderJobDetailModal(state) {
  const job = state.jobs.find(j => j.id === state.modal.data);
  const container = document.createElement('div');
  if (!job) return container;

  const validServices = (job.services || []).filter(isValidServiceRow);
  const revenue = job.package || 0;
  const staffCosts = validServices.reduce((sum, s) => sum + (s.cost || 0), 0);
  const editCosts = validServices.reduce((sum, s) => sum + (s.edit || 0), 0);
  const profit = revenue - (staffCosts + editCosts);
  const depositRemaining = revenue - (job.deposit || 0);
  const serviceRows = (job.services || []).map((s, idx) => ({ s, idx })).filter(x => isValidServiceRow(x.s));

  const statusColors = {
    'Chưa gửi': '#b45309', 'Nhận Feedback': '#2563eb',
    'Đã hoàn thành': '#15803d', 'Đang edit': '#db2777'
  };
  const statusColor = statusColors[job.status] || '#4a6b4a';

  container.innerHTML = `
    <!-- MODAL HEADER: brand bar -->
    <div class="modal-header" style="padding: 1.25rem 1.75rem 1rem; gap: 1rem">
      <div style="display: flex; align-items: center; gap: 0.875rem; min-width: 0">
        <div style="background: var(--primary); color: #fff; font-size: 0.8rem; font-weight: 900;
          padding: 0.3rem 0.7rem; border-radius: 8px; flex-shrink: 0">#${job.jobNo || 0}</div>
        <div style="min-width: 0">
          <h2 style="margin: 0; font-size: 1.4rem; font-weight: 900; color: var(--text-main);
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${job.client}</h2>
          <div style="display: flex; align-items: center; gap: 0.6rem; margin-top: 0.25rem">
            <span style="font-size: 0.82rem; color: var(--text-dim)">${new Date(job.date).toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
            <span style="font-size: 0.75rem; font-weight: 700; padding: 0.15rem 0.6rem; border-radius: 6px;
              background: ${statusColor}18; color: ${statusColor}; border: 1px solid ${statusColor}30">${job.status}</span>
            <span style="font-size: 0.78rem; color: var(--accent); font-weight: 700">${job.eventType || 'Wedding'}</span>
          </div>
        </div>
      </div>
      <div style="display: flex; gap: 0.5rem; align-items: center">
        <button onclick="window.exportInvoiceToPDF('${job.id}')" style="display: flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.75rem; font-size: 0.8rem; font-weight: 800; border-radius: 8px; border: 1px solid var(--border-bright); background: #fff; cursor: pointer; color: var(--text-dim); transition: 0.2s" onmouseover="this.style.borderColor='#ef4444';this.style.color='#ef4444'" onmouseout="this.style.borderColor='var(--border-bright)';this.style.color='var(--text-dim)'">
          <i class="fas fa-file-pdf" style="color: #ef4444"></i> Hóa Đơn PDF
        </button>
        <button class="close-btn" onclick="window.closeModal()">&#x2715;</button>
      </div>
    </div>

    <!-- MODAL BODY: 2 cols -->
    <div class="modal-body" style="padding: 1.25rem 1.75rem 1.75rem">
      <div id="form-validation-errors" style="display:none; background: #fef2f2; border: 1px solid #fca5a5;
        border-radius: 8px; padding: 0.75rem 1rem; margin-bottom: 1rem; color: #b91c1c; font-size: 0.9rem"></div>

      <div style="display: grid; grid-template-columns: 1fr 320px; gap: 1.5rem; align-items: start">

        <!-- LEFT COLUMN: all editable fields -->
        <div style="display: flex; flex-direction: column; gap: 1.25rem">

          <!-- Row 1: core info -->
          <div style="display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 0.875rem">
            <div>
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Khách hàng (CD - CR)</label>
              <input type="text" id="edit-job-client" class="form-control" value="${job.client}"
                style="font-size: 0.95rem; padding: 0.55rem 0.75rem; background: #fff; border: 1.5px solid var(--border); color: var(--text-main); font-weight: 700">
            </div>
            <div>
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Trạng thái</label>
              <select id="edit-job-status" class="form-control"
                style="font-size: 0.95rem; padding: 0.55rem 0.75rem; background: #fff; border: 1.5px solid var(--border); color: ${statusColor}; font-weight: 700">
                ${['Chưa gửi', 'Đang edit', 'Nhận Feedback', 'Đã hoàn thành'].map(s => `<option value="${s}" ${job.status === s ? 'selected' : ''} style="color: var(--text-main)">${s}</option>`).join('')}
              </select>
            </div>
            <div>
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Ngày làm lễ</label>
              <input type="date" id="edit-job-date" class="form-control" value="${job.date}"
                style="font-size: 0.95rem; padding: 0.55rem 0.75rem; background: #fff; border: 1.5px solid var(--border); color: var(--text-main)">
            </div>
            <div>
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Loại hình</label>
              <input type="text" id="edit-job-type" class="form-control" value="${job.eventType || 'Wedding'}"
                style="font-size: 0.95rem; padding: 0.55rem 0.75rem; background: #fff; border: 1.5px solid var(--border); color: var(--accent); font-weight: 700">
            </div>
            <div>
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Liên lạc</label>
              <div style="display: flex; gap: 0.4rem; align-items: center">
                <input type="text" id="edit-job-phone" class="form-control" value="${job.phone || ''}"
                  style="font-size: 0.95rem; padding: 0.55rem 0.75rem; background: #fff; border: 1.5px solid var(--border); color: var(--text-main); flex: 1">
                <a href="https://zalo.me/${job.phone}" target="_blank"
                  style="background: #0084ff; color: #fff; font-size: 0.72rem; font-weight: 800; padding: 0.4rem 0.6rem; border-radius: 7px; text-decoration: none; white-space: nowrap">Zalo</a>
              </div>
            </div>
          </div>

          <!-- Row 2: finance -->
          ${window.state?.currentUser?.role !== 'admin' ? '' : `
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.875rem; background: rgba(22,163,74,0.04); padding: 1rem; border-radius: 10px; border: 1px solid var(--border)">
            <div>
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Giá trị gói (VNĐ)</label>
              <input type="number" id="edit-job-package" class="form-control" value="${job.package}"
                style="font-size: 1rem; padding: 0.55rem 0.75rem; background: #fff; border: 1.5px solid var(--border-bright); color: var(--text-main); font-weight: 800">
            </div>
            <div>
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Cọc đã nhận</label>
              <input type="number" id="edit-job-deposit" class="form-control" value="${job.deposit || 0}"
                style="font-size: 1rem; padding: 0.55rem 0.75rem; background: #fff; border: 1.5px solid var(--border); color: var(--success); font-weight: 700">
            </div>
            <div>
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Còn lại</label>
              <div style="font-size: 1rem; font-weight: 800; color: var(--warning); padding: 0.55rem 0.75rem; background: rgba(234,88,12,0.06); border-radius: 8px; border: 1px solid rgba(234,88,12,0.15)">
                ${formatCurrency(depositRemaining)}
              </div>
            </div>
          </div>
          `}

          <!-- Row 3: ghi chú -->
          <div>
            <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Ghi chú nội bộ</label>
            <textarea id="edit-job-notes" class="form-control" rows="2"
              style="font-size: 0.92rem; padding: 0.55rem 0.75rem; background: #fff; border: 1.5px solid var(--border); resize: vertical; color: var(--text-main)">${job.notes || ''}</textarea>
          </div>

          <!-- Row 4: MULTI-DAY EVENT MANAGEMENT -->
          <div>
            <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.5rem">📅 Lịch trình sự kiện (theo ngày)</label>
            ${(() => {
      // Backward-compatible migration: create eventDays from legacy fields
      const eventDays = job.eventDays && job.eventDays.length > 0 ? job.eventDays : [{
        dayLabel: 'Ngày chính',
        date: job.date || '',
        boyHouse: job.boyHouse || '',
        girlHouse: job.girlHouse || '',
        venue: job.venue || '',
        timeline: job.timeline || { le_sang: false, le: '05:00', tiec_trua: false, tiec_trua_time: '11:00', tiec_toi: false, tiec: '18:00' },
        categories: (job.services || []).map(s => s.service).filter((v, i, a) => a.indexOf(v) === i)
      }];

      // Tab buttons
      const tabBtns = eventDays.map((day, idx) => `
        <button type="button" class="day-tab-btn ${idx === 0 ? 'active' : ''}" data-day-idx="${idx}" onclick="window._switchDayTab(${idx})">
          ${day.dayLabel || ('Ngày ' + (idx + 1))}
        </button>
      `).join('');

      // Tab contents
      const tabContents = eventDays.map((day, idx) => {
        const tl = day.timeline || {};
        return `
        <div class="day-tab-content ${idx === 0 ? 'active' : ''}" data-day-idx="${idx}">
          <div class="day-form-panel">
            <div class="day-header">
              <h4>📋 ${day.dayLabel || ('Ngày ' + (idx + 1))}</h4>
              ${eventDays.length > 1 ? `<button type="button" class="remove-day-btn" onclick="window._removeDayTab(${idx})">✕ Xóa ngày này</button>` : ''}
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem">
              <div>
                <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Tên nhãn ngày</label>
                <input type="text" class="form-control day-label-input" data-day="${idx}" value="${day.dayLabel || ''}" placeholder="VD: Lễ gia tiên, Tiệc cưới..."
                  style="font-size: 0.92rem; padding: 0.45rem 0.7rem; background: #fff; border: 1.5px solid var(--border); color: var(--primary); font-weight: 700">
              </div>
              <div>
                <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Ngày tổ chức</label>
                <input type="date" class="form-control day-date-input" data-day="${idx}" value="${day.date || ''}"
                  style="font-size: 0.92rem; padding: 0.45rem 0.7rem; background: #fff; border: 1.5px solid var(--border); color: var(--text-main)">
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem">
              <div>
                <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">🏠 Nhà Trai</label>
                <input type="text" class="form-control day-boy-house-input" data-day="${idx}" value="${day.boyHouse || ''}" placeholder="Địa chỉ nhà trai"
                  style="font-size: 0.88rem; padding: 0.45rem 0.7rem; background: #fff; border: 1.5px solid var(--border); color: var(--text-main)">
              </div>
              <div>
                <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">🏠 Nhà Gái</label>
                <input type="text" class="form-control day-girl-house-input" data-day="${idx}" value="${day.girlHouse || ''}" placeholder="Địa chỉ nhà gái"
                  style="font-size: 0.88rem; padding: 0.45rem 0.7rem; background: #fff; border: 1.5px solid var(--border); color: var(--text-main)">
              </div>
              <div>
                <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">🏨 Venue / Tiệc</label>
                <input type="text" class="form-control day-venue-input" data-day="${idx}" value="${day.venue || ''}" placeholder="Nhà hàng / địa điểm"
                  style="font-size: 0.88rem; padding: 0.45rem 0.7rem; background: #fff; border: 1.5px solid var(--border); color: var(--accent); font-weight: 700">
              </div>
            </div>

            <div>
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.4rem">⏰ Lịch trình</label>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.6rem">
                ${[
            ['le_sang', 'Lễ sáng', tl.le_sang, 'le', tl.le || '05:00', '#f97316'],
            ['tiec_trua', 'Tiệc trưa', tl.tiec_trua, 'tiec_trua_time', tl.tiec_trua_time || '11:00', '#22c55e'],
            ['tiec_toi', 'Tiệc tối', tl.tiec_toi, 'tiec', tl.tiec || '18:00', '#3b82f6']
          ].map(([name, label, checked, timeName, timeVal, color]) => `
                  <div style="background: ${checked ? color + '0d' : '#fff'}; border: 1.5px solid ${checked ? color + '40' : 'var(--border)'}; border-radius: 10px; padding: 0.6rem">
                    <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.82rem; font-weight: 700; color: ${checked ? color : 'var(--text-dim)'}; margin-bottom: 0.35rem; cursor: pointer">
                      <input type="checkbox" class="day-tl-check" data-day="${idx}" data-tl="${name}" ${checked ? 'checked' : ''}> ${label}
                    </label>
                    <input type="time" class="form-control day-tl-time" data-day="${idx}" data-tl-time="${timeName}" value="${timeVal}"
                      style="padding: 0.25rem 0.4rem; font-size: 0.85rem; font-weight: 700; background: #fff; border: 1px solid var(--border); color: ${color}">
                  </div>
                `).join('')}
              </div>
            </div>

            <div>
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.4rem">🎬 Hạng mục quay/chụp</label>
              <div style="display: flex; flex-wrap: wrap; gap: 0.35rem">
                ${(window.state?.settings?.eventCategories || []).map(cat => {
            const active = (day.categories || []).includes(cat);
            return `<label style="display: flex; align-items: center; gap: 0.3rem; font-size: 0.78rem; font-weight: 700; padding: 0.3rem 0.65rem; border-radius: 8px; cursor: pointer; border: 1.5px solid ${active ? 'var(--primary-light)' : 'var(--border)'}; background: ${active ? 'rgba(22,163,74,0.08)' : '#fff'}; color: ${active ? 'var(--primary)' : 'var(--text-dim)'}; transition: all 0.2s">
                    <input type="checkbox" class="day-cat-check" data-day="${idx}" value="${cat}" ${active ? 'checked' : ''} style="display:none"> ${cat}
                  </label>`;
          }).join('')}
              </div>
            </div>

            <!-- Inline Services/Staff for This Specific Day -->
            <div style="margin-top: 1rem; border-top: 1px dashed var(--border); padding-top: 1rem">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem">
                <label style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--primary)">👥 Nhân sự đi làm (${day.date || job.date})</label>
                <div style="display: flex; gap: 0.4rem">
                  <button type="button" class="btn btn-secondary btn-sm" onclick="window._addServiceToDayInModal(${idx})"><i class="fas fa-plus"></i> Thêm người</button>
                </div>
              </div>
              <div class="day-services-container" data-day="${idx}" style="display: flex; flex-direction: column; gap: 0.5rem">
                ${(job.services || []).filter(s => s.date === (day.date || job.date) || (!s.date && idx === 0)).map((s, sIdx) => `
                  <div class="day-service-row" data-sidx="${sIdx}" style="display: grid; grid-template-columns: 1fr 1.2fr ${window.state?.currentUser?.role !== 'admin' ? '' : '110px 110px'} 40px; gap: 0.5rem; align-items: center; background: #fff; border: 1px solid var(--border); padding: 0.5rem 0.75rem; border-radius: 8px">
                     <select class="form-control svc-role-input" style="font-size: 0.85rem; padding: 0.3rem 0.5rem">
                       ${(window.state?.settings?.serviceRoles || []).map(opt => `<option value="${opt}" ${s.service === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                     </select>
                     <div style="display:flex; flex-direction:column">
                       <select class="form-control svc-staff-input" data-date="${day.date || job.date}" data-job-id="${job.id || ''}" onchange="window._checkConflictUI(this)" style="font-size: 0.85rem; padding: 0.3rem 0.5rem; font-weight: 700">
                         <option value="Chưa xếp">-- Chọn người --</option>
                         ${window.state?.staff?.map(staff => `<option value="${staff.name}" ${s.staff === staff.name ? 'selected' : ''}>${staff.name}</option>`).join('') || ''}
                       </select>
                       <div class="conflict-warning" style="display:none; color: #ef4444; font-size: 0.7rem; margin-top: 0.2rem; font-weight: 700;"></div>
                     </div>
                     ${window.state?.currentUser?.role !== 'admin' ? '' : `
                     <div style="position: relative">
                        <span style="position: absolute; left: 0.4rem; top: 50%; transform: translateY(-50%); font-size: 0.7rem; color: var(--text-dim)">đ</span>
                        <input type="number" class="form-control svc-cost-input" value="${s.cost || 0}" style="font-size: 0.85rem; padding: 0.3rem 0.5rem 0.3rem 1.2rem; color: var(--danger); font-weight: 700">
                     </div>
                     <div style="position: relative">
                        <span style="position: absolute; left: 0.4rem; top: 50%; transform: translateY(-50%); font-size: 0.7rem; color: var(--text-dim)">đ</span>
                        <input type="number" class="form-control svc-edit-input" value="${s.edit || 0}" placeholder="Tiền Edit" style="font-size: 0.85rem; padding: 0.3rem 0.5rem 0.3rem 1.2rem; color: var(--warning)">
                     </div>
                     `}
                     <button type="button" class="btn block" style="padding: 0.3rem; color: var(--danger); background: none; border: none" onclick="this.closest('.day-service-row').remove()" title="Xóa nhân sự này"><i class="fas fa-trash"></i></button>
                  </div>
                `).join('')}
              </div>
            </div>

          </div>
        </div>`;
      }).join('');

      return `
        <div class="day-tabs" id="event-day-tabs">
          ${tabBtns}
          <button type="button" class="day-tab-btn add-day-btn" onclick="window._addDayTab()">+ Thêm ngày</button>
        </div>
        <div id="event-day-contents">
          ${tabContents}
        </div>
      `;
    })()}
          </div>

          <!-- Row 5: Deliverables -->
          <div style="margin-top: 0.5rem">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem">
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim)">📦 Thành phẩm đầu ra</label>
              <div style="display: flex; gap: 0.4rem">
                <button type="button" class="btn btn-secondary btn-sm" onclick="window._addDeliverableInModal()"><i class="fas fa-plus"></i> Thêm thành phẩm</button>
              </div>
            </div>
            <div id="deliverables-container-edit" style="display: flex; flex-direction: column; gap: 0.5rem">
              ${(job.deliverables && job.deliverables.length > 0 ? job.deliverables : []).map((d, dIdx) => `
                <div class="deliverable-row" data-didx="${dIdx}" style="display: grid; grid-template-columns: 2fr 100px 100px 40px; gap: 0.5rem; align-items: center; background: #fff; border: 1px solid var(--border); padding: 0.5rem 0.75rem; border-radius: 8px">
                   <input type="text" class="form-control del-name-input" value="${d.name}" placeholder="Tên sản phẩm (VD: Clip Truyền Thống)" style="font-size: 0.85rem; padding: 0.35rem 0.5rem; font-weight: 700">
                   <select class="form-control del-type-input" style="font-size: 0.85rem; padding: 0.35rem">
                     ${['Video', 'Photo', 'Khác'].map(opt => `<option value="${opt}" ${d.type === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                   </select>
                   <input type="number" class="form-control del-qty-input" value="${d.quantity || 1}" min="1" placeholder="Số lượng" title="Số lượng" style="font-size: 0.85rem; padding: 0.35rem 0.5rem">
                   <button type="button" class="btn block" style="padding: 0.3rem; color: var(--danger); background: none; border: none" onclick="this.closest('.deliverable-row').remove()" title="Xóa"><i class="fas fa-trash"></i></button>
                </div>
              `).join('')}
              ${(!job.deliverables || job.deliverables.length === 0) ? '<div class="empty-state" style="padding: 1rem; font-size: 0.8rem">Chưa có thành phẩm nào được khai báo.</div>' : ''}
            </div>
            <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.4rem; font-style: italic">
              * Đây là danh sách Video/Photo sẽ đồng bộ sang bảng Kanban "Edit Video / Photo".
            </div>
          </div>

          <!-- Row 6: Links -->
          <div style="margin-top: 0.5rem">
            <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.5rem">🔗 Quản lý Liên kết (Links) - Trả file cho Khách</label>
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap">
              
              <!-- Hidden inputs to store actual values for saveJobDetail to read -->
              <input type="hidden" id="edit-job-link-customer" value="${job.linkCustomer || ''}">
              <input type="hidden" id="edit-job-link-nas" value="${job.linkNAS || ''}">
              <input type="hidden" id="edit-job-link-drive" value="${job.linkDrive || ''}">

              <!-- Customer Link Button -->
              <div class="link-btn-wrapper" onclick="window._promptEditLink('customer', 'Link trả file khách')" 
                   style="cursor: pointer; display: flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0.75rem; border-radius: 8px; font-size: 0.85rem; font-weight: 700; transition: 0.2s;
                   ${job.linkCustomer ? 'background: rgba(22,163,74,0.1); border: 1.5px solid rgba(22,163,74,0.4); color: var(--success);' : 'background: #fff; border: 1.5px dashed var(--border); color: var(--text-dim);'}">
                <i class="fas fa-link"></i>
                <span>${job.linkCustomer ? 'Đã có Link Khách' : '+ Thêm Link Khách'}</span>
                ${job.linkCustomer ? `<div class="link-actions" style="display:flex; gap: 0.25rem; margin-left: 0.5rem">
                  <span onclick="event.stopPropagation(); window.open('${job.linkCustomer}','_blank')" style="padding: 0.15rem 0.35rem; background: var(--success); color: #fff; border-radius: 4px" title="Mở link"><i class="fas fa-external-link-alt"></i></span>
                  <span onclick="event.stopPropagation(); navigator.clipboard.writeText('${job.linkCustomer}')" style="padding: 0.15rem 0.35rem; background: var(--bg-hover); color: var(--text-main); border-radius: 4px" title="Copy link"><i class="fas fa-copy"></i></span>
                </div>` : ''}
              </div>

              <!-- NAS Link Button -->
              <div class="link-btn-wrapper" onclick="window._promptEditLink('nas', 'Đường dẫn thư mục NAS')"
                   style="cursor: pointer; display: flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0.75rem; border-radius: 8px; font-size: 0.85rem; font-weight: 700; transition: 0.2s;
                   ${job.linkNAS ? 'background: rgba(37,99,235,0.08); border: 1.5px solid rgba(37,99,235,0.4); color: var(--accent-blue);' : 'background: #fff; border: 1.5px dashed var(--border); color: var(--text-dim);'}">
                <i class="fas fa-server"></i>
                <span>${job.linkNAS ? 'Đã liên kết NAS' : '+ Gắn thư mục NAS'}</span>
                ${job.linkNAS ? `<div class="link-actions" style="display:flex; gap: 0.25rem; margin-left: 0.5rem">
                  <span onclick="event.stopPropagation(); navigator.clipboard.writeText('${job.linkNAS}')" style="padding: 0.15rem 0.35rem; background: var(--bg-hover); color: var(--text-main); border-radius: 4px" title="Copy path"><i class="fas fa-copy"></i></span>
                </div>` : ''}
              </div>

              <!-- Google Drive Button -->
              <div class="link-btn-wrapper" onclick="window._promptEditLink('drive', 'Link thư mục Google Drive')"
                   style="cursor: pointer; display: flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0.75rem; border-radius: 8px; font-size: 0.85rem; font-weight: 700; transition: 0.2s;
                   ${job.linkDrive ? 'background: rgba(13,148,136,0.08); border: 1.5px solid rgba(13,148,136,0.4); color: var(--accent-teal);' : 'background: #fff; border: 1.5px dashed var(--border); color: var(--text-dim);'}">
                <i class="fab fa-google-drive"></i>
                <span>${job.linkDrive ? 'Đã có Link Drive' : '+ Thêm Link Drive'}</span>
                ${job.linkDrive ? `<div class="link-actions" style="display:flex; gap: 0.25rem; margin-left: 0.5rem">
                  <span onclick="event.stopPropagation(); window.open('${job.linkDrive}','_blank')" style="padding: 0.15rem 0.35rem; background: var(--accent-teal); color: #fff; border-radius: 4px" title="Mở Drive"><i class="fas fa-external-link-alt"></i></span>
                  <span onclick="event.stopPropagation(); navigator.clipboard.writeText('${job.linkDrive}')" style="padding: 0.15rem 0.35rem; background: var(--bg-hover); color: var(--text-main); border-radius: 4px" title="Copy link"><i class="fas fa-copy"></i></span>
                </div>` : ''}
              </div>

            </div>
          </div>

        </div><!-- /left -->

        <!-- RIGHT COLUMN: sticky profit panel -->
        <div style="position: sticky; top: 0; display: flex; flex-direction: column; gap: 1rem">

          <!-- Profit card -->
          ${window.state?.currentUser?.role !== 'admin' ? '' : `
          <div style="background: ${profit >= 0 ? 'rgba(21,128,61,0.06)' : 'rgba(185,28,28,0.06)'}; border: 2px solid ${profit >= 0 ? 'rgba(21,128,61,0.20)' : 'rgba(185,28,28,0.20)'}; border-radius: 14px; padding: 1.25rem">
            <div style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.5rem">💰 Ước tính lợi nhuận</div>
            <div style="font-size: 2.2rem; font-weight: 900; color: ${profit >= 0 ? 'var(--success)' : 'var(--danger)'}; line-height: 1.1; margin-bottom: 1rem">
              ${formatCurrency(profit)}
            </div>
            ${[
        ['Doanh thu', revenue, 'var(--success)'],
        ['Chi phí thợ', staffCosts, 'var(--danger)'],
        ['Chi phí edit', editCosts, 'var(--warning)'],
      ].map(([label, val, color]) => `
              <div style="display: flex; justify-content: space-between; font-size: 0.88rem; padding: 0.3rem 0; border-bottom: 1px solid var(--border)">
                <span style="color: var(--text-dim)">${label}</span>
                <span style="font-weight: 700; color: ${color}">${formatCurrency(val)}</span>
              </div>
            `).join('')}
          </div>

          <!-- Finance summary card -->
          <div style="background: #fff; border: 1.5px solid var(--border); border-radius: 12px; padding: 1rem">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem">
               <div style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim)">💳 Thanh toán</div>
               ${depositRemaining > 0 ? `<button type="button" class="btn btn-sm" onclick="window.markJobFullyPaid('${job.id}')" style="background: var(--success); color: white; padding: 0.2rem 0.5rem; font-size: 0.65rem; border: none; border-radius: 4px"><i class="fas fa-check-double"></i> Đã tất toán</button>` : `<span style="font-size: 0.65rem; color: var(--success); font-weight: 800"><i class="fas fa-check-circle"></i> Hoàn tất</span>`}
            </div>
            ${[
        ['Giá gói', revenue, 'var(--text-main)'],
        ['Đã đặt cọc', job.deposit || 0, 'var(--success)'],
        ['Còn lại', depositRemaining, 'var(--warning)'],
      ].map(([lbl, val, clr]) => `
              <div style="display: flex; justify-content: space-between; padding: 0.35rem 0; border-bottom: 1px solid var(--border); font-size: 0.88rem">
                <span style="color: var(--text-dim)">${lbl}</span>
                <span style="font-weight: 700; color: ${clr}">${formatCurrency(val)}</span>
              </div>
            `).join('')}
          </div>
          `}

          <!-- Action buttons -->
          <div style="display: flex; flex-direction: column; gap: 0.6rem">
            <button class="btn btn-primary" style="width: 100%; font-size: 1rem; padding: 0.85rem" onclick="window.saveJobDetail('${job.id}')">
              <i class="fas fa-save"></i> Lưu thay đổi
            </button>
            <button class="btn btn-secondary" style="width: 100%; font-size: 0.9rem" onclick="window.deleteJob('${job.id}')">
              <i class="fas fa-trash"></i> Xóa dự án
            </button>
          </div>

          <!-- Chat / Comments -->
          <div style="background: #fff; border: 1.5px solid var(--border); border-radius: 12px; display: flex; flex-direction: column; overflow: hidden; height: 320px">
            <div style="padding: 0.85rem 1rem; border-bottom: 1px solid var(--border); font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); background: rgba(0,0,0,0.02)">💬 Trao đổi nội bộ</div>
            
            <div id="job-chat-messages" style="flex: 1; padding: 1rem; overflow-y: auto; display: flex; flex-direction: column; gap: 0.85rem; background: #fafafa">
              ${(!job.comments || job.comments.length === 0) ? '<div style="font-size: 0.8rem; color: var(--text-dim); text-align: center; font-style: italic; margin: auto">Chưa có bình luận nào</div>' : ''}
              ${(job.comments || []).map(c => {
        const isMe = c.user === window.state?.currentUser?.username || c.user === window.state?.currentUser?.displayName;
        return `
                    <div style="display: flex; flex-direction: column; gap: 0.2rem; align-items: ${isMe ? 'flex-end' : 'flex-start'}">
                       <div style="font-size: 0.65rem; color: var(--text-dim); font-weight: 700; padding: 0 0.2rem">${c.user} <span style="font-weight: 400; opacity: 0.8">• ${new Date(c.time || Date.now()).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span></div>
                       <div style="background: ${isMe ? 'var(--primary)' : '#e5e7eb'}; color: ${isMe ? '#fff' : 'var(--text-main)'}; padding: 0.5rem 0.75rem; border-radius: 12px; font-size: 0.85rem; max-width: 90%; line-height: 1.4; word-wrap: break-word; border-bottom-${isMe ? 'right' : 'left'}-radius: 2px">${c.text}</div>
                    </div>
                 `;
      }).join('')}
            </div>

            <div style="padding: 0.75rem; border-top: 1px solid var(--border); background: #fff; display: flex; gap: 0.5rem">
               <input type="text" id="job-chat-input" placeholder="Nhập tin nhắn..." 
                 onkeydown="if(event.key === 'Enter') window.addJobComment('${job.id}')"
                 style="flex: 1; padding: 0.5rem 0.75rem; border: 1px solid var(--border); border-radius: 20px; font-size: 0.85rem; background: var(--surface); color: var(--text-main); outline: none">
               <button type="button" onclick="window.addJobComment('${job.id}')" style="background: var(--primary); color: white; border: none; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0"><i class="fas fa-paper-plane" style="font-size: 0.8rem"></i></button>
            </div>
          </div>

        </div><!-- /right -->
      </div>
    </div>
  `;

  // Auto-save event delegation for all inputs in the modal
  container.addEventListener('change', function (ev) {
    if (ev.target.matches('input, select, textarea')) {
      clearTimeout(window._autoSaveTimer);
      window._autoSaveTimer = setTimeout(() => {
        window.saveJobDetail(job.id, false);
      }, 700);
    }
  });

  return container;
}

window._addServiceToDayInModal = (dayIdx) => {
  const container = document.querySelector(`.day-services-container[data-day="${dayIdx}"]`);
  if (!container) return;
  const sIdx = Date.now();
  const isStaffView = window.state?.currentUser?.role !== 'admin';
  const newRow = document.createElement('div');
  newRow.className = 'day-service-row';
  newRow.setAttribute('data-sidx', sIdx);
  newRow.style.cssText = `display: grid; grid-template-columns: 1fr 1.2fr ${isStaffView ? '' : '110px 110px'} 40px; gap: 0.5rem; align-items: center; background: #fff; border: 1px solid var(--border); padding: 0.5rem 0.75rem; border-radius: 8px; margin-top: 0.5rem; animation: slideIn 0.2s ease`;
  newRow.innerHTML = `
     <select class="form-control svc-role-input" style="font-size: 0.85rem; padding: 0.3rem 0.5rem">
       ${(window.state?.settings?.serviceRoles || []).map(opt => `<option value="${opt}">${opt}</option>`).join('')}
     </select>
     <select class="form-control svc-staff-input" style="font-size: 0.85rem; padding: 0.3rem 0.5rem; font-weight: 700">
       <option value="Chưa xếp">-- Chọn người --</option>
       ${(window.state?.staff || []).map(staff => `<option value="${staff.name}">${staff.name}</option>`).join('')}
     </select>
     ${isStaffView ? '' : `
     <div style="position: relative">
        <span style="position: absolute; left: 0.4rem; top: 50%; transform: translateY(-50%); font-size: 0.7rem; color: var(--text-dim)">đ</span>
        <input type="number" class="form-control svc-cost-input" value="0" style="font-size: 0.85rem; padding: 0.3rem 0.5rem 0.3rem 1.2rem; color: var(--danger); font-weight: 700">
     </div>
     <div style="position: relative">
        <span style="position: absolute; left: 0.4rem; top: 50%; transform: translateY(-50%); font-size: 0.7rem; color: var(--text-dim)">đ</span>
        <input type="number" class="form-control svc-edit-input" value="0" placeholder="Tiền Edit" style="font-size: 0.85rem; padding: 0.3rem 0.5rem 0.3rem 1.2rem; color: var(--warning)">
     </div>
     `}
     <button type="button" class="btn block" style="padding: 0.3rem; color: var(--danger); background: none; border: none" onclick="this.closest('.day-service-row').remove(); window.saveJobDetail(window.state.modal.data, false)" title="Xóa"><i class="fas fa-trash"></i></button>
  `;
  container.appendChild(newRow);
  window.saveJobDetail(window.state.modal.data, false);
};

window._addDeliverableInModal = () => {
  const container = document.getElementById('deliverables-container-edit');
  if (!container) return;
  const dIdx = Date.now();
  const emptyState = container.querySelector('.empty-state');
  if (emptyState) emptyState.remove();

  const newRow = document.createElement('div');
  newRow.className = 'deliverable-row';
  newRow.setAttribute('data-didx', dIdx);
  newRow.style.cssText = `display: grid; grid-template-columns: 2fr 100px 100px 40px; gap: 0.5rem; align-items: center; background: #fff; border: 1px solid var(--border); padding: 0.5rem 0.75rem; border-radius: 8px; margin-top: 0.5rem; animation: slideIn 0.2s ease`;
  newRow.innerHTML = `
     <input type="text" class="form-control del-name-input" value="" placeholder="Tên sản phẩm (VD: Clip Truyền Thống)" style="font-size: 0.85rem; padding: 0.35rem 0.5rem; font-weight: 700">
     <select class="form-control del-type-input" style="font-size: 0.85rem; padding: 0.35rem">
       <option value="Video">Video</option><option value="Photo">Photo</option><option value="Khác">Khác</option>
     </select>
     <input type="number" class="form-control del-qty-input" value="1" min="1" placeholder="Số lượng" title="Số lượng" style="font-size: 0.85rem; padding: 0.35rem 0.5rem">
     <button type="button" class="btn block" style="padding: 0.3rem; color: var(--danger); background: none; border: none" onclick="this.closest('.deliverable-row').remove(); window.saveJobDetail(window.state.modal.data, false)" title="Xóa"><i class="fas fa-trash"></i></button>
  `;
  container.appendChild(newRow);
  window.saveJobDetail(window.state.modal.data, false);
};




function renderAddJobModal(state) {
  const container = document.createElement('div');
  container.innerHTML = `
    <div class="modal-header">
      <h2>Thêm Dự án (chuẩn Haru)</h2>
      <button class="close-btn" onclick="window.closeModal()">&times;</button>
    </div>
    <div class="modal-body">
      <div id="form-validation-errors" style="display:none; background: #fef2f2; border: 1px solid #f87171; border-radius:8px; padding:0.75rem 1rem; margin-bottom:1rem; color:#b91c1c; font-size:0.85rem"></div>
      <form id="add-job-form">
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 1rem">
          <div class="form-group">
            <label>SHĐ - TIME</label>
            <input type="text" class="form-control" name="jobId" placeholder="VD: 87 - T11" required>
          </div>
          <div class="form-group">
            <label>Ngày tổ chức</label>
            <input type="date" class="form-control" name="date" required>
          </div>
          <div class="form-group">
            <label>CD - CR</label>
            <input type="text" class="form-control" name="client" placeholder="Tên khách hàng" required>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 1rem">
          <div class="form-group">
            <label>Số điện thoại</label>
            <input type="text" class="form-control" name="phone" placeholder="SĐT liên hệ">
          </div>
          <div class="form-group">
            <label>Loại hình</label>
            <select class="form-control" name="eventType">
              <option>Wedding</option>
              <option>Pre-wedding</option>
              <option>Thôi nôi</option>
              <option>Lễ dạm ngõ</option>
              <option>Lễ gia tiên</option>
              <option>Tiệc tối</option>
              <option>Sự kiện khác</option>
            </select>
          </div>
          <div class="form-group">
            <label>Nhà hàng / Venue</label>
            <input type="text" class="form-control" name="venue" placeholder="Tên nhà hàng">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem">
          <div class="form-group">
            <label>Địa chỉ nhà Trai</label>
            <input type="text" class="form-control" name="boy_house" placeholder="Địa chỉ nhà trai">
          </div>
          <div class="form-group">
            <label>Địa chỉ nhà Gái</label>
            <input type="text" class="form-control" name="girl_house" placeholder="Địa chỉ nhà gái">
          </div>
        </div>

         <div class="form-group" style="margin-bottom: 1.5rem">
           <label style="font-size: 0.75rem; font-weight: 700">Dịch vụ & Nhân sự</label>
           <div id="service-rows-container" style="display: flex; flex-direction: column; gap: 0.5rem">
              <div class="service-entry-row" style="display: grid; grid-template-columns: 1.5fr 1fr 1fr 100px; gap: 0.5rem">
                 <select class="form-control" name="service_type[]">
                    ${(window.state?.settings?.serviceRoles || []).map(opt => `<option>${opt}</option>`).join('')}
                 </select>
                 <div style="display: flex; flex-direction: column;">
                   <select class="form-control" name="service_staff[]" onchange="window._checkConflictUI(this)">
                      <option value="">Chọn thợ...</option>
                      ${state.staff.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
                   </select>
                   <div class="conflict-warning" style="display:none; color: #ef4444; font-size: 0.7rem; margin-top: 0.2rem; font-weight: 700;"></div>
                 </div>
                 <input type="number" class="form-control" name="service_cost[]" placeholder="Phí thợ">
                 <input type="number" class="form-control" name="service_edit[]" placeholder="Edit">
              </div>
           </div>
           <button type="button" id="add-service-row" class="btn btn-secondary btn-sm" style="margin-top: 0.5rem; font-size: 0.65rem">+ Thêm dòng</button>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem">
          <div class="form-group">
            <label>Giá trị gói (VNĐ)</label>
            <input type="number" class="form-control" name="package" required>
          </div>
          <div class="form-group">
            <label>Cọc 20% (VNĐ)</label>
            <input type="number" class="form-control" name="deposit">
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 1.5rem">
           <label style="font-weight: 700">Timeline & Giờ</label>
           <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem; margin-top: 0.5rem">
              <div class="glass-panel" style="padding: 0.75rem">
                 <label style="display: flex; align-items: center; gap: 0.3rem; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.4rem">
                    <input type="checkbox" name="timeline[]" value="le_sang"> Lễ sáng
                 </label>
                 <input type="time" class="form-control" name="le_time" value="05:00" style="font-size: 0.8rem; padding: 0.3rem">
              </div>
              <div class="glass-panel" style="padding: 0.75rem">
                 <label style="display: flex; align-items: center; gap: 0.3rem; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.4rem">
                    <input type="checkbox" name="timeline[]" value="tiec_trua"> Tiệc trưa
                 </label>
                 <input type="time" class="form-control" name="tiec_time_trua" value="11:00" style="font-size: 0.8rem; padding: 0.3rem">
              </div>
              <div class="glass-panel" style="padding: 0.75rem">
                 <label style="display: flex; align-items: center; gap: 0.3rem; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.4rem">
                    <input type="checkbox" name="timeline[]" value="tiec_toi"> Tiệc tối
                 </label>
                 <input type="time" class="form-control" name="tiec_time_toi" value="18:00" style="font-size: 0.8rem; padding: 0.3rem">
              </div>
           </div>
        </div>

        <div class="form-group" style="margin-bottom: 1rem">
           <label style="display: flex; align-items: center; gap: 0.5rem; font-weight: 700">
              <input type="checkbox" id="two-day-toggle" onchange="document.getElementById('day2-section').style.display = this.checked ? 'block' : 'none'"> Tổ chức 2 ngày riêng biệt
           </label>
           <div id="day2-section" style="display: none; margin-top: 0.75rem; padding: 1rem; background: rgba(34,197,94,0.05); border: 1px solid rgba(34,197,94,0.15); border-radius: 10px">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 0.75rem">
                 <div class="form-group">
                    <label>Ngày 2</label>
                    <input type="date" class="form-control" name="date2">
                 </div>
                 <div class="form-group">
                    <label>Địa điểm ngày 2</label>
                    <input type="text" class="form-control" name="venue2" placeholder="Nhà hàng ngày 2">
                 </div>
              </div>
              <label style="font-size: 0.8rem; font-weight: 700; margin-bottom: 0.3rem; display: block">Dịch vụ ngày 2</label>
              <div id="service-rows-day2" style="display: flex; flex-direction: column; gap: 0.5rem">
                 <div style="display: grid; grid-template-columns: 1.5fr 1fr 1fr 100px; gap: 0.5rem">
                    <select class="form-control" name="service_type_d2[]">
                       ${(window.state?.settings?.serviceRoles || []).map(opt => `<option>${opt}</option>`).join('')}
                    </select>
                    <div style="display: flex; flex-direction: column;">
                      <select class="form-control" name="service_staff_d2[]" onchange="window._checkConflictUI(this)">
                         <option value="">Chọn thợ...</option>
                         ${state.staff.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
                      </select>
                      <div class="conflict-warning" style="display:none; color: #ef4444; font-size: 0.7rem; margin-top: 0.2rem; font-weight: 700;"></div>
                    </div>
                    <input type="number" class="form-control" name="service_cost_d2[]" placeholder="Phí thợ">
                    <input type="number" class="form-control" name="service_edit_d2[]" placeholder="Edit">
                 </div>
              </div>
              <button type="button" id="add-service-row-d2" class="btn btn-secondary btn-sm" style="margin-top: 0.5rem; font-size: 0.65rem">+ Thêm dòng ngày 2</button>
           </div>
        </div>

        <div class="modal-footer">
           <button type="button" class="btn btn-secondary" onclick="window.closeModal()">Hủy bỏ</button>
           <button type="submit" class="btn btn-primary">Xác nhận tạo</button>
        </div>
      </form>
    </div>
  `;

  // Add Row Logic
  const addRowBtn = container.querySelector('#add-service-row');
  const rowContainer = container.querySelector('#service-rows-container');
  if (addRowBtn) {
    addRowBtn.onclick = () => {
      const newRow = document.createElement('div');
      newRow.className = 'service-entry-row';
      newRow.style = 'display: grid; grid-template-columns: 1.5fr 1fr 1fr 100px; gap: 0.5rem; margin-top: 0.5rem';
      newRow.innerHTML = `
          <select class="form-control" name="service_type[]">
            ${(window.state?.settings?.serviceRoles || []).map(opt => `<option>${opt}</option>`).join('')}
          </select>
          <div style="display: flex; flex-direction: column;">
            <select class="form-control" name="service_staff[]" onchange="window._checkConflictUI(this)">
              <option value="">Chọn thợ...</option>
              ${state.staff.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
            </select>
            <div class="conflict-warning" style="display:none; color: #ef4444; font-size: 0.7rem; margin-top: 0.2rem; font-weight: 700;"></div>
          </div>
          <input type="number" class="form-control" name="service_cost[]" placeholder="Phí thợ">
          <input type="number" class="form-control" name="service_edit[]" placeholder="Edit">
        `;
      rowContainer.appendChild(newRow);
    };
  }

  // Add Row Logic Day 2
  const addRowBtnD2 = container.querySelector('#add-service-row-d2');
  const rowContainerD2 = container.querySelector('#service-rows-day2');
  if (addRowBtnD2) {
    addRowBtnD2.onclick = () => {
      const newRow = document.createElement('div');
      newRow.style = 'display: grid; grid-template-columns: 1.5fr 1fr 1fr 100px; gap: 0.5rem; margin-top: 0.5rem';
      newRow.innerHTML = `
          <select class="form-control" name="service_type_d2[]">
            ${(window.state?.settings?.serviceRoles || []).map(opt => `<option>${opt}</option>`).join('')}
          </select>
          <div style="display: flex; flex-direction: column;">
            <select class="form-control" name="service_staff_d2[]" onchange="window._checkConflictUI(this)">
              <option value="">Chọn thợ...</option>
              ${state.staff.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
            </select>
            <div class="conflict-warning" style="display:none; color: #ef4444; font-size: 0.7rem; margin-top: 0.2rem; font-weight: 700;"></div>
          </div>
          <input type="number" class="form-control" name="service_cost_d2[]" placeholder="Phí thợ">
          <input type="number" class="form-control" name="service_edit_d2[]" placeholder="Edit">
        `;
      rowContainerD2.appendChild(newRow);
    };
  }

  container.querySelector('#add-job-form').onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const serviceTypes = formData.getAll('service_type[]');
    const serviceStaffs = formData.getAll('service_staff[]');
    const serviceCosts = formData.getAll('service_cost[]');
    const serviceEdits = formData.getAll('service_edit[]');

    const services = serviceTypes.map((type, i) => ({
      service: type,
      staff: serviceStaffs[i],
      cost: parseInt(serviceCosts[i]) || 0,
      paid: false,
      edit: parseInt(serviceEdits[i]) || 0,
      date: formData.get('date')
    })).filter(s => s.staff);

    const timeline = formData.getAll('timeline[]');

    const newJob = {
      id: formData.get('jobId') || generateId(),
      jobNo: state.jobs.length + 1,
      client: formData.get('client'),
      date: formData.get('date'),
      phone: formData.get('phone') || '',
      eventType: formData.get('eventType') || 'Wedding',
      boyHouse: formData.get('boy_house'),
      girlHouse: formData.get('girl_house'),
      venue: formData.get('venue') || formData.get('boy_house') || formData.get('girl_house'),
      package: parseInt(formData.get('package')),
      deposit: parseInt(formData.get('deposit')) || 0,
      status: 'Chưa gửi',
      isTrash: false,
      visibility: true,
      date2: formData.get('date2') || '',
      venue2: formData.get('venue2') || '',
      timeline: {
        le_sang: timeline.includes('le_sang'),
        tiec_trua: timeline.includes('tiec_trua'),
        tiec_toi: timeline.includes('tiec_toi'),
        le: formData.get('le_time') || '05:00',
        tiec_trua_time: formData.get('tiec_time_trua') || '11:00',
        tiec: formData.get('tiec_time_toi') || '18:00'
      },
      services: services,
      linkCustomer: '',
      linkNAS: '',
      linkDrive: '',
      notes: ''
    };
    window.addJob(newJob);
    window.closeModal();
  };

  return container;
}

export function renderJobs(state) {
  const container = document.createElement('div');
  container.className = 'view-container reveal';
  const activeJobs = state.jobs.filter(j => !j.isTrash);
  container.innerHTML = `
    <h1 class="view-title">Kho Lưu Trữ Dự Án</h1>
    <p style="color: var(--text-dim); margin-bottom: 1rem;">Lọc theo tháng: ${state.currentMonth}/${state.currentYear}</p>
    <div class="job-grid">
      ${activeJobs.length > 0 ? activeJobs.map(job => renderJobCard(job)).join('') : '<div class="empty-state">Không có dự án nào trong kỳ này</div>'}
    </div>
  `;
  return container;
}

export function renderStaff(state) {
  const container = document.createElement('div');
  container.className = 'view-container reveal';

  // Monthly filter logic
  const staffViewMode = state.staffViewMode || 'all';
  const filteredStaff = staffViewMode === 'all' ? state.staff : state.staff.filter(m => {
    return state.jobs.some(j => {
      if (j.isTrash) return false;
      const d = new Date(j.date);
      return (d.getMonth() + 1) === state.currentMonth && d.getFullYear() === state.currentYear && j.services.some(s => _staffStr(s.staff).includes(m.name));
    });
  });

  container.innerHTML = `
    <header class="section-header">
       <h1 class="view-title">👥 Danh sách Liên hệ & CTV</h1>
    </header>

    <div style="display: flex; gap: 0.5rem; margin: 1rem 0 1.5rem">
       <button class="btn ${staffViewMode === 'all' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="window.state.staffViewMode='all'; window.updateUI && updateUI()">Tất cả (${state.staff.length})</button>
       <button class="btn ${staffViewMode === 'month' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="window.state.staffViewMode='month'; window.updateUI && updateUI()">Tháng ${state.currentMonth} (${filteredStaff.length})</button>
    </div>

    <div class="staff-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.5rem">
      ${filteredStaff.map(member => {
    const memberJobs = state.jobs.filter(j => !j.isTrash && j.services.some(s => _staffStr(s.staff).includes(member.name)));
    const totalEarnings = memberJobs.reduce((sum, j) => sum + j.services.filter(s => _staffStr(s.staff).includes(member.name)).reduce((ss, s) => ss + (s.cost || 0), 0), 0);
    const paidEarnings = memberJobs.reduce((sum, j) => sum + j.services.filter(s => _staffStr(s.staff).includes(member.name) && s.paid).reduce((ss, s) => ss + (s.cost || 0), 0), 0);
    const unpaidEarnings = totalEarnings - paidEarnings;
    const escapedName = member.name.replace(/'/g, "\\'");
    return `
          <div class="staff-card glass-panel" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem" id="staff-card-${escapedName}">
            <div style="display: flex; align-items: center; gap: 1rem">
               <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #22c55e, #14b8a6); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; font-weight: 900; color: #fff; box-shadow: 0 4px 12px rgba(34,197,94,0.2)">${member.name[0]}</div>
               <div style="flex: 1">
                  <h3 style="font-size: 1.05rem; font-weight: 700; margin: 0">${member.name}</h3>
                  <div style="display: flex; gap: 0.5rem; margin-top: 0.3rem; align-items: center">
                     <span class="badge" style="font-size: 0.65rem; background: rgba(34,197,94,0.12); color: #16a34a">${member.role}</span>
                     ${member.phone ? `<span style="font-size: 0.75rem; color: var(--text-dim)">${member.phone}</span>` : ''}
                  </div>
               </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; background: rgba(34,197,94,0.06); padding: 0.75rem; border-radius: 10px">
               <div><label style="font-size: 0.82rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700">Tổng thu</label><div class="payment-metric" style="font-size: 0.9rem; font-weight: 800">${formatCurrency(totalEarnings)}</div></div>
               <div><label style="font-size: 0.82rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700">Đã trả</label><div class="payment-metric" style="font-size: 0.9rem; font-weight: 800; color: var(--success)">${formatCurrency(paidEarnings)}</div></div>
               <div><label style="font-size: 0.82rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700">Còn nợ</label><div class="payment-metric" style="font-size: 0.9rem; font-weight: 800; color: var(--danger)">${formatCurrency(unpaidEarnings)}</div></div>
            </div>
            <div style="padding: 0.75rem; background: rgba(255,255,255,0.5); border: 1px solid var(--border); border-radius: 10px">
               <div style="color: var(--text-dim); margin-bottom: 0.3rem; font-size: 0.65rem; text-transform: uppercase; font-weight: 700">Tài khoản ngân hàng</div>
               <div style="font-weight: 700; font-size: 0.85rem">${member.bank?.no || 'Chưa cập nhật'}</div>
               <div style="font-size: 0.75rem; color: var(--text-dim)">${member.bank?.name || ''} ${member.bank?.bank ? '- ' + member.bank.bank : ''}</div>
            </div>
            <div><div style="color: var(--text-dim); margin-bottom: 0.5rem; font-size: 0.65rem; text-transform: uppercase; font-weight: 800">Job gần đây</div>
               <div style="display: flex; flex-direction: column; gap: 0.4rem">
                  ${(memberJobs.length > 0 ? memberJobs.slice(0, 3).map(j => `<div style="display: flex; justify-content: space-between; font-size: 0.8rem; padding: 0.4rem 0.5rem; background: rgba(34,197,94,0.04); border-radius: 6px"><span>${j.client}</span><span style="font-weight: 700; color: var(--success)">+${formatCurrency(j.services.find(s => _staffStr(s.staff).includes(member.name))?.cost)}</span></div>`).join('') : '<div style="font-size: 0.8rem; color: var(--text-dim); text-align: center">Chưa có</div>')}
               </div>
            </div>
            <div style="display: flex; gap: 0.5rem; margin-top: auto">
               <a href="https://zalo.me/${member.phone}" target="_blank" class="btn btn-secondary btn-sm" style="flex: 1; font-size: 0.75rem; background: #0088cc; color: #fff; border: none; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 0.3rem"><i class="fab fa-whatsapp"></i> Zalo</a>
               <a href="tel:${member.phone}" class="btn btn-secondary btn-sm" style="flex: 1; font-size: 0.75rem; background: var(--success); color: #fff; border: none; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 0.3rem"><i class="fas fa-phone"></i> Gọi</a>
            </div>
          </div>`;
  }).join('')}
    </div>
  `;
  return container;
}

export function renderFinance(state) {
  const container = document.createElement('div');
  container.className = 'view-container reveal';

  // Flatten all services from all jobs into transactions
  const transactions = [];
  state.jobs.forEach(job => {
    job.services.forEach(s => {
      transactions.push({
        date: job.date,
        job: job.client,
        description: `Thanh toán: ${s.service} - ${s.staff} `,
        amount: -s.cost,
        status: s.paid ? 'Đã trả' : 'Đợi thanh toán',
        category: 'Chi thợ'
      });
      if (s.edit > 0) {
        transactions.push({
          date: job.date,
          job: job.client,
          description: `Edit: ${s.service} `,
          amount: -s.edit,
          status: 'Chốt tháng',
          category: 'Chi Edit'
        });
      }
    });
    transactions.push({
      date: job.date,
      job: job.client,
      description: `Thu: Hợp đồng khách hàng`,
      amount: job.package,
      status: 'Đã cọc',
      category: 'Thu thực tế'
    });
  });

  if (state.manualTransactions) {
    state.manualTransactions.forEach(t => {
      transactions.push({
        id: t.id,
        date: t.date,
        job: '—',
        description: t.description,
        amount: t.type === 'chi' ? -Math.abs(t.amount) : Math.abs(t.amount),
        status: '—',
        category: t.category || (t.type === 'chi' ? 'Chi khác' : 'Thu khác'),
        isManual: true
      });
    });
  }

  // Sort by date desc
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  container.innerHTML = `
  <header class="section-header" >
       <h1 class="view-title">Bảng Giao dịch</h1>
       <div style="display: flex; gap: 0.5rem">
          <button class="btn btn-secondary btn-sm" onclick="window.exportCSV()"><i class="fas fa-file-export"></i> Xuất CSV</button>
          <button class="btn btn-primary btn-sm" onclick="document.getElementById('txn-manual-form')?.scrollIntoView({behavior:'smooth'})"><i class="fas fa-plus"></i> Thêm chi phí lẻ</button>
       </div>
    </header>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1.5rem">
       <div class="glass-panel" style="padding: 1.5rem; border-left: 4px solid var(--success)">
          <label style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-dim); font-weight: 800">Tổng THU</label>
          <div style="font-size: 1.5rem; font-weight: 900; color: var(--success); margin-top: 0.5rem">
             +${formatCurrency(transactions.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0))}
          </div>
       </div>
       <div class="glass-panel" style="padding: 1.5rem; border-left: 4px solid var(--danger)">
          <label style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-dim); font-weight: 800">Tổng CHI</label>
          <div style="font-size: 1.5rem; font-weight: 900; color: var(--danger); margin-top: 0.5rem">
             ${formatCurrency(transactions.filter(t => t.amount < 0).reduce((s, t) => s + t.amount, 0))}
          </div>
       </div>
    </div>

    <div class="glass-panel" style="margin-top: 2rem">
       <table class="data-table">
          <thead>
             <tr>
                <th>Ngày</th>
                <th>Dự án</th>
                <th>Nội dung</th>
                <th>Phân loại</th>
                <th style="text-align: right">Số tiền</th>
                <th>Trạng thái</th>
             </tr>
          </thead>
          <tbody>
             ${transactions.map(t => `
                <tr>
                   <td data-label="Ngày" style="font-size: 0.75rem; color: var(--text-dim)">${new Date(t.date).toLocaleDateString('vi-VN')}</td>
                   <td data-label="Dự án" style="font-weight: 700; font-size: 0.92rem">${t.job}</td>
                   <td data-label="Nội dung" style="font-size: 0.8rem">${t.description}</td>
                   <td data-label="Phân loại"><span class="badge" style="font-size: 0.82rem; background: ${t.category.startsWith('Thu') ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'}">${t.category}</span></td>
                   <td data-label="Số tiền" style="text-align: right; font-weight: 700; color: ${t.amount >= 0 ? 'var(--success)' : 'var(--danger)'}">
      ${t.amount >= 0 ? '+' : ''}${formatCurrency(t.amount)}
                   <td data-label="Trạng thái">
                     <span style="font-size: 0.7rem; color: var(--text-dim)">${t.status}</span>
                     ${t.isManual ? `<button onclick="window.deleteTransaction(${t.id})" style="margin-left:8px;cursor:pointer;background:none;border:none;color:var(--danger);font-size:0.8rem" title="Xóa giao dịch"><i class="fas fa-trash"></i></button>` : ''}
                   </td>
                </tr>
             `).join('')}
          </tbody>
       </table>
    </div>

    <div id="txn-manual-form" class="glass-panel" style="margin-top: 1.5rem; padding: 1.5rem">
       <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 1rem; color: var(--accent-orange)"><i class="fas fa-plus-circle" style="margin-right: 0.5rem"></i>Nhập giao dịch thủ công</h3>
       <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: flex-end">
          <div style="flex: 0.6">
             <label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.25rem">Ngày</label>
             <input type="date" id="txn-date" class="form-control" value="${new Date().toISOString().split('T')[0]}" style="font-size: 0.85rem; padding: 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border)">
          </div>
          <div style="flex: 1.5">
             <label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.25rem">Nội dung</label>
             <input type="text" id="txn-desc" class="form-control" placeholder="Mô tả giao dịch…" style="font-size: 0.85rem; padding: 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border)">
          </div>
          <div style="flex: 0.7">
             <label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.25rem">Số tiền</label>
             <input type="number" id="txn-amount" class="form-control" placeholder="0" style="font-size: 0.85rem; padding: 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border)">
          </div>
          <div style="flex: 0.5">
             <label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.25rem">Loại</label>
             <select id="txn-type" class="form-control" style="font-size: 0.85rem; padding: 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border)">
                <option value="chi">Chi</option>
                <option value="thu">Thu</option>
             </select>
          </div>
          <button class="btn btn-primary btn-sm" onclick="window.addTransaction({date:document.getElementById('txn-date').value,description:document.getElementById('txn-desc').value,amount:parseInt(document.getElementById('txn-amount').value)||0,type:document.getElementById('txn-type').value})"><i class="fas fa-plus"></i> Thêm</button>
       </div>
    </div>
`;
  return container;
}

export function renderTax(state) {
  const container = document.createElement('div');
  container.className = 'view-container reveal';

  const monthJobs = state.jobs.filter(j => !j.isTrash);
  const revenue = monthJobs.reduce((sum, j) => sum + (j.package || 0), 0);
  const staffCosts = monthJobs.reduce((sum, j) => sum + j.services.reduce((ss, s) => ss + (s.cost || 0), 0), 0);
  const editCosts = monthJobs.reduce((sum, j) => sum + j.services.reduce((ss, s) => ss + (s.edit || 0), 0), 0);
  const otherCosts = Math.round(revenue * 0.05); // Estimate 5% for ads/office
  const totalCosts = staffCosts + editCosts + otherCosts;
  const profit = revenue - totalCosts;
  const taxRate = state.settings?.taxRate ?? 0.1;
  const tax = Math.round(revenue * taxRate);
  const taxPct = Math.round(taxRate * 100);
  const netProfit = profit - tax;
  const margin = revenue > 0 ? ((profit / revenue) * 100).toFixed(1) : 0;

  container.innerHTML = `
  <h1 class="view-title" >💰 Thuế & Lợi nhuận ròng</h1>
    <div style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 2rem">Tháng ${state.currentMonth}/${state.currentYear} • ${monthJobs.length} dự án</div>

    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; margin-bottom: 2.5rem">
       <div class="glass-panel" style="padding: 1.25rem; border-top: 3px solid var(--success)">
          <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; margin-bottom: 0.5rem">Doanh thu</div>
          <div style="font-size: 1.3rem; font-weight: 900; color: var(--success)">${formatCurrency(revenue)}</div>
       </div>
       <div class="glass-panel" style="padding: 1.25rem; border-top: 3px solid var(--accent-pink)">
          <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; margin-bottom: 0.5rem">Chi phí thợ</div>
          <div style="font-size: 1.3rem; font-weight: 900; color: var(--accent-pink)">-${formatCurrency(staffCosts)}</div>
       </div>
       <div class="glass-panel" style="padding: 1.25rem; border-top: 3px solid var(--accent-orange)">
          <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; margin-bottom: 0.5rem">Chi phí Edit</div>
          <div style="font-size: 1.3rem; font-weight: 900; color: var(--accent-orange)">-${formatCurrency(editCosts)}</div>
       </div>
       <div class="glass-panel" style="padding: 1.25rem; border-top: 3px solid var(--warning)">
          <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; margin-bottom: 0.5rem">Thuế ${taxPct}%</div>
          <div style="font-size: 1.3rem; font-weight: 900; color: var(--warning)">-${formatCurrency(tax)}</div>
       </div>
       <div class="glass-panel" style="padding: 1.25rem; border-top: 3px solid ${netProfit >= 0 ? '#22c55e' : '#f87171'}">
          <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; margin-bottom: 0.5rem">Lợi nhuận ròng</div>
          <div style="font-size: 1.3rem; font-weight: 900; color: ${netProfit >= 0 ? '#22c55e' : '#f87171'}">${formatCurrency(netProfit)}</div>
          <div style="font-size: 0.7rem; color: var(--text-dim); margin-top: 0.3rem">Margin: ${margin}%</div>
       </div>
    </div>

    <div class="glass-panel" style="padding: 1.5rem">
       <h3 style="margin-bottom: 1.5rem; font-size: 1rem; font-weight: 800">Chi tiết theo Job</h3>
       <table class="data-table">
          <thead>
             <tr><th>Job</th><th>Khách hàng</th><th style="text-align:right">Doanh thu</th><th style="text-align:right">Chi thợ</th><th style="text-align:right">Chi edit</th><th style="text-align:right">Lợi nhuận</th></tr>
          </thead>
          <tbody>
             ${monthJobs.map(j => {
    const jRev = j.package || 0;
    const jStaff = j.services.reduce((s, sv) => s + (sv.cost || 0), 0);
    const jEdit = j.services.reduce((s, sv) => s + (sv.edit || 0), 0);
    const jProfit = jRev - jStaff - jEdit;
    return `<tr>
                  <td data-label="Job" style="font-weight: 700; font-size: 0.85rem">${j.id}</td>
                  <td data-label="Khách hàng" style="font-size: 0.85rem">${j.client}</td>
                  <td data-label="Doanh thu" style="text-align: right; color: var(--success); font-weight: 700">${formatCurrency(jRev)}</td>
                  <td data-label="Chi thợ" style="text-align: right; color: var(--danger); font-weight: 700">${formatCurrency(jStaff)}</td>
                  <td data-label="Chi edit" style="text-align: right; color: var(--warning); font-weight: 700">${formatCurrency(jEdit)}</td>
                  <td data-label="Lợi nhuận" style="text-align: right; font-weight: 800; color: ${jProfit >= 0 ? '#22c55e' : '#f87171'}">${formatCurrency(jProfit)}</td>
               </tr>`;
  }).join('')}
             <tr style="border-top: 2px solid var(--border); font-weight: 900">
                <td colspan="2">TỔNG CỘNG</td>
                <td style="text-align: right; color: var(--success)">${formatCurrency(revenue)}</td>
                <td style="text-align: right; color: var(--accent-pink)">${formatCurrency(staffCosts)}</td>
                <td style="text-align: right; color: var(--accent-orange)">${formatCurrency(editCosts)}</td>
                <td style="text-align: right; color: ${profit >= 0 ? '#22c55e' : '#f87171'}">${formatCurrency(profit)}</td>
             </tr>
          </tbody>
       </table>
    </div>
`;
  // Thêm widget thuế suất editable
  const taxWidget = document.createElement('div');
  taxWidget.className = 'glass-panel';
  taxWidget.style.cssText = 'padding:1rem;margin-top:1rem;display:flex;gap:1rem;align-items:center;flex-wrap:wrap';
  const curTaxRate = state.settings?.taxRate ?? 0.1;
  taxWidget.innerHTML = `
    <span style="font-size:0.85rem;font-weight:700">⚙️ Thuế suất:</span>
    <input type="number" id="tax-rate-input" value="${(curTaxRate * 100).toFixed(1)}"
      min="0" max="100" step="0.5"
      style="width:80px;border:1px solid var(--border);border-radius:6px;padding:0.3rem 0.5rem;font-size:0.9rem;font-weight:700;background:rgba(255,255,255,0.05);color:var(--text-main)">
    <span style="font-size:0.85rem;color:var(--text-dim)">%</span>
    <button class="btn btn-primary btn-sm" onclick="window.updateTaxRate(document.getElementById('tax-rate-input').value/100)">Cập nhật</button>
    <span style="font-size:0.75rem;color:var(--text-dim)">(Mặc định 10% — thay đổi sẽ ảnh hưởng toàn bộ tính toán thuế)</span>
  `;
  container.appendChild(taxWidget);
  return container;
}
export function renderCalendar(state) {
  const container = document.createElement('div');
  container.className = 'view-container reveal';

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingJobs = state.jobs.filter(j => {
    if (j.isTrash) return false;
    const jobDate = new Date(j.date);
    jobDate.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((jobDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 30;
  });
  upcomingJobs.sort((a, b) => new Date(a.date) - new Date(b.date));

  const getUrgency = (days) => {
    if (days <= 2) return { color: '#f87171', bg: 'rgba(248,113,113,0.12)', border: '#f87171', label: '🔴 KHẨN CẤP', pulse: 'animation: pulse 1.5s infinite' };
    if (days <= 7) return { color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', border: '#fbbf24', label: '🟡 SẮP TỚI', pulse: '' };
    if (days <= 14) return { color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', border: '#60a5fa', label: '🟢 ỔN ĐỊNH', pulse: '' };
    return { color: '#9090b0', bg: 'rgba(144,144,176,0.05)', border: '#9090b0', label: '⚪ BÌNH THƯỜNG', pulse: '' };
  };

  container.innerHTML = `
  <style> @keyframes pulse { 0 %, 100 % { opacity: 1; } 50 % { opacity: 0.6; } }</style>
    <header class="section-header">
       <h1 class="view-title">📅 Lịch Nhắc Việc</h1>
       <div style="display: flex; align-items: center; gap: 1rem">
          <span style="font-size: 0.85rem; color: var(--text-dim)">30 ngày tới • ${upcomingJobs.length} việc</span>
       </div>
    </header>

    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 1rem; margin: 1.5rem 0">
       <div class="glass-panel" style="padding: 1rem; text-align: center; border-top: 3px solid #f87171">
          <div style="font-size: 1.8rem; font-weight: 900; color: #f87171">${upcomingJobs.filter(j => Math.ceil((new Date(j.date) - today) / (86400000)) <= 2).length}</div>
          <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700">Khẩn cấp</div>
       </div>
       <div class="glass-panel" style="padding: 1rem; text-align: center; border-top: 3px solid #fbbf24">
          <div style="font-size: 1.8rem; font-weight: 900; color: #fbbf24">${upcomingJobs.filter(j => { const d = Math.ceil((new Date(j.date) - today) / (86400000)); return d > 2 && d <= 7; }).length}</div>
          <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700">Sắp tới</div>
       </div>
       <div class="glass-panel" style="padding: 1rem; text-align: center; border-top: 3px solid #60a5fa">
          <div style="font-size: 1.8rem; font-weight: 900; color: #60a5fa">${upcomingJobs.filter(j => { const d = Math.ceil((new Date(j.date) - today) / (86400000)); return d > 7 && d <= 14; }).length}</div>
          <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700">Ổn định</div>
       </div>
       <div class="glass-panel" style="padding: 1rem; text-align: center; border-top: 3px solid #9090b0">
          <div style="font-size: 1.8rem; font-weight: 900; color: #9090b0">${upcomingJobs.filter(j => Math.ceil((new Date(j.date) - today) / (86400000)) > 14).length}</div>
          <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700">Bình thường</div>
       </div>
    </div>

    <div class="reminder-list" style="margin-top: 1rem; display: flex; flex-direction: column; gap: 1rem">
      ${upcomingJobs.length > 0 ? upcomingJobs.map((job, mapIdx) => {
    const jobDate = new Date(job.date);
    const diffDays = Math.ceil((jobDate - today) / (1000 * 60 * 60 * 24));
    const u = getUrgency(diffDays);
    const staffList = job.services.map(s => s.staff).join(', ');
    const isToday = diffDays === 0;
    return `
          <div ${isToday ? 'id="calendar-today-item"' : ''} class="glass-panel" style="padding: 1.25rem 1.5rem; border-left: 4px solid ${u.border}; background: ${isToday ? 'rgba(59,130,246,0.08)' : u.bg}; position: relative; ${u.pulse}${isToday ? ';box-shadow:0 0 0 2px #3b82f6,0 4px 16px rgba(59,130,246,0.15)' : ''}">
             ${isToday ? '<div style="position:absolute;top:0.5rem;right:0.75rem;font-size:0.62rem;font-weight:900;color:#3b82f6;background:rgba(59,130,246,0.12);padding:0.15rem 0.5rem;border-radius:20px;letter-spacing:0.5px">📍 HÔM NAY</div>' : ''}
             <div style="display: flex; justify-content: space-between; align-items: flex-start">
                <div style="flex: 1">
                   <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem">
                      <span style="font-size: 0.65rem; padding: 0.2rem 0.5rem; border-radius: 20px; background: ${u.bg}; border: 1px solid ${u.border}; font-weight: 700">${u.label}</span>
                      <span style="font-size: 0.75rem; color: var(--text-dim)">${job.id}</span>
                   </div>
                   <h3 style="font-size: 1.1rem; font-weight: 800; margin: 0 0 0.5rem 0">${job.client}</h3>
                   <div style="display: flex; gap: 2rem; font-size: 0.85rem; color: var(--text-muted)">
                      <span><i class="fas fa-calendar" style="margin-right: 0.3rem; color: ${u.color}"></i>${jobDate.toLocaleDateString('vi-VN')}</span>
                      <span><i class="fas fa-users" style="margin-right: 0.3rem"></i>${staffList || '—'}</span>
                      <span><i class="fas fa-clock" style="margin-right: 0.3rem"></i>${job.timeline?.le || '—'}</span>
                   </div>
                   ${job.venue ? `<div style="font-size: 0.8rem; color: var(--text-dim); margin-top: 0.4rem"><i class="fas fa-map-marker-alt" style="margin-right: 0.3rem"></i>${job.venue}</div>` : ''}
                </div>
                <div style="text-align: center; min-width: 70px">
                   <div style="font-size: 2rem; font-weight: 900; color: ${isToday ? '#3b82f6' : u.color}; line-height: 1">${diffDays}</div>
                   <div style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700">${isToday ? 'Hôm nay' : 'ngày'}</div>
                </div>
             </div>
          </div>
        `;
  }).join('') : '<div class="empty-state" style="padding: 3rem; text-align: center; color: var(--text-dim)">&#127881; Không có việc nào trong 30 ngày tới</div>'}
    </div>
`;
  // #4 Smart Focus: auto-scroll to today's item after render
  setTimeout(() => {
    const todayEl = container.querySelector('#calendar-today-item');
    if (todayEl) {
      todayEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 150);
  return container;
}

export function renderTrash(state) {
  const container = document.createElement('div');
  container.className = 'view-container reveal';
  const trashJobs = state.jobs.filter(j => j.isTrash);
  container.innerHTML = `
  <h1 class="view-title" > Thùng Rác</h1>
    <div class="job-grid" style="margin-top: 1rem">
      ${trashJobs.length > 0 ? trashJobs.map(job => renderJobCard(job)).join('') : '<div class="empty-state">Thùng rác trống</div>'}
    </div>
`;
  return container;
}

export function renderDeadlineEdit(state) {
  const container = document.createElement('div');
  container.className = 'view-container reveal';

  const editTasks = [];
  state.jobs.forEach(job => {
    if (job.isTrash) return;
    const deadlines = calculateDeadlines(job.date);
    job.services.forEach(s => {
      const isVideo = s.service.toLowerCase().includes('quay');
      editTasks.push({
        job: job.client,
        id: job.id,
        service: s.service,
        staff: s.staff,
        editStaff: s.editStaff || '—',
        editCost: s.edit || 0,
        deadline: isVideo ? deadlines.video : deadlines.photo,
        deadlineRaw: isVideo ? deadlines.videoRaw : deadlines.photoRaw,
        type: isVideo ? 'VIDEO' : 'ẢNH',
        status: s.editStatus || (job.status === 'Đã hoàn thành' ? 'Hoàn thành' : 'Chưa bắt đầu')
      });
    });
  });

  // Filter by tab: EDIT ẢNH or EDIT VIDEO
  const filteredTasks = state.deadlineFilter === 'TẤT CẢ'
    ? editTasks
    : state.deadlineFilter === 'ẢNH'
      ? editTasks.filter(t => t.type === 'ẢNH')
      : editTasks.filter(t => t.type === 'VIDEO');

  // Check if deadline passed
  const today = new Date();

  container.innerHTML = `
  <header class="section-header" >
       <h1 class="view-title">Deadline EDIT Tracker</h1>
       <div class="month-tabs" style="background: none; border: 1px solid var(--border)">
          <div class="month-tab ${state.deadlineFilter === 'TẤT CẢ' ? 'active' : ''}" onclick="window.setDeadlineFilter('TẤT CẢ')">TẤT CẢ</div>
          <div class="month-tab ${state.deadlineFilter === 'ẢNH' ? 'active' : ''}" onclick="window.setDeadlineFilter('ẢNH')">EDIT ẢNH</div>
          <div class="month-tab ${state.deadlineFilter === 'VIDEO' ? 'active' : ''}" onclick="window.setDeadlineFilter('VIDEO')">EDIT VIDEO</div>
       </div>
    </header>

  <div class="glass-panel" style="margin-top: 2rem">
    <table class="data-table">
      <thead>
        <tr>
          <th>JOB</th>
          <th>HẠNG MỤC</th>
          <th>DEADLINE</th>
          <th>TRẠNG THÁI</th>
          <th>NHÂN SỰ</th>
          <th>NHÂN SỰ EDIT</th>
          <th style="text-align: right">CHI PHÍ EDIT</th>
          <th>DỊCH VỤ</th>
        </tr>
      </thead>
      <tbody>
        ${filteredTasks.length > 0 ? filteredTasks.map(t => {
    const deadlinePassed = t.deadlineRaw && t.deadlineRaw < today;
    const deadlineColor = t.status === 'Hoàn thành' ? 'var(--success)' : deadlinePassed ? 'var(--danger)' : '#ff9800';
    return `
                <tr>
                   <td data-label="Job" style="font-weight: 800; font-size: 0.92rem">${t.job}</td>
                   <td data-label="Hạng mục"><span class="badge" style="background: ${t.type === 'VIDEO' ? 'rgba(236,72,153,0.1)' : 'rgba(59,130,246,0.1)'}; color: ${t.type === 'VIDEO' ? '#ec4899' : '#3b82f6'}">${t.type}</span></td>
                   <td data-label="Deadline" style="font-family: monospace; font-weight: 700; color: ${deadlineColor}">
                      ${t.deadline}
                      ${deadlinePassed && t.status !== 'Hoàn thành' ? '<span style="color: var(--danger); font-size: 0.55rem; display: block">MISSED</span>' : ''}
                   </td>
                   <td data-label="Trạng thái">
                      <select class="form-control deadline-status-select" data-job-id="${t.id}" data-service="${t.service}" style="padding: 0.25rem 0.6rem; font-size: 0.85rem; width: 140px; background:#fff; border:1.5px solid var(--border); color:var(--text-main)">
                         <option ${t.status === 'Chưa bắt đầu' ? 'selected' : ''}>Chưa bắt đầu</option>
                         <option ${t.status === 'Đang làm' ? 'selected' : ''}>Đang làm</option>
                         <option ${t.status === 'Demo 1' ? 'selected' : ''}>Demo 1</option>
                         <option ${t.status === 'Demo 2' ? 'selected' : ''}>Demo 2</option>
                         <option ${t.status === 'Hoàn thành' ? 'selected' : ''}>Hoàn thành</option>
                      </select>
                   </td>
                   <td data-label="Nhân sự" style="font-size: 0.88rem; font-weight:600">${t.staff}</td>
                   <td data-label="Người Cắt" style="font-size: 0.88rem; color: var(--accent); font-weight:700">${t.editStaff}</td>
                   <td data-label="Phí Edit" style="text-align: right; font-size: 0.88rem; font-weight:700; color:var(--danger)">${formatCurrency(t.editCost)}</td>
                   <td data-label="Dịch vụ" style="font-size: 0.85rem; color: var(--text-dim); font-weight:600">${t.service}</td>
                </tr>
              `;
  }).join('') : '<tr><td colspan="8" style="text-align: center; padding: 2rem">Không có dữ liệu phù hợp</td></tr>'}
      </tbody>
    </table>
  </div>
`;

  // Event delegation for deadline status selects
  container.addEventListener('change', function (ev) {
    var sel = ev.target;
    if (!sel.classList.contains('deadline-status-select')) return;
    var jobId = sel.getAttribute('data-job-id');
    var service = sel.getAttribute('data-service');
    var status = sel.value;
    if (!jobId || !service) return;
    window.updateEditStatus(jobId, service, status);
  });



  return container;
}

export function renderEditVideo(state) {
  const container = document.createElement('div');
  container.className = 'view-container reveal';

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const EDIT_DAYS = 20;

  // Thu thập tất cả video tasks từ Deliverables
  const videoTasks = [];
  state.jobs.forEach(job => {
    if (job.isTrash) return;
    (job.deliverables || []).forEach((d, dIdx) => {
      const isVideo = d.type === 'Video';
      if (!isVideo) return;

      const jobDate = new Date(job.date);
      jobDate.setHours(0, 0, 0, 0);
      const deadlineDate = new Date(jobDate);
      deadlineDate.setDate(deadlineDate.getDate() + EDIT_DAYS);

      const diffMs = deadlineDate - today;
      const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      const elapsed = EDIT_DAYS - daysLeft;
      const progress = Math.max(0, Math.min(100, (elapsed / EDIT_DAYS) * 100));

      let stage, stageColor, stageBg, stageIcon;
      const editStatus = d.editStatus || 'Chưa bắt đầu';
      if (editStatus === 'Hoàn thành') {
        stage = 'HOÀN THÀNH'; stageColor = '#22c55e'; stageBg = 'rgba(34,197,94,0.08)'; stageIcon = '✅';
      } else if (daysLeft > 10) {
        stage = 'THOẢI MÁI'; stageColor = '#22c55e'; stageBg = 'rgba(34,197,94,0.06)'; stageIcon = '🟢';
      } else if (daysLeft > 5) {
        stage = 'CẦN ĐẨY'; stageColor = '#eab308'; stageBg = 'rgba(234,179,8,0.06)'; stageIcon = '🟡';
      } else if (daysLeft > 0) {
        stage = 'GẤP'; stageColor = '#f97316'; stageBg = 'rgba(249,115,22,0.08)'; stageIcon = '🟠';
      } else {
        stage = 'QUÁ HẠN'; stageColor = '#ef4444'; stageBg = 'rgba(239,68,68,0.08)'; stageIcon = '🔴';
      }

      videoTasks.push({
        jobId: job.id,
        jobNo: job.jobNo,
        client: job.client,
        service: d.name, // Tên thành phẩm
        serviceIdx: dIdx, // Vị trí trong mảng deliverables
        qty: d.quantity || 1, // Số lượng
        editStaff: d.editor || '',
        editStatus,
        editDriveLink: d.editDriveLink || '',
        jobDate: job.date,
        deadlineDate,
        deadlineStr: deadlineDate.toLocaleDateString('vi-VN'),
        daysLeft,
        progress,
        stage, stageColor, stageBg, stageIcon
      });
    });
  });

  // Sắp xếp thông minh: Quá hạn → Gấp → Cần đẩy → Thoải mái → Hoàn thành
  const stageOrder = { 'QUÁ HẠN': 0, 'GẤP': 1, 'CẦN ĐẨY': 2, 'THOẢI MÁI': 3, 'HOÀN THÀNH': 4 };
  videoTasks.sort((a, b) => (stageOrder[a.stage] ?? 5) - (stageOrder[b.stage] ?? 5) || a.daysLeft - b.daysLeft);

  // Lọc theo nhân sự edit
  const editFilter = state.editVideoFilter || 'TẤT CẢ';
  const allEditors = [...new Set(videoTasks.map(t => t.editStaff).filter(Boolean))].sort();
  let filtered = editFilter === 'TẤT CẢ' ? videoTasks : videoTasks.filter(t => t.editStaff === editFilter);

  // Lọc theo trạng thái hoàn thành
  const statusFilter = state.editVideoStatusFilter || 'ALL';
  if (statusFilter === 'DONE') filtered = filtered.filter(t => t.editStatus === 'Hoàn thành');
  else if (statusFilter === 'PENDING') filtered = filtered.filter(t => t.editStatus !== 'Hoàn thành');
  else if (statusFilter === 'PENDING_DEMO') filtered = filtered.filter(t => t.editStatus === 'Chưa bắt đầu' || t.editStatus === 'Đang cắt');

  // Phase 3 #6: Audit link — filter clips Done nhưng chưa có link
  if (state.editVideoMissingLink) {
    filtered = filtered.filter(t => t.editStatus === 'Hoàn thành' && !t.editDriveLink);
  }

  const isKanban = (state.editVideoView || 'list') === 'kanban';
  const kanbanStatuses = [
    { key: 'Chưa bắt đầu', label: '⏳ Chưa bắt đầu', color: '#94a3b8' },
    { key: 'Đang cắt', label: '✂️ Đang cắt', color: '#3b82f6' },
    { key: 'Demo 1', label: '🖥️ Demo', color: '#f59e0b' },
    { key: 'Chỉnh sửa', label: '🔧 Chỉnh sửa', color: '#8b5cf6' },
    { key: 'Hoàn thành', label: '✅ Hoàn thành', color: '#22c55e' }
  ];

  // Thống kê
  const total = videoTasks.length;
  const done = videoTasks.filter(t => t.editStatus === 'Hoàn thành').length;
  const inProgress = videoTasks.filter(t => ['Đang cắt', 'Demo 1', 'Chỉnh sửa'].includes(t.editStatus)).length;
  const overdue = videoTasks.filter(t => t.stage === 'QUÁ HẠN').length;

  // Staff dropdown options
  const staffOptions = state.staff.map(s => `<option value="${s.name}">${s.name}</option>`).join('');

  // Phase 3 #3: Editor KPI summary (only for admins)
  const isAdmin = (window.state?.currentUser?.role === 'admin') || !window.state?.currentUser;
  const editorKPIHtml = (() => {
    if (!isAdmin) return '';
    const editorMap = {};
    videoTasks.filter(t => t.editStatus === 'Ho\u00e0n th\u00e0nh' && t.editStaff).forEach(t => {
      if (!editorMap[t.editStaff]) editorMap[t.editStaff] = { clips: 0 };
      editorMap[t.editStaff].clips++;
    });
    const entries = Object.entries(editorMap);
    if (entries.length === 0) return '';
    return `<div class="glass-panel" style="padding:0.65rem 1rem;margin-bottom:1rem;border-left:3px solid #a855f7;background:rgba(168,85,247,0.04)">
      <div style="font-size:0.68rem;font-weight:800;color:#a855f7;text-transform:uppercase;margin-bottom:0.4rem">&#128176; KPI H\u1eadu k\u1ef3 th\u00e1ng n\u00e0y (clip \u0110\u00c3 xong)</div>
      <div style="display:flex;gap:0.6rem;flex-wrap:wrap">
        ${entries.map(([name, d]) => `<div style="background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.2);border-radius:6px;padding:0.3rem 0.7rem">
          <div style="font-size:0.72rem;font-weight:800">${name}</div>
          <div style="font-size:0.6rem;color:var(--text-dim)">${d.clips} clip ho\u00e0n th\u00e0nh</div>
        </div>`).join('')}
      </div>
    </div>`;
  })();

  container.innerHTML = `
    <header class="section-header">
       <div>
         <h1 class="view-title">&#127916; Edit Video Tracker</h1>
         <p style="color: var(--text-dim); font-size: 0.85rem; margin-top: 0.2rem">Theo d\u00f5i ti\u1ebfn \u0111\u1ed9 h\u1eadu k\u1ef3 video \u2014 Deadline ${EDIT_DAYS} ng\u00e0y</p>
       </div>
    </header>
    ${editorKPIHtml}

    <!-- Thống kê tổng quan -->
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 1.5rem">
       <div class="glass-panel" style="padding: 1rem; border-top: 3px solid #3b82f6; text-align: center">
          <div style="font-size: 0.65rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800">Tổng Video</div>
          <div style="font-size: 1.8rem; font-weight: 900; color: #3b82f6; margin-top: 0.3rem">${total}</div>
       </div>
       <div class="glass-panel" style="padding: 1rem; border-top: 3px solid #22c55e; text-align: center">
          <div style="font-size: 0.65rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800">Đã xong</div>
          <div style="font-size: 1.8rem; font-weight: 900; color: #22c55e; margin-top: 0.3rem">${done}</div>
       </div>
       <div class="glass-panel" style="padding: 1rem; border-top: 3px solid #f97316; text-align: center">
          <div style="font-size: 0.65rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800">Đang làm</div>
          <div style="font-size: 1.8rem; font-weight: 900; color: #f97316; margin-top: 0.3rem">${inProgress}</div>
       </div>
       <div class="glass-panel" style="padding: 1rem; border-top: 3px solid #ef4444; text-align: center">
          <div style="font-size: 0.65rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800">Quá hạn</div>
          <div style="font-size: 1.8rem; font-weight: 900; color: #ef4444; margin-top: 0.3rem">${overdue}</div>
       </div>
    </div>

    <!-- Bộ lọc nhân sự edit -->
    <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.5rem">
       <button onclick="window.setEditVideoFilter('TẤT CẢ')" class="btn btn-sm" style="font-size: 0.78rem; padding: 0.25rem 0.7rem; border-radius: 20px; ${editFilter === 'TẤT CẢ' ? 'background: var(--primary); color: #fff; border: none' : 'background: #fff; color: var(--text-dim); border: 1px solid var(--border)'}">Tất cả (${total})</button>
       ${allEditors.map(name => `
         <button onclick="window.setEditVideoFilter('${name}')" class="btn btn-sm" style="font-size: 0.78rem; padding: 0.25rem 0.7rem; border-radius: 20px; ${editFilter === name ? 'background: var(--primary); color: #fff; border: none' : 'background: #fff; color: var(--text-dim); border: 1px solid var(--border)'}">${name}</button>
       `).join('')}
    </div>
    <div style="display: flex; gap: 0.35rem; margin-bottom: 1.2rem; flex-wrap: wrap; align-items: center">
      <button onclick="window.setEditVideoStatusFilter('ALL')" style="font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 16px; cursor: pointer; font-weight: 700; font-family: inherit; ${statusFilter === 'ALL' ? 'background:#3b82f6;color:#fff;border:none' : 'background:#fff;color:var(--text-dim);border:1px solid var(--border)'}">&#127916; Tất cả (${videoTasks.length})</button>
      <button onclick="window.setEditVideoStatusFilter('PENDING')" style="font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 16px; cursor: pointer; font-weight: 700; font-family: inherit; ${statusFilter === 'PENDING' ? 'background:#f97316;color:#fff;border:none' : 'background:#fff;color:var(--text-dim);border:1px solid var(--border)'}">&#9888;&#65039; Chưa xong (${videoTasks.filter(t => t.editStatus !== 'Hoàn thành').length})</button>
      <button onclick="window.setEditVideoStatusFilter('PENDING_DEMO')" style="font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 16px; cursor: pointer; font-weight: 700; font-family: inherit; ${statusFilter === 'PENDING_DEMO' ? 'background:#8b5cf6;color:#fff;border:none' : 'background:#fff;color:var(--text-dim);border:1px solid var(--border)'}">&#128640; Chưa gửi Demo (${videoTasks.filter(t => t.editStatus === 'Chưa bắt đầu' || t.editStatus === 'Đang cắt').length})</button>
      <button onclick="window.setEditVideoStatusFilter('DONE')" style="font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 16px; cursor: pointer; font-weight: 700; font-family: inherit; ${statusFilter === 'DONE' ? 'background:#22c55e;color:#fff;border:none' : 'background:#fff;color:var(--text-dim);border:1px solid var(--border)'}">&#9989; Hoàn thành (${done})</button>
      <!-- Phase 3 #6: Audit Link Filter -->
      <button onclick="window.setMissingLinkFilter('video', ${!state.editVideoMissingLink})" style="font-size: 0.72rem; padding: 0.2rem 0.6rem; border-radius: 16px; cursor: pointer; font-weight: 700; font-family: inherit; ${state.editVideoMissingLink ? 'background:#f59e0b;color:#fff;border:none' : 'background:#fff;color:var(--text-dim);border:1px solid var(--border)'}" title="Lọc những clip ĐÃ xong nhưng chưa nộp link">&#128279; Thiếu Link (${videoTasks.filter(t => t.editStatus === 'Hoàn thành' && !t.editDriveLink).length})</button>
      <span style="margin-left:auto;display:flex;gap:0.3rem">
        <button onclick="window.toggleEditVideoView('kanban')" style="font-size:0.72rem;padding:0.2rem 0.55rem;border-radius:16px;cursor:pointer;font-weight:700;font-family:inherit;${isKanban ? 'background:var(--primary);color:#fff;border:none' : 'background:#fff;color:var(--text-dim);border:1px solid var(--border)'}">📋 Kanban</button>
        <button onclick="window.toggleEditVideoView('list')" style="font-size:0.72rem;padding:0.2rem 0.55rem;border-radius:16px;cursor:pointer;font-weight:700;font-family:inherit;${!isKanban ? 'background:var(--primary);color:#fff;border:none' : 'background:#fff;color:var(--text-dim);border:1px solid var(--border)'}">📝 List</button>
      </span>
    </div>

    ${isKanban ? `<div style="display:grid;grid-template-columns:repeat(${kanbanStatuses.length},1fr);gap:0.6rem;overflow-x:auto;min-height:300px">
      ${kanbanStatuses.map(ks => {
    const colTasks = filtered.filter(t => t.editStatus === ks.key); return `
        <div class="ev-col" data-status="${ks.key}" style="background:var(--bg-deep);border:1px solid var(--border);border-radius:10px;padding:0.5rem;border-top:3px solid ${ks.color}">
          <div style="font-size:0.72rem;font-weight:800;color:${ks.color};margin-bottom:0.4rem;text-align:center">${ks.label} (${colTasks.length})</div>
          <div class="ev-col-cards" data-status="${ks.key}" style="min-height:60px;display:flex;flex-direction:column;gap:0.4rem">
            ${colTasks.map(t => `<div class="ev-card" onclick="window.openQuickPreview('${t.jobId}')" data-jobid="${t.jobId}" data-sidx="${t.serviceIdx}" style="background:${t.editStatus !== 'Hoàn thành' && t.stage === 'QUÁ HẠN' ? '#fef2f2' : t.editStatus !== 'Hoàn thành' && t.stage === 'GẤP' ? '#fff7ed' : 'var(--bg-main)'};border:1px solid ${t.stageColor}30;border-radius:6px;padding:0.4rem 0.5rem;border-left:3px solid ${t.stageColor};cursor:grab;box-shadow:0 1px 2px rgba(0,0,0,0.03)">
              <div style="font-size:0.75rem;font-weight:800;color:var(--text-main);margin-bottom:0.15rem;display:flex;justify-content:space-between;align-items:center">
                <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:130px" title="${t.client}">${t.client}</span>
                ${t.editStatus !== 'Hoàn thành' && t.daysLeft <= 0 ? '<span title="Quá hạn" style="animation:pulse 2s infinite;font-size:0.65rem">🚨</span>' : ''}
              </div>
              <div style="font-size:0.6rem;color:var(--text-dim);margin-bottom:0.3rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${t.service}">🎬 ${t.service} <strong style="color:var(--text-main)">(x${t.qty})</strong></div>
              <div style="display:flex;justify-content:space-between;align-items:center">
                <span style="font-size:0.55rem;font-weight:700;color:${t.editStatus === 'Hoàn thành' ? '#22c55e' : t.daysLeft > 0 ? 'var(--text-dim)' : '#ef4444'}">⏰ ${t.deadlineStr}</span>
                <span style="font-size:0.55rem;font-weight:700;background:#a855f715;color:#a855f7;padding:0.15rem 0.3rem;border-radius:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:70px" title="${t.editStaff || 'Chưa gán'}">✏️ ${t.editStaff || 'Trống'}</span>
              </div>
            </div>`).join('')}
          </div>
        </div>`;
  }).join('')}
    </div>` : `
    <div class="edit-video-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 1.25rem">
       ${filtered.length > 0 ? filtered.map(t => {
    const progressColor = t.editStatus === 'Hoàn thành' ? '#22c55e' : t.stageColor;
    const progressPct = t.editStatus === 'Hoàn thành' ? 100 : t.progress;

    // Workflow steps
    const steps = ['Chưa bắt đầu', 'Đang cắt', 'Demo 1', 'Chỉnh sửa', 'Hoàn thành'];
    const currentStep = steps.indexOf(t.editStatus);

    return `
         <div class="edit-video-card" style="background: ${t.stageBg}; border: 1.5px solid ${t.stageColor}30; border-radius: 12px; padding: 0.75rem; transition: all 0.2s; box-shadow: 0 2px 8px rgba(0,0,0,0.03)">
            <!-- Header -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem">
               <div style="display: flex; align-items: center; gap: 0.4rem">
                  <span style="font-size: 0.68rem; font-weight: 900; color: ${t.stageColor}; text-transform: uppercase; background: ${t.stageColor}15; padding: 0.1rem 0.4rem; border-radius: 4px">${t.stage}</span>
                  <span style="font-size: 0.7rem; font-weight: 700; color: var(--text-dim); background: rgba(0,0,0,0.04); padding: 0.1rem 0.4rem; border-radius: 4px">${t.service}</span>
                  <span style="font-size: 0.6rem; font-weight: 800; color: var(--primary); background: var(--accent-soft); padding: 0.1rem 0.4rem; border-radius: 4px">#${t.jobNo || '—'}</span>
               </div>
               <span style="font-size: 0.65rem; font-weight: 800; color: ${t.stageColor}; ${t.stage === 'QUÁ HẠN' ? 'animation:pulse 2s infinite' : ''}">${t.editStatus === 'Hoàn thành' ? '✅' : t.daysLeft > 0 ? '⏳ ' + t.daysLeft + 'ng' : '🚨 -' + Math.abs(t.daysLeft) + 'ng'}</span>
            </div>

            <!-- Client -->
            <div style="font-size: 0.95rem; font-weight: 800; margin-bottom: 0.3rem; line-height: 1.2">${t.client}</div>

            <!-- Progress bar mini -->
            <div style="display: flex; gap: 0.15rem; margin-bottom: 0.5rem">
               ${steps.map((step, idx) => {
      const isActive = idx === currentStep;
      const isDone = idx < currentStep;
      const dotColor = isDone ? '#22c55e' : isActive ? t.stageColor : 'rgba(0,0,0,0.1)';
      return `<div style="flex: 1; height: 3px; background: ${dotColor}; border-radius: 2px" title="${step}"></div>`;
    }).join('')}
            </div>

            <!-- Controls compact -->
            <div style="display: flex; flex-direction: column; gap: 0.35rem; background: rgba(255,255,255,0.5); padding: 0.5rem; border-radius: 8px; border: 1px solid var(--border)">
               <div style="display: flex; align-items: center; gap: 0.4rem">
                  <label style="font-size: 0.62rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800; min-width: 55px">🎬 Editor</label>
                  <select class="form-control ev-editor-select" data-job-id="${t.jobId}" data-sidx="${t.serviceIdx}"
                     style="flex: 1; font-size: 0.8rem; padding: 0.25rem 0.4rem; background: #fff; border: 1px solid var(--border); font-weight: 700">
                     <option value="">— Chưa chọn —</option>
                     ${state.staff.map(s => `<option value="${s.name}" ${t.editStaff === s.name ? 'selected' : ''}>${s.name}</option>`).join('')}
                  </select>
               </div>
               <div style="display: flex; align-items: center; gap: 0.4rem">
                  <label style="font-size: 0.62rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800; min-width: 55px">📊 T.Thái</label>
                  <select class="form-control ev-status-select" data-job-id="${t.jobId}" data-sidx="${t.serviceIdx}"
                     style="flex: 1; font-size: 0.8rem; padding: 0.25rem 0.4rem; background: #fff; border: 1px solid ${t.stageColor}40; color: ${t.stageColor}; font-weight: 800">
                     ${steps.map(step => `<option value="${step}" ${t.editStatus === step ? 'selected' : ''}>${step}</option>`).join('')}
                  </select>
               </div>
               <div style="display: flex; align-items: center; gap: 0.4rem">
                  <label style="font-size: 0.62rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800; min-width: 55px">🔗 Drive</label>
                  <input type="text" class="form-control ev-drive-input" data-job-id="${t.jobId}" data-sidx="${t.serviceIdx}"
                     placeholder="Link sản phẩm…" value="${t.editDriveLink}"
                     style="flex: 1; font-size: 0.78rem; padding: 0.25rem 0.4rem; background: #fff; border: 1px solid var(--border)">
                  ${t.editDriveLink ? `<a href="${t.editDriveLink}" target="_blank" style="font-size: 0.65rem; color: #22c55e; font-weight: 700; white-space: nowrap; text-decoration: none">Mở ↗</a>` : ''}
               </div>
            </div>
         </div>`;
  }).join('') : '<div class="empty-state">Không có video task nào trong tháng này</div>'}
    </div>`}
  `;

  // Event delegation
  container.addEventListener('change', function (ev) {
    const el = ev.target;
    if (el.classList.contains('ev-editor-select')) {
      window.updateVideoEditor(el.dataset.jobId, el.dataset.sidx, el.value);
    }
    if (el.classList.contains('ev-status-select')) {
      window.updateVideoEditStatus(el.dataset.jobId, el.dataset.sidx, el.value);
    }
  });

  container.addEventListener('blur', function (ev) {
    const el = ev.target;
    if (el.classList.contains('ev-drive-input')) {
      window.updateVideoEditLink(el.dataset.jobId, el.dataset.sidx, el.value);
    }
  }, true);

  // SortableJS is initialized in main.js updateUI() after DOM attach

  return container;
}

export function renderSettings(state) {
  const container = document.createElement('div');
  container.className = 'view-container reveal';
  const totalJobs = state.jobs.filter(j => !j.isTrash).length;
  const totalStaff = state.staff.length;
  const totalRevenue = state.jobs.filter(j => !j.isTrash).reduce((s, j) => s + (j.package || 0), 0);
  container.innerHTML = `
  <h1 class="view-title" >👑 Trung Tâm Quản Trị</h1>
    <div style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 2rem">Quản lý cấu hình, người dùng và dữ liệu hệ thống</div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem">
       <div class="glass-panel" style="padding: 1.5rem">
          <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 1.25rem; color: #22c55e"><i class="fas fa-chart-bar" style="margin-right: 0.5rem"></i>Báo cáo hệ thống</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem">
             <div style="padding: 0.75rem; background: rgba(0,0,0,0.1); border-radius: 8px">
                <div style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700">Phiên bản</div>
                <div style="font-size: 1rem; font-weight: 800">v3.1.0-Premium</div>
                <div style="font-size: 0.7rem; color: var(--text-dim); margin-top: 0.2rem">Cập nhật: 24/02/2026 14:56</div>
             </div>
             <div style="padding: 0.75rem; background: rgba(0,0,0,0.1); border-radius: 8px">
                <div style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700">Tổng dự án</div>
                <div style="font-size: 1rem; font-weight: 800; color: var(--accent-blue)">${totalJobs}</div>
             </div>
             <div style="padding: 0.75rem; background: rgba(0,0,0,0.1); border-radius: 8px">
                <div style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700">Nhân sự</div>
                <div style="font-size: 1rem; font-weight: 800; color: var(--accent-pink)">${totalStaff}</div>
             </div>
             <div style="padding: 0.75rem; background: rgba(0,0,0,0.1); border-radius: 8px">
                <div style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700">Tổng doanh thu</div>
                <div style="font-size: 1rem; font-weight: 800; color: var(--success)">${formatCurrency(totalRevenue)}</div>
             </div>
          </div>
       </div>

       <div class="glass-panel" style="padding: 1.5rem">
          <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 1.25rem; color: var(--accent-teal)"><i class="fas fa-building" style="margin-right: 0.5rem"></i>Thông tin Studio</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem">
             <div><label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.2rem">Tên Studio</label><input id="setting-studio-name" class="form-control" value="${state.settings.studioName || 'Haru Wedding Film'}" style="font-size: 0.9rem; padding: 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border)"></div>
             <div><label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.2rem">SĐT liên hệ</label><input id="setting-studio-phone" class="form-control" value="${state.settings.studioPhone || '0909 xxx xxx'}" style="font-size: 0.9rem; padding: 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border)"></div>
             <div><label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.2rem">Địa chỉ</label><input id="setting-studio-address" class="form-control" value="${state.settings.studioAddress || 'TP. Hồ Chí Minh'}" style="font-size: 0.9rem; padding: 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border)"></div>
          </div>
          <button class="btn btn-primary btn-sm" style="margin-top: 1rem" onclick="window.saveStudioInfo()">💾 Lưu thông tin</button>
       </div>
    </div>

    ${state.currentUser?.role === 'admin' ? `
    <div class="glass-panel" style="padding: 1.5rem; margin-bottom: 2rem; border: 2px solid rgba(139,92,246,0.3)">
       <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 1rem; color: #8b5cf6"><i class="fas fa-bug" style="margin-right: 0.5rem"></i>🛠 Debug Tools (Admin)</h3>

       <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-bottom: 1rem">
          <button class="btn btn-sm" style="background: #22c55e; color: #fff; border: none; padding: 0.5rem; font-weight: 700; border-radius: 8px" onclick="window.runHealthCheck()">🔍 Health Check</button>
          <button class="btn btn-sm" style="background: #3b82f6; color: #fff; border: none; padding: 0.5rem; font-weight: 700; border-radius: 8px" onclick="window.showDebugLogs()">📊 Console Log</button>
          <button class="btn btn-sm" style="background: #f59e0b; color: #fff; border: none; padding: 0.5rem; font-weight: 700; border-radius: 8px" onclick="window.forceMigration()">🔄 Force Migration</button>
       </div>

       <div id="debug-health-result" style="margin-bottom: 0.75rem; max-height: 200px; overflow-y: auto; border-radius: 8px"></div>
       <div id="debug-console-result" style="max-height: 200px; overflow-y: auto; background: rgba(0,0,0,0.05); border-radius: 8px"></div>
    </div>

    <!-- STAFF MANAGEMENT PANEL -->
    <div class="glass-panel" style="padding: 1.5rem; margin-bottom: 2rem">
       <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 1.25rem; color: #3b82f6"><i class="fas fa-users" style="margin-right: 0.5rem"></i>Quản lý Nhân sự & CTV</h3>
       <button class="btn btn-primary btn-sm" onclick="document.getElementById('admin-add-staff-form').style.display='flex'"><i class="fas fa-plus"></i> Thêm nhân sự mới</button>
       
       <div id="admin-add-staff-form" style="display: none; gap: 0.75rem; margin: 1rem 0; padding: 1.25rem; background: rgba(59,130,246,0.06); border: 1px solid rgba(59,130,246,0.2); border-radius: 12px; flex-wrap: wrap; align-items: flex-end">
          <div style="flex: 1; min-width: 150px">
             <label style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800; display: block; margin-bottom: 0.3rem">Tên</label>
             <input type="text" id="new-staff-name" class="form-control" placeholder="Nguyễn Văn A" style="font-size: 0.85rem; padding: 0.5rem">
          </div>
          <div style="flex: 0.7; min-width: 120px">
             <label style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800; display: block; margin-bottom: 0.3rem">Vai trò</label>
             <select id="new-staff-role" class="form-control" style="font-size: 0.85rem; padding: 0.5rem">
                ${(window.state?.settings?.serviceRoles || []).map(opt => `<option>${opt}</option>`).join('')}
             </select>
          </div>
          <div style="flex: 0.7; min-width: 120px">
             <label style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800; display: block; margin-bottom: 0.3rem">SĐT (Zalo)</label>
             <input type="text" id="new-staff-phone" class="form-control" placeholder="09xxxxxxxx" style="font-size: 0.85rem; padding: 0.5rem">
          </div>
          <div style="display: flex; gap: 0.5rem">
             <button class="btn btn-primary btn-sm" onclick="window.addStaff({name:document.getElementById('new-staff-name').value,role:document.getElementById('new-staff-role').value,phone:document.getElementById('new-staff-phone').value,bank:{no:'',name:'',bank:''}})">Thêm</button>
             <button class="btn btn-secondary btn-sm" onclick="document.getElementById('admin-add-staff-form').style.display='none'">Hủy</button>
          </div>
       </div>

       <div style="margin-top: 1.5rem; max-height: 400px; overflow-y: auto; border: 1px solid var(--border); border-radius: 8px">
          <table class="data-table" style="width: 100%; border-collapse: collapse">
            <thead style="background: rgba(0,0,0,0.04); position: sticky; top: 0; z-index: 10">
               <tr>
                 <th style="padding: 0.75rem; text-align: left; font-size: 0.75rem">Tên</th>
                 <th style="padding: 0.75rem; text-align: left; font-size: 0.75rem">Vai trò</th>
                 <th style="padding: 0.75rem; text-align: left; font-size: 0.75rem">SĐT / TK Ngân Hàng</th>
                 <th style="padding: 0.75rem; text-align: right; font-size: 0.75rem">Thao tác</th>
               </tr>
            </thead>
            <tbody>
              ${state.staff.map(member => {
    const escapedName = member.name.replace(/'/g, "\\'");
    return `
                 <tr style="border-top: 1px solid var(--border)">
                   <td style="padding: 0.75rem; font-size: 0.85rem; font-weight: 700">${member.name}</td>
                   <td style="padding: 0.75rem; font-size: 0.85rem"><span class="badge" style="background: rgba(59,130,246,0.1); color: #3b82f6">${member.role}</span></td>
                   <td style="padding: 0.75rem; font-size: 0.85rem">
                     <div>${member.phone || '-'}</div>
                     <div style="font-size: 0.7rem; color: var(--text-dim)">${member.bank?.no ? member.bank.no + ' - ' + (member.bank.name || '') : ''}</div>
                   </td>
                   <td style="padding: 0.75rem; text-align: right; white-space: nowrap">
                      <button class="btn btn-secondary btn-sm" onclick="window.showEditStaff('${escapedName}')" title="Sửa"><i class="fas fa-pen"></i></button>
                      <button class="btn btn-secondary btn-sm" style="color: var(--danger)" onclick="if(confirm('Xóa nhân sự ${escapedName}?')) window.removeStaff('${escapedName}')" title="Xóa"><i class="fas fa-trash"></i></button>
                   </td>
                 </tr>
                 <tr id="edit-form-${escapedName}" style="display: none; background: rgba(59,130,246,0.02)">
                    <td colspan="4" style="padding: 1rem; border-top: 1px dashed var(--border)">
                       <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem">
                          <div><label style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">Tên</label><input class="form-control" id="edit-name-${escapedName}" value="${member.name}" style="font-size: 0.85rem; padding: 0.4rem"></div>
                          <div><label style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">Vai trò</label><select class="form-control" id="edit-role-${escapedName}" style="font-size: 0.85rem; padding: 0.4rem">
                             ${(window.state?.settings?.serviceRoles || []).map(opt => `<option ${member.role === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                          </select></div>
                       </div>
                       <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem">
                          <div><label style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">SĐT (Zalo)</label><input class="form-control" id="edit-phone-${escapedName}" value="${member.phone || ''}" style="font-size: 0.85rem; padding: 0.4rem"></div>
                          <div><label style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">Số TK</label><input class="form-control" id="edit-bankno-${escapedName}" value="${member.bank?.no || ''}" style="font-size: 0.85rem; padding: 0.4rem"></div>
                          <div><label style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">Ngân hàng</label><input class="form-control" id="edit-bankname-${escapedName}" value="${member.bank?.bank || ''}" style="font-size: 0.85rem; padding: 0.4rem"></div>
                       </div>
                       <div style="display: flex; gap: 0.5rem">
                          <button class="btn btn-primary btn-sm" onclick="window.saveStaffEdit('${escapedName}')">Lưu</button>
                          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('edit-form-${escapedName}').style.display='none'">Hủy</button>
                       </div>
                    </td>
                 </tr>
                 `;
  }).join('')}
            </tbody>
          </table>
       </div>
    </div>
    ` : ''}

    <!-- SYSTEM OPERATIONS PANEL -->
    <div class="glass-panel" style="padding: 1.5rem; margin-bottom: 2rem; border: 1px solid var(--border)">
       <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 1.25rem; color: #f59e0b"><i class="fas fa-server" style="margin-right: 0.5rem"></i>Thao tác Hệ thống & Đồng bộ</h3>
       <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem">
          <div style="background: rgba(0,0,0,0.02); border: 1px solid var(--border); padding: 1rem; border-radius: 10px; display: flex; flex-direction: column; gap: 0.5rem">
             <div style="font-weight: 800; color: var(--text-main)"><i class="fas fa-sync-alt" style="color: #3b82f6"></i> Google Sheets</div>
             <div style="font-size: 0.75rem; color: var(--text-dim); margin-bottom: 0.5rem">Đồng bộ 2 chiều dữ liệu Job với file Sheets.</div>
             <button class="btn btn-secondary btn-sm" onclick="window.navigate('sync')" style="margin-top: auto; padding: 0.4rem; font-weight: 700">Mở Đồng Bộ</button>
          </div>
          <div style="background: rgba(0,0,0,0.02); border: 1px solid var(--border); padding: 1rem; border-radius: 10px; display: flex; flex-direction: column; gap: 0.5rem">
             <div style="font-weight: 800; color: var(--text-main)"><i class="fas fa-database" style="color: #8b5cf6"></i> NAS & Drive</div>
             <div style="font-size: 0.75rem; color: var(--text-dim); margin-bottom: 0.5rem">Theo dõi tiến trình Backup & Source.</div>
             <button class="btn btn-secondary btn-sm" onclick="window.navigate('nas')" style="margin-top: auto; padding: 0.4rem; font-weight: 700">Mở Quản lý NAS</button>
          </div>
          <div style="background: rgba(0,0,0,0.02); border: 1px solid var(--border); padding: 1rem; border-radius: 10px; display: flex; flex-direction: column; gap: 0.5rem">
             <div style="font-weight: 800; color: var(--text-main)"><i class="fas fa-trash-alt" style="color: #ef4444"></i> Thùng Rác</div>
             <div style="font-size: 0.75rem; color: var(--text-dim); margin-bottom: 0.5rem">Khôi phục dự án hoặc xóa vĩnh viễn dữ liệu rác.</div>
             <button class="btn btn-secondary btn-sm" onclick="window.navigate('trash')" style="margin-top: auto; padding: 0.4rem; font-weight: 700; color: var(--danger)">Mở Thùng Rác</button>
          </div>
       </div>
    </div>

    <div class="glass-panel" style="padding: 1.5rem; margin-bottom: 2rem">
       <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 1.25rem; color: #8b5cf6"><i class="fas fa-tags" style="margin-right: 0.5rem"></i>Quản lý Danh mục (Categories)</h3>
       
       <div style="margin-bottom: 1.5rem">
         <label style="font-size: 0.8rem; font-weight: 800; color: var(--text-main); display: block; margin-bottom: 0.5rem">Hạng mục Sự kiện (Event Categories)</label>
         <p style="font-size: 0.75rem; color: var(--text-dim); margin-bottom: 0.5rem">Nhập các hạng mục phân tách nhau bằng dấu phẩy (,)</p>
         <input type="text" id="setting-event-categories" class="form-control" value="${(state.settings.eventCategories || []).join(', ')}" style="font-size: 0.85rem; padding: 0.6rem">
       </div>

       <div style="margin-bottom: 1.5rem">
         <label style="font-size: 0.8rem; font-weight: 800; color: var(--text-main); display: block; margin-bottom: 0.5rem">Vai trò Dịch vụ (Service Roles)</label>
         <p style="font-size: 0.75rem; color: var(--text-dim); margin-bottom: 0.5rem">Nhập các vai trò phân tách nhau bằng dấu phẩy (,)</p>
         <input type="text" id="setting-service-roles" class="form-control" value="${(state.settings.serviceRoles || []).join(', ')}" style="font-size: 0.85rem; padding: 0.6rem">
       </div>

       <button class="btn btn-primary btn-sm" onclick="window.saveCategories()">💾 Lưu Danh mục</button>
    </div>

    <div class="glass-panel" style="padding: 1.5rem; margin-bottom: 2rem">
       <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 0.5rem; color: #10b981"><i class="fas fa-cloud" style="margin-right: 0.5rem"></i>Cấu hình Đám Mây (Firebase)</h3>
       <p style="font-size: 0.8rem; color: var(--text-dim); margin-bottom: 1rem">Dán đoạn mã JSON Firebase Config để kết nối App với Realtime Database. <a href="#" style="color: var(--accent-blue)">Xem hướng dẫn</a></p>
       <textarea id="setting-firebase-config" class="form-control" placeholder='{\n  "apiKey": "...",\n  "authDomain": "...",\n  "databaseURL": "...",\n  "projectId": "...",\n  "storageBucket": "...",\n  "messagingSenderId": "...",\n  "appId": "..."\n}' style="width: 100%; height: 120px; font-family: monospace; font-size: 0.8rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border: 1px solid var(--border); border-radius: 8px">${state.settings.firebaseConfig || ''}</textarea>
       <button class="btn btn-primary btn-sm" style="margin-top: 1rem" onclick="window.saveFirebaseConfig()">💾 Lưu Config & Nối mạng</button>
       <button class="btn btn-secondary btn-sm" style="margin-top: 0.6rem" onclick="window.migrateLocalPortfolioToFirebase()">🚀 Migrate Local Portfolio → Firebase</button>
    </div>

    <div class="glass-panel" style="padding: 1.5rem">
       <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 1.25rem; color: var(--accent-orange)"><i class="fas fa-database" style="margin-right: 0.5rem"></i>Sao lưu & Khôi phục</h3>
       <div style="display: flex; gap: 1rem">
          <button class="btn btn-primary btn-sm" onclick="window.exportJSON()"><i class="fas fa-download"></i> Xuất dữ liệu (JSON)</button>
          <button class="btn btn-secondary btn-sm" onclick="window.importJSON()"><i class="fas fa-upload"></i> Nhập dữ liệu</button>
          <button class="btn btn-secondary btn-sm" style="color: var(--danger)" onclick="if(confirm('Reset toàn bộ dữ liệu? Hành động này không thể hoàn tác!')) window.resetAllData()"><i class="fas fa-exclamation-triangle"></i> Reset dữ liệu</button>
       </div>
       <p style="font-size: 0.75rem; color: var(--text-dim); margin-top: 1rem">Lưu ý: Tất cả dữ liệu hiện đang lưu trong bộ nhớ. Export JSON để backup.</p>
    </div>
`;
  return container;
}

// ============================================================
// KANBAN BOARD
// ============================================================
// ============================================================
// WATERMARK TOOL
// ============================================================
export function renderWatermark(state) {
  const container = document.createElement('div');
  container.className = 'view-container reveal';

  container.innerHTML = `
    <header class="section-header">
      <h1 class="view-title">🎬 Watermark Tool</h1>
      <span style="font-size:0.85rem;color:var(--text-dim)">Đóng dấu ảnh nhanh chóng</span>
    </header>

    <div class="glass-panel" style="margin-top:1rem;padding:1.5rem">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem">
        <!-- Upload Area -->
        <div>
          <div id="wm-drop-zone" style="border:2px dashed var(--border-bright);border-radius:12px;padding:2rem;text-align:center;cursor:pointer;transition:all 0.2s;min-height:200px;display:flex;flex-direction:column;align-items:center;justify-content:center" onclick="document.getElementById('wm-file-input').click()">
            <div style="font-size:2.5rem;margin-bottom:0.5rem">📷</div>
            <div style="font-size:0.85rem;font-weight:700;color:var(--text-main)">Kéo ảnh vào đây</div>
            <div style="font-size:0.72rem;color:var(--text-dim)">hoặc click để chọn file</div>
            <input type="file" id="wm-file-input" accept="image/*" style="display:none" />
          </div>

          <div style="margin-top:1rem">
            <label style="font-size:0.75rem;font-weight:700;color:var(--text-dim);display:block;margin-bottom:0.3rem">Nội dung watermark:</label>
            <input id="wm-text" type="text" value="© HARU STUDIO" style="width:100%;padding:0.5rem;border:1px solid var(--border);border-radius:8px;font-family:inherit;background:var(--bg-main);color:var(--text-main)" />
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;margin-top:0.8rem">
            <div>
              <label style="font-size:0.7rem;font-weight:700;color:var(--text-dim);display:block;margin-bottom:0.2rem">Vị trí:</label>
              <select id="wm-position" style="width:100%;padding:0.4rem;border:1px solid var(--border);border-radius:6px;font-family:inherit;background:var(--bg-main);color:var(--text-main)">
                <option value="bottom-right">Dưới phải</option>
                <option value="bottom-left">Dưới trái</option>
                <option value="center">Giữa</option>
                <option value="top-right">Trên phải</option>
                <option value="tile">Lặp toàn ảnh</option>
              </select>
            </div>
            <div>
              <label style="font-size:0.7rem;font-weight:700;color:var(--text-dim);display:block;margin-bottom:0.2rem">Opacity:</label>
              <input id="wm-opacity" type="range" min="10" max="80" value="30" style="width:100%" />
            </div>
          </div>

          <button id="wm-apply-btn" disabled style="margin-top:1rem;width:100%;background:var(--primary);color:#fff;border:none;padding:0.6rem;border-radius:8px;font-weight:800;cursor:pointer;font-family:inherit;font-size:0.9rem;opacity:0.5">
            🖊️ Đóng Watermark
          </button>
        </div>

        <!-- Preview Area -->
        <div>
          <div style="font-size:0.75rem;font-weight:700;color:var(--text-dim);margin-bottom:0.5rem">Preview:</div>
          <div id="wm-preview" style="border:1px solid var(--border);border-radius:12px;overflow:hidden;min-height:300px;display:flex;align-items:center;justify-content:center;background:var(--accent-soft)">
            <span style="font-size:0.8rem;color:var(--text-dim)">Chưa có ảnh</span>
          </div>
          <button id="wm-download-btn" disabled style="margin-top:0.8rem;width:100%;background:#3b82f6;color:#fff;border:none;padding:0.5rem;border-radius:8px;font-weight:700;cursor:pointer;font-family:inherit;font-size:0.85rem;opacity:0.5">
            💾 Tải ảnh có Watermark
          </button>
        </div>
      </div>
    </div>
  `;

  // Watermark logic
  setTimeout(() => {
    let loadedImg = null;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const fileInput = container.querySelector('#wm-file-input');
    const dropZone = container.querySelector('#wm-drop-zone');
    const applyBtn = container.querySelector('#wm-apply-btn');
    const downloadBtn = container.querySelector('#wm-download-btn');
    const preview = container.querySelector('#wm-preview');

    const loadImage = (file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          loadedImg = img;
          preview.innerHTML = '';
          const previewImg = document.createElement('img');
          previewImg.src = e.target.result;
          previewImg.style.cssText = 'max-width:100%;max-height:400px;display:block';
          preview.appendChild(previewImg);
          applyBtn.disabled = false;
          applyBtn.style.opacity = '1';
          dropZone.innerHTML = `<div style="font-size:0.8rem;color:var(--primary);font-weight:700">✅ ${file.name}</div>`;
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    };

    fileInput.onchange = (e) => { if (e.target.files[0]) loadImage(e.target.files[0]); };
    dropZone.ondragover = (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--primary)'; };
    dropZone.ondragleave = () => { dropZone.style.borderColor = 'var(--border-bright)'; };
    dropZone.ondrop = (e) => { e.preventDefault(); dropZone.style.borderColor = 'var(--border-bright)'; if (e.dataTransfer.files[0]) loadImage(e.dataTransfer.files[0]); };

    applyBtn.onclick = () => {
      if (!loadedImg) return;
      canvas.width = loadedImg.width;
      canvas.height = loadedImg.height;
      ctx.drawImage(loadedImg, 0, 0);

      const text = container.querySelector('#wm-text').value || '© HARU STUDIO';
      const pos = container.querySelector('#wm-position').value;
      const opacity = container.querySelector('#wm-opacity').value / 100;
      const fontSize = Math.max(16, loadedImg.width * 0.03);

      ctx.font = `bold ${fontSize}px Outfit, sans-serif`;
      ctx.fillStyle = `rgba(255,255,255,${opacity})`;
      ctx.strokeStyle = `rgba(0,0,0,${opacity * 0.3})`;
      ctx.lineWidth = 2;

      if (pos === 'tile') {
        ctx.save();
        ctx.rotate(-0.3);
        for (let y = -loadedImg.height; y < loadedImg.height * 2; y += fontSize * 4) {
          for (let x = -loadedImg.width; x < loadedImg.width * 2; x += fontSize * text.length * 0.8) {
            ctx.strokeText(text, x, y);
            ctx.fillText(text, x, y);
          }
        }
        ctx.restore();
      } else {
        let x, y;
        const m = fontSize * 1.5;
        switch (pos) {
          case 'bottom-right': x = canvas.width - ctx.measureText(text).width - m; y = canvas.height - m; break;
          case 'bottom-left': x = m; y = canvas.height - m; break;
          case 'top-right': x = canvas.width - ctx.measureText(text).width - m; y = m + fontSize; break;
          default: x = (canvas.width - ctx.measureText(text).width) / 2; y = canvas.height / 2;
        }
        ctx.strokeText(text, x, y);
        ctx.fillText(text, x, y);
      }

      preview.innerHTML = '';
      const resultImg = document.createElement('img');
      resultImg.src = canvas.toDataURL('image/jpeg', 0.92);
      resultImg.style.cssText = 'max-width:100%;max-height:400px;display:block';
      preview.appendChild(resultImg);

      downloadBtn.disabled = false;
      downloadBtn.style.opacity = '1';
    };

    downloadBtn.onclick = () => {
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/jpeg', 0.92);
      a.download = `haru_watermark_${Date.now()}.jpg`;
      a.click();
    };
  }, 100);

  return container;
}

export function renderKanban(state) {
  const container = document.createElement('div');
  container.className = 'view-container reveal';

  const stages = [
    { id: 'Chưa bắt đầu', label: 'Chưa bắt đầu', color: '#94a3b8', icon: '⏳' },
    { id: 'Đang cắt', label: 'Đang cắt', color: '#3b82f6', icon: '✂️' },
    { id: 'Demo', label: 'Demo', color: '#f59e0b', icon: '🖥️' },
    { id: 'Chỉnh sửa', label: 'Chỉnh sửa', color: '#8b5cf6', icon: '🔧' },
    { id: 'Hoàn thành', label: 'Hoàn thành', color: '#22c55e', icon: '✅' }
  ];

  // Build clips array from jobs
  const clips = [];
  (state.filteredJobs || state.jobs).forEach(job => {
    (job.deliverables || []).forEach((d, dIdx) => {
      if (d.type === 'Video') {
        const EDIT_DAYS = 20;
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const jobDate = new Date(job.date); jobDate.setHours(0, 0, 0, 0);
        const dl = new Date(jobDate); dl.setDate(dl.getDate() + EDIT_DAYS);
        const daysLeft = Math.ceil((dl - today) / 864e5);
        clips.push({
          jobId: job.id,
          sIdx: dIdx,
          client: job.client,
          service: d.name,
          qty: d.quantity || 1,
          staff: d.staff || '—',
          editor: d.editor || '—',
          editStatus: d.editStatus || 'Chưa bắt đầu',
          date: job.date,
          daysLeft,
          deadlineStr: dl.toLocaleDateString('vi-VN')
        });
      }
    });
  });

  container.innerHTML = `
    <header class="section-header">
      <h1 class="view-title">📋 Kanban Board</h1>
      <span style="font-size:0.85rem;color:var(--text-dim)">${clips.length} clip</span>
    </header>

    <div class="kanban-board" style="display:flex;gap:0.6rem;margin-top:1rem;overflow-x:auto;padding-bottom:1rem;min-height:400px">
      ${stages.map(s => `
        <div class="kanban-column" style="flex:1;min-width:200px;background:var(--bg-card);border-radius:12px;padding:0.6rem;border:1px solid var(--border)">
          <div style="display:flex;align-items:center;gap:0.4rem;margin-bottom:0.8rem;padding-bottom:0.5rem;border-bottom:2px solid ${s.color}">
            <span>${s.icon}</span>
            <span style="font-size:0.78rem;font-weight:800;color:${s.color}">${s.label}</span>
            <span style="font-size:0.65rem;background:${s.color}20;color:${s.color};padding:0.1rem 0.4rem;border-radius:10px;font-weight:800;margin-left:auto">${clips.filter(c => c.editStatus === s.id).length}</span>
          </div>
          <div class="kanban-list" data-status="${s.id}" style="min-height:60px;display:flex;flex-direction:column;gap:0.4rem">
            ${clips.filter(c => c.editStatus === s.id).map(c => `
              <div class="kanban-card" onclick="window.openQuickPreview('${c.jobId}')" data-job-id="${c.jobId}" data-sidx="${c.sIdx}"
                style="background:var(--bg-main);border:1px solid var(--border);border-radius:6px;padding:0.4rem 0.5rem;cursor:grab;border-left:3px solid ${s.color};position:relative;margin-bottom:0.4rem;box-shadow:0 1px 2px rgba(0,0,0,0.03)">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.15rem">
                  <span style="font-size:0.75rem;font-weight:800;color:var(--text-main);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:130px" title="${c.client}">${c.client}</span>
                  <button onclick="event.stopPropagation();if(confirm('Xoá clip này?'))window.deleteVideoClip&&window.deleteVideoClip('${c.jobId}','${c.sIdx}')" style="background:none;border:none;cursor:pointer;font-size:0.65rem;color:#ef4444;padding:0.1rem 0.2rem;border-radius:4px;opacity:0.5" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.5">🗑️</button>
                </div>
                <div style="font-size:0.6rem;color:var(--text-dim);margin-bottom:0.3rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${c.service}">🎥 ${c.service} <strong style="color:var(--text-main)">(x${c.qty})</strong></div>
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="font-size:0.55rem;font-weight:700;color:${c.daysLeft != null ? (c.daysLeft > 0 ? 'var(--text-dim)' : '#ef4444') : 'var(--text-muted)'}">⏰ ${c.deadlineStr || '—'}</span>
                  <span style="font-size:0.55rem;font-weight:700;background:#a855f715;color:#a855f7;padding:0.15rem 0.3rem;border-radius:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:70px" title="${c.editor || 'Chưa gán'}">✏️ ${c.editor || 'Trống'}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Initialize SortableJS after DOM
  setTimeout(() => {
    if (typeof Sortable === 'undefined') return;
    container.querySelectorAll('.kanban-list').forEach(list => {
      new Sortable(list, {
        group: 'kanban',
        animation: 150,
        ghostClass: 'kanban-ghost',
        dragClass: 'kanban-drag',
        onEnd: (evt) => {
          const card = evt.item;
          const newStatus = evt.to.dataset.status;
          const jobId = card.dataset.jobId;
          const sIdx = card.dataset.sidx;
          if (window.updateVideoEditStatus) {
            window.updateVideoEditStatus(jobId, sIdx, newStatus);
          }
        }
      });
    });
  }, 10);

  return container;
}

// ============================================================
// ANALYTICS DASHBOARD
// ============================================================
export function renderAnalytics(state) {
  const container = document.createElement('div');
  container.className = 'view-container reveal';
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const txtColor = isDark ? '#a5d6a7' : '#1e4020';
  const gridColor = isDark ? 'rgba(34,197,94,0.1)' : 'rgba(0,0,0,0.06)';

  // Tính doanh thu theo tháng (12 tháng năm hiện tại)
  const year = state.currentYear;
  const monthlyRev = Array(12).fill(0);
  const monthlyCount = Array(12).fill(0);
  state.jobs.forEach(j => {
    const d = new Date(j.date);
    if (d.getFullYear() === year) {
      monthlyRev[d.getMonth()] += (j.package || 0);
      monthlyCount[d.getMonth()]++;
    }
  });

  // Tính trạng thái dự án
  const statusMap = {};
  state.jobs.forEach(j => {
    const s = j.status || 'Chưa phân loại';
    statusMap[s] = (statusMap[s] || 0) + 1;
  });

  // Tính hiệu suất editor
  const editorMap = {};
  state.jobs.forEach(j => {
    (j.services || []).forEach(svc => {
      if (svc.staff) {
        editorMap[svc.staff] = (editorMap[svc.staff] || 0) + 1;
      }
    });
  });

  // Tính phân bổ Dịch Vụ
  const servicesMap = {};
  state.jobs.forEach(j => {
    (j.services || []).forEach(svc => {
      if (svc.service) {
        servicesMap[svc.service] = (servicesMap[svc.service] || 0) + 1;
      }
    });
  });

  const monthLabels = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
  const statusColors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];

  container.innerHTML = `
    <header class="section-header">
      <h1 class="view-title">📊 Analytics Dashboard</h1>
      <span style="font-size:0.85rem;color:var(--text-dim)">Năm ${year} — ${state.jobs.length} dự án</span>
    </header>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:1rem">
      <div class="glass-panel" style="padding:1.2rem;grid-column:1/3">
        <h3 style="font-size:0.9rem;font-weight:800;color:var(--text-dim);margin-bottom:0.8rem">💰 Doanh thu theo tháng (${year})</h3>
        <div style="height:280px;position:relative"><canvas id="chart-revenue"></canvas></div>
      </div>

      <div class="glass-panel" style="padding:1.2rem">
        <h3 style="font-size:0.9rem;font-weight:800;color:var(--text-dim);margin-bottom:0.8rem">📋 Tỉ trọng dịch vụ</h3>
        <div style="height:250px;position:relative"><canvas id="chart-services"></canvas></div>
      </div>

      <div class="glass-panel" style="padding:1.2rem">
        <h3 style="font-size:0.9rem;font-weight:800;color:var(--text-dim);margin-bottom:0.8rem">👥 Khối lượng nhân sự</h3>
        <div style="height:250px;position:relative"><canvas id="chart-editor"></canvas></div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.8rem;margin-top:1rem">
      <div class="glass-panel" style="padding:1rem;text-align:center">
        <div style="font-size:0.7rem;font-weight:700;color:var(--text-dim);text-transform:uppercase">Tổng doanh thu</div>
        <div style="font-size:1.4rem;font-weight:900;color:#22c55e;margin-top:0.3rem">${(monthlyRev.reduce((a, b) => a + b, 0) / 1e6).toFixed(1)}M</div>
      </div>
      <div class="glass-panel" style="padding:1rem;text-align:center">
        <div style="font-size:0.7rem;font-weight:700;color:var(--text-dim);text-transform:uppercase">Tổng dự án</div>
        <div style="font-size:1.4rem;font-weight:900;color:#3b82f6;margin-top:0.3rem">${state.jobs.length}</div>
      </div>
      <div class="glass-panel" style="padding:1rem;text-align:center">
        <div style="font-size:0.7rem;font-weight:700;color:var(--text-dim);text-transform:uppercase">TB/Tháng</div>
        <div style="font-size:1.4rem;font-weight:900;color:#f59e0b;margin-top:0.3rem">${(monthlyRev.reduce((a, b) => a + b, 0) / 12 / 1e6).toFixed(1)}M</div>
      </div>
      <div class="glass-panel" style="padding:1rem;text-align:center">
        <div style="font-size:0.7rem;font-weight:700;color:var(--text-dim);text-transform:uppercase">Nhân sự</div>
        <div style="font-size:1.4rem;font-weight:900;color:#8b5cf6;margin-top:0.3rem">${Object.keys(editorMap).length}</div>
      </div>
    </div>
  `;

  // Render charts after DOM insert
  setTimeout(() => {
    if (typeof Chart === 'undefined') return;

    // Revenue bar chart
    const revCtx = container.querySelector('#chart-revenue');
    if (revCtx) new Chart(revCtx, {
      type: 'bar',
      data: {
        labels: monthLabels,
        datasets: [{
          label: 'Doanh thu (VNĐ)',
          data: monthlyRev,
          backgroundColor: monthLabels.map((_, i) => i === new Date().getMonth() ? '#22c55e' : 'rgba(34,197,94,0.3)'),
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { ticks: { color: txtColor, callback: v => (v / 1e6).toFixed(0) + 'M' }, grid: { color: gridColor } },
          x: { ticks: { color: txtColor }, grid: { display: false } }
        }
      }
    });

    // Services Distribution Pie Chart
    const svCtx = container.querySelector('#chart-services');
    if (svCtx) new Chart(svCtx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(servicesMap),
        datasets: [{ data: Object.values(servicesMap), backgroundColor: ['#3b82f6', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b', '#6366f1'], borderWidth: 0 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'right', labels: { color: txtColor, font: { size: 10 } } } },
        cutout: '60%'
      }
    });

    // Editor performance bar
    const edCtx = container.querySelector('#chart-editor');
    if (edCtx) new Chart(edCtx, {
      type: 'bar',
      data: {
        labels: Object.keys(editorMap),
        datasets: [{ label: 'Số dịch vụ', data: Object.values(editorMap), backgroundColor: '#3b82f6', borderRadius: 6 }]
      },
      options: {
        indexAxis: 'y',
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: txtColor, stepSize: 1 }, grid: { color: gridColor } },
          y: { ticks: { color: txtColor }, grid: { display: false } }
        }
      }
    });
  }, 100);

  return container;
}

export function renderHistory(state) {
  const container = document.createElement('div');
  container.className = 'view-container reveal';

  const getIcon = (action) => {
    if (action.includes('Thêm') || action.includes('Tạo')) return { icon: 'fa-plus-circle', color: '#34d399' };
    if (action.includes('Sửa') || action.includes('Cập nhật') || action.includes('Lưu')) return { icon: 'fa-edit', color: '#60a5fa' };
    if (action.includes('Xóa') || action.includes('Xoá')) return { icon: 'fa-trash', color: '#f87171' };
    if (action.includes('backup') || action.includes('Backup') || action.includes('Xuất') || action.includes('Nhập')) return { icon: 'fa-database', color: '#a78bfa' };
    return { icon: 'fa-info-circle', color: '#22c55e' };
  };

  container.innerHTML = `
  <header class="section-header" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem">
       <div>
         <h1 class="view-title">📋 Lịch sử hoạt động</h1>
         <span style="font-size: 0.85rem; color: var(--text-dim)">${state.history.length} hoạt động</span>
       </div>
       <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
         <button onclick="window.exportBackup()" style="background:#22c55e;color:#fff;border:none;padding:0.5rem 1rem;border-radius:8px;font-weight:700;cursor:pointer;font-family:inherit;font-size:0.85rem">
           💾 Xuất Backup
         </button>
         <button onclick="window.importBackup()" style="background:var(--accent-soft);color:var(--primary);border:1px solid var(--border-bright);padding:0.5rem 1rem;border-radius:8px;font-weight:700;cursor:pointer;font-family:inherit;font-size:0.85rem">
           📥 Nhập Backup
         </button>
       </div>
    </header>

  <div class="glass-panel" style="margin-top: 1.5rem; padding: 1.5rem">
    <div style="position: relative; padding-left: 2rem">
      <div style="position: absolute; left: 0.55rem; top: 0; bottom: 0; width: 2px; background: linear-gradient(180deg, #22c55e, rgba(34,197,94,0.1))"></div>
      ${state.history.slice(0, 100).map(h => {
    const ic = getIcon(h.action);
    return `
            <div style="position: relative; margin-bottom: 1.25rem; padding-bottom: 1.25rem; border-bottom: 1px solid var(--border)">
               <div style="position: absolute; left: -1.55rem; top: 0.2rem; width: 12px; height: 12px; border-radius: 50%; background: ${ic.color}; box-shadow: 0 0 8px ${ic.color}40"></div>
               <div style="display: flex; justify-content: space-between; align-items: flex-start">
                  <div style="flex: 1">
                     <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem">
                        <i class="fas ${ic.icon}" style="font-size: 0.75rem; color: ${ic.color}"></i>
                        <span style="font-size: 0.9rem; font-weight: 700">${h.action}</span>
                     </div>
                     <div style="font-size: 0.75rem; color: var(--text-dim)"><i class="fas fa-user" style="margin-right: 0.3rem"></i>${h.user}</div>
                     ${h.details ? `<div style="font-size:0.72rem;color:var(--text-muted);margin-top:0.2rem;padding:0.3rem 0.5rem;background:var(--accent-soft);border-radius:6px;font-family:monospace">${h.details}</div>` : ''}
                  </div>
                  <div style="font-size: 0.75rem; font-family: monospace; color: var(--text-dim); white-space: nowrap">${new Date(h.time).toLocaleString('vi-VN')}</div>
               </div>
            </div>`;
  }).join('')}
    </div>
  </div>
`;
  return container;
}

// saveJobDetail & saveMonthlyMeta — đã chuyển về main.js để tránh trùng lặp

export function renderNAS(state) {
  const container = document.createElement('div');
  container.className = 'view-container reveal';
  container.innerHTML = `
  <header class="section-header" >
       <h1 class="view-title">NAS / Drive — Cấu hình hệ thống</h1>
       <button class="btn btn-primary btn-sm"><i class="fas fa-save"></i> Lưu cấu hình</button>
    </header>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem">
    <div class="glass-panel" style="padding: 1.5rem">
      <h3 style="font-size: 0.95rem; margin-bottom: 1.5rem"><i class="fas fa-folder-open" style="color: var(--accent); margin-right: 0.5rem"></i>Đường dẫn hệ thống</h3>
      <div style="display: flex; flex-direction: column; gap: 1rem">
        <div>
          <label style="font-size: 0.82rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800">Dữ liệu App (JSON)</label>
          <input type="text" class="form-control" value="./data.js" style="margin-top: 0.3rem; font-size: 0.8rem; padding: 0.5rem">
        </div>
        <div>
          <label style="font-size: 0.82rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800">Sheet Sync (URL)</label>
          <input type="text" class="form-control" value="https://docs.google.com/spreadsheets/d/1hVx..." style="margin-top: 0.3rem; font-size: 0.8rem; padding: 0.5rem">
        </div>
        <div>
          <label style="font-size: 0.82rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800">Thư mục Bill ảnh</label>
          <input type="text" class="form-control" value="/Volumes/NAS/Bills/2026/" style="margin-top: 0.3rem; font-size: 0.8rem; padding: 0.5rem">
        </div>
        <div>
          <label style="font-size: 0.82rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800">NAS Root Folder</label>
          <input type="text" class="form-control" value="/Volumes/NAS/HaruStudio/" style="margin-top: 0.3rem; font-size: 0.8rem; padding: 0.5rem">
        </div>
      </div>
    </div>

    <div class="glass-panel" style="padding: 1.5rem">
      <h3 style="font-size: 0.95rem; margin-bottom: 1.5rem"><i class="fas fa-cogs" style="color: var(--warning); margin-right: 0.5rem"></i>Bảng quy trình tự động</h3>
      <div style="display: flex; flex-direction: column; gap: 0.75rem">
        ${[
      { trigger: 'Khi thêm job mới', action: 'Tự tạo folder NAS & Drive', status: 'active' },
      { trigger: 'Khi chỉnh sửa job', action: 'Tự lưu log + backup JSON', status: 'active' },
      { trigger: 'Khi upload bill', action: 'OCR tự nhận diện → Giao dịch', status: 'inactive' },
      { trigger: 'Mỗi ngày 3:00 AM', action: 'Auto-backup toàn bộ data', status: 'active' },
      { trigger: 'Khi sync Google Sheet', action: 'Map CD-CR, cập nhật jobs', status: 'active' }
    ].map(w => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px solid var(--border)">
                   <div style="display: flex; align-items: center; gap: 0.75rem">
                      <div style="width: 8px; height: 8px; background: ${w.status === 'active' ? 'var(--success)' : 'rgba(255,255,255,0.2)'}; border-radius: 50%"></div>
                      <div>
                         <div style="font-size: 0.8rem; font-weight: 600">${w.trigger}</div>
                         <div style="font-size: 0.85rem; color: var(--text-dim)">${w.action}</div>
                      </div>
                   </div>
                   <span class="badge" style="font-size: 0.55rem; background: ${w.status === 'active' ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.05)'}; color: ${w.status === 'active' ? 'var(--success)' : 'var(--text-dim)'}">${w.status === 'active' ? 'Hoạt động' : 'Tắt'}</span>
                </div>
             `).join('')}
      </div>
    </div>
  </div>
`;
  return container;
}


export function renderSync(state) {
  const container = document.createElement('div');
  container.className = 'view-container reveal';
  const logs = state.syncLogs || [];
  const lastSync = state.lastSyncResult || null;
  const logColorMap = { added: 'var(--success)', updated: 'var(--accent-blue)', skipped: 'var(--accent-orange)', error: 'var(--danger)', info: 'var(--text-dim)' };

  container.innerHTML = `
  <header class="section-header">
       <h1 class="view-title">🔄 Sync Dữ liệu</h1>
       <div style="display: flex; gap: 0.5rem">
          <button class="btn btn-warning btn-sm" onclick="window.importGoLiveData()" style="background: var(--warning); color: #fff; border:none; margin-right: 1rem;"><i class="fas fa-magic"></i> Khởi tạo Dữ liệu Go-Live</button>
          <button class="btn btn-secondary btn-sm" onclick="window.exportCSV()"><i class="fas fa-file-export"></i> Xuất CSV</button>
          <button class="btn btn-primary btn-sm" onclick="window.runSync()"><i class="fas fa-cloud-download-alt"></i> Sync toàn bộ</button>
       </div>
    </header>

    ${lastSync ? `
    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; margin-top: 1.5rem">
       <div class="glass-panel" style="padding: 1rem; text-align: center">
          <div style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">Tổng dự án</div>
          <div style="font-size: 1.5rem; font-weight: 900">${lastSync.total}</div>
       </div>
       <div class="glass-panel" style="padding: 1rem; text-align: center; border-top: 3px solid var(--success)">
          <div style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">Đã thêm</div>
          <div style="font-size: 1.5rem; font-weight: 900; color: var(--success)">+${lastSync.nasAdded + lastSync.driveAdded}</div>
       </div>
       <div class="glass-panel" style="padding: 1rem; text-align: center; border-top: 3px solid var(--accent-blue)">
          <div style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">Đã cập nhật</div>
          <div style="font-size: 1.5rem; font-weight: 900; color: var(--accent-blue)">~${lastSync.nasUpdated + lastSync.driveUpdated}</div>
       </div>
       <div class="glass-panel" style="padding: 1rem; text-align: center">
          <div style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">Bỏ qua</div>
          <div style="font-size: 1.5rem; font-weight: 900">${lastSync.skipped}</div>
       </div>
       <div class="glass-panel" style="padding: 1rem; text-align: center; border-top: 3px solid var(--danger)">
          <div style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">Lỗi</div>
          <div style="font-size: 1.5rem; font-weight: 900; color: var(--danger)">${lastSync.errors}</div>
       </div>
    </div>
    ` : ''}

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem">
    <div class="glass-panel" style="padding: 1.5rem">
      <h3 style="font-size: 0.95rem; margin-bottom: 1.5rem"><i class="fas fa-link" style="color: var(--primary); margin-right: 0.5rem"></i>Cấu hình Sync</h3>
      <div style="display: flex; flex-direction: column; gap: 1rem">
        <div>
          <label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800">Link Google Sheet</label>
          <input type="text" class="form-control" id="sync-sheet-url" value="https://docs.google.com/spreadsheets/d/1hVxXhaDMYQcv1aZfTaZCQmlC-QtHQ-oMayIetOmIRvM/edit" style="margin-top: 0.3rem; font-size: 0.8rem; padding: 0.5rem">
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem">
          <div>
            <label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800">NAS Root Path</label>
            <input type="text" class="form-control" id="sync-nas-root" value="/Volumes/HARUwedding" style="margin-top: 0.3rem; font-size: 0.8rem; padding: 0.5rem">
          </div>
          <div>
            <label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800">Tháng / Năm</label>
            <input type="text" class="form-control" value="${state.currentMonth}/${state.currentYear}" style="margin-top: 0.3rem; font-size: 0.8rem; padding: 0.5rem" readonly>
          </div>
        </div>
        <div>
          <label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800">Drive Folders API (tuỳ chọn)</label>
          <input type="text" class="form-control" id="sync-drive-api" value="" placeholder="https://script.google.com/... (trả về mảng folders)" style="margin-top: 0.3rem; font-size: 0.8rem; padding: 0.5rem">
        </div>
        <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem">
          <button class="btn btn-primary btn-sm" style="flex: 1" onclick="window.runSync()"><i class="fas fa-cloud-download-alt"></i> Sync NAS + Drive</button>
          <button class="btn btn-secondary btn-sm" style="flex: 1" onclick="window.exportJSON()"><i class="fas fa-save"></i> Sao lưu JSON</button>
        </div>
      </div>
    </div>

    <div class="glass-panel" style="padding: 1.5rem">
      <h3 style="font-size: 0.95rem; margin-bottom: 1.5rem"><i class="fas fa-clipboard-list" style="color: var(--success); margin-right: 0.5rem"></i>Nhật ký Sync (${logs.length})</h3>
      <div style="display: flex; flex-direction: column; gap: 0.5rem; max-height: 400px; overflow-y: auto">
        ${logs.length > 0 ? logs.slice().reverse().map(log => `
                <div style="display: flex; gap: 0.75rem; align-items: flex-start; padding: 0.4rem 0; border-bottom: 1px solid var(--border)">
                   <div style="width: 8px; height: 8px; background: ${logColorMap[log.type] || 'var(--text-dim)'}; border-radius: 50%; margin-top: 0.4rem; flex-shrink: 0"></div>
                   <div style="flex: 1">
                      <div style="font-size: 0.8rem; font-weight: 600">${log.message}</div>
                      ${log.detail ? `<div style="font-size: 0.85rem; color: var(--text-dim); word-break: break-all">${log.detail}</div>` : ''}
                      <span style="font-size: 0.72rem; color: var(--text-dim)">${log.timestamp}</span>
                   </div>
                </div>
             `).join('') : '<div style="font-size: 0.85rem; color: var(--text-dim); text-align: center; padding: 2rem">Chưa có sync log nào. Bấm "Sync NAS + Drive" để bắt đầu.</div>'}
      </div>
    </div>
  </div>
`;
  return container;
}


function renderPA3ReportModal(state) {
  const container = document.createElement('div');
  const monthKey = state.modal.data;
  const [yr, mo] = (monthKey || '').split('-').map(Number);
  const label = monthKey ? `Tháng ${mo}/${yr}` : 'Tháng hiện tại';
  const jobs = state.jobs.filter(j => {
    if (j.isTrash) return false;
    const d = new Date(j.date);
    return (d.getMonth() + 1) === (mo || state.currentMonth) && d.getFullYear() === (yr || state.currentYear);
  });
  const meta = state.financeMetadata?.[monthKey] || { ads: 0, office: 0 };
  const taxRate = state.settings?.taxRate ?? 0.1;
  const revenue = jobs.reduce((s, j) => s + (j.package || 0), 0);
  const staffCost = jobs.reduce((s, j) => s + j.services.reduce((ss, sv) => ss + (sv.cost || 0), 0), 0);
  const editCost = jobs.reduce((s, j) => s + j.services.reduce((ss, sv) => ss + (sv.edit || 0), 0), 0);
  const ads = meta.ads || 0; const office = meta.office || 0;
  const gross = revenue - staffCost - editCost - ads - office;
  const tax = Math.round(gross > 0 ? gross * taxRate : 0);
  const net = gross - tax;
  const fmt = (n) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);
  const rows = [
    ['Doanh thu', revenue, 'var(--success)'],
    ['Chi phí thợ', -staffCost, 'var(--danger)'],
    ['Chi phí edit', -editCost, 'var(--accent-orange)'],
    ['Ads / Marketing', -ads, 'var(--text-dim)'],
    ['Văn phòng', -office, 'var(--text-dim)'],
    ['Lợi nhuận gộp', gross, gross >= 0 ? 'var(--success)' : 'var(--danger)'],
    [`Thuế ${Math.round(taxRate * 100)}%`, -tax, 'var(--warning)'],
    ['Lợi nhuận ròng', net, net >= 0 ? 'var(--success)' : 'var(--danger)'],
  ];
  container.innerHTML = `
    <div class="modal-header">
      <h2>📊 Báo cáo PA3 — ${label}</h2>
      <button class="close-btn" onclick="window.closeModal()">&times;</button>
    </div>
    <div class="modal-body" style="overflow-y:auto; padding: 0.5rem">
      <div style="display:grid;grid-template-columns: repeat(3, 1fr);gap: 0.75rem;margin-bottom:1rem">
        <div class="glass-panel" style="padding: 0.75rem;border-top:3px solid var(--success)">
          <div style="font-size:0.6rem;text-transform:uppercase;color:var(--text-dim);font-weight:700">Doanh thu</div>
          <div style="font-size:1.2rem;font-weight:900;color:var(--success)">${fmt(revenue)}</div>
          <div style="font-size:0.7rem;color:var(--text-dim)">${jobs.length} dự án</div>
        </div>
        <div class="glass-panel" style="padding: 0.75rem;border-top:3px solid var(--danger)">
          <div style="font-size:0.6rem;text-transform:uppercase;color:var(--text-dim);font-weight:700">Tổng chi phí</div>
          <div style="font-size:1.2rem;font-weight:900;color:var(--danger)">-${fmt(staffCost + editCost + ads + office)}</div>
        </div>
        <div class="glass-panel" style="padding: 0.75rem;border-top:3px solid ${net >= 0 ? 'var(--success)' : 'var(--danger)'}">
          <div style="font-size:0.6rem;text-transform:uppercase;color:var(--text-dim);font-weight:700">Lãi sau thuế</div>
          <div style="font-size:1.2rem;font-weight:900;color:${net >= 0 ? 'var(--success)' : 'var(--danger)'}">${fmt(net)}</div>
        </div>
      </div>
      <div class="glass-panel" style="padding: 0.75rem;margin-bottom:1rem">
        ${rows.map(([lbl, val, color]) => `
          <div style="display:flex;justify-content:space-between;padding:0.4rem 0;border-bottom:1px solid var(--border);font-size:0.85rem">
            <span style="color:var(--text-dim)">${lbl}</span>
            <span style="font-weight:700;color:${color}">${fmt(val)}</span>
          </div>`).join('')}
      </div>
      <div style="margin-top:1rem;display:flex;justify-content:flex-end;gap:0.5rem">
        <button class="btn btn-secondary" onclick="window.closeModal()">Đóng</button>
        <button class="btn btn-primary" onclick="window.exportCSV()"><i class="fas fa-file-export"></i> Xuất CSV</button>
      </div>
    </div>
  `;
  return container;
}

// Helper: render staff payment chips on job card
function renderStaffChips(job) {
  return (job.services || []).map(function (s, idx) {
    var paid = s.paid;
    var label = _staffStr(s.staff).split(' ')[0] + ' - ' + (s.service || '');
    var bg = paid ? 'rgba(21,128,61,0.10)' : 'rgba(0,0,0,0.035)';
    var clr = paid ? '#15803d' : '#3d6b40';
    var bdr = paid ? 'rgba(21,128,61,0.22)' : 'rgba(20,83,45,0.10)';
    var icon = paid ? '✓ ' : '';
    var title = paid ? 'Đã thanh toán — click để bỏ' : 'Chưa thanh toán — click để đánh dấu';
    return '<span onclick="event.stopPropagation();window.toggleServicePaid(\'' + job.id + '\',' + idx + ',' + (!paid) + ',this)"'
      + ' style="display:inline-flex;align-items:center;gap:0.2rem;cursor:pointer;'
      + 'padding:0.2rem 0.55rem;border-radius:20px;font-size:0.82rem;font-weight:700;'
      + 'background:' + bg + ';color:' + clr + ';border:1px solid ' + bdr + ';transition:all 0.15s"'
      + ' title="' + title + '">'
      + icon + label
      + '</span>';
  }).join(' ');
}

// ============================================================
// PHASE 3: CRM & CLIENTS
// ============================================================
export function renderClients(state) {
  const container = document.createElement('div');
  container.className = 'view-container reveal';

  // Tự động rút trích khách hàng từ Jobs nếu mảng clients trống (migration)
  let clients = state.clients || [];
  if (clients.length === 0 && state.jobs.length > 0) {
    const map = new Map();
    state.jobs.forEach(j => {
      if (!j.isTrash) {
        if (!map.has(j.client)) {
          // Tạo ID cố định dựa vào tên khách hàng (Base64)
          const genId = 'CUST-' + btoa(encodeURIComponent(j.client)).replace(/=/g, '').substring(0, 12);
          map.set(j.client, { id: genId, name: j.client, phone: j.phone || '', jobs: [] });
        }
      }
    });
    clients = Array.from(map.values());
    state.clients = clients;
    if (window.saveState) window.saveState();
  }

  // Khớp lịch sử jobs
  const clientsWithHistory = clients.map(c => {
    const history = state.jobs.filter(j => j.client === c.name && !j.isTrash);
    const totalRevenue = history.reduce((sum, j) => sum + (j.package || 0), 0);
    const totalPaid = history.reduce((sum, j) => sum + (j.deposit || 0), 0);
    return { ...c, history, totalRevenue, totalPaid, debt: totalRevenue - totalPaid };
  });

  // Tìm kiếm
  let displayClients = clientsWithHistory;
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    displayClients = displayClients.filter(c => c.name.toLowerCase().includes(q) || (c.phone || '').includes(q));
  }

  let dbParam = '';
  try {
    if (state.settings.firebaseConfig) {
      const conf = JSON.parse(state.settings.firebaseConfig);
      if (conf.databaseURL) {
        // Lấy phần hostname: https://something.firebaseio.com -> something.firebaseio.com
        const url = new URL(conf.databaseURL);
        dbParam = '&db=' + encodeURIComponent(url.hostname);
      }
    }
  } catch (e) { }

  container.innerHTML = `
    <header class="section-header">
       <div>
         <h1 class="view-title">🧑‍🤝‍🧑 Danh bạ Khách hàng</h1>
         <p style="font-size: 0.85rem; color: var(--text-dim); margin-top: 0.2rem">Quản lý Khách hàng và link Tra cứu (Customer Portal)</p>
       </div>
       <div style="display: flex; gap: 0.5rem; align-items: center">
         <input type="text" placeholder="Tìm tên, SĐT…" value="${state.searchQuery || ''}"
           onchange="window.setSearchQuery(this.value)"
           style="background: #fff; border: 1.5px solid var(--border); color: var(--text-main); padding: 0.4rem 0.75rem; border-radius: 8px; font-size: 0.85rem; width: 220px">
         <button class="btn btn-primary" onclick="window.addClientPrompt()"><i class="fas fa-plus"></i> Khách Mới</button>
       </div>
    </header>

    <div class="glass-panel" style="margin-top: 1.5rem; padding: 1rem; border-radius: 12px; overflow: hidden">
      <table class="data-table">
        <thead>
          <tr>
            <th>Khách hàng</th>
            <th>Liên hệ</th>
            <th style="text-align: right">Doanh số</th>
            <th style="text-align: right">Còn nợ</th>
            <th style="text-align: right">Dự án</th>
            <th style="text-align: center">Customer Portal</th>
            <th style="text-align: right">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          ${displayClients.map(c => {
    // Tối ưu hóa dung lượng Data truyền qua URL (Giảm 80% độ dài)
    const miniData = c.history.map(j => [
      j.eventType || 'Chụp Ảnh/Quay Phim',
      j.date,
      j.status,
      j.package || 0,
      j.deposit || 0,
      j.venue || '',
      j.services ? j.services.map(s => s.service).join('|') : '',
      j.linkCustomer || '',
      j.linkDrive || ''
    ]);
    const payload = encodeURIComponent(JSON.stringify(miniData));
    const portalLink = window.location.origin + '/portal.html?cid=' + c.id + dbParam + '&name=' + encodeURIComponent(c.name) + '&d=' + payload;

    return `
             <tr>
               <td data-label="Khách hàng" style="font-weight: 800; font-size: 0.95rem; color: var(--text-main)">${c.name}</td>
               <td data-label="Liên hệ">
                  <div style="display: flex; align-items: center; gap: 0.4rem; justify-content: flex-end">
                    <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-muted)">${c.phone || '<em style="opacity:0.5">Trống</em>'}</span>
                    ${c.phone ? `<a href="https://zalo.me/${c.phone}" target="_blank" title="Zalo" style="color: #0084ff; font-size: 0.85rem"><i class="fas fa-comment-dots"></i></a>` : ''}
                  </div>
               </td>
               <td data-label="Doanh số" style="text-align: right; font-weight: 700; color: var(--success); font-size: 0.9rem">${formatCurrency(c.totalRevenue)}</td>
               <td data-label="Còn nợ" style="text-align: right; font-weight: 800; color: ${c.debt > 0 ? 'var(--danger)' : 'var(--text-dim)'}; font-size: 0.9rem">${formatCurrency(c.debt)}</td>
               <td data-label="Dự án" style="text-align: right">
                  <span class="badge" style="background: rgba(59,130,246,0.1); color: #3b82f6">${c.history.length} Jobs</span>
               </td>
               <td data-label="Customer Portal" style="text-align: center">
                  <div style="display: flex; justify-content: center; gap: 0.3rem">
                     <button class="btn btn-sm btn-secondary" style="font-size: 0.65rem; padding: 0.2rem 0.4rem; background: rgba(22,163,74,0.08); color: var(--success); border-color: rgba(22,163,74,0.2)" onclick="window.open('${portalLink}', '_blank')"><i class="fas fa-external-link-alt"></i> Mở</button>
                     <button class="btn btn-sm btn-secondary" style="font-size: 0.65rem; padding: 0.2rem 0.4rem" onclick="navigator.clipboard.writeText('${portalLink}'); alert('Đã copy link Portal của khách hàng này!')" title="Copy cho khách"><i class="fas fa-copy"></i> Copy</button>
                  </div>
               </td>
               <td data-label="Thao tác" style="text-align: right">
                 <button class="btn btn-secondary btn-sm" style="padding: 0.3rem 0.5rem; font-size: 0.65rem" onclick="window.editClientPrompt('${c.id}')" title="Sửa"><i class="fas fa-pen"></i></button>
                 <button class="btn btn-secondary btn-sm" style="padding: 0.3rem 0.5rem; font-size: 0.65rem; color: var(--danger)" onclick="if(confirm('Xóa thông tin khách hàng này?\\n\\nChú ý: Hành động này KHÔNG xóa các Dự án liên quan.')) window.removeClient('${c.id}')" title="Xóa"><i class="fas fa-trash"></i></button>
               </td>
             </tr>
             `;
  }).join('')}
          ${displayClients.length === 0 ? '<tr><td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-dim)">Chưa có dữ liệu khách hàng</td></tr>' : ''}
        </tbody>
      </table>
    </div>
  `;

  return container;
}

// ============================================================
// LOGIN SCREEN
// ============================================================
export function renderLoginScreen() {
  const container = document.createElement('div');
  container.style.cssText = `
    width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 40%, #a5d6a7 100%);
    background-image: radial-gradient(ellipse at 30% 20%, rgba(22,163,74,0.15) 0%, transparent 50%),
                      radial-gradient(ellipse at 70% 80%, rgba(34,197,94,0.1) 0%, transparent 50%);
    font-family: 'Outfit', sans-serif;
  `;

  // Đọc thông tin đã lưu (ghi nhớ đăng nhập)
  let savedUser = '', savedPass = '', savedRemember = false;
  try {
    const saved = JSON.parse(localStorage.getItem('haru_remember') || '{}');
    if (saved.remember) { savedUser = saved.username || ''; savedPass = saved.password || ''; savedRemember = true; }
  } catch (e) { }

  container.innerHTML = `
    <div style="width: 400px; max-width: 92vw; background: rgba(255,255,255,0.85); backdrop-filter: blur(20px);
      border: 1.5px solid rgba(22,163,74,0.2); border-radius: 24px; padding: 2.5rem;
      box-shadow: 0 24px 80px rgba(0,60,0,0.12); text-align: center">

      <div style="margin: 0 auto 1.2rem; display:flex; justify-content:center; align-items:center;">
        <img src="/haru-job-logo.png" alt="Haru Job" style="width: 110px; max-width: 60%; height: auto; object-fit: contain" />
      </div>

      <h1 style="font-size: 1.6rem; font-weight: 900; color: #0f1f0f; margin-bottom: 0.3rem; letter-spacing: -0.5px">HARU JOB</h1>
      <p style="font-size: 0.85rem; color: #3d6b40; margin-bottom: 2rem">Đăng nhập để tiếp tục</p>

      <div id="login-error" style="display: none; background: #fef2f2; border: 1px solid #fca5a5;
        border-radius: 10px; padding: 0.6rem 1rem; margin-bottom: 1rem; color: #b91c1c; font-size: 0.85rem; font-weight: 600">
        Sai tài khoản hoặc mật khẩu
      </div>

      <form id="login-form" style="display: flex; flex-direction: column; gap: 1rem">
        <div style="text-align: left">
          <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: #3d6b40; letter-spacing: 0.5px; display: block; margin-bottom: 0.4rem">Tài khoản</label>
          <input type="text" id="login-username" placeholder="username" required autocomplete="username"
            value="${savedUser}"
            style="width: 100%; padding: 0.75rem 1rem; border: 1.5px solid rgba(20,83,45,0.15); border-radius: 12px;
              font-size: 1rem; font-family: inherit; background: #fff; color: #0f1f0f; outline: none;
              transition: border-color 0.2s; box-sizing: border-box"
            onfocus="this.style.borderColor='#22c55e'; this.style.boxShadow='0 0 0 3px rgba(34,197,94,0.12)'"
            onblur="this.style.borderColor='rgba(20,83,45,0.15)'; this.style.boxShadow='none'">
        </div>
        <div style="text-align: left">
          <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: #3d6b40; letter-spacing: 0.5px; display: block; margin-bottom: 0.4rem">Mật khẩu</label>
          <div style="position: relative">
            <input type="password" id="login-password" placeholder="••••••" required autocomplete="current-password"
              value="${savedPass}"
              style="width: 100%; padding: 0.75rem 2.5rem 0.75rem 1rem; border: 1.5px solid rgba(20,83,45,0.15); border-radius: 12px;
                font-size: 1rem; font-family: inherit; background: #fff; color: #0f1f0f; outline: none;
                transition: border-color 0.2s; box-sizing: border-box"
              onfocus="this.style.borderColor='#22c55e'; this.style.boxShadow='0 0 0 3px rgba(34,197,94,0.12)'"
              onblur="this.style.borderColor='rgba(20,83,45,0.15)'; this.style.boxShadow='none'">
            <button type="button" id="toggle-pw-btn" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
              background: none; border: none; cursor: pointer; font-size: 1.1rem; color: #6b8f6e; padding: 0.2rem" title="Hiện/ẩn mật khẩu">👁</button>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0 0.2rem">
          <input type="checkbox" id="login-remember" ${savedRemember ? 'checked' : ''}
            style="accent-color: #22c55e; width: 16px; height: 16px; cursor: pointer">
          <label for="login-remember" style="font-size: 0.82rem; color: #3d6b40; font-weight: 600; cursor: pointer">Ghi nhớ đăng nhập</label>
        </div>
        <button type="submit" style="width: 100%; padding: 0.85rem; background: linear-gradient(135deg, #16a34a, #15803d);
          color: #fff; border: none; border-radius: 12px; font-size: 1rem; font-weight: 800; font-family: inherit;
          cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 16px rgba(22,163,74,0.3)"
          onmouseenter="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 6px 24px rgba(22,163,74,0.4)'"
          onmouseleave="this.style.transform='none'; this.style.boxShadow='0 4px 16px rgba(22,163,74,0.3)'">
          Đăng nhập →
        </button>
      </form>

      <button type="button" id="pwa-install-btn" style="display: none; width: 100%; margin-top: 1.25rem; padding: 0.75rem; background: #fff; color: #16a34a; border: 2px solid #16a34a; border-radius: 12px; font-size: 0.95rem; font-weight: 800; font-family: inherit; cursor: pointer; transition: all 0.2s;"
        onmouseenter="this.style.background='#16a34a'; this.style.color='#fff'"
        onmouseleave="this.style.background='#fff'; this.style.color='#16a34a'">
        📱 Cài đặt Ứng dụng về máy
      </button>

      <p style="font-size: 0.72rem; color: #6b8f6e; margin-top: 1.5rem">Haru Wedding Film © 2026</p>
    </div>
  `;

  setTimeout(() => {
    // Logic cho nút Cài đặt PWA
    const installBtn = container.querySelector('#pwa-install-btn');
    if (installBtn && window.deferredPrompt) {
      installBtn.style.display = 'block';
    }
    if (installBtn) {
      installBtn.onclick = async () => {
        if (!window.deferredPrompt) return;
        window.deferredPrompt.prompt();
        const { outcome } = await window.deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          installBtn.style.display = 'none';
        }
        window.deferredPrompt = null;
      };
    }
    // Toggle hiện/ẩn mật khẩu
    const toggleBtn = container.querySelector('#toggle-pw-btn');
    const pwInput = container.querySelector('#login-password');
    if (toggleBtn && pwInput) {
      toggleBtn.onclick = () => {
        if (pwInput.type === 'password') { pwInput.type = 'text'; toggleBtn.textContent = '🙈'; }
        else { pwInput.type = 'password'; toggleBtn.textContent = '👁'; }
      };
    }

    // Form submit
    const form = container.querySelector('#login-form');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;
        const remember = document.getElementById('login-remember').checked;

        // Lưu hoặc xóa ghi nhớ
        if (remember) {
          localStorage.setItem('haru_remember', JSON.stringify({ remember: true, username, password }));
        } else {
          localStorage.removeItem('haru_remember');
        }

        const success = window.login(username, password);
        if (!success) {
          const errEl = document.getElementById('login-error');
          if (errEl) errEl.style.display = 'block';
        }
      };
    }
  }, 0);

  return container;
}


// ============================================================
// EDITOR PORTAL — Giao diện chuyên dụng cho Editor
// ============================================================
export function renderEditorPortal(state) {
  const container = document.createElement('div');
  container.style.cssText = `min-height:100vh; background:var(--bg-deep); font-family:'Outfit',sans-serif;`;

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const EDIT_DAYS = 20;
  const userName = state.currentUser?.displayName || 'Editor';
  const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  const steps = ['Chưa bắt đầu', 'Đang cắt', 'Demo 1', 'Chỉnh sửa', 'Hoàn thành'];
  const stepIcons = ['⏳', '✂️', '📺', '🔧', '✅'];
  const stepColors = ['#94a3b8', '#3b82f6', '#f97316', '#eab308', '#22c55e'];

  const m1 = state.currentMonth, y1 = state.currentYear;
  const pm = state.prevMonth || (m1 === 1 ? 12 : m1 - 1), py = state.prevYear || (m1 === 1 ? y1 - 1 : y1);
  const periodLabel = `${monthNames[pm - 1]} & ${monthNames[m1 - 1]} ${y1}`;

  // Nhóm theo khách hàng
  const jobGroups = {};
  state.jobs.forEach(job => {
    if (job.isTrash) return;
    const clips = [];
    job.services.forEach((s, sIdx) => {
      if (!s.service.toLowerCase().includes('quay')) return;
      const jd = new Date(job.date); jd.setHours(0, 0, 0, 0);
      const dl = new Date(jd); dl.setDate(dl.getDate() + EDIT_DAYS);
      const daysLeft = Math.ceil((dl - today) / (864e5));
      const es = s.editStatus || 'Chưa bắt đầu';
      let stg, sc, si, pri;
      if (es === 'Hoàn thành') { stg = 'XONG'; sc = '#22c55e'; si = '✅'; pri = 99; }
      else if (daysLeft > 10) { stg = 'OK'; sc = '#22c55e'; si = '🟢'; pri = 3; }
      else if (daysLeft > 5) { stg = 'SẮP'; sc = '#eab308'; si = '🟡'; pri = 2; }
      else if (daysLeft > 0) { stg = 'GẤP'; sc = '#f97316'; si = '🟠'; pri = 1; }
      else { stg = 'TRỄ'; sc = '#ef4444'; si = '🔴'; pri = 0; }
      const cl = s.editChecklist || { footage: false, rough: false, color: false, audio: false, export: false };
      clips.push({
        svc: s.service, sIdx, staff: s.staff, editStaff: s.editStaff || '', es,
        editDriveLink: s.editDriveLink || '', editorNote: s.editorNote || '',
        dlStr: dl.toLocaleDateString('vi-VN'), dateStr: jd.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }),
        daysLeft, stg, sc, si, pri, cl, jobMonth: jd.getMonth() + 1
      });
    });
    if (!clips.length) return;
    const wp = Math.min(...clips.map(c => c.pri));
    const wc = clips.find(c => c.pri === wp)?.sc || '#22c55e';
    let tl = '';
    if (job.timeline?.le) tl += `Lễ: ${job.timeline.le}`;
    if (job.timeline?.tiec) tl += `${tl ? ' · ' : ''}Tiệc: ${job.timeline.tiec}`;
    const jd2 = new Date(job.date);
    jobGroups[job.id] = {
      id: job.id, no: job.jobNo, client: job.client, type: job.eventType || 'Wedding',
      date: job.date, tl, notes: job.notes || '',
      lNAS: job.linkNAS || '', lFt: job.linkFootage || '',
      clips, cn: clips.length,
      dn: clips.filter(c => c.es === 'Hoàn thành').length,
      ad: clips.every(c => c.es === 'Hoàn thành'), wp, wc,
      wdl: Math.min(...clips.map(c => c.daysLeft)),
      jobMonth: jd2.getMonth() + 1
    };
  });

  const gs = Object.values(jobGroups).sort((a, b) => a.wp - b.wp || a.wdl - b.wdl);
  const ac = gs.flatMap(g => g.clips);
  const tot = ac.length, don = ac.filter(c => c.es === 'Hoàn thành').length;
  const urg = ac.filter(c => c.pri <= 1).length, pen = tot - don;
  const pctAll = tot > 0 ? Math.round(don / tot * 100) : 0;

  const gsM0 = gs.filter(g => g.jobMonth === pm);
  const gsM1 = gs.filter(g => g.jobMonth === m1);

  function renderClipRow(c, g) {
    const isDone = c.es === 'Hoàn thành';
    const clDone = Object.values(c.cl).filter(Boolean).length;
    const cstp = steps.indexOf(c.es);
    const clItems = [['footage', '📁', 'Footage'], ['rough', '✂️', 'Cut'], ['color', '🎨', 'Color'], ['audio', '🎵', 'Audio'], ['export', '📤', 'Export']];
    return `
      <div style="background:${c.sc}04;border:1px solid ${c.sc}15;border-radius:10px;padding:0.6rem 0.75rem;margin-bottom:0.4rem;${isDone ? 'opacity:0.55' : ''}">
        <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.35rem;flex-wrap:wrap">
          <div style="min-width:38px;text-align:center">
            <span style="font-size:1rem">${c.si}</span>
            <div style="font-size:0.55rem;font-weight:900;color:${c.sc};letter-spacing:0.5px">${c.stg}</div>
          </div>
          <div style="flex:1;min-width:120px">
            <div style="display:flex;align-items:center;gap:0.4rem">
              <span style="font-size:0.85rem;font-weight:800;color:var(--text-main)">${c.svc}</span>
              <span style="font-size:0.6rem;color:var(--text-dim);background:#0001;padding:0.1rem 0.3rem;border-radius:3px">📅 ${c.dateStr}</span>
            </div>
            <div style="display:flex;align-items:center;gap:0.4rem;margin-top:0.15rem">
              <span style="font-size:0.7rem;color:var(--text-dim)">📷 <b>${c.staff}</b></span>
              <span style="font-size:0.65rem;color:${c.sc};font-weight:800;font-family:monospace;background:${c.sc}10;padding:0.1rem 0.3rem;border-radius:4px">
                ⏰ ${isDone ? 'Đã xong' : c.daysLeft > 0 ? c.daysLeft + ' ngày còn' : 'Trễ ' + Math.abs(c.daysLeft) + ' ngày'}
              </span>
              <span style="font-size:0.6rem;color:var(--text-dim)">→ DL: ${c.dlStr}</span>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:0.4rem">
            <div style="text-align:center">
              <div style="font-size:0.55rem;color:var(--text-dim);font-weight:700;margin-bottom:0.1rem">Editor</div>
              <select class="form-control ep-editor-select" data-job-id="${g.id}" data-service="${c.svc}"
                style="width:90px;font-size:0.75rem;padding:0.25rem 0.3rem;border:1px solid var(--border);border-radius:6px;font-weight:700">
                <option value="">— Chọn —</option>
                ${state.staff.map(s => `<option value="${s.name}" ${c.editStaff === s.name ? 'selected' : ''}>${s.name}</option>`).join('')}
              </select>
            </div>
            <div style="text-align:center">
              <div style="font-size:0.55rem;color:var(--text-dim);font-weight:700;margin-bottom:0.1rem">Trạng thái</div>
              <select class="form-control ep-status-select" data-job-id="${g.id}" data-service="${c.svc}"
                style="width:105px;font-size:0.75rem;padding:0.25rem 0.3rem;border:1px solid ${c.sc}30;border-radius:6px;font-weight:800;color:${c.sc}">
                ${steps.map(s => `<option value="${s}" ${c.es === s ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
            </div>
            ${!isDone ? `<button class="ep-done-btn" data-job-id="${g.id}" data-service="${c.svc}"
              style="background:#22c55e;color:#fff;border:none;padding:0.3rem 0.6rem;border-radius:6px;
                font-size:0.7rem;font-weight:800;cursor:pointer;font-family:inherit;white-space:nowrap;margin-top:0.8rem">✓ Xong</button>`
        : `<button class="ep-reopen-btn" data-job-id="${g.id}" data-service="${c.svc}"
              style="background:#f97316;color:#fff;border:none;padding:0.3rem 0.6rem;border-radius:6px;
                font-size:0.7rem;font-weight:800;cursor:pointer;font-family:inherit;white-space:nowrap;margin-top:0.8rem">✏️ Edit lại</button>`}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.35rem;padding-left:42px">
          <div style="display:flex;gap:0.25rem;flex:1">
            ${clItems.map(([k, ic, lb]) => `
              <label style="cursor:pointer;display:flex;align-items:center;gap:0.15rem;font-size:0.72rem;
                padding:0.15rem 0.35rem;border-radius:5px;background:${c.cl[k] ? '#22c55e12' : '#0001'};
                border:1px solid ${c.cl[k] ? '#22c55e30' : 'transparent'};transition:all 0.15s" title="${lb}">
                <input type="checkbox" class="ep-checklist" data-job-id="${g.id}" data-service="${c.svc}" data-key="${k}"
                  ${c.cl[k] ? 'checked' : ''} style="display:none">
                <span style="opacity:${c.cl[k] ? 1 : 0.4}">${ic}</span>
                <span style="font-size:0.6rem;font-weight:700;color:${c.cl[k] ? '#22c55e' : 'var(--text-dim)'}">${lb}</span>
              </label>`).join('')}
          </div>
          <div style="display:flex;align-items:center;gap:0.3rem;min-width:70px">
            <div style="flex:1;height:4px;background:#0001;border-radius:2px">
              <div style="width:${clDone * 20}%;height:100%;background:${clDone === 5 ? '#22c55e' : '#3b82f6'};border-radius:2px"></div>
            </div>
            <span style="font-size:0.65rem;font-weight:800;color:${clDone === 5 ? '#22c55e' : 'var(--text-dim)'}">${clDone}/5</span>
          </div>
          <div style="display:flex;gap:2px;min-width:45px">
            ${steps.map((_, i) => `<div style="flex:1;height:4px;background:${i < cstp ? '#22c55e' : i === cstp ? c.sc : '#e2e8f0'};border-radius:2px"></div>`).join('')}
          </div>
        </div>
        <div style="display:flex;gap:0.4rem;padding-left:42px">
          <div style="flex:1;display:flex;align-items:center;gap:0.25rem">
            <span style="font-size:0.65rem;font-weight:800;color:var(--text-dim)">🔗 Output</span>
            <input type="text" class="form-control ep-drive-input" data-job-id="${g.id}" data-service="${c.svc}"
              placeholder="Link sản phẩm…" value="${c.editDriveLink}"
              style="flex:1;font-size:0.75rem;padding:0.25rem 0.4rem;border:1px solid var(--border);border-radius:6px;background:#fff">
            ${c.editDriveLink ? `<a href="${c.editDriveLink}" target="_blank" style="font-size:0.65rem;color:#22c55e;font-weight:800;text-decoration:none">Mở ↗</a>` : ''}
          </div>
          <div style="flex:1;display:flex;align-items:center;gap:0.25rem">
            <span style="font-size:0.65rem;font-weight:800;color:var(--text-dim)">✏️ Note</span>
            <input type="text" class="form-control ep-note-input" data-job-id="${g.id}" data-service="${c.svc}"
              placeholder="Ghi chú cho editor…" value="${c.editorNote}"
              style="flex:1;font-size:0.75rem;padding:0.25rem 0.4rem;border:1px solid var(--border);border-radius:6px;background:#fff;color:var(--text-muted)">
          </div>
        </div>
      </div>`;
  }

  function renderClientCard(g) {
    const cp = g.cn > 0 ? Math.round(g.dn / g.cn * 100) : 0;
    return `
    <div style="background:${g.ad ? '#22c55e06' : '#fff'};border:1px solid ${g.wc}20;border-radius:14px;
      padding:0.85rem 1rem;margin-bottom:0.7rem;${g.ad ? 'opacity:0.6' : ''}">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem">
        <div style="display:flex;align-items:center;gap:0.6rem">
          <div style="width:36px;height:36px;background:${g.wc}15;border-radius:10px;display:flex;align-items:center;
            justify-content:center;font-weight:900;color:${g.wc};font-size:0.95rem">${g.client[0]}</div>
          <div>
            <div style="font-size:1rem;font-weight:800;color:var(--text-main)">${g.client}</div>
            <div style="font-size:0.72rem;color:var(--text-dim)">${g.type} · ${new Date(g.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}${g.tl ? ' · ' + g.tl : ''}</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:0.6rem">
          <span style="font-size:0.65rem;font-weight:800;color:var(--primary);background:var(--accent-soft);padding:0.15rem 0.5rem;border-radius:5px">#${g.no || '—'}</span>
          <div style="text-align:right">
            <div style="font-size:0.7rem;font-weight:800;color:${g.wc}">${g.cn} clip · ${cp}%</div>
            <div style="width:60px;height:4px;background:#0001;border-radius:2px;margin-top:0.2rem">
              <div style="width:${cp}%;height:100%;background:${cp === 100 ? '#22c55e' : g.wc};border-radius:2px"></div>
            </div>
          </div>
        </div>
      </div>
      ${g.notes ? `<div style="background:#eab30808;border:1px solid #eab30815;border-radius:8px;padding:0.35rem 0.6rem;margin-bottom:0.5rem;font-size:0.75rem">
        <b style="color:#eab308">📝 Ghi chú:</b> <span style="color:var(--text-muted)">${g.notes}</span></div>` : ''}
      <div style="display:flex;gap:0.5rem;margin-bottom:0.5rem">
        <div style="flex:1;display:flex;align-items:center;gap:0.3rem">
          <span style="font-size:0.65rem;font-weight:800;color:var(--text-dim)">📂 Footage</span>
          <input type="text" class="form-control ep-footage-input" data-job-id="${g.id}" placeholder="Link footage nguồn…" value="${g.lFt}"
            style="flex:1;font-size:0.75rem;padding:0.25rem 0.5rem;border:1px solid var(--border);border-radius:6px;background:#fff">
          ${g.lFt ? `<a href="${g.lFt}" target="_blank" style="font-size:0.65rem;color:#2563eb;font-weight:800;text-decoration:none">Mở ↗</a>` : ''}
        </div>
        <div style="flex:1;display:flex;align-items:center;gap:0.3rem">
          <span style="font-size:0.65rem;font-weight:800;color:var(--text-dim)">📁 NAS</span>
          <input type="text" class="form-control ep-nas-input" data-job-id="${g.id}" placeholder="Link NAS video…" value="${g.lNAS}"
            style="flex:1;font-size:0.75rem;padding:0.25rem 0.5rem;border:1px solid var(--border);border-radius:6px;background:#fff">
          ${g.lNAS ? `<a href="${g.lNAS}" target="_blank" style="font-size:0.65rem;color:#2563eb;font-weight:800;text-decoration:none">Mở ↗</a>` : ''}
        </div>
      </div>
      ${g.clips.map(c => renderClipRow(c, g)).join('')}
    </div>`;
  }

  function renderMonthSection(label, groups) {
    if (!groups.length) return '';
    const mc = groups.flatMap(g => g.clips);
    const md = mc.filter(c => c.es === 'Hoàn thành').length;
    const mp = mc.length > 0 ? Math.round(md / mc.length * 100) : 0;
    return `
    <div style="margin-bottom:1rem">
      <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;padding:0.4rem 0;border-bottom:2px solid rgba(22,163,74,0.15)">
        <span style="font-size:0.95rem;font-weight:900;color:var(--text-main)">${label}</span>
        <span style="font-size:0.72rem;font-weight:700;color:var(--text-dim)">${mc.length} clip · ${groups.length} khách</span>
        <div style="flex:1"></div>
        <div style="display:flex;align-items:center;gap:0.3rem">
          <div style="width:80px;height:5px;background:#0001;border-radius:3px">
            <div style="width:${mp}%;height:100%;background:${mp === 100 ? '#22c55e' : 'var(--primary)'};border-radius:3px"></div>
          </div>
          <span style="font-size:0.72rem;font-weight:800;color:${mp === 100 ? '#22c55e' : 'var(--primary)'}">${mp}%</span>
        </div>
      </div>
      ${groups.map(g => renderClientCard(g)).join('')}
    </div>`;
  }

  // ============ EDITOR KANBAN VIEW ============
  function renderEditorKanban() {
    return `
    <div style="display:flex;gap:0.5rem;overflow-x:auto;padding-bottom:1rem;min-height:500px">
      ${steps.map((step, i) => {
      const clipsInStep = ac.filter(c => c.es === step);
      return `
        <div style="flex:1;min-width:220px;background:var(--bg-card);border-radius:12px;padding:0.6rem;border:1px solid var(--border)">
          <div style="display:flex;align-items:center;gap:0.4rem;margin-bottom:0.6rem;padding-bottom:0.4rem;border-bottom:2px solid ${stepColors[i]}">
            <span>${stepIcons[i]}</span>
            <span style="font-size:0.75rem;font-weight:800;color:${stepColors[i]}">${step}</span>
            <span style="font-size:0.6rem;background:${stepColors[i]}20;color:${stepColors[i]};padding:0.1rem 0.35rem;border-radius:8px;font-weight:800;margin-left:auto">${clipsInStep.length}</span>
          </div>
          <div class="ep-kanban-list" data-status="${step}" style="min-height:50px;display:flex;flex-direction:column;gap:0.4rem">
            ${clipsInStep.map(c => {
        const g = Object.values(jobGroups).find(gr => gr.clips.includes(c));
        if (!g) return '';
        const jobComments = state.jobs.find(j => j.id === g.id)?.comments || [];
        const svcComments = jobComments.filter(cm => !cm.service || cm.service === c.svc);
        const isDone = c.es === 'Hoàn thành';
        const clDone = Object.values(c.cl).filter(Boolean).length;
        return `
              <div class="ep-kanban-card" data-job-id="${g.id}" data-svc="${c.svc}"
                style="background:var(--bg-main);border:1px solid ${c.sc}25;border-radius:10px;padding:0.55rem;cursor:grab;transition:all 0.15s;border-left:3px solid ${c.sc};${isDone ? 'opacity:0.55' : ''}">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.25rem">
                  <span style="font-size:0.82rem;font-weight:800;color:var(--text-main)">${g.client}</span>
                  <span style="font-size:0.85rem">${c.si}</span>
                </div>
                <div style="font-size:0.68rem;color:var(--text-dim);margin-bottom:0.2rem">${c.svc} · 📅 ${c.dateStr}</div>
                <div style="display:flex;justify-content:space-between;font-size:0.6rem;color:var(--text-muted);margin-bottom:0.25rem">
                  <span>📷 ${c.staff}</span>
                  <span>✏️ ${c.editStaff || '—'}</span>
                </div>
                <div style="font-size:0.6rem;font-weight:800;color:${c.sc};background:${c.sc}10;padding:0.15rem 0.3rem;border-radius:4px;text-align:center;margin-bottom:0.3rem">
                  ⏰ ${isDone ? 'Đã xong' : c.daysLeft > 0 ? c.daysLeft + ' ngày còn' : 'TRỄ ' + Math.abs(c.daysLeft) + ' ngày!'}
                </div>
                <div style="display:flex;align-items:center;gap:0.2rem;margin-bottom:0.3rem">
                  <div style="flex:1;height:3px;background:#0001;border-radius:2px"><div style="width:${clDone * 20}%;height:100%;background:${clDone === 5 ? '#22c55e' : '#3b82f6'};border-radius:2px"></div></div>
                  <span style="font-size:0.55rem;font-weight:800;color:${clDone === 5 ? '#22c55e' : 'var(--text-dim)'}">${clDone}/5</span>
                </div>
                ${g.notes ? `<div style="background:#eab30808;border:1px solid #eab30815;border-radius:6px;padding:0.25rem 0.4rem;margin-bottom:0.25rem;font-size:0.62rem">
                  <b style="color:#eab308">📝</b> <span style="color:var(--text-muted)">${g.notes.substring(0, 80)}${g.notes.length > 80 ? '…' : ''}</span>
                </div>` : ''}
                ${c.editorNote ? `<div style="background:#3b82f608;border:1px solid #3b82f615;border-radius:6px;padding:0.25rem 0.4rem;margin-bottom:0.25rem;font-size:0.62rem">
                  <b style="color:#3b82f6">✏️</b> <span style="color:var(--text-muted)">${c.editorNote.substring(0, 80)}${c.editorNote.length > 80 ? '…' : ''}</span>
                </div>` : ''}
                ${svcComments.length > 0 ? `<div style="background:#22c55e08;border:1px solid #22c55e15;border-radius:6px;padding:0.25rem 0.4rem;font-size:0.58rem">
                  <b style="color:#22c55e">💬 ${svcComments.length} ghi chú</b>
                  ${svcComments.slice(-2).map(cm => `<div style="color:var(--text-muted);margin-top:0.15rem;padding-left:0.3rem;border-left:2px solid #22c55e30">
                    <b>${cm.user}</b>: ${cm.text.substring(0, 60)}${cm.text.length > 60 ? '…' : ''}
                  </div>`).join('')}
                </div>` : ''}
                <div style="display:flex;gap:0.2rem;margin-top:0.3rem;justify-content:flex-end">
                  <button class="ep-kanban-chat" data-job-id="${g.id}" style="font-size:0.55rem;background:var(--primary-glow);color:var(--primary);border:1px solid var(--border-bright);padding:0.15rem 0.3rem;border-radius:4px;cursor:pointer;font-weight:700">💬 Chat</button>
                  ${c.editDriveLink ? `<a href="${c.editDriveLink}" target="_blank" style="font-size:0.55rem;background:#3b82f610;color:#3b82f6;border:1px solid #3b82f620;padding:0.15rem 0.3rem;border-radius:4px;text-decoration:none;font-weight:700">🔗 Output</a>` : ''}
                </div>
              </div>`;
      }).join('')}
          </div>
        </div>`;
    }).join('')}
    </div>`;
  }

  container.innerHTML = `
    <div style="background:rgba(255,255,255,0.95);backdrop-filter:blur(12px);border-bottom:1px solid rgba(22,163,74,0.1);
      padding:0.6rem 1.5rem;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:100">
      <div style="display:flex;align-items:center;gap:0.6rem">
        <div style="width:30px;height:30px;background:linear-gradient(135deg,#16a34a,#22c55e);border-radius:8px;
          display:flex;align-items:center;justify-content:center">
          <span style="color:#fff;font-size:0.75rem;font-weight:900">H</span>
        </div>
        <div>
          <span style="font-size:0.95rem;font-weight:800;color:var(--text-main)">Xin chào, ${userName} 👋</span>
          <span style="font-size:0.7rem;color:var(--text-dim);margin-left:0.4rem">${today.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })}</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <div style="display:flex;gap:0.2rem;background:var(--accent-soft);border-radius:8px;padding:0.15rem;border:1px solid var(--border)">
          <button class="ep-view-toggle" data-view="list" style="font-size:0.72rem;font-weight:700;padding:0.25rem 0.5rem;border-radius:6px;cursor:pointer;border:none;background:transparent;color:var(--text-dim);font-family:inherit">📋 List</button>
          <button class="ep-view-toggle" data-view="kanban" style="font-size:0.72rem;font-weight:700;padding:0.25rem 0.5rem;border-radius:6px;cursor:pointer;border:none;background:var(--primary);color:#fff;font-family:inherit">📌 Kanban</button>
        </div>
        <div style="display:flex;gap:0.35rem;font-size:0.75rem;font-weight:800">
          <span style="background:#3b82f610;color:#3b82f6;padding:0.2rem 0.5rem;border-radius:6px">${tot} clip</span>
          ${urg > 0 ? `<span style="background:#ef444410;color:#ef4444;padding:0.2rem 0.5rem;border-radius:6px;animation:pulse 2s infinite">🔥 ${urg} gấp</span>` : ''}
          <span style="background:#f9731610;color:#f97316;padding:0.2rem 0.5rem;border-radius:6px">${pen} chờ</span>
          <span style="background:#22c55e10;color:#22c55e;padding:0.2rem 0.5rem;border-radius:6px">✅ ${don}</span>
        </div>
        <div style="background:var(--accent-soft);padding:0.25rem 0.6rem;border-radius:6px;border:1px solid rgba(22,163,74,0.15)">
          <span style="font-size:0.78rem;font-weight:800;color:var(--primary)">${periodLabel}</span>
        </div>
        <button onclick="window.toggleTheme();window.updateUI()" class="theme-toggle">${document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙'}</button>
        <button onclick="window.logout()" style="background:#ef444408;border:1px solid #ef444425;color:#ef4444;
          padding:0.25rem 0.6rem;border-radius:6px;font-size:0.75rem;font-weight:700;cursor:pointer;font-family:inherit">🚪 Thoát</button>
      </div>
    </div>

    <div style="padding:0.85rem 1.5rem;max-width:1400px;margin:0 auto">
      <div style="display:flex;gap:0.35rem;margin-bottom:0.85rem">
        ${steps.map((s, i) => {
    const c = ac.filter(t => t.es === s).length;
    return `<div style="flex:1;text-align:center;padding:0.35rem;background:${c > 0 ? stepColors[i] + '10' : '#fff'};
            border:1px solid ${c > 0 ? stepColors[i] + '30' : 'var(--border)'};border-radius:8px">
            <span style="font-size:0.9rem">${stepIcons[i]}</span>
            <span style="font-size:0.75rem;font-weight:800;color:${stepColors[i]};margin-left:0.2rem">${c}</span>
            <div style="font-size:0.58rem;color:var(--text-dim);font-weight:700;margin-top:0.1rem">${s}</div>
          </div>`;
  }).join('')}
      </div>

      <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.85rem;padding:0.4rem 0.6rem;background:var(--accent-soft);border-radius:8px">
        <span style="font-size:0.75rem;font-weight:800;color:var(--primary)">📊 Tổng tiến độ</span>
        <div style="flex:1;height:6px;background:#0002;border-radius:3px">
          <div style="width:${pctAll}%;height:100%;background:${pctAll === 100 ? '#22c55e' : 'var(--primary)'};border-radius:3px"></div>
        </div>
        <span style="font-size:0.8rem;font-weight:900;color:${pctAll === 100 ? '#22c55e' : 'var(--primary)'}">${pctAll}%</span>
        <span style="font-size:0.7rem;color:var(--text-dim)">(${don}/${tot})</span>
      </div>

      <!-- LIST VIEW (hidden by default) -->
      <div id="ep-list-view" style="display:none">
        ${renderMonthSection(monthNames[pm - 1] + ' ' + py, gsM0)}
        ${renderMonthSection(monthNames[m1 - 1] + ' ' + y1, gsM1)}
        ${gs.length === 0 ? `<div style="text-align:center;padding:2.5rem;color:var(--text-dim);background:#fff;border-radius:14px;border:1.5px dashed var(--border)">Không có video nào trong giai đoạn này 🎬</div>` : ''}
      </div>

      <!-- KANBAN VIEW (shown by default) -->
      <div id="ep-kanban-view">
        ${renderEditorKanban()}
      </div>
    </div>
    <style>@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.7}}</style>
  `;

  container.addEventListener('change', function (e) {
    const el = e.target;
    if (el.classList.contains('ep-status-select')) window.updateVideoEditStatus(el.dataset.jobId, el.dataset.service, el.value);
    if (el.classList.contains('ep-editor-select')) window.updateVideoEditor(el.dataset.jobId, el.dataset.service, el.value);
    if (el.classList.contains('ep-checklist')) { window.updateEditorChecklist(el.dataset.jobId, el.dataset.service, el.dataset.key, el.checked); window.updateUI(); }
  });
  container.addEventListener('click', function (e) {
    const btn = e.target.closest('.ep-done-btn');
    if (btn) window.updateVideoEditStatus(btn.dataset.jobId, btn.dataset.service, 'Hoàn thành');
    const reopen = e.target.closest('.ep-reopen-btn');
    if (reopen) window.updateVideoEditStatus(reopen.dataset.jobId, reopen.dataset.service, 'Chỉnh sửa');

    // View toggle
    const viewBtn = e.target.closest('.ep-view-toggle');
    if (viewBtn) {
      const view = viewBtn.dataset.view;
      const listEl = container.querySelector('#ep-list-view');
      const kanbanEl = container.querySelector('#ep-kanban-view');
      container.querySelectorAll('.ep-view-toggle').forEach(b => {
        b.style.background = 'transparent'; b.style.color = 'var(--text-dim)';
      });
      viewBtn.style.background = 'var(--primary)'; viewBtn.style.color = '#fff';
      if (view === 'list') { listEl.style.display = ''; kanbanEl.style.display = 'none'; }
      else { listEl.style.display = 'none'; kanbanEl.style.display = ''; }
    }

    // Kanban chat button
    const chatBtn = e.target.closest('.ep-kanban-chat');
    if (chatBtn && window.openChat) window.openChat(chatBtn.dataset.jobId);
  });
  container.addEventListener('blur', function (e) {
    const el = e.target;
    if (el.classList.contains('ep-drive-input')) window.updateVideoEditLink(el.dataset.jobId, el.dataset.service, el.value);
    if (el.classList.contains('ep-note-input')) window.updateEditorNote(el.dataset.jobId, el.dataset.service, el.value);
    if (el.classList.contains('ep-footage-input')) window.updateJobLink(el.dataset.jobId, 'linkFootage', el.value);
    if (el.classList.contains('ep-nas-input')) window.updateJobLink(el.dataset.jobId, 'linkNAS', el.value);
  }, true);

  // SortableJS is initialized in main.js updateUI() after DOM attach

  return container;
}

// ============ STAFF PORTAL ============
export function renderStaffPortal(state) {
  const container = document.createElement('div');
  container.style.cssText = `min-height:100vh;background:var(--bg-deep);font-family:'Outfit',sans-serif;`;

  const staffName = state.currentUser?.staffName || state.currentUser?.displayName || 'Nhân sự';
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

  const myJobs = [];
  const myClips = [];
  state.jobs.forEach(job => {
    if (job.isTrash) return;
    const myServices = job.services.filter(s => s.staff === staffName || s.editStaff === staffName);
    if (!myServices.length) return;
    const jobDate = new Date(job.date);
    const isPast = jobDate < today;
    const isToday = jobDate.toDateString() === today.toDateString();
    myServices.forEach(s => {
      myJobs.push({
        jobId: job.id, client: job.client, date: job.date, dateStr: jobDate.toLocaleDateString('vi-VN'),
        eventType: job.eventType || 'Lễ cưới', service: s.service, cost: s.cost || 0,
        paid: !!s.paid, isPast, isToday, status: job.status,
        address: job.address || job.venue || '', timeline: job.timeline || {}
      });
      if (s.service.toLowerCase().includes('quay') && (s.editStaff === staffName || s.staff === staffName)) {
        const dl = new Date(jobDate); dl.setDate(dl.getDate() + 20);
        const daysLeft = Math.ceil((dl - today) / 864e5);
        const editStatus = s.editStatus || 'Chưa bắt đầu';
        let sc = '#22c55e'; if (daysLeft <= 0 && editStatus !== 'Hoàn thành') sc = '#ef4444'; else if (daysLeft <= 5) sc = '#f97316'; else if (daysLeft <= 10) sc = '#eab308';
        if (editStatus === 'Hoàn thành') sc = '#22c55e';
        myClips.push({ jobId: job.id, client: job.client, service: s.service, editStatus, deadlineStr: dl.toLocaleDateString('vi-VN'), daysLeft, sc, editorNote: s.editorNote || '', editDriveLink: s.editDriveLink || '', dateStr: jobDate.toLocaleDateString('vi-VN') });
      }
    });
  });

  myJobs.sort((a, b) => new Date(a.date) - new Date(b.date));
  const totalEarnings = myJobs.reduce((s, j) => s + j.cost, 0);
  const paidEarnings = myJobs.filter(j => j.paid).reduce((s, j) => s + j.cost, 0);
  const unpaidEarnings = totalEarnings - paidEarnings;
  const upcomingJobs = myJobs.filter(j => !j.isPast);
  const pastJobs = myJobs.filter(j => j.isPast);
  const fmt = (n) => n.toLocaleString('vi-VN') + 'đ';
  const activeTab = state.staffPortalTab || 'jobs';

  container.innerHTML = `
    <div style="background:rgba(255,255,255,0.95);backdrop-filter:blur(12px);border-bottom:1px solid rgba(22,163,74,0.1);padding:0.6rem 1.5rem;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:100">
      <div style="display:flex;align-items:center;gap:0.6rem">
        <div style="width:36px;height:36px;background:linear-gradient(135deg,#16a34a,#22c55e);border-radius:10px;display:flex;align-items:center;justify-content:center">
          <span style="color:#fff;font-size:0.9rem;font-weight:900">${staffName[0]}</span>
        </div>
        <div>
          <span style="font-size:1rem;font-weight:800;color:var(--text-main)">👋 ${staffName}</span>
          <div style="font-size:0.68rem;color:var(--text-dim)">${today.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:0.5rem">
        <div style="display:flex;gap:0.3rem;font-size:0.72rem;font-weight:800">
          <span style="background:#3b82f610;color:#3b82f6;padding:0.15rem 0.45rem;border-radius:6px">${myJobs.length} job</span>
          <span style="background:#22c55e10;color:#22c55e;padding:0.15rem 0.45rem;border-radius:6px">${fmt(totalEarnings)}</span>
          ${unpaidEarnings > 0 ? '<span style="background:#ef444410;color:#ef4444;padding:0.15rem 0.45rem;border-radius:6px">Nợ ' + fmt(unpaidEarnings) + '</span>' : ''}
        </div>
        <button onclick="window.toggleTheme();window.updateUI()" class="theme-toggle">${isDark ? '☀️' : '🌙'}</button>
        <button onclick="window.logout()" style="background:#ef444408;border:1px solid #ef444425;color:#ef4444;padding:0.2rem 0.5rem;border-radius:6px;font-size:0.72rem;font-weight:700;cursor:pointer;font-family:inherit">🚪 Thoát</button>
      </div>
    </div>

    <div style="padding:0.8rem 1.5rem;max-width:1200px;margin:0 auto">
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.5rem;margin-bottom:0.8rem">
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:0.5rem 0.7rem;text-align:center;border-top:3px solid #3b82f6">
          <div style="font-size:0.5rem;font-weight:800;color:var(--text-dim);text-transform:uppercase">Tổng Job</div>
          <div style="font-size:1.2rem;font-weight:900;color:#3b82f6">${myJobs.length}</div>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:0.5rem 0.7rem;text-align:center;border-top:3px solid #22c55e">
          <div style="font-size:0.5rem;font-weight:800;color:var(--text-dim);text-transform:uppercase">Đã thanh toán</div>
          <div style="font-size:1.2rem;font-weight:900;color:#22c55e">${fmt(paidEarnings)}</div>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:0.5rem 0.7rem;text-align:center;border-top:3px solid #f97316">
          <div style="font-size:0.5rem;font-weight:800;color:var(--text-dim);text-transform:uppercase">Chưa thanh toán</div>
          <div style="font-size:1.2rem;font-weight:900;color:#f97316">${fmt(unpaidEarnings)}</div>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:0.5rem 0.7rem;text-align:center;border-top:3px solid #8b5cf6">
          <div style="font-size:0.5rem;font-weight:800;color:var(--text-dim);text-transform:uppercase">Clips Edit</div>
          <div style="font-size:1.2rem;font-weight:900;color:#8b5cf6">${myClips.length}</div>
        </div>
      </div>

      <div style="display:flex;gap:0.25rem;margin-bottom:0.8rem;background:var(--accent-soft);border-radius:10px;padding:0.2rem;border:1px solid var(--border)">
        <button class="sp-tab" data-tab="jobs" style="flex:1;padding:0.35rem;border-radius:8px;border:none;cursor:pointer;font-weight:700;font-size:0.78rem;font-family:inherit;${activeTab === 'jobs' ? 'background:var(--primary);color:#fff' : 'background:transparent;color:var(--text-dim)'}">📋 Công việc (${myJobs.length})</button>
        <button class="sp-tab" data-tab="payment" style="flex:1;padding:0.35rem;border-radius:8px;border:none;cursor:pointer;font-weight:700;font-size:0.78rem;font-family:inherit;${activeTab === 'payment' ? 'background:var(--primary);color:#fff' : 'background:transparent;color:var(--text-dim)'}">💰 Thanh toán</button>
        ${myClips.length > 0 ? '<button class="sp-tab" data-tab="clips" style="flex:1;padding:0.35rem;border-radius:8px;border:none;cursor:pointer;font-weight:700;font-size:0.78rem;font-family:inherit;' + (activeTab === 'clips' ? 'background:var(--primary);color:#fff' : 'background:transparent;color:var(--text-dim)') + '">🎬 Clips (' + myClips.length + ')</button>' : ''}
      </div>

      <div id="sp-jobs" style="${activeTab === 'jobs' ? '' : 'display:none'}">
        ${upcomingJobs.length ? '<div style="font-size:0.75rem;font-weight:800;color:var(--primary);margin-bottom:0.4rem">🔜 Sắp tới (' + upcomingJobs.length + ')</div>' : ''}
        ${upcomingJobs.map(j => '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:0.6rem 0.8rem;margin-bottom:0.4rem;border-left:3px solid ' + (j.isToday ? '#f97316' : 'var(--primary)') + '"><div style="display:flex;justify-content:space-between;align-items:center"><div><span style="font-size:0.88rem;font-weight:800;color:var(--text-main)">' + j.client + '</span>' + (j.isToday ? ' <span style="font-size:0.55rem;background:#f97316;color:#fff;padding:0.1rem 0.3rem;border-radius:4px;font-weight:800">HÔM NAY</span>' : '') + '</div><span style="font-size:0.72rem;font-weight:700;color:var(--text-dim)">' + j.dateStr + '</span></div><div style="font-size:0.68rem;color:var(--text-muted);margin-top:0.15rem">' + j.service + ' · ' + j.eventType + (j.address ? ' · 📍 ' + j.address : '') + '</div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.25rem"><span style="font-size:0.72rem;font-weight:800;color:var(--primary)">' + fmt(j.cost) + '</span><span style="font-size:0.58rem;font-weight:700;padding:0.1rem 0.35rem;border-radius:4px;' + (j.paid ? 'background:#22c55e15;color:#22c55e' : 'background:#f9731615;color:#f97316') + '">' + (j.paid ? '✅ Đã TT' : '⏳ Chưa TT') + '</span></div></div>').join('')}
        ${pastJobs.length ? '<div style="font-size:0.75rem;font-weight:800;color:var(--text-dim);margin:0.6rem 0 0.4rem">✅ Đã làm (' + pastJobs.length + ')</div>' : ''}
        ${pastJobs.map(j => '<div style="background:var(--bg-card);border:1px solid var(--border);border-radius:10px;padding:0.6rem 0.8rem;margin-bottom:0.4rem;opacity:0.7"><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:0.85rem;font-weight:800;color:var(--text-main)">' + j.client + '</span><span style="font-size:0.72rem;font-weight:700;color:var(--text-dim)">' + j.dateStr + '</span></div><div style="font-size:0.68rem;color:var(--text-muted);margin-top:0.15rem">' + j.service + ' · ' + j.eventType + '</div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:0.25rem"><span style="font-size:0.72rem;font-weight:800;color:var(--primary)">' + fmt(j.cost) + '</span><span style="font-size:0.58rem;font-weight:700;padding:0.1rem 0.35rem;border-radius:4px;' + (j.paid ? 'background:#22c55e15;color:#22c55e' : 'background:#f9731615;color:#f97316') + '">' + (j.paid ? '✅ Đã TT' : '⏳ Chưa TT') + '</span></div></div>').join('')}
        ${myJobs.length === 0 ? '<div style="text-align:center;padding:2rem;color:var(--text-dim);font-size:0.85rem">Chưa có công việc nào 🎬</div>' : ''}
      </div>

      <div id="sp-payment" style="${activeTab === 'payment' ? '' : 'display:none'}">
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:0.8rem;margin-bottom:0.6rem">
          <div style="font-size:0.8rem;font-weight:800;color:var(--text-main);margin-bottom:0.5rem">💰 Tổng kết</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.5rem">
            <div style="text-align:center;padding:0.4rem;background:#3b82f608;border-radius:8px"><div style="font-size:0.5rem;font-weight:800;color:#3b82f6;text-transform:uppercase">Tổng thu nhập</div><div style="font-size:1rem;font-weight:900;color:#3b82f6">${fmt(totalEarnings)}</div></div>
            <div style="text-align:center;padding:0.4rem;background:#22c55e08;border-radius:8px"><div style="font-size:0.5rem;font-weight:800;color:#22c55e;text-transform:uppercase">Đã nhận</div><div style="font-size:1rem;font-weight:900;color:#22c55e">${fmt(paidEarnings)}</div></div>
            <div style="text-align:center;padding:0.4rem;background:#f9731608;border-radius:8px"><div style="font-size:0.5rem;font-weight:800;color:#f97316;text-transform:uppercase">Còn nợ</div><div style="font-size:1rem;font-weight:900;color:#f97316">${fmt(unpaidEarnings)}</div></div>
          </div>
        </div>
        ${myJobs.map(j => '<div style="background:var(--bg-card);border:1px solid ' + (j.paid ? '#22c55e' : '#f97316') + '20;border-radius:10px;padding:0.5rem 0.7rem;margin-bottom:0.35rem;display:flex;justify-content:space-between;align-items:center"><div><div style="font-size:0.82rem;font-weight:700;color:var(--text-main)">' + j.client + '</div><div style="font-size:0.62rem;color:var(--text-dim)">' + j.dateStr + ' · ' + j.service + '</div></div><div style="text-align:right"><div style="font-size:0.85rem;font-weight:800;color:' + (j.paid ? '#22c55e' : '#f97316') + '">' + fmt(j.cost) + '</div><div style="font-size:0.55rem;font-weight:700;color:' + (j.paid ? '#22c55e' : '#f97316') + '">' + (j.paid ? '✅ Đã thanh toán' : '⏳ Chờ thanh toán') + '</div></div></div>').join('')}
      </div>

      <div id="sp-clips" style="${activeTab === 'clips' ? '' : 'display:none'}">
        ${myClips.length === 0 ? '<div style="text-align:center;padding:2rem;color:var(--text-dim)">Không có clip nào 🎬</div>' : ''}
        ${myClips.map(c => '<div style="background:var(--bg-card);border:1px solid ' + c.sc + '25;border-radius:10px;padding:0.6rem 0.8rem;margin-bottom:0.4rem;border-left:3px solid ' + c.sc + '"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.2rem"><span style="font-size:0.88rem;font-weight:800;color:var(--text-main)">' + c.client + '</span><span style="font-size:0.65rem;font-weight:800;color:' + c.sc + ';background:' + c.sc + '12;padding:0.15rem 0.4rem;border-radius:5px">' + c.editStatus + '</span></div><div style="font-size:0.68rem;color:var(--text-dim);margin-bottom:0.3rem">' + c.service + ' · �� ' + c.dateStr + '</div><div style="background:' + c.sc + '10;border:1px solid ' + c.sc + '20;border-radius:8px;padding:0.3rem 0.5rem;display:flex;justify-content:space-between;align-items:center;' + (c.daysLeft <= 0 && c.editStatus !== 'Hoàn thành' ? 'animation:pulse 2s infinite' : '') + '"><span style="font-size:0.68rem;font-weight:800;color:' + c.sc + '">⏰ DL: ' + c.deadlineStr + '</span><span style="font-size:0.68rem;font-weight:800;color:' + c.sc + '">' + (c.editStatus === 'Hoàn thành' ? '✅ Đã xong' : c.daysLeft > 0 ? '⏳ ' + c.daysLeft + ' ngày' : '🚨 Trễ ' + Math.abs(c.daysLeft) + ' ngày!') + '</span></div>' + (c.editorNote ? '<div style="font-size:0.62rem;color:var(--text-muted);margin-top:0.25rem;background:#3b82f608;padding:0.2rem 0.4rem;border-radius:5px">✏️ ' + c.editorNote + '</div>' : '') + (c.editDriveLink ? '<div style="margin-top:0.2rem"><a href="' + c.editDriveLink + '" target="_blank" style="font-size:0.62rem;color:#3b82f6;font-weight:700">🔗 Mở link sản phẩm</a></div>' : '') + '</div>').join('')}
      </div>
    </div>
    <style>@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.7}}</style>
  `;

  container.addEventListener('click', (e) => {
    const tabBtn = e.target.closest('.sp-tab');
    if (tabBtn) { state.staffPortalTab = tabBtn.dataset.tab; window.updateUI(); }
  });

  return container;
}

// ============ EDIT PHOTO TRACKER (with Kanban) ============
export function renderEditPhoto(state) {
  const container = document.createElement('div');
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const EDIT_DAYS = 7;
  const photoTasks = [];
  state.jobs.forEach(job => {
    if (job.isTrash) return;
    (job.deliverables || []).forEach((d, dIdx) => {
      const isPhoto = d.type === 'Photo';
      if (!isPhoto) return;
      const jobDate = new Date(job.date); jobDate.setHours(0, 0, 0, 0);
      const dl = new Date(jobDate); dl.setDate(dl.getDate() + EDIT_DAYS);
      const daysLeft = Math.ceil((dl - today) / 864e5);
      const editStatus = d.editStatus || 'Chưa bắt đầu';
      let stage, sc;
      if (editStatus === 'Hoàn thành') { stage = 'HOÀN THÀNH'; sc = '#22c55e'; }
      else if (daysLeft > 5) { stage = 'THOẢI MÁI'; sc = '#22c55e'; }
      else if (daysLeft > 2) { stage = 'CẦN ĐẨY'; sc = '#eab308'; }
      else if (daysLeft > 0) { stage = 'GẤP'; sc = '#f97316'; }
      else { stage = 'QUÁ HẠN'; sc = '#ef4444'; }
      photoTasks.push({
        jobId: job.id, jobNo: job.jobNo, client: job.client, qty: d.quantity || 1,
        service: d.name, serviceIdx: dIdx, staff: d.editor || '',
        editStaff: d.editor || '', editStatus, editDriveLink: d.editDriveLink || '',
        deadlineStr: dl.toLocaleDateString('vi-VN'), daysLeft, stage, sc, jobDate: job.date
      });
    });
  });

  const stageOrder = { 'QUÁ HẠN': 0, 'GẤP': 1, 'CẦN ĐẨY': 2, 'THOẢI MÁI': 3, 'HOÀN THÀNH': 4 };
  photoTasks.sort((a, b) => (stageOrder[a.stage] ?? 5) - (stageOrder[b.stage] ?? 5) || a.daysLeft - b.daysLeft);

  const editFilter = state.editPhotoFilter || 'TẤT CẢ';
  const allEditors = [...new Set(photoTasks.map(t => t.editStaff || t.staff).filter(Boolean))].sort();
  let filtered = editFilter === 'TẤT CẢ' ? photoTasks : photoTasks.filter(t => (t.editStaff || t.staff) === editFilter);
  const statusFilter = state.editPhotoStatusFilter || 'ALL';
  if (statusFilter === 'DONE') filtered = filtered.filter(t => t.editStatus === 'Hoàn thành');
  else if (statusFilter === 'PENDING') filtered = filtered.filter(t => t.editStatus !== 'Hoàn thành');
  else if (statusFilter === 'PENDING_DEMO') filtered = filtered.filter(t => t.editStatus === 'Chưa bắt đầu' || t.editStatus === 'Đang chỉnh sửa');

  const total = photoTasks.length;
  const done = photoTasks.filter(t => t.editStatus === 'Hoàn thành').length;
  const overdue = photoTasks.filter(t => t.stage === 'QUÁ HẠN').length;
  const isKanban = (state.editPhotoView || 'kanban') === 'kanban';
  const staffOpts = state.staff.map(s => '<option value="' + s.name + '">' + s.name + '</option>').join('');
  const statusOpts = ['Chưa bắt đầu', 'Đang chỉnh sửa', 'Demo', 'Chỉnh sửa lại', 'Hoàn thành'].map(s => '<option value="' + s + '">' + s + '</option>').join('');

  const kanbanCols = [
    { key: 'Chưa bắt đầu', label: '📥 Chưa bắt đầu', color: '#94a3b8' },
    { key: 'Đang chỉnh sửa', label: '🎨 Đang chỉnh sửa', color: '#3b82f6' },
    { key: 'Demo', label: '👁️ Demo', color: '#a855f7' },
    { key: 'Chỉnh sửa lại', label: '🔄 Chỉnh sửa lại', color: '#f97316' },
    { key: 'Hoàn thành', label: '✅ Hoàn thành', color: '#22c55e' }
  ];

  const renderCard = (t) => `
    <div class="ep-card" onclick="window.openQuickPreview('${t.jobId}')" data-jobid="${t.jobId}" data-svcname="${t.serviceIdx}" style="background:${t.editStatus !== 'Hoàn thành' && t.stage === 'QUÁ HẠN' ? '#fef2f2' : t.editStatus !== 'Hoàn thành' && t.stage === 'GẤP' ? '#fff7ed' : 'var(--bg-main)'};border:1px solid ${t.sc}30;border-radius:6px;padding:0.4rem 0.5rem;margin-bottom:0.4rem;border-left:3px solid ${t.sc};cursor:grab;box-shadow:0 1px 2px rgba(0,0,0,0.03)">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.15rem">
        <span style="font-size:0.75rem;font-weight:800;color:var(--text-main);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:130px" title="${t.client}">${t.client}</span>
        ${t.editStatus !== 'Hoàn thành' && t.daysLeft <= 0 ? '<span title="Quá hạn" style="animation:pulse 2s infinite;font-size:0.65rem">🚨</span>' : ''}
      </div>
      <div style="font-size:0.6rem;color:var(--text-dim);margin-bottom:0.3rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${t.service}">📸 ${t.service} <strong style="color:var(--text-main)">(x${t.qty})</strong></div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:0.55rem;font-weight:700;color:${t.editStatus === 'Hoàn thành' ? '#22c55e' : t.daysLeft > 0 ? 'var(--text-dim)' : '#ef4444'}">⏰ ${t.deadlineStr}</span>
        <span style="font-size:0.55rem;font-weight:700;background:#a855f715;color:#a855f7;padding:0.15rem 0.3rem;border-radius:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:70px" title="${t.editStaff || 'Chưa gán'}">✏️ ${t.editStaff || 'Trống'}</span>
      </div>
    </div>`;

  container.innerHTML = '<header class="section-header"><div><h1 class="view-title">📸 Edit Photo Tracker</h1><p style="color:var(--text-dim);font-size:0.85rem;margin-top:0.2rem">Tiến độ hậu kỳ hình ảnh — Deadline ' + EDIT_DAYS + ' ngày</p></div></header>'
    + '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1rem"><div class="glass-panel" style="padding:0.8rem;border-top:3px solid #3b82f6;text-align:center"><div style="font-size:0.6rem;color:var(--text-dim);text-transform:uppercase;font-weight:800">Tổng Ảnh</div><div style="font-size:1.6rem;font-weight:900;color:#3b82f6">' + total + '</div></div><div class="glass-panel" style="padding:0.8rem;border-top:3px solid #22c55e;text-align:center"><div style="font-size:0.6rem;color:var(--text-dim);text-transform:uppercase;font-weight:800">Đã xong</div><div style="font-size:1.6rem;font-weight:900;color:#22c55e">' + done + '</div></div><div class="glass-panel" style="padding:0.8rem;border-top:3px solid #f97316;text-align:center"><div style="font-size:0.6rem;color:var(--text-dim);text-transform:uppercase;font-weight:800">Còn lại</div><div style="font-size:1.6rem;font-weight:900;color:#f97316">' + (total - done) + '</div></div><div class="glass-panel" style="padding:0.8rem;border-top:3px solid #ef4444;text-align:center"><div style="font-size:0.6rem;color:var(--text-dim);text-transform:uppercase;font-weight:800">Quá hạn</div><div style="font-size:1.6rem;font-weight:900;color:#ef4444">' + overdue + '</div></div></div>'
    + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.8rem;flex-wrap:wrap;gap:0.5rem"><div style="display:flex;gap:0.3rem;flex-wrap:wrap"><button onclick="window.setEditPhotoFilter(\'TẤT CẢ\')" style="font-size:0.72rem;padding:0.2rem 0.55rem;border-radius:16px;cursor:pointer;font-weight:700;font-family:inherit;' + (editFilter === 'TẤT CẢ' ? 'background:var(--primary);color:#fff;border:none' : 'background:#fff;color:var(--text-dim);border:1px solid var(--border)') + '">Tất cả</button>' + allEditors.map(n => '<button onclick="window.setEditPhotoFilter(\'' + n + '\')" style="font-size:0.72rem;padding:0.2rem 0.55rem;border-radius:16px;cursor:pointer;font-weight:700;font-family:inherit;' + (editFilter === n ? 'background:var(--primary);color:#fff;border:none' : 'background:#fff;color:var(--text-dim);border:1px solid var(--border)') + '">' + n + '</button>').join('') + '</div><div style="display:flex;gap:0.3rem"><button onclick="window.setEditPhotoStatusFilter(\'ALL\')" style="font-size:0.72rem;padding:0.2rem 0.55rem;border-radius:16px;cursor:pointer;font-weight:700;font-family:inherit;' + (statusFilter === 'ALL' ? 'background:#3b82f6;color:#fff;border:none' : 'background:#fff;color:var(--text-dim);border:1px solid var(--border)') + '">📸 Tất cả (' + total + ')</button><button onclick="window.setEditPhotoStatusFilter(\'PENDING\')" style="font-size:0.72rem;padding:0.2rem 0.55rem;border-radius:16px;cursor:pointer;font-weight:700;font-family:inherit;' + (statusFilter === 'PENDING' ? 'background:#f97316;color:#fff;border:none' : 'background:#fff;color:var(--text-dim);border:1px solid var(--border)') + '">⚠️ Chưa xong (' + (total - done) + ')</button><button onclick="window.setEditPhotoStatusFilter(\'PENDING_DEMO\')" style="font-size:0.72rem;padding:0.2rem 0.55rem;border-radius:16px;cursor:pointer;font-weight:700;font-family:inherit;' + (statusFilter === 'PENDING_DEMO' ? 'background:#8b5cf6;color:#fff;border:none' : 'background:#fff;color:var(--text-dim);border:1px solid var(--border)') + '">🚀 Chưa gửi Demo (' + photoTasks.filter(t => t.editStatus === 'Chưa bắt đầu' || t.editStatus === 'Đang chỉnh sửa').length + ')</button><button onclick="window.setEditPhotoStatusFilter(\'DONE\')" style="font-size:0.72rem;padding:0.2rem 0.55rem;border-radius:16px;cursor:pointer;font-weight:700;font-family:inherit;' + (statusFilter === 'DONE' ? 'background:#22c55e;color:#fff;border:none' : 'background:#fff;color:var(--text-dim);border:1px solid var(--border)') + '">✅ Xong (' + done + ')</button></div><div style="display:flex;gap:0.3rem"><button onclick="window.toggleEditPhotoView(\'kanban\')" style="font-size:0.72rem;padding:0.2rem 0.55rem;border-radius:16px;cursor:pointer;font-weight:700;font-family:inherit;' + (isKanban ? 'background:var(--primary);color:#fff;border:none' : 'background:#fff;color:var(--text-dim);border:1px solid var(--border)') + '">📋 Kanban</button><button onclick="window.toggleEditPhotoView(\'list\')" style="font-size:0.72rem;padding:0.2rem 0.55rem;border-radius:16px;cursor:pointer;font-weight:700;font-family:inherit;' + (!isKanban ? 'background:var(--primary);color:#fff;border:none' : 'background:#fff;color:var(--text-dim);border:1px solid var(--border)') + '">📝 List</button></div></div>'
    + (isKanban ? '<div id="ep-kanban" style="display:grid;grid-template-columns:repeat(' + kanbanCols.length + ',1fr);gap:0.6rem;overflow-x:auto">' + kanbanCols.map(col => { const colTasks = filtered.filter(t => t.editStatus === col.key); return '<div class="ep-col" data-status="' + col.key + '" style="background:var(--bg-deep);border:1px solid var(--border);border-radius:10px;padding:0.5rem;min-height:200px;border-top:3px solid ' + col.color + '"><div style="font-size:0.72rem;font-weight:800;color:' + col.color + ';margin-bottom:0.4rem;text-align:center">' + col.label + ' (' + colTasks.length + ')</div><div class="ep-col-cards" data-status="' + col.key + '">' + colTasks.map(renderCard).join('') + '</div></div>'; }).join('') + '</div>'
      : '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:1rem">' + filtered.map(t => '<div class="glass-panel" style="padding:0.7rem;border-left:3px solid ' + t.sc + '"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.3rem"><span style="font-size:0.88rem;font-weight:800;color:var(--text-main)">' + t.client + ' <span style="font-size:0.65rem;color:var(--text-dim)">#' + t.jobNo + '</span></span><span style="font-size:0.6rem;font-weight:800;color:' + t.sc + ';background:' + t.sc + '12;padding:0.1rem 0.3rem;border-radius:4px">' + t.stage + '</span></div><div style="font-size:0.72rem;color:var(--text-dim);margin-bottom:0.25rem">📸 ' + t.service + ' (x' + t.qty + ') · ' + (t.editStaff || t.staff || '—') + '</div><div style="display:flex;justify-content:space-between;align-items:center"><div style="font-size:0.68rem;font-weight:700;color:' + t.sc + '">⏰ ' + t.deadlineStr + '</div><select onchange="window.updateEditStatus(\'' + t.jobId + '\',\'' + t.serviceIdx + '\',this.value)" style="font-size:0.65rem;padding:0.15rem 0.3rem;border-radius:6px;border:1px solid var(--border);font-family:inherit;background:var(--bg-card)">' + ['Chưa bắt đầu', 'Đang chỉnh sửa', 'Demo', 'Chỉnh sửa lại', 'Hoàn thành'].map(s => '<option value="' + s + '" ' + (t.editStatus === s ? 'selected' : '') + '>' + s + '</option>').join('') + '</select></div></div>').join('') + '</div>');

  // SortableJS is initialized in main.js updateUI() after DOM attach
  return container;
}

// ==========================================
// GLOBAL SEARCH MODAL
// ==========================================
export function renderGlobalSearchModal(state) {
  const container = document.createElement('div');
  container.className = 'global-search-container';
  container.style.cssText = 'width: 600px; max-width: 95vw; background: var(--surface); border-radius: 12px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.15); display: flex; flex-direction: column; max-height: 80vh';

  // Phase 3 #7: Command hints
  const commandHint = state.globalSearchCommandHint;
  const COMMANDS = [
    { label: '➕ Tạo dự án mới', cmd: 'tạo job', keys: '> tạo job' },
    { label: '📅 Lịch nhắc việc', cmd: 'lịch', keys: '> lịch' },
    { label: '📋 Kanban', cmd: 'kanban', keys: '> kanban' },
    { label: '📊 Analytics', cmd: 'analytics', keys: '> analytics' },
    { label: '🎬 Edit Video', cmd: 'video', keys: '> video' },
    { label: '📸 Edit Photo', cmd: 'ảnh', keys: '> ảnh' },
    { label: '🎭 Nhân sự', cmd: 'nhân sự', keys: '> nhân sự' },
    { label: '📒 Tài chính', cmd: 'tài chính', keys: '> tài chính' },
  ];

  const resultsHTML = commandHint !== undefined && commandHint !== null ? `
    <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);background:rgba(59,130,246,0.04)">
      <div style="font-size:0.72rem;font-weight:800;color:#3b82f6;text-transform:uppercase;margin-bottom:0.6rem">⌨️ Lệnh nhanh — nhấn Enter hoặc click</div>
      <div style="display:flex;flex-direction:column;gap:0.3rem">
        ${COMMANDS.filter(c => !commandHint || c.cmd.includes(commandHint) || c.label.includes(commandHint)).map(c => `
          <div onclick="window._executeCommand('${c.cmd}')" style="display:flex;justify-content:space-between;align-items:center;padding:0.6rem 0.8rem;border-radius:8px;cursor:pointer;background:var(--bg-hover);border:1px solid var(--border);transition:0.15s" class="hover-bg-success">
            <span style="font-size:0.9rem;font-weight:700">${c.label}</span>
            <code style="font-size:0.68rem;background:rgba(0,0,0,0.07);padding:0.1rem 0.4rem;border-radius:4px;color:var(--text-dim)">${c.keys}</code>
          </div>`).join('')}
      </div>
    </div>` : results.length > 0 ? results.map(j => {
    const d = new Date(j.date);
    const monthStr = `T${d.getMonth() + 1}/${d.getFullYear()}`;
    return `
      <div onclick="window._jumpToJob('${j.id}')" style="padding: 1rem 1.25rem; border-bottom: 1px solid var(--border); cursor: pointer; display: flex; align-items: center; justify-content: space-between; transition: 0.2s" class="hover-bg-success">
        <div>
          <div style="font-weight: 700; color: var(--text-main); font-size: 1rem; margin-bottom: 0.25rem">${j.client}</div>
          <div style="font-size: 0.8rem; color: var(--text-dim); display: flex; gap: 0.75rem">
            <span>🔖 ${j.id}</span>
            <span>📱 ${j.phone || 'Chưa có SĐT'}</span>
            <span>📍 ${j.venue || 'Chưa xếp venue'}</span>
          </div>
        </div>
        <div style="text-align: right">
          <div style="font-size: 0.75rem; font-weight: 800; padding: 0.2rem 0.5rem; background: var(--bg-hover); border-radius: 6px; color: var(--primary)">${monthStr}</div>
          <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 0.3rem">${j.status}</div>
        </div>
      </div>
    `;
  }).join('') : (query.length > 1 ? '<div style="padding: 2rem; text-align: center; color: var(--text-dim)">Không tìm thấy kết quả nào cho "' + query + '"</div>' : '<div style="padding: 2rem; text-align: center; color: var(--text-dim)"><div style="font-size:0.85rem;margin-bottom:0.5rem">Gõ tên cô dâu chú rể, SDT hoặc mã Job để tìm kiếm</div><div style="font-size:0.75rem;color:var(--text-dim);opacity:0.7">💡 Gõ <code style="background:rgba(0,0,0,0.08);padding:0.1rem 0.4rem;border-radius:4px">> lệnh</code> để mở tính năng nhanh</div></div>');

  container.innerHTML = `
    <div style="padding: 1rem 1.25rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 1rem; background: var(--surface)">
      <i class="fas fa-search" style="color: var(--primary); font-size: 1.2rem"></i>
      <input type="text" id="global-search-input" placeholder="Tìm kiếm... hoặc nhập > lệnh" value="${query}" autocomplete="off"
        style="flex: 1; border: none; outline: none; background: transparent; font-size: 1.1rem; color: var(--text-main); font-weight: 600">
      <button onclick="window.closeModal()" style="background: transparent; border: none; font-size: 1.2rem; cursor: pointer; color: var(--text-dim)">&times;</button>
    </div>
    <div style="overflow-y: auto; flex: 1; background: var(--bg-main)">
      ${resultsHTML}
    </div>
  `;



  // Focus input on render and attach events
  setTimeout(() => {
    const inp = container.querySelector('#global-search-input');
    if (inp) {
      inp.focus();
      // Only set selection if there's actual text
      if (inp.value) inp.setSelectionRange(inp.value.length, inp.value.length);
      inp.addEventListener('input', (e) => {
        window._handleGlobalSearchInput(e.target.value);
      });
    }
  }, 10);

  return container;
}

// ============================================================
// PHASE 6: HARU GALLERY (Client Side)
// ============================================================
export function renderGalleryClient(galleryId, state) {
  const container = document.createElement('div');
  container.style.cssText = 'min-height: 100vh; background: #dcd7ce; color: #333; position: relative';

  const toPortfolioTime = (p) => {
    const byDate = Date.parse(p?.date || '');
    if (!Number.isNaN(byDate) && byDate > 0) return byDate;
    const byId = Number(String(p?.id || '').replace('PF-', ''));
    if (!Number.isNaN(byId) && byId > 0) return byId;
    return 0;
  };

  const publicPortfolios = (state.portfolios || [])
    .filter(p => p.isVisible)
    .sort((a, b) => toPortfolioTime(b) - toPortfolioTime(a));

  // 1. HUB VIEW (Trang chủ chọn Album)
  if (galleryId === 'home') {
    // Force body background to match for no seam
    document.body.style.background = '#dcd7ce';

    // Extract unique categories for filtering
    const categories = ['Tất cả', ...new Set(publicPortfolios.map(p => p.category).filter(Boolean))];

    // Fonts: Patrick Hand for handwriting (great Vietnamese support), Space Mono for typewriter
    const fontStr = `<style>@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');</style>`;

    container.innerHTML = fontStr + `
      <style>
        .scrapbook-container {
           min-height: 100vh;
           background: #dcd7ce url('https://www.transparenttextures.com/patterns/cream-paper.png'); /* Subtle paper texture */
           color: #333;
           position: relative;
           overflow-x: hidden;
        }
        
        /* Premium Hero Section */
        .scrapbook-hero {
           padding: 6rem 2rem 4rem;
           text-align: center;
        }
        .scrapbook-hero h1 {
           font-family: 'Patrick Hand', cursive;
           font-size: clamp(4rem, 10vw, 7rem);
           color: #2c2925;
           margin: 0;
           line-height: 1;
           transform: rotate(-2deg);
        }
        .scrapbook-hero p {
           font-family: 'Space Mono', monospace;
           font-size: 1rem;
           color: #5c554b;
           margin-top: 1rem;
           letter-spacing: 2px;
        }
        
        .hub-filter-btn {
           background: transparent;
           border: 1px dashed rgba(0,0,0,0.3);
           color: #4a443a;
           padding: 0.5rem 1.2rem;
           font-family: 'Space Mono', monospace;
           font-size: 0.85rem;
           cursor: pointer;
           transition: all 0.3s ease;
           margin: 0.3rem;
           transform: rotate(calc(var(--rot) * 1deg));
        }
        .hub-filter-btn.active, .hub-filter-btn:hover {
           background: rgba(0,0,0,0.05);
           border: 1px solid #2c2925;
           color: #000;
           box-shadow: 2px 2px 0px rgba(0,0,0,0.1);
        }
        
        .scrapbook-grid {
           display: flex;
           flex-wrap: wrap;
           justify-content: center;
           gap: 3rem;
           padding: 2rem 2rem 8rem 2rem;
           max-width: 1400px;
           margin: 0 auto;
        }
        
        .scrapbook-card {
           background: #fff;
           padding: 1rem 1rem 3.5rem 1rem;
           box-shadow: 2px 6px 15px rgba(0,0,0,0.15);
           border-radius: 2px;
           text-decoration: none;
           color: #333;
           width: 100%;
           max-width: 320px; /* Fixed max-width for polaroid look while responsive */
           position: relative;
           transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease, z-index 0s;
           z-index: 1;
           display: flex;
           flex-direction: column;
           transform: rotate(calc(var(--rot) * 1deg)) translateY(calc(var(--y) * 1px));
        }
        
        .scrapbook-card.hidden {
           display: none !important;
        }
        
        .scrapbook-card:hover {
           transform: scale(1.08) rotate(0deg) translateY(0) !important;
           box-shadow: 8px 15px 30px rgba(0,0,0,0.25);
           z-index: 100;
        }
        
        /* Mobile Optimizations */
        @media (max-width: 768px) {
           .scrapbook-hero { padding: 4rem 1rem 2rem; }
           .scrapbook-hero h1 { font-size: 3.5rem; transform: rotate(0deg); }
           .scrapbook-grid { gap: 1.5rem; padding: 1rem 1rem 4rem 1rem; }
           
           /* Reduce rotation and translations on mobile to save horizontal space and prevent overflow */
           .scrapbook-card {
              padding: 0.75rem 0.75rem 2.5rem 0.75rem;
              transform: rotate(calc(var(--rot) * 0.4deg)) translateY(calc(var(--y) * 0.5px));
              max-width: 280px;
           }
           
           /* Disable hover zoom on mobile for smoother scrolling, keep shadow */
           .scrapbook-card:hover {
              transform: rotate(0deg) translateY(0) !important;
           }
           
           .scrapbook-title { font-size: 1.8rem; margin-top: 0.75rem; }
           .scrapbook-meta { bottom: 0.75rem; right: 1rem; font-size: 0.55rem; }
        }
        
        .scrapbook-img-wrapper {
           width: 100%;
           aspect-ratio: 1/1; /* Square for Polaroid */
           background: #eee;
           overflow: hidden;
           position: relative;
        }
        
        .scrapbook-img {
           width: 100%;
           height: 100%;
           object-fit: cover;
           filter: contrast(1.05) saturate(0.95); /* Slight vintage color grade */
        }
        
        .scrapbook-title {
           font-family: 'Patrick Hand', cursive;
           font-size: 2.2rem;
           line-height: 1.1;
           margin-top: 1rem;
           text-align: center;
           color: #222;
        }
        
        .scrapbook-meta {
           position: absolute;
           bottom: 1rem;
           right: 1.5rem;
           font-family: 'Space Mono', monospace;
           font-size: 0.65rem;
           color: #666;
           transform: rotate(-3deg);
           text-align: right;
        }
        
        /* Washi tape variants */
        .washi-tape {
           position: absolute;
           width: 120px;
           height: 30px;
           box-shadow: 0 1px 3px rgba(0,0,0,0.1);
           z-index: 5;
           opacity: 0.85;
           pointer-events: none;
        }
        .washi-1 {
           top: -15px; left: 50%;
           transform: translateX(-50%) rotate(-4deg);
           background: rgba(225, 218, 203, 0.9);
           border-left: 3px dashed rgba(0,0,0,0.1);
           border-right: 3px dashed rgba(0,0,0,0.1);
        }
        .washi-2 {
           top: -10px; right: -20px;
           transform: rotate(45deg);
           background: rgba(200, 210, 200, 0.8); /* Sage tint */
           width: 80px;
        }
        .washi-3 {
           bottom: 10px; left: -20px;
           transform: rotate(-35deg);
           background: rgba(230, 200, 190, 0.8); /* Blush tint */
           width: 70px;
        }
        
        /* Additional styling for decorative elements */
        .washi-text {
            font-family: 'Patrick Hand', cursive;
            font-size: 1rem;
            color: #4a443a;
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            white-space: nowrap;
        }
      </style>
      
      <div class="scrapbook-container">
         <header style="padding: 2rem 3rem; display: flex; justify-content: space-between; align-items: center; position: absolute; width: 100%; z-index: 10">
            <div style="font-family: 'Special Elite', monospace; font-size: 1.2rem; font-weight: bold; letter-spacing: 2px;">HARU.</div>
            <div style="font-family: 'Caveat', cursive; font-size: 1.8rem; color: #5c554b;">Our Memories</div>
         </header>
         
         <section class="scrapbook-hero">
            <h1>Câu chuyện về Chúng tôi</h1>
            <p>A DIGITAL SCRAPBOOK BY HARU STUDIO</p>
         </section>
         
         <!-- Filters -->
         <section style="display: flex; gap: 0.8rem; flex-wrap: wrap; justify-content: center; margin-bottom: 3rem; padding: 0 1rem;">
            ${categories.map((cat, idx) => `
               <button class="hub-filter-btn ${idx === 0 ? 'active' : ''}" data-filter="${cat}" style="--rot: ${Math.random() * 4 - 2}">${cat}</button>
            `).join('')}
         </section>
         
         <!-- Scattered Scrapbook Grid -->
         <section class="scrapbook-grid">
            ${publicPortfolios.length === 0 ? '<div style="font-family: Caveat; font-size: 2rem; color: #888; text-align: center; width: 100%;">Cuốn sổ chưa có trang nào...</div>' : publicPortfolios.map((p, idx) => {
      // Generate pseudo-random rotations (-6 to +6 degrees)
      const rot = (Math.random() * 12 - 6).toFixed(1);
      // Generate vertical scatter (-20px to +20px)
      const yOffset = (Math.random() * 40 - 20).toFixed(0);

      const tapeType = idx % 3 === 0 ? 'washi-1' : (idx % 3 === 1 ? 'washi-2' : 'washi-3');
      const extraTape = idx % 3 === 1 ? '<div class="washi-tape washi-3"></div>' : '';

      return `
              <a href="?gallery=${p.id}" class="scrapbook-card" data-category="${p.category}" style="--rot: ${rot}; --y: ${yOffset};">
                 <div class="washi-tape ${tapeType}"></div>
                 ${extraTape}
                 <div class="scrapbook-img-wrapper">
                    <img class="scrapbook-img" src="${p.thumbnail || ''}" crossorigin="anonymous">
                 </div>
                 <div class="scrapbook-title">${p.jobName}</div>
                 <div class="scrapbook-meta">
                    [ ${p.category} ]<br>
                    ${p.date ? new Date(p.date).toLocaleDateString('vi-VN') : ''}
                 </div>
              </a>
            `}).join('')}
         </section>
         
         <footer style="padding: 4rem 2rem; text-align: center; font-family: 'Special Elite', monospace; font-size: 0.75rem; color: #888;">
            &copy; ${new Date().getFullYear()} Haru Studio.
         </footer>
      </div>
    `;

    // Attach event listeners for filtering
    requestAnimationFrame(() => {
      const btns = container.querySelectorAll('.hub-filter-btn');
      const cards = container.querySelectorAll('.scrapbook-card');

      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Update active state
          btns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const filter = btn.dataset.filter;

          // Filter cards via CSS class for display toggling
          cards.forEach(card => {
            if (filter === 'Tất cả' || card.dataset.category === filter) {
              card.classList.remove('hidden');
            } else {
              card.classList.add('hidden');
            }
          });
        });
      });
    });

    return container;
  }

  // 2. SINGLE GALLERY VIEW
  const portfolio = publicPortfolios.find(p => p.id === galleryId);

  if (!portfolio) {
    container.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; text-align:center">
         <div style="font-size: 4rem; margin-bottom: 1rem">🍂</div>
         <h1 style="font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 0.5rem">Bộ sưu tập không tồn tại hoặc đã bị ẩn</h1>
         <p style="color: #9ca3af; font-size: 0.9rem">Rất tiếc, đường link này không còn khả dụng.</p>
      </div>
    `;
    return container;
  }

  // Helper Extract Youtube ID to embed
  let embedUrl = '';
  if (portfolio.videoLink && (portfolio.videoLink.includes('youtube.com') || portfolio.videoLink.includes('youtu.be'))) {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = portfolio.videoLink.match(regExp);
    if (match && match[2].length === 11) {
      embedUrl = `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=0&controls=1&rel=0`;
    }
  }

  const otherPortfolios = (state.portfolios || []).filter(p => p.id !== galleryId && p.isVisible).slice(0, 4);

  container.innerHTML = `
    <!-- Header -->
    <header style="position: absolute; top:0; left:0; right:0; padding: 1.5rem 2rem; z-index: 10; display: flex; justify-content: space-between; align-items: center; background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)">
       <div style="font-size: 1.25rem; font-weight: 900; letter-spacing: 2px; color: #fff;">HARU<span style="color:var(--primary)">STUDIO</span></div>
       <div style="font-size: 0.85rem; font-weight: 700; color: rgba(255,255,255,0.7)">Portfolio / Khách hàng</div>
    </header>

    <!-- Main Hero Video / Cover -->
    <section style="position: relative; width: 100%; height: 60vh; max-height: 800px; min-height: 400px; background: #000; display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 2rem">
      ${embedUrl ? `
         <iframe src="${embedUrl}" style="position: absolute; top:0; left:0; width:100%; height:100%; border:none; opacity: 0.85; pointer-events: auto" allow="autoplay; fullscreen"></iframe>
         <div style="position: absolute; inset:0; background: linear-gradient(to top, #0a0a0a 0%, transparent 40%); pointer-events: none"></div>
      ` : `
         <div style="position: absolute; top:0; left:0; width:100%; height:100%; background: url('${portfolio.thumbnail}') center/cover no-repeat; opacity: 0.6"></div>
         <div style="position: absolute; inset:0; background: linear-gradient(to top, #0a0a0a 0%, transparent 60%)"></div>
      `}
      
      <div style="position: relative; z-index: 10; padding: 0 2rem; max-width: 1200px; margin: 0 auto; width: 100%">
         <span style="display:inline-block; font-size: 0.75rem; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: var(--primary); margin-bottom: 0.5rem">${portfolio.category}</span>
         <h1 style="font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800; color: #fff; margin-bottom: 0.5rem; line-height: 1.1; text-shadow: 0 2px 10px rgba(0,0,0,0.5)">${portfolio.jobName}</h1>
         <div style="font-size: 0.9rem; color: #d1d5db; font-weight: 700"><i class="far fa-calendar-alt" style="margin-right:0.4rem"></i>${new Date(portfolio.date).toLocaleDateString('vi-VN')}</div>
      </div>
    </section>

    <!-- Details actions -->
    <section style="max-width: 1200px; margin: 0 auto; padding: 2rem; position: relative; z-index: 20">
      ${portfolio.description ? `<p style="font-size: 1rem; color: #e5e7eb; line-height: 1.6; max-width: 800px; margin-bottom: 2rem; font-style: italic">"${portfolio.description}"</p>` : ''}
      
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem">
         ${portfolio.photoLink ? `
           <a href="${portfolio.photoLink}" target="_blank" style="text-decoration: none; padding: 0.8rem 1.5rem; background: #fff; color: #000; border-radius: 8px; font-weight: 800; font-size: 0.9rem; transition: all 0.2s; box-shadow: 0 4px 15px rgba(255,255,255,0.1)">
             <i class="fas fa-image" style="margin-right: 0.5rem"></i> Xem Toàn Bộ Ảnh Nhỏ/Gốc (Drive)
           </a>
         ` : ''}
         ${portfolio.videoLink && embedUrl === '' ? `
           <a href="${portfolio.videoLink}" target="_blank" style="text-decoration: none; padding: 0.8rem 1.5rem; background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; font-weight: 800; font-size: 0.9rem; transition: all 0.2s">
             <i class="fab fa-youtube" style="margin-right: 0.5rem; color: #ef4444"></i> Xem Video YouTube
           </a>
         ` : ''}
      </div>

      <!-- Masonry Grid for uploaded Images -->
      ${portfolio.images && portfolio.images.length > 0 ? `
         <style>
            .portfolio-masonry {
               column-count: 1;
               column-gap: 1.5rem;
               margin-top: 2rem;
            }
            @media (min-width: 640px) { .portfolio-masonry { column-count: 2; } }
            @media (min-width: 1024px) { .portfolio-masonry { column-count: 3; } }
            .portfolio-masonry-item {
               break-inside: avoid;
               margin-bottom: 1.5rem;
               border-radius: 12px;
               overflow: hidden;
               cursor: pointer;
               position: relative;
               transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .portfolio-masonry-item img {
               width: 100%;
               height: auto;
               display: block;
               transition: transform 0.5s ease;
            }
            .portfolio-masonry-item:hover {
               transform: translateY(-5px);
               box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
            }
            .portfolio-masonry-item:hover img {
               transform: scale(1.03);
            }
            .portfolio-masonry-item::after {
               content: '';
               position: absolute;
               inset: 0;
               background: rgba(0,0,0,0.1);
               opacity: 0;
               transition: opacity 0.3s;
            }
            .portfolio-masonry-item:hover::after {
               opacity: 1;
            }
         </style>
         
         <div class="portfolio-masonry">
            ${portfolio.images.map((imgUrl, idx) => `
               <div class="portfolio-masonry-item" onclick="window._openLightbox(${idx})">
                  <img src="${imgUrl}" loading="lazy" alt="Gallery Photo ${idx + 1}">
               </div>
            `).join('')}
         </div>
      ` : ''}

      <!-- Explore More -->
      ${otherPortfolios.length > 0 ? `
        <div style="margin-top: 5rem; padding-top: 3rem; border-top: 1px solid rgba(255,255,255,0.1)">
          <h3 style="font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 1.5rem">Khám Phá Thêm</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1.5rem">
            ${otherPortfolios.map(p => `
              <a href="?gallery=${p.id}" style="text-decoration:none; display:block; background: #111; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); transition: transform 0.2s">
                 <div style="width:100%; height:160px; background: url('${p.thumbnail || ''}') center/cover no-repeat; background-color: #222"></div>
                 <div style="padding: 1rem">
                    <div style="font-size: 0.65rem; color: var(--primary); font-weight: 800; text-transform: uppercase">${p.category}</div>
                    <div style="font-size: 0.9rem; font-weight: 800; color: #fff; margin-top: 0.3rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">${p.jobName}</div>
                 </div>
              </a>
            `).join('')}
          </div>
        </div>
      ` : ''}
      
      <footer style="margin-top: 5rem; text-align: center; color: rgba(255,255,255,0.3); font-size: 0.75rem">
         &copy; ${new Date().getFullYear()} Haru Studio. All rights reserved.
      </footer>
    </section>
  `;

  return container;
}

// ============================================================
// PHASE 6: HARU GALLERY (Admin Side)
// ============================================================
export function renderPortfolioAdmin(state) {
  const container = document.createElement('div');
  container.className = 'container';

  // Make sure state.portfolios is an array
  if (!state.portfolios) state.portfolios = [];

  const toPortfolioTime = (p) => {
    const byDate = Date.parse(p?.date || '');
    if (!Number.isNaN(byDate) && byDate > 0) return byDate;
    const byId = Number(String(p?.id || '').replace('PF-', ''));
    if (!Number.isNaN(byId) && byId > 0) return byId;
    return 0;
  };
  const sortedPortfolios = [...state.portfolios].sort((a, b) => toPortfolioTime(b) - toPortfolioTime(a));

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem">
      <h2 style="font-size: 1.5rem; font-weight: 800; display:flex; align-items:center; gap:0.5rem">
        <span style="font-size:2rem">🖼️</span> Quản lý Portfolio
      </h2>
      <div style="display: flex; gap: 1rem">
        <button class="btn" onclick="navigator.clipboard.writeText(window.location.origin + '?hub=haru').then(() => alert('Đã copy link trang Portfolio tĩnh!'))" style="background:var(--bg-body); border:1px solid var(--border); box-shadow: 0 1px 2px rgba(0,0,0,0.05); font-weight:600">
           <i class="fas fa-link" style="color:var(--primary); margin-right: 0.4rem;"></i> Copy Link Hub Khách
        </button>
        <button class="btn" onclick="window.migrateLocalToFirebase && window.migrateLocalToFirebase()" style="background:linear-gradient(135deg,#f97316,#ea580c);color:#fff;border:none;font-weight:700;box-shadow:0 4px 12px rgba(249,115,22,0.3)" title="Đẩy toàn bộ album từ máy này lên Firebase để tất cả thiết bị thấy">
           🚀 Migrate Local → Firebase
        </button>

        <button class="btn btn-primary" onclick="window._openPortfolioModal()" style="box-shadow: 0 4px 6px -1px rgba(22, 163, 74, 0.2); font-weight:600">+ Tạo Bộ sưu tập mới</button>
      </div>
    </div>

    <div style="background: var(--bg-card); border-radius: 12px; border: 1px solid var(--border); overflow: hidden">
      <div style="display: grid; grid-template-columns: 80px 1.5fr 1fr 1fr 100px; padding: 1rem; border-bottom: 1px solid var(--border); font-weight: 800; color: var(--text-dim); font-size: 0.85rem">
        <div>Ảnh bìa</div>
        <div>Tên bộ sưu tập</div>
        <div>Phân loại</div>
        <div>Ngày đăng</div>
        <div style="text-align: right">Thao tác</div>
      </div>
      <div>
        ${sortedPortfolios.length === 0 ? '<div style="padding: 2rem; text-align: center; color: var(--text-dim)">Chưa có bộ sưu tập nào. Nhấn "+ Tạo mới" để bắt đầu!</div>' : sortedPortfolios.map(p => `
          <div style="display: grid; grid-template-columns: 80px 1.5fr 1fr 1fr 100px; padding: 1rem; border-bottom: 1px solid var(--border); align-items: center; transition: background 0.2s">
            <div style="width: 60px; height: 60px; border-radius: 8px; background: url('${p.thumbnail || ''}') center/cover; background-color: var(--border)"></div>
            <div>
              <div style="font-weight: 800; color: var(--text-main); font-size: 1rem; margin-bottom: 0.2rem">
                ${p.jobName} 
                ${p.isVisible ? '<span style="font-size:0.6rem; padding: 0.15rem 0.4rem; background: rgba(22,163,74,0.1); color: var(--success); border-radius: 4px; vertical-align: middle; margin-left: 0.5rem">Công khai</span>' : '<span style="font-size:0.6rem; padding: 0.15rem 0.4rem; background: rgba(239,68,68,0.1); color: var(--danger); border-radius: 4px; vertical-align: middle; margin-left: 0.5rem">Đã ẩn</span>'}
              </div>
              <div style="font-size: 0.8rem; color: var(--text-dim)">
                ${p.images?.length || 0} ảnh • Link: <a href="?gallery=${p.id}" target="_blank" style="color:var(--primary)">/?gallery=${p.id}</a>
              </div>
            </div>
            <div style="font-size: 0.9rem; font-weight: 700; color: var(--text-main)"><span style="display:inline-block; padding: 0.3rem 0.6rem; background: var(--bg-body); border-radius: 6px">${p.category || 'Khác'}</span></div>
            <div style="font-size: 0.9rem; color: var(--text-dim)">${p.date ? new Date(p.date).toLocaleDateString('vi-VN') : '-'}</div>
            <div style="display: flex; gap: 0.5rem; justify-content: flex-end">
              <button onclick="window._openPortfolioModal('${p.id}')" style="width: 36px; height: 36px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-body); color: var(--primary); cursor: pointer; display:flex; align-items:center; justify-content:center" title="Chỉnh sửa"><i class="fas fa-edit"></i></button>
              <button onclick="window._deletePortfolio('${p.id}')" style="width: 36px; height: 36px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg-body); color: var(--danger); cursor: pointer; display:flex; align-items:center; justify-content:center" title="Xóa"><i class="fas fa-trash"></i></button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  return container;
}
