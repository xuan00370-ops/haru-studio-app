import { normalizeServiceName, calculateDeadlines, formatCurrency, generateId } from './logic.js';

export function renderSidebar(activePage, navigate) {
  const aside = document.createElement('aside');
  aside.className = 'sidebar';
  aside.innerHTML = `
    <div class="sidebar-brand">HARU STUDIO</div>
    <nav class="sidebar-nav">
      <div style="font-size: 0.82rem; font-weight: 800; color: var(--text-dim); margin: 1rem 0 0.5rem 0.75rem; text-transform: uppercase;">Điều hành</div>
      <div class="nav-item ${activePage === 'dashboard' ? 'active' : ''}" onclick="window.navigate('dashboard')">
        <span class="icon">📊</span> Dự án
      </div>
      <div class="nav-item ${activePage === 'edit' ? 'active' : ''}" onclick="window.navigate('edit')">
        <span class="icon">🎬</span> Deadline EDIT
      </div>
      <div class="nav-item ${activePage === 'edit_video' ? 'active' : ''}" onclick="window.navigate('edit_video')">
        <span class="icon">🎞️</span> Edit Video
      </div>
      <div class="nav-item ${activePage === 'calendar' ? 'active' : ''}" onclick="window.navigate('calendar')">
        <span class="icon">📅</span> Lịch / Nhắc việc
      </div>

      <div style="font-size: 0.82rem; font-weight: 800; color: var(--text-dim); margin: 1.5rem 0 0.5rem 0.75rem; text-transform: uppercase;">Quản lý</div>
      <div class="nav-item ${activePage === 'jobs' ? 'active' : ''}" onclick="window.navigate('jobs')">
        <span class="icon">📁</span> Lưu trữ dự án
      </div>
      <div class="nav-item ${activePage === 'clients' ? 'active' : ''}" onclick="window.navigate('clients')">
        <span class="icon">🧑‍🤝‍🧑</span> Khách hàng
      </div>
      <div class="nav-item ${activePage === 'finance' ? 'active' : ''}" onclick="window.navigate('finance')">
        <span class="icon">📒</span> Giao dịch
      </div>
      <div class="nav-item ${activePage === 'tax' ? 'active' : ''}" onclick="window.navigate('tax')">
        <span class="icon">🏦</span> Thuế
      </div>
      <div class="nav-item ${activePage === 'staff' ? 'active' : ''}" onclick="window.navigate('staff')">
        <span class="icon">🎭</span> Nhân sự
      </div>

      <div style="font-size: 0.82rem; font-weight: 800; color: var(--text-dim); margin: 1.5rem 0 0.5rem 0.75rem; text-transform: uppercase;">Hệ thống</div>
      <div class="nav-item ${activePage === 'sync' ? 'active' : ''}" onclick="window.navigate('sync')">
        <span class="icon">🔄</span> Sync dữ liệu
      </div>
      <div class="nav-item ${activePage === 'nas' ? 'active' : ''}" onclick="window.navigate('nas')">
        <span class="icon">☁️</span> NAS / Drive
      </div>
      <div class="nav-item ${activePage === 'history' ? 'active' : ''}" onclick="window.navigate('history')">
        <span class="icon">📜</span> Lịch sử
      </div>
      <div class="nav-item ${activePage === 'trash' ? 'active' : ''}" onclick="window.navigate('trash')">
        <span class="icon">🗑️</span> Thùng rác
      </div>
      <div class="nav-item ${activePage === 'settings' ? 'active' : ''}" onclick="window.navigate('settings')">
        <span class="icon">⚙️</span> Cài đặt
      </div>

      <div style="margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--border)">
        <div class="nav-item" onclick="window.toggleTheme();window.updateUI()" style="cursor:pointer">
          <span class="icon">${document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙'}</span> ${document.documentElement.getAttribute('data-theme') === 'dark' ? 'Sáng' : 'Tối'}
        </div>
        <div class="nav-item" onclick="window.logout()" style="color: #ef4444">
          <span class="icon">🚪</span> Đăng xuất
        </div>
      </div>
    </nav>
  `;
  return aside;
}

export function renderBottomNav(activePage, navigate) {
  const nav = document.createElement('nav');
  nav.className = 'bottom-nav';

  // Chỉ hiện các nút quan trọng nhất cho Mobile
  const items = [
    { id: 'dashboard', icon: '📊', label: 'Dự án' },
    { id: 'edit_video', icon: '🎞️', label: 'Edit' },
    { id: 'calendar', icon: '📅', label: 'Lịch' },
    { id: 'finance', icon: '📒', label: 'Tiền' },
    { id: 'jobs', icon: '📁', label: 'Lưu trữ' }
  ];

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
    </div>
  `;

  picker.querySelector('#month-select').onchange = (e) => {
    updateMonth(parseInt(e.target.value), state.currentYear);
  };

  picker.querySelector('#prev-year').onclick = () => updateMonth(state.currentMonth, state.currentYear - 1);
  picker.querySelector('#next-year').onclick = () => updateMonth(state.currentMonth, state.currentYear + 1);

  return picker;
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
  if (state.staffFilter && state.staffFilter !== 'TẤT CẢ') {
    monthJobs = monthJobs.filter(j => j.services.some(s => s.staff === state.staffFilter));
  }
  if (state.statusFilter && state.statusFilter !== 'TẤT CẢ') {
    monthJobs = monthJobs.filter(j => j.status === state.statusFilter);
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
  const staffCosts = monthJobs.reduce((sum, j) => sum + j.services.reduce((s, ser) => s + ser.cost, 0), 0);
  const editCosts = monthJobs.reduce((sum, j) => sum + j.services.reduce((s, ser) => s + (ser.edit || 0), 0), 0);

  const totalCost = staffCosts + editCosts + (meta.ads || 0) + (meta.office || 0);
  const netProfit = revenue - totalCost;

  // Unique statuses for dropdown
  const allStatuses = [...new Set(state.jobs.map(j => j.status))].sort();

  container.innerHTML = `
    <header class="section-header">
      <div>
        <h1 class="view-title">Danh sách Dự án</h1>
        <p style="color: var(--text-dim); font-size: 0.9rem;">Quản lý tiến độ, tổng kết và tình trạng dự án của bạn</p>
      </div>
      <div style="display: flex; gap: 0.75rem; align-items: center">
         <input type="text" placeholder="Tìm theo tên job, ghi chú…" value="${state.searchQuery || ''}"
           onchange="window.setSearchQuery(this.value)"
           style="background: #fff; border: 1.5px solid var(--border); color: var(--text-main); padding: 0.4rem 0.75rem; border-radius: 8px; font-size: 0.85rem; width: 200px">
         <select onchange="window.setStatusFilter(this.value)"
           style="background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: var(--text-main); background: #fff; padding: 0.4rem 0.5rem; border-radius: 6px; font-size: 0.7rem">
           <option value="TẤT CẢ" ${state.statusFilter === 'TẤT CẢ' ? 'selected' : ''}>Tất cả trạng thái</option>
           ${allStatuses.map(s => `<option value="${s}" ${state.statusFilter === s ? 'selected' : ''}>${s}</option>`).join('')}
         </select>
         <button class="btn btn-secondary btn-sm" onclick="window.runSync()"><i class="fas fa-sync"></i> Quét NAS</button>
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
      const totalEarnings = monthJobs.reduce((sum, j) => sum + j.services.filter(s => s.staff && s.staff.includes(sName)).reduce((s, ser) => s + ser.cost, 0), 0);
      const paidEarnings = monthJobs.reduce((sum, j) => sum + j.services.filter(s => s.staff && s.staff.includes(sName) && s.paid).reduce((s, ser) => s + ser.cost, 0), 0);
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

    <div class="monthly-report glass-panel" style="margin-top: 1rem; padding: 1rem; border: 1px solid var(--border-bright)">
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 2rem">
        <div style="display: flex; gap: 1.5rem">
          <div class="stat-card">
            <span class="label" style="font-size: 0.55rem">Tổng Dự án</span>
            <div class="value" style="font-size: 0.95rem; font-weight: 800">${monthJobs.length}</div>
          </div>
          <div class="stat-row" style="display: flex; flex-wrap: wrap; gap: 1rem; border-left: 2px solid var(--border); padding-left: 1rem; margin-top: 1rem">
            <div class="stat-card" style="min-width: 120px">
              <span class="label" style="font-size: 0.6rem; text-transform: uppercase;">Doanh thu</span>
              <div class="value" style="font-size: 1rem; font-weight: 800">${formatCurrency(revenue)}</div>
            </div>
            <div class="stat-card" style="min-width: 120px">
              <span class="label" style="font-size: 0.6rem; text-transform: uppercase;">Nhân sự/Edit</span>
              <div class="value" style="font-size: 1rem; font-weight: 800">${formatCurrency(staffCosts + editCosts)}</div>
            </div>
            <div class="stat-card" style="min-width: 120px">
              <span class="label" style="font-size: 0.6rem; text-transform: uppercase;">Ads/Office</span>
              <div class="value" style="font-size: 1rem; font-weight: 800">${formatCurrency((meta.ads || 0) + (meta.office || 0))}</div>
            </div>
            <div class="stat-card" style="min-width: 120px">
              <span class="label" style="font-size: 0.6rem; text-transform: uppercase;">Lợi nhuận ròng</span>
              <div class="value" style="font-size: 1.25rem; font-weight: 900; color: ${netProfit >= 0 ? 'var(--success)' : 'var(--danger)'}">${formatCurrency(netProfit)}</div>
            </div>
          </div>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: stretch; margin-top: 1.5rem; background: rgba(0,0,0,0.03); padding: 0.75rem; border-radius: 8px">
           <div class="mini-form" style="display: flex; flex-wrap: wrap; gap: 0.75rem; flex-grow: 1; align-items: center;">
              <div style="display: flex; align-items: center; gap: 0.4rem; flex-grow: 1; min-width: 100px;">
                <span style="font-size: 0.82rem; color: var(--text-dim); font-weight: 600">Ads:</span>
                <input type="number" id="ads-input-${monthKey}" value="${meta.ads}" style="background: #fff; border: 1px solid var(--border); font-size: 0.85rem; width: 100%; color: var(--text-main); font-weight: 700; border-radius: 6px; padding: 0.35rem 0.5rem">
              </div>
              <div style="display: flex; align-items: center; gap: 0.4rem; flex-grow: 1; min-width: 100px;">
                <span style="font-size: 0.82rem; color: var(--text-dim); font-weight: 600">Off:</span>
                <input type="number" id="off-input-${monthKey}" value="${meta.office}" style="background: #fff; border: 1px solid var(--border); font-size: 0.85rem; width: 100%; color: var(--text-main); font-weight: 700; border-radius: 6px; padding: 0.35rem 0.5rem">
              </div>
           </div>
           <button class="btn btn-secondary btn-sm" style="font-size: 0.85rem; padding: 0.4rem 1rem; align-self: center;" onclick="window.saveMonthlyReport('${monthKey}')">💾 Lưu</button>
         </div>
      </div>
    </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1rem">
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

  const staffCosts = job.services.reduce((sum, s) => sum + s.cost, 0);
  const editCosts = job.services.reduce((sum, s) => sum + (s.edit || 0), 0);
  const profit = job.package - (staffCosts + editCosts);

  // High-Precision Metrics
  const photoCount = job.services.filter(s => s.service.toLowerCase().includes('chụp')).length;
  const videoCount = job.services.filter(s => s.service.toLowerCase().includes('quay')).length;

  return `
    <div class="job-card glass-panel" onclick="window.openModal('job_detail', '${job.id}')">
      <div class="job-card-header" style="margin-bottom: 0.5rem">
        <div style="display: flex; flex-direction: column; gap: 0.1rem">
          <h3 class="job-card-title" style="font-size: 1.08rem; color: var(--text-main)">${job.client}</h3>
          <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap">
            <span style="font-size: 0.85rem; color: var(--text-dim)">${new Date(job.date).toLocaleDateString('vi-VN')}</span>
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
           <div style="flex: 1">
              <label style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-dim); font-weight:700; display: block">Lễ Ceremony</label>
              <span style="font-size: 0.9rem; font-weight: 800; color: #f97316">${job.timeline?.le || '--:--'}</span>
           </div>
           <div style="flex: 1">
              <label style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-dim); font-weight:700; display: block">Tiệc Party</label>
              <span style="font-size: 0.9rem; font-weight: 800; color: #f97316">${job.timeline?.tiec || '--:--'}</span>
           </div>
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
         <div class="view-detail-link" style="font-size: 0.82rem; text-align: center; margin-top: 0.5rem; opacity: 0.7">Xem chi tiết &rarr;</div>
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
        </div>
      </div>
    </div>
  `;
}

export function renderModalOverlay(state, closeModal) {
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
  }

  overlay.appendChild(container);
  return overlay;
}

function renderJobDetailModal(state) {
  const job = state.jobs.find(j => j.id === state.modal.data);
  const container = document.createElement('div');
  if (!job) return container;

  const revenue = job.package || 0;
  const staffCosts = (job.services || []).reduce((sum, s) => sum + s.cost, 0);
  const editCosts = (job.services || []).reduce((sum, s) => sum + (s.edit || 0), 0);
  const profit = revenue - (staffCosts + editCosts);
  const depositRemaining = revenue - (job.deposit || 0);

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
      <button class="close-btn" onclick="window.closeModal()">&#x2715;</button>
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

          <!-- Row 3: venue + ghi chú -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.875rem">
            <div>
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Địa điểm / Venue</label>
              <textarea id="edit-job-venue" class="form-control" rows="2"
                style="font-size: 0.92rem; padding: 0.55rem 0.75rem; background: #fff; border: 1.5px solid var(--border); resize: vertical; color: var(--text-main)">${job.venue || ''}</textarea>
            </div>
            <div>
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.3rem">Ghi chú nội bộ</label>
              <textarea id="edit-job-notes" class="form-control" rows="2"
                style="font-size: 0.92rem; padding: 0.55rem 0.75rem; background: #fff; border: 1.5px solid var(--border); resize: vertical; color: var(--text-main)">${job.notes || ''}</textarea>
            </div>
          </div>

          <!-- Row 4: timeline -->
          <div>
            <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.5rem">⏰ Lịch trình</label>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem">
              ${[
      ['le_sang', 'Lễ sáng', job.timeline?.le_sang, 'le_time', job.timeline?.le || '05:00', '#f97316'],
      ['tiec_trua', 'Tiệc trưa', job.timeline?.tiec_trua, 'tiec_time_trua', job.timeline?.tiec_trua_time || '11:00', '#22c55e'],
      ['tiec_toi', 'Tiệc tối', job.timeline?.tiec_toi, 'tiec_time_toi', job.timeline?.tiec || '18:00', '#3b82f6']
    ].map(([name, label, checked, timeName, timeVal, color]) => `
                <div style="background: ${checked ? color + '0d' : '#fff'}; border: 1.5px solid ${checked ? color + '40' : 'var(--border)'}; border-radius: 10px; padding: 0.75rem">
                  <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; font-weight: 700; color: ${checked ? color : 'var(--text-dim)'}; margin-bottom: 0.5rem; cursor: pointer">
                    <input type="checkbox" name="${name}" ${checked ? 'checked' : ''}> ${label}
                  </label>
                  <input type="time" class="form-control" name="${timeName}" value="${timeVal}"
                    style="padding: 0.3rem 0.5rem; font-size: 0.92rem; font-weight: 700; background: #fff; border: 1px solid var(--border); color: ${color}">
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Row 5: Links -->
          <div>
            <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); display: block; margin-bottom: 0.5rem">🔗 Links</label>
            <div style="display: flex; flex-direction: column; gap: 0.5rem">
              <div style="display: flex; gap: 0.5rem; align-items: center">
                <span style="font-size: 0.78rem; font-weight: 700; color: var(--text-dim); width: 90px; flex-shrink: 0">Cho khách:</span>
                <input type="text" id="edit-job-link-customer" class="form-control" placeholder="Link ảnh/video gửi khách…" value="${job.linkCustomer || ''}"
                  style="flex: 1; font-size: 0.9rem; padding: 0.45rem 0.75rem; background: #fff; border: 1.5px solid var(--border); color: var(--text-main)">
                <button class="btn btn-secondary btn-sm" onclick="navigator.clipboard.writeText(document.getElementById('edit-job-link-customer').value)"><i class="fas fa-copy"></i></button>
                <button class="btn btn-secondary btn-sm" onclick="window.open(document.getElementById('edit-job-link-customer').value,'_blank')"><i class="fas fa-external-link-alt"></i></button>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem">
                <div style="display: flex; align-items: center; gap: 0.5rem">
                  <i class="fas fa-server" style="color: var(--accent-blue); width: 16px; font-size: 0.85rem; flex-shrink: 0"></i>
                  <input type="text" id="edit-job-link-nas" class="form-control" placeholder="/Volumes/NAS/…" value="${job.linkNAS || ''}"
                    style="font-size: 0.88rem; padding: 0.4rem 0.65rem; background: rgba(37,99,235,0.04); border: 1.5px solid rgba(37,99,235,0.18); color: var(--text-main)">
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem">
                  <i class="fab fa-google-drive" style="color: var(--accent-teal); width: 16px; font-size: 0.85rem; flex-shrink: 0"></i>
                  <input type="text" id="edit-job-link-drive" class="form-control" placeholder="https://drive.google.com/…" value="${job.linkDrive || ''}"
                    style="font-size: 0.88rem; padding: 0.4rem 0.65rem; background: rgba(13,148,136,0.04); border: 1.5px solid rgba(13,148,136,0.18); color: var(--text-main)">
                </div>
              </div>
            </div>
          </div>

          <!-- Row 6: Services table -->
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem">
              <label style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim)">👥 Nhân sự &amp; Hậu kỳ</label>
              <div style="display: flex; gap: 0.4rem">
                <button class="btn btn-secondary btn-sm" onclick="window.addServiceRowInModal()"><i class="fas fa-plus"></i> Thêm dòng</button>
                <button class="btn btn-secondary btn-sm" onclick="window.removeServiceRowInModal()"><i class="fas fa-minus"></i></button>
              </div>
            </div>
            <table class="data-table" id="services-table-edit">
              <thead>
                <tr>
                  <th>Vai trò</th>
                  <th>Nghệ sĩ</th>
                  <th style="text-align:right">Lương thợ</th>
                  <th style="text-align:right">Edit</th>
                  <th style="text-align:center">TT</th>
                </tr>
              </thead>
                <tbody>
                  ${job.services.map((s, idx) => `
                    <tr data-index="${idx}">
                      <td data-label="Vai trò" style="font-weight: 800; font-size: 0.9rem; color: var(--text-main)">${s.service}</td>
                      <td data-label="Nghệ sĩ" style="font-size: 0.92rem; font-weight: 600; color: var(--text-muted)">
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                          <span>${s.staff}</span>
                          ${s.staff && s.staff !== 'Chưa xếp' ? `<button class="btn btn-sm" style="padding: 0.15rem 0.4rem; font-size: 0.65rem; background: #0084ff; color: #fff; border-radius: 4px" onclick="window.sendZaloReminder('${job.id}', ${idx})" title="Gửi lịch Zalo"><i class="fas fa-paper-plane"></i> Zalo</button>` : ''}
                        </div>
                      </td>
                      <td data-label="Lương thợ" style="text-align:right; font-size: 0.92rem; font-weight: 700; color: var(--danger)">${formatCurrency(s.cost)}</td>
                      <td data-label="Tiền sửa bài" style="text-align:right; font-size: 0.92rem; color: var(--warning)">${formatCurrency(s.edit || 0)}</td>
                      <td data-label="Đã thu tiền" style="text-align:center"><input type="checkbox" class="service-paid-check" data-job-id="${job.id}" data-svc-idx="${idx}" ${s.paid ? 'checked' : ''}></td>
                    </tr>
                  `).join('')}
                </tbody>
            </table>
          </div>

        </div><!-- /left -->

        <!-- RIGHT COLUMN: sticky profit panel -->
        <div style="position: sticky; top: 0; display: flex; flex-direction: column; gap: 1rem">

          <!-- Profit card -->
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
            <div style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.75rem">💳 Thanh toán</div>
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

          <!-- Action buttons -->
          <div style="display: flex; flex-direction: column; gap: 0.6rem">
            <button class="btn btn-primary" style="width: 100%; font-size: 1rem; padding: 0.85rem" onclick="window.saveJobDetail('${job.id}')">
              <i class="fas fa-save"></i> Lưu thay đổi
            </button>
            <button class="btn btn-secondary" style="width: 100%; font-size: 0.9rem" onclick="window.deleteJob('${job.id}')">
              <i class="fas fa-trash"></i> Xóa dự án
            </button>
          </div>

        </div><!-- /right -->
      </div>
    </div>
  `;

  // Event delegation: .service-paid-check checkboxes
  container.addEventListener('change', function (ev) {
    var chk = ev.target;
    if (!chk.classList.contains('service-paid-check')) return;
    var jobId = chk.getAttribute('data-job-id');
    var svcIdx = parseInt(chk.getAttribute('data-svc-idx'), 10);
    if (!jobId || isNaN(svcIdx)) return;
    window.toggleServicePaid(jobId, svcIdx, chk.checked, chk);
  });

  return container;
}




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
                    <option>QUAY PS</option>
                    <option>CHỤP PS</option>
                    <option>QUAY TT</option>
                    <option>CHỤP TT</option>
                 </select>
                 <select class="form-control" name="service_staff[]">
                    <option value="">Chọn thợ...</option>
                    ${state.staff.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
                 </select>
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

        <div class="form-group" style="margin-bottom: 1rem">
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
                       <option>QUAY PS</option><option>CHỤP PS</option><option>QUAY TT</option><option>CHỤP TT</option>
                    </select>
                    <select class="form-control" name="service_staff_d2[]">
                       <option value="">Chọn thợ...</option>
                       ${state.staff.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
                    </select>
                    <input type="number" class="form-control" name="service_cost_d2[]" placeholder="Phí thợ">
                    <input type="number" class="form-control" name="service_edit_d2[]" placeholder="Edit">
                 </div>
              </div>
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
  const addRowBtn = container.querySelector('button[type="button"]');
  const rowContainer = container.querySelector('#service-rows-container');
  addRowBtn.onclick = () => {
    const newRow = document.createElement('div');
    newRow.className = 'service-entry-row';
    newRow.style = 'display: grid; grid-template-columns: 1.5fr 1fr 1fr 100px; gap: 0.5rem; margin-top: 0.5rem';
    newRow.innerHTML = `
        <select class="form-control" name="service_type[]">
          <option>QUAY PS</option><option>CHỤP PS</option><option>QUAY TT</option><option>CHỤP TT</option>
        </select>
        <select class="form-control" name="service_staff[]">
          <option value="">Chọn thợ...</option>
          ${state.staff.map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
        </select>
        <input type="number" class="form-control" name="service_cost[]" placeholder="Phí thợ">
        <input type="number" class="form-control" name="service_edit[]" placeholder="Edit">
      `;
    rowContainer.appendChild(newRow);
  };

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
      return (d.getMonth() + 1) === state.currentMonth && d.getFullYear() === state.currentYear && j.services.some(s => s.staff.includes(m.name));
    });
  });

  container.innerHTML = `
    <header class="section-header">
       <h1 class="view-title">👥 Đội Ngũ Nghệ Sĩ</h1>
       <button class="btn btn-primary btn-sm" onclick="document.getElementById('add-staff-form').style.display='flex'"><i class="fas fa-plus"></i> Thêm nhân sự</button>
    </header>

    <div style="display: flex; gap: 0.5rem; margin: 1rem 0 1.5rem">
       <button class="btn ${staffViewMode === 'all' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="window.state.staffViewMode='all'; window.updateUI && updateUI()">Tất cả (${state.staff.length})</button>
       <button class="btn ${staffViewMode === 'month' ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="window.state.staffViewMode='month'; window.updateUI && updateUI()">Tháng ${state.currentMonth} (${filteredStaff.length})</button>
    </div>

    <div id="add-staff-form" style="display: none; gap: 0.75rem; margin: 0 0 1.5rem; padding: 1.25rem; background: rgba(34,197,94,0.06); border: 1px solid rgba(34,197,94,0.2); border-radius: 12px; flex-wrap: wrap; align-items: flex-end">
       <div style="flex: 1; min-width: 150px">
          <label style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800; display: block; margin-bottom: 0.3rem">Tên</label>
          <input type="text" id="new-staff-name" class="form-control" placeholder="Nguyễn Văn A" style="font-size: 0.85rem; padding: 0.5rem">
       </div>
       <div style="flex: 0.7; min-width: 120px">
          <label style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800; display: block; margin-bottom: 0.3rem">Vai trò</label>
          <select id="new-staff-role" class="form-control" style="font-size: 0.85rem; padding: 0.5rem">
             <option>Quay phim</option><option>Chụp ảnh</option><option>Cinema</option><option>Editor</option><option>Trợ lý</option>
          </select>
       </div>
       <div style="flex: 0.7; min-width: 120px">
          <label style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800; display: block; margin-bottom: 0.3rem">SĐT (Zalo)</label>
          <input type="text" id="new-staff-phone" class="form-control" placeholder="09xxxxxxxx" style="font-size: 0.85rem; padding: 0.5rem">
       </div>
       <div style="display: flex; gap: 0.5rem">
          <button class="btn btn-primary btn-sm" onclick="window.addStaff({name:document.getElementById('new-staff-name').value,role:document.getElementById('new-staff-role').value,phone:document.getElementById('new-staff-phone').value,bank:{no:'',name:'',bank:''}})">Thêm</button>
          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('add-staff-form').style.display='none'">Hủy</button>
       </div>
    </div>

    <div class="staff-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.5rem">
      ${filteredStaff.map(member => {
    const memberJobs = state.jobs.filter(j => !j.isTrash && j.services.some(s => s.staff.includes(member.name)));
    const totalEarnings = memberJobs.reduce((sum, j) => sum + j.services.filter(s => s.staff.includes(member.name)).reduce((ss, s) => ss + (s.cost || 0), 0), 0);
    const paidEarnings = memberJobs.reduce((sum, j) => sum + j.services.filter(s => s.staff.includes(member.name) && s.paid).reduce((ss, s) => ss + (s.cost || 0), 0), 0);
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
               <div style="display: flex; gap: 0.3rem">
                  <button class="btn btn-secondary btn-sm" style="padding: 0.3rem 0.5rem; font-size: 0.65rem" onclick="window.showEditStaff('${escapedName}')" title="Sửa"><i class="fas fa-pen"></i></button>
                  <button class="btn btn-secondary btn-sm" style="padding: 0.3rem 0.5rem; font-size: 0.65rem; color: var(--danger)" onclick="if(confirm('Xóa nhân sự ${escapedName}?')) window.removeStaff('${escapedName}')" title="Xóa"><i class="fas fa-trash"></i></button>
               </div>
            </div>

            <div id="edit-form-${escapedName}" style="display: none; padding: 1rem; background: rgba(34,197,94,0.05); border: 1px solid rgba(34,197,94,0.15); border-radius: 10px">
               <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem">
                  <div><label style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">Tên</label><input class="form-control" id="edit-name-${escapedName}" value="${member.name}" style="font-size: 0.85rem; padding: 0.4rem"></div>
                  <div><label style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">Vai trò</label><select class="form-control" id="edit-role-${escapedName}" style="font-size: 0.85rem; padding: 0.4rem">
                     <option ${member.role === 'Quay phim' ? 'selected' : ''}>Quay phim</option><option ${member.role === 'Chụp ảnh' ? 'selected' : ''}>Chụp ảnh</option><option ${member.role === 'Cinema' ? 'selected' : ''}>Cinema</option><option ${member.role === 'Editor' ? 'selected' : ''}>Editor</option><option ${member.role === 'Trợ lý' ? 'selected' : ''}>Trợ lý</option>
                  </select></div>
               </div>
               <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem">
                  <div><label style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">SĐT (Zalo)</label><input class="form-control" id="edit-phone-${escapedName}" value="${member.phone || ''}" style="font-size: 0.85rem; padding: 0.4rem"></div>
                  <div><label style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">Số TK</label><input class="form-control" id="edit-bankno-${escapedName}" value="${member.bank?.no || ''}" style="font-size: 0.85rem; padding: 0.4rem"></div>
                  <div><label style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-dim); font-weight: 700">Ngân hàng</label><input class="form-control" id="edit-bankname-${escapedName}" value="${member.bank?.bank || ''}" style="font-size: 0.85rem; padding: 0.4rem"></div>
               </div>
               <div style="display: flex; gap: 0.5rem">
                  <button class="btn btn-primary btn-sm" onclick="window.saveStaffEdit('${escapedName}')">Lưu</button>
                  <button class="btn btn-secondary btn-sm" onclick="document.getElementById('edit-form-${escapedName}').style.display='none'">Hủy</button>
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
                  ${memberJobs.slice(0, 3).map(j => `<div style="display: flex; justify-content: space-between; font-size: 0.8rem; padding: 0.4rem 0.5rem; background: rgba(34,197,94,0.04); border-radius: 6px"><span>${j.client}</span><span style="font-weight: 700; color: var(--success)">+${formatCurrency(j.services.find(s => s.staff.includes(member.name))?.cost)}</span></div>`).join('') || '<div style="font-size: 0.8rem; color: var(--text-dim); text-align: center">Chưa có</div>'}
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
                   </td>
                   <td data-label="Trạng thái"><span style="font-size: 0.7rem; color: var(--text-dim)">${t.status}</span></td>
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
      ${upcomingJobs.length > 0 ? upcomingJobs.map(job => {
    const jobDate = new Date(job.date);
    const diffDays = Math.ceil((jobDate - today) / (1000 * 60 * 60 * 24));
    const u = getUrgency(diffDays);
    const staffList = job.services.map(s => s.staff).join(', ');
    return `
          <div class="glass-panel" style="padding: 1.25rem 1.5rem; border-left: 4px solid ${u.border}; background: ${u.bg}; position: relative; ${u.pulse}">
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
                   <div style="font-size: 2rem; font-weight: 900; color: ${u.color}; line-height: 1">${diffDays}</div>
                   <div style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700">ngày</div>
                </div>
             </div>
          </div>
        `;
  }).join('') : '<div class="empty-state" style="padding: 3rem; text-align: center; color: var(--text-dim)">🎉 Không có việc nào trong 30 ngày tới</div>'}
    </div>
`;
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

  // Thu thập tất cả video tasks
  const videoTasks = [];
  state.jobs.forEach(job => {
    if (job.isTrash) return;
    job.services.forEach((s, sIdx) => {
      const isVideo = s.service.toLowerCase().includes('quay');
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
      const editStatus = s.editStatus || 'Chưa bắt đầu';
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
        service: s.service,
        serviceIdx: sIdx,
        staff: s.staff,
        editStaff: s.editStaff || '',
        editCost: s.edit || 0,
        editStatus,
        editDriveLink: s.editDriveLink || '',
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
  const filtered = editFilter === 'TẤT CẢ' ? videoTasks : videoTasks.filter(t => t.editStaff === editFilter);

  // Thống kê
  const total = videoTasks.length;
  const done = videoTasks.filter(t => t.editStatus === 'Hoàn thành').length;
  const inProgress = videoTasks.filter(t => ['Đang cắt', 'Demo 1', 'Chỉnh sửa'].includes(t.editStatus)).length;
  const overdue = videoTasks.filter(t => t.stage === 'QUÁ HẠN').length;

  // Staff dropdown options
  const staffOptions = state.staff.map(s => `<option value="${s.name}">${s.name}</option>`).join('');

  container.innerHTML = `
    <header class="section-header">
       <div>
         <h1 class="view-title">🎬 Edit Video Tracker</h1>
         <p style="color: var(--text-dim); font-size: 0.85rem; margin-top: 0.2rem">Theo dõi tiến độ hậu kỳ video — Deadline ${EDIT_DAYS} ngày</p>
       </div>
    </header>

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
    <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 1.5rem">
       <button onclick="window.setEditVideoFilter('TẤT CẢ')" class="btn btn-sm" style="font-size: 0.78rem; padding: 0.25rem 0.7rem; border-radius: 20px; ${editFilter === 'TẤT CẢ' ? 'background: var(--primary); color: #fff; border: none' : 'background: #fff; color: var(--text-dim); border: 1px solid var(--border)'}">Tất cả (${total})</button>
       ${allEditors.map(name => `
         <button onclick="window.setEditVideoFilter('${name}')" class="btn btn-sm" style="font-size: 0.78rem; padding: 0.25rem 0.7rem; border-radius: 20px; ${editFilter === name ? 'background: var(--primary); color: #fff; border: none' : 'background: #fff; color: var(--text-dim); border: 1px solid var(--border)'}">${name}</button>
       `).join('')}
    </div>

    <!-- Video Cards Grid -->
    <div class="edit-video-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 1.25rem">
       ${filtered.length > 0 ? filtered.map(t => {
    const progressColor = t.editStatus === 'Hoàn thành' ? '#22c55e' : t.stageColor;
    const progressPct = t.editStatus === 'Hoàn thành' ? 100 : t.progress;

    // Workflow steps
    const steps = ['Chưa bắt đầu', 'Đang cắt', 'Demo 1', 'Chỉnh sửa', 'Hoàn thành'];
    const currentStep = steps.indexOf(t.editStatus);

    return `
         <div class="edit-video-card" style="background: ${t.stageBg}; border: 1.5px solid ${t.stageColor}30; border-radius: 16px; padding: 1.25rem; transition: all 0.2s; box-shadow: 0 2px 12px rgba(0,0,0,0.04)">
            <!-- Header -->
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem">
               <div style="display: flex; align-items: center; gap: 0.5rem">
                  <span style="font-size: 1.1rem">${t.stageIcon}</span>
                  <span style="font-size: 0.68rem; font-weight: 900; color: ${t.stageColor}; text-transform: uppercase; letter-spacing: 0.5px; background: ${t.stageColor}15; padding: 0.15rem 0.5rem; border-radius: 4px">${t.stage}</span>
                  <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-dim); background: rgba(0,0,0,0.04); padding: 0.15rem 0.5rem; border-radius: 4px">${t.service}</span>
               </div>
               <div style="text-align: right">
                  <span style="font-size: 0.62rem; font-weight: 800; color: var(--primary); background: var(--accent-soft); padding: 0.15rem 0.5rem; border-radius: 4px">#${t.jobNo || '—'}</span>
               </div>
            </div>

            <!-- Client name -->
            <div style="font-size: 1.1rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.6rem; line-height: 1.3">${t.client}</div>

            <!-- Progress bar -->
            <div style="margin-bottom: 0.75rem">
               <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem">
                  <span style="font-size: 0.72rem; font-weight: 700; color: var(--text-dim)">Tiến độ</span>
                  <span style="font-size: 0.78rem; font-weight: 800; color: ${progressColor}">
                     ${t.editStatus === 'Hoàn thành' ? '✅ Xong' : (t.daysLeft > 0 ? `Còn ${t.daysLeft} ngày` : `Trễ ${Math.abs(t.daysLeft)} ngày`)}
                  </span>
               </div>
               <div style="width: 100%; height: 6px; background: rgba(0,0,0,0.06); border-radius: 3px; overflow: hidden">
                  <div style="width: ${progressPct}%; height: 100%; background: ${progressColor}; border-radius: 3px; transition: width 0.3s"></div>
               </div>
            </div>

            <!-- Workflow steps mini -->
            <div style="display: flex; gap: 0.2rem; margin-bottom: 0.75rem">
               ${steps.map((step, idx) => {
      const isActive = idx === currentStep;
      const isDone = idx < currentStep;
      const dotColor = isDone ? '#22c55e' : isActive ? t.stageColor : 'rgba(0,0,0,0.1)';
      return `<div style="flex: 1; height: 3px; background: ${dotColor}; border-radius: 2px" title="${step}"></div>`;
    }).join('')}
            </div>

            <!-- Info grid -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin-bottom: 0.75rem">
               <div>
                  <label style="font-size: 0.62rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800; display: block; margin-bottom: 0.2rem">📷 Thợ quay</label>
                  <span style="font-size: 0.88rem; font-weight: 700; color: var(--text-main)">${t.staff}</span>
               </div>
               <div>
                  <label style="font-size: 0.62rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800; display: block; margin-bottom: 0.2rem">💰 Chi phí edit</label>
                  <span style="font-size: 0.88rem; font-weight: 800; color: var(--danger)">${formatCurrency(t.editCost)}</span>
               </div>
               <div>
                  <label style="font-size: 0.62rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800; display: block; margin-bottom: 0.2rem">📅 Ngày quay</label>
                  <span style="font-size: 0.82rem; font-weight: 600; color: var(--text-muted)">${new Date(t.jobDate).toLocaleDateString('vi-VN')}</span>
               </div>
               <div>
                  <label style="font-size: 0.62rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800; display: block; margin-bottom: 0.2rem">⏰ Deadline</label>
                  <span style="font-size: 0.82rem; font-weight: 800; font-family: monospace; color: ${t.stageColor}">${t.deadlineStr}</span>
               </div>
            </div>

            <!-- Controls -->
            <div style="display: flex; flex-direction: column; gap: 0.5rem; background: rgba(255,255,255,0.6); padding: 0.75rem; border-radius: 10px; border: 1px solid var(--border)">
               <!-- Editor dropdown -->
               <div style="display: flex; align-items: center; gap: 0.5rem">
                  <label style="font-size: 0.68rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800; white-space: nowrap; min-width: 65px">🎬 Editor</label>
                  <select class="form-control ev-editor-select" data-job-id="${t.jobId}" data-service="${t.service}"
                     style="flex: 1; font-size: 0.85rem; padding: 0.35rem 0.6rem; background: #fff; border: 1.5px solid var(--border); color: var(--text-main); font-weight: 700">
                     <option value="">— Chưa chọn —</option>
                     ${state.staff.map(s => `<option value="${s.name}" ${t.editStaff === s.name ? 'selected' : ''}>${s.name}</option>`).join('')}
                  </select>
               </div>

               <!-- Status dropdown -->
               <div style="display: flex; align-items: center; gap: 0.5rem">
                  <label style="font-size: 0.68rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800; white-space: nowrap; min-width: 65px">📊 Trạng thái</label>
                  <select class="form-control ev-status-select" data-job-id="${t.jobId}" data-service="${t.service}"
                     style="flex: 1; font-size: 0.85rem; padding: 0.35rem 0.6rem; background: #fff; border: 1.5px solid ${t.stageColor}40; color: ${t.stageColor}; font-weight: 800">
                     ${steps.map(step => `<option value="${step}" ${t.editStatus === step ? 'selected' : ''}>${step}</option>`).join('')}
                  </select>
               </div>

               <!-- Drive link -->
               <div style="display: flex; align-items: center; gap: 0.5rem">
                  <label style="font-size: 0.68rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800; white-space: nowrap; min-width: 65px">🔗 Drive</label>
                  <input type="text" class="form-control ev-drive-input" data-job-id="${t.jobId}" data-service="${t.service}"
                     placeholder="Link sản phẩm…" value="${t.editDriveLink}"
                     style="flex: 1; font-size: 0.82rem; padding: 0.35rem 0.6rem; background: #fff; border: 1.5px solid var(--border); color: var(--text-main)">
                  ${t.editDriveLink ? `<a href="${t.editDriveLink}" target="_blank" class="btn btn-sm" style="padding: 0.25rem 0.5rem; font-size: 0.7rem; background: #22c55e; color: #fff; border: none; white-space: nowrap; border-radius: 6px; text-decoration: none">Mở ↗</a>` : ''}
               </div>
            </div>
         </div>`;
  }).join('') : '<div class="empty-state">Không có video task nào trong tháng này</div>'}
    </div>
  `;

  // Event delegation
  container.addEventListener('change', function (ev) {
    const el = ev.target;
    if (el.classList.contains('ev-editor-select')) {
      window.updateVideoEditor(el.dataset.jobId, el.dataset.service, el.value);
    }
    if (el.classList.contains('ev-status-select')) {
      window.updateVideoEditStatus(el.dataset.jobId, el.dataset.service, el.value);
    }
  });

  container.addEventListener('blur', function (ev) {
    const el = ev.target;
    if (el.classList.contains('ev-drive-input')) {
      window.updateVideoEditLink(el.dataset.jobId, el.dataset.service, el.value);
    }
  }, true);

  return container;
}

export function renderSettings(state) {
  const container = document.createElement('div');
  container.className = 'view-container reveal';
  const totalJobs = state.jobs.filter(j => !j.isTrash).length;
  const totalStaff = state.staff.length;
  const totalRevenue = state.jobs.filter(j => !j.isTrash).reduce((s, j) => s + (j.package || 0), 0);
  container.innerHTML = `
  <h1 class="view-title" >⚙️ Cài đặt hệ thống</h1>
    <div style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 2rem">Quản lý cấu hình và thông tin studio</div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem">
       <div class="glass-panel" style="padding: 1.5rem">
          <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 1.25rem; color: #22c55e"><i class="fas fa-chart-bar" style="margin-right: 0.5rem"></i>Báo cáo hệ thống</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem">
             <div style="padding: 0.75rem; background: rgba(0,0,0,0.1); border-radius: 8px">
                <div style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700">Phiên bản</div>
                <div style="font-size: 1rem; font-weight: 800">v3.0.0-Premium</div>
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
             <div><label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.2rem">Tên Studio</label><input class="form-control" value="Haru Wedding Film" style="font-size: 0.9rem; padding: 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border)"></div>
             <div><label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.2rem">SĐT liên hệ</label><input class="form-control" value="0909 xxx xxx" style="font-size: 0.9rem; padding: 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border)"></div>
             <div><label style="font-size: 0.85rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.2rem">Địa chỉ</label><input class="form-control" value="TP. Hồ Chí Minh" style="font-size: 0.9rem; padding: 0.5rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border)"></div>
          </div>
       </div>
    </div>

    <div class="glass-panel" style="padding: 1.5rem; margin-bottom: 2rem">
       <h3 style="font-size: 1rem; font-weight: 800; margin-bottom: 0.5rem; color: #f59e0b"><i class="fas fa-cloud" style="margin-right: 0.5rem"></i>Cấu hình Đám Mây (Firebase)</h3>
       <p style="font-size: 0.8rem; color: var(--text-dim); margin-bottom: 1rem">Dán đoạn mã JSON Firebase Config để kết nối App với Realtime Database. <a href="#" style="color: var(--accent-blue)">Xem hướng dẫn</a></p>
       <textarea id="setting-firebase-config" class="form-control" placeholder='{\n  "apiKey": "...",\n  "authDomain": "...",\n  "databaseURL": "...",\n  "projectId": "...",\n  "storageBucket": "...",\n  "messagingSenderId": "...",\n  "appId": "..."\n}' style="width: 100%; height: 120px; font-family: monospace; font-size: 0.8rem; padding: 0.75rem; background: rgba(0,0,0,0.2); border: 1px solid var(--border); border-radius: 8px">${state.settings.firebaseConfig || ''}</textarea>
       <button class="btn btn-primary btn-sm" style="margin-top: 1rem" onclick="window.saveFirebaseConfig()">💾 Lưu Config & Nối mạng</button>
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

export function renderHistory(state) {
  const container = document.createElement('div');
  container.className = 'view-container reveal';

  const getIcon = (action) => {
    if (action.includes('Thêm') || action.includes('Tạo')) return { icon: 'fa-plus-circle', color: '#34d399' };
    if (action.includes('Sửa') || action.includes('Cập nhật') || action.includes('Lưu')) return { icon: 'fa-edit', color: '#60a5fa' };
    if (action.includes('Xóa') || action.includes('Xoá')) return { icon: 'fa-trash', color: '#f87171' };
    return { icon: 'fa-info-circle', color: '#22c55e' };
  };

  container.innerHTML = `
  <header class="section-header" >
       <h1 class="view-title">📋 Lịch sử hoạt động</h1>
       <span style="font-size: 0.85rem; color: var(--text-dim)">${state.history.length} hoạt động</span>
    </header>

  <div class="glass-panel" style="margin-top: 1.5rem; padding: 1.5rem">
    <div style="position: relative; padding-left: 2rem">
      <div style="position: absolute; left: 0.55rem; top: 0; bottom: 0; width: 2px; background: linear-gradient(180deg, #22c55e, rgba(34,197,94,0.1))"></div>
      ${state.history.slice().reverse().map(h => {
    const ic = getIcon(h.action);
    return `
            <div style="position: relative; margin-bottom: 1.25rem; padding-bottom: 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.04)">
               <div style="position: absolute; left: -1.55rem; top: 0.2rem; width: 12px; height: 12px; border-radius: 50%; background: ${ic.color}; box-shadow: 0 0 8px ${ic.color}40"></div>
               <div style="display: flex; justify-content: space-between; align-items: flex-start">
                  <div style="flex: 1">
                     <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem">
                        <i class="fas ${ic.icon}" style="font-size: 0.75rem; color: ${ic.color}"></i>
                        <span style="font-size: 0.9rem; font-weight: 700">${h.action}</span>
                     </div>
                     <div style="font-size: 0.75rem; color: var(--text-dim)"><i class="fas fa-user" style="margin-right: 0.3rem"></i>${h.user}</div>
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
    var label = (s.staff || '').split(' ')[0] + ' - ' + (s.service || '');
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

      <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #16a34a, #22c55e);
        border-radius: 14px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center;
        box-shadow: 0 8px 24px rgba(22,163,74,0.25)">
        <span style="color: #fff; font-size: 1.5rem; font-weight: 900">H</span>
      </div>

      <h1 style="font-size: 1.6rem; font-weight: 900; color: #0f1f0f; margin-bottom: 0.3rem; letter-spacing: -0.5px">HARU STUDIO</h1>
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

      <p style="font-size: 0.72rem; color: #6b8f6e; margin-top: 1.5rem">Haru Wedding Film © 2026</p>
    </div>
  `;

  setTimeout(() => {
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

      ${renderMonthSection(monthNames[pm - 1] + ' ' + py, gsM0)}
      ${renderMonthSection(monthNames[m1 - 1] + ' ' + y1, gsM1)}
      ${gs.length === 0 ? `<div style="text-align:center;padding:2.5rem;color:var(--text-dim);background:#fff;border-radius:14px;border:1.5px dashed var(--border)">Không có video nào trong giai đoạn này 🎬</div>` : ''}
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
  });
  container.addEventListener('blur', function (e) {
    const el = e.target;
    if (el.classList.contains('ep-drive-input')) window.updateVideoEditLink(el.dataset.jobId, el.dataset.service, el.value);
    if (el.classList.contains('ep-note-input')) window.updateEditorNote(el.dataset.jobId, el.dataset.service, el.value);
    if (el.classList.contains('ep-footage-input')) window.updateJobLink(el.dataset.jobId, 'linkFootage', el.value);
    if (el.classList.contains('ep-nas-input')) window.updateJobLink(el.dataset.jobId, 'linkNAS', el.value);
  }, true);

  return container;
}

