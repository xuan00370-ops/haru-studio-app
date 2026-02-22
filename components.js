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
    { id: 'calendar', icon: '📅', label: 'Lịch' },
    { id: 'finance', icon: '📒', label: 'Giao dịch' },
    { id: 'jobs', icon: '📁', label: 'Lưu trữ' },
    { id: 'sync', icon: '⚙️', label: 'Hệ thống' }
  ];

  nav.innerHTML = items.map(item => `
    <div class="bottom-nav-item ${activePage === item.id ? 'active' : ''}" onclick="window.navigate('${item.id}')">
      <span class="icon">${item.icon}</span>
      <span>${item.label}</span>
    </div>
  `).join('');

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

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.5rem">
         <button class="btn btn-secondary btn-sm" onclick="window.saveMonthlyReport('${monthKey}')">💾 Lưu chi phí tháng</button>
         <button class="btn btn-primary btn-sm" onclick="window.viewPA3Report('${monthKey}')">📊 Xem PA3</button>
      </div>
    </div>

    <div class="job-grid" style="margin-top: 4rem">
      ${monthJobs.length > 0 ? monthJobs.map(job => renderJobCard(job)).join('') : '<div class="empty-state">Chưa có dự án nào được ghi nhận</div>'}
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
          <span style="font-size: 0.85rem; color: var(--text-dim)">${new Date(job.date).toLocaleDateString('vi-VN')}</span>
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
    <p style="color: var(--text-dim); margin-bottom: 3rem;">Lọc theo tháng: ${state.currentMonth}/${state.currentYear}</p>
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
    <div class="job-grid" style="margin-top: 3rem">
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

// Global Help Scripts for UI Interaction
window.saveJobDetail = (jobId) => {
  const modal = document.querySelector('.modal-container');
  if (!modal) return;

  const currentJob = window.state.jobs.find(j => j.id === jobId);
  if (!currentJob) return;

  const updatedData = {
    date: modal.querySelector('#edit-job-date')?.value,
    eventType: modal.querySelector('#edit-job-type')?.value,
    phone: modal.querySelector('#edit-job-phone')?.value,
    venue: modal.querySelector('#edit-job-venue')?.value,
    notes: modal.querySelector('#edit-job-notes')?.value,
    linkCustomer: modal.querySelector('#edit-job-link-customer')?.value || '',
    linkNAS: modal.querySelector('#edit-job-link-nas')?.value || '',
    linkDrive: modal.querySelector('#edit-job-link-drive')?.value || '',
    package: parseFloat(modal.querySelector('#edit-job-package')?.value) || 0,
    deposit: parseFloat(modal.querySelector('#edit-job-deposit')?.value) || 0,
    timeline: {
      le_sang: modal.querySelector('input[name="le_sang"]')?.checked,
      tiec_trua: modal.querySelector('input[name="tiec_trua"]')?.checked,
      tiec_toi: modal.querySelector('input[name="tiec_toi"]')?.checked,
      le: modal.querySelector('input[name="le_time"]')?.value,
      tiec: modal.querySelector('input[name="tiec_time_toi"]')?.value || modal.querySelector('input[name="tiec_time_trua"]')?.value
    },
    services: currentJob.services.map((s, i) => ({
      ...s,
      paid: modal.querySelectorAll('.service-paid-check')[i]?.checked
    }))
  };

  window.updateJob(jobId, updatedData);
  window.closeModal();
};

window.saveMonthlyMeta = (monthKey) => {
  const ads = 4500000;
  const office = 15000000;
  window.updateReportMeta(monthKey, ads, office);
};

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
