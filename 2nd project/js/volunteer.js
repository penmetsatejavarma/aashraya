/* ============================================================
   Volunteer Panel – JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
  initVolunteerPanel();
});

function initVolunteerPanel() {
  renderResponseHistory();
  initAvailabilityToggle();
  initAlertCard();
  animateVolunteerStats();
}

/* ---------- Availability Toggle ---------- */
function initAvailabilityToggle() {
  const toggle = document.getElementById('availabilityToggle');
  const statusText = document.getElementById('availStatus');

  if (toggle) {
    toggle.checked = true;
    toggle.addEventListener('change', function() {
      if (this.checked) {
        statusText.textContent = 'Available';
        statusText.style.color = 'var(--accent)';
        showToast('You are now available for emergency responses', 'success');
      } else {
        statusText.textContent = 'Offline';
        statusText.style.color = 'var(--text-secondary)';
        showToast('You are now offline', 'info');
      }
    });
  }
}

/* ---------- Alert Card ---------- */
function initAlertCard() {
  const acceptBtn = document.getElementById('acceptAlert');
  const declineBtn = document.getElementById('declineAlert');
  const alertCard = document.getElementById('incomingAlert');
  const responseView = document.getElementById('responseView');

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function() {
      alertCard.style.display = 'none';
      responseView.style.display = 'block';
      responseView.style.animation = 'fadeInUp 0.4s ease';
      showToast('✅ Alert accepted! Heading to the senior.', 'success');
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', function() {
      alertCard.style.animation = 'fadeOut 0.3s ease forwards';
      setTimeout(() => {
        alertCard.innerHTML = `
          <div style="text-align:center;padding:40px 20px;">
            <i class="fas fa-circle-check" style="font-size:3rem;color:var(--accent);margin-bottom:16px;display:block;"></i>
            <h3 style="margin-bottom:8px;">No Active Alerts</h3>
            <p style="color:var(--text-secondary);">You'll be notified when there's an emergency nearby.</p>
          </div>
        `;
        alertCard.style.animation = 'fadeIn 0.3s ease';
      }, 300);
      showToast('Alert declined. It has been forwarded to other volunteers.', 'info');
    });
  }
}

/* ---------- Response History ---------- */
function renderResponseHistory() {
  const list = document.getElementById('responseHistoryList');
  if (!list) return;

  volunteerHistory.forEach(item => {
    const stars = '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating);
    list.innerHTML += `
      <div style="display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid var(--border);">
        <div style="width:44px;height:44px;border-radius:12px;background:#E3F2FD;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-hands-helping" style="color:var(--secondary);"></i>
        </div>
        <div style="flex:1;">
          <div style="font-weight:600;font-size:0.9rem;">${item.senior}</div>
          <div style="font-size:0.78rem;color:var(--text-secondary);">${item.date} • Response: ${item.responseTime}</div>
        </div>
        <div style="text-align:right;">
          <div style="color:var(--warning);font-size:0.85rem;">${stars}</div>
          <span class="badge badge-green">${item.outcome}</span>
        </div>
      </div>
    `;
  });
}

/* ---------- Animate Stats ---------- */
function animateVolunteerStats() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    animateCountUp(el, target, 1000);
  });
}
