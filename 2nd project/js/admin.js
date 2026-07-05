/* ============================================================
   Admin Panel – JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
  initAdminPanel();
});

function initAdminPanel() {
  renderKPIStats();
  initAdminCharts();
  renderUserTable();
  renderVerificationQueue();
  animateAdminStats();
}

/* ---------- KPI Stats ---------- */
function renderKPIStats() {
  // Values set via data-count attributes in HTML
}

/* ---------- Admin Charts ---------- */
function initAdminCharts() {
  // SOS Frequency Line Chart
  createLineChart(
    'sosFreqChart',
    sosFrequencyData.labels,
    sosFrequencyData.data,
    'SOS Incidents',
    '#E53935'
  );

  // Risk Distribution Doughnut
  createDoughnutChart(
    'riskDistChart',
    ['Low Risk', 'Medium Risk', 'High Risk'],
    [riskDistribution.low, riskDistribution.medium, riskDistribution.high],
    ['#2E7D32', '#F57F17', '#E53935']
  );
}

/* ---------- User Management Table ---------- */
function renderUserTable(filter = '') {
  const tbody = document.getElementById('userTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  let filtered = adminUsers;
  if (filter) {
    filtered = adminUsers.filter(u =>
      u.name.toLowerCase().includes(filter.toLowerCase()) ||
      u.role.toLowerCase().includes(filter.toLowerCase()) ||
      u.phone.includes(filter)
    );
  }

  filtered.forEach((user, idx) => {
    const statusBadge = user.status === 'active'
      ? 'badge-green'
      : user.status === 'pending' ? 'badge-amber' : 'badge-red';

    tbody.innerHTML += `
      <tr>
        <td>
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:36px;height:36px;border-radius:50%;background:var(--secondary);color:white;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;">${user.name.split(' ').map(n => n[0]).join('')}</div>
            <span style="font-weight:600;">${user.name}</span>
          </div>
        </td>
        <td><span class="badge badge-blue">${user.role}</span></td>
        <td>${user.phone}</td>
        <td><span class="badge ${statusBadge}">${user.status}</span></td>
        <td>
          <label class="toggle-switch" style="display:inline-block;">
            <input type="checkbox" ${user.status === 'active' ? 'checked' : ''} onchange="toggleUserStatus(${idx}, this)">
            <span class="toggle-slider"></span>
          </label>
        </td>
      </tr>
    `;
  });
}

function toggleUserStatus(index, checkbox) {
  adminUsers[index].status = checkbox.checked ? 'active' : 'inactive';
  showToast(`User ${adminUsers[index].name} ${checkbox.checked ? 'activated' : 'deactivated'}`, checkbox.checked ? 'success' : 'warning');
}

/* ---------- Verification Queue ---------- */
function renderVerificationQueue() {
  const queue = document.getElementById('verifyQueue');
  if (!queue) return;

  const pending = volunteers.filter(v => !v.verified);
  if (pending.length === 0) {
    queue.innerHTML = '<p style="text-align:center;color:var(--text-secondary);padding:20px;">No pending verifications</p>';
    return;
  }

  queue.innerHTML = '';
  pending.forEach(vol => {
    queue.innerHTML += `
      <div class="verify-card mb-2" id="verify-${vol.id}">
        <div class="verify-avatar"><i class="fas fa-user"></i></div>
        <div class="verify-info">
          <h4>${vol.name}</h4>
          <p>${vol.phone} • ID: Aadhar Card</p>
        </div>
        <div class="verify-actions">
          <button class="btn btn-success btn-sm" onclick="approveVolunteer(${vol.id})"><i class="fas fa-check"></i> Approve</button>
          <button class="btn btn-sm" style="background:#FFEBEE;color:var(--primary);" onclick="rejectVolunteer(${vol.id})"><i class="fas fa-xmark"></i> Reject</button>
        </div>
      </div>
    `;
  });
}

function approveVolunteer(id) {
  const card = document.getElementById(`verify-${id}`);
  card.style.animation = 'fadeOut 0.3s ease forwards';
  setTimeout(() => card.remove(), 300);
  showToast('Volunteer approved! ✅', 'success');
}

function rejectVolunteer(id) {
  const card = document.getElementById(`verify-${id}`);
  card.style.animation = 'fadeOut 0.3s ease forwards';
  setTimeout(() => card.remove(), 300);
  showToast('Volunteer rejected', 'warning');
}

/* ---------- Search ---------- */
function initAdminSearch() {
  const searchInput = document.getElementById('adminSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      renderUserTable(this.value);
    });
  }
}

/* ---------- Animate Stats ---------- */
function animateAdminStats() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    animateCountUp(el, target, 1000);
  });
  initAdminSearch();
}
