/* ============================================================
   Caregiver Dashboard – JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
  initCaregiverDashboard();
});

function initCaregiverDashboard() {
  renderSeniorProfile();
  renderSOSHistory();
  initAdherenceChart();
  initRiskScore();
  initSOSToggle();
  animateStats();
}

/* ---------- Senior Profile ---------- */
function renderSeniorProfile() {
  document.getElementById('seniorName').textContent = seniorData.name;
  document.getElementById('seniorAge').textContent = `Age: ${seniorData.age}`;
  document.getElementById('seniorBlood').textContent = `Blood: ${seniorData.bloodGroup}`;
  document.getElementById('seniorAllergies').textContent = `Allergies: ${seniorData.allergies.join(', ')}`;
  document.getElementById('lastSeenLocation').textContent = `Last seen: Home, 10 minutes ago`;
}

/* ---------- SOS History Table ---------- */
function renderSOSHistory() {
  const tbody = document.getElementById('sosHistoryBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  sosHistory.forEach(sos => {
    const statusClass = sos.status === 'Resolved' ? 'badge-green' : 'badge-red';
    tbody.innerHTML += `
      <tr>
        <td>${sos.date}</td>
        <td>${sos.time}</td>
        <td>${sos.location}</td>
        <td><span class="badge ${statusClass}">${sos.status}</span></td>
        <td>${sos.resolvedBy || '–'}</td>
      </tr>
    `;
  });
}

/* ---------- Weekly Adherence Chart ---------- */
function initAdherenceChart() {
  const colors = weeklyAdherence.map(d => d.percentage >= 80 ? '#2E7D32' : '#E53935');
  createBarChart(
    'adherenceChart',
    weeklyAdherence.map(d => d.day),
    weeklyAdherence.map(d => d.percentage),
    'Medicine Adherence %',
    colors
  );
}

/* ---------- Risk Score ---------- */
function initRiskScore() {
  const scoreEl = document.getElementById('riskScoreValue');
  if (scoreEl) {
    animateCountUp(scoreEl, seniorData.riskScore, 1200);
  }

  // Circular progress
  const circle = document.getElementById('riskProgressCircle');
  if (circle) {
    const circumference = 2 * Math.PI * 58;
    circle.style.strokeDasharray = circumference;
    const offset = circumference - (seniorData.riskScore / 100) * circumference;
    setTimeout(() => {
      circle.style.strokeDashoffset = offset;
    }, 200);
  }

  // Sparkline
  createLineChart(
    'riskSparkline',
    riskTrendData.labels,
    riskTrendData.data,
    'Risk Score Trend',
    '#2E7D32'
  );
}

/* ---------- SOS Toggle Simulation ---------- */
function initSOSToggle() {
  const toggle = document.getElementById('sosSimToggle');
  const alertBanner = document.getElementById('sosAlertBanner');
  const mapPin = document.getElementById('mapPin');
  const locationDot = document.getElementById('locationDot');
  const hospitalPanel = document.getElementById('nearbyHospitals');

  if (!toggle) return;

  toggle.addEventListener('change', function() {
    if (this.checked) {
      // Activate SOS
      alertBanner.classList.remove('hidden');
      mapPin.classList.add('sos-active');
      locationDot.classList.add('sos');
      hospitalPanel.style.display = 'block';
      showToast('⚠️ EMERGENCY ALERT – Ramaiah needs help!', 'error');
      setTimeout(() => {
        showToast('SMS & Email notifications sent to emergency contacts', 'info');
      }, 1500);
    } else {
      // Deactivate SOS
      alertBanner.classList.add('hidden');
      mapPin.classList.remove('sos-active');
      locationDot.classList.remove('sos');
      hospitalPanel.style.display = 'none';
      showToast('SOS Alert resolved', 'success');
    }
  });
}

/* ---------- Animate Stat Numbers ---------- */
function animateStats() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    animateCountUp(el, target, 1000);
  });
}
