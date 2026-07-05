/* ============================================================
   Senior Page – JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
  renderMedicineReminders();
  setupSOS();
  setupQuickActions();
  updateCheckinTime();
});

/* ---------- SOS Button ---------- */
function setupSOS() {
  const sosBtn = document.getElementById('sosButton');
  let holdTimer;

  sosBtn.addEventListener('mousedown', function() {
    holdTimer = setTimeout(() => {
      triggerSOS();
    }, 1000);
  });

  sosBtn.addEventListener('mouseup', function() {
    clearTimeout(holdTimer);
  });

  sosBtn.addEventListener('touchstart', function(e) {
    e.preventDefault();
    holdTimer = setTimeout(() => {
      triggerSOS();
    }, 1000);
  });

  sosBtn.addEventListener('touchend', function() {
    clearTimeout(holdTimer);
  });

  sosBtn.addEventListener('click', function() {
    triggerSOS();
  });
}

function triggerSOS() {
  openModal('sosModal');
  // Simulate notification
  setTimeout(() => {
    showToast('Emergency contacts have been notified', 'error');
  }, 1000);
  setTimeout(() => {
    showToast('Nearest volunteer alerted – 0.8 km away', 'info');
  }, 2500);
}

/* ---------- Quick Actions ---------- */
function setupQuickActions() {
  // Check-in
  document.getElementById('checkinCard').addEventListener('click', function() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const text = `Today, ${timeStr}`;
    document.getElementById('lastCheckin').textContent = text;
    localStorage.setItem('lastCheckin', text);
    showToast("I'm Safe – Check-in recorded! ✅", 'success');
    this.style.animation = 'bounce 0.4s ease';
    setTimeout(() => { this.style.animation = ''; }, 400);
  });

  // Medicines modal
  document.getElementById('medicinesCard').addEventListener('click', function() {
    openModal('medicineModal');
  });

  // Hospitals modal
  document.getElementById('hospitalsCard').addEventListener('click', function() {
    openModal('hospitalModal');
  });

  // Health Card / QR modal
  document.getElementById('healthCard').addEventListener('click', function() {
    openModal('qrModal');
    generateQR();
  });
}

/* ---------- Medicine Reminders ---------- */
function renderMedicineReminders() {
  const list = document.getElementById('medicineList');
  list.innerHTML = '';

  medicines.forEach((med, index) => {
    const status = med.taken ? 'taken' : isMedicineTimePassed(med.time) ? 'missed' : 'upcoming';
    const storedStatus = localStorage.getItem(`med-${med.id}`);
    const isTaken = storedStatus === 'taken' || med.taken;
    const cls = isTaken ? 'taken' : status;

    const item = document.createElement('div');
    item.className = `medicine-item ${cls} fade-on-scroll`;
    item.id = `med-item-${med.id}`;
    item.innerHTML = `
      <div class="pill-icon"><i class="fas fa-pills"></i></div>
      <div class="medicine-info">
        <div class="medicine-name">${med.name}</div>
        <div class="medicine-time"><i class="far fa-clock"></i> ${med.time}</div>
      </div>
      <button class="mark-taken-btn" onclick="markAsTaken(${med.id})" ${isTaken ? 'disabled' : ''} data-translate="Mark as Taken">
        ${isTaken ? '✅ Taken' : 'Mark as Taken'}
      </button>
    `;
    list.appendChild(item);
  });

  // Refresh scroll animations
  initScrollAnimations();
}

function markAsTaken(medId) {
  localStorage.setItem(`med-${medId}`, 'taken');
  const item = document.getElementById(`med-item-${medId}`);
  item.className = 'medicine-item taken';
  item.querySelector('.mark-taken-btn').textContent = '✅ Taken';
  item.querySelector('.mark-taken-btn').disabled = true;
  item.querySelector('.medicine-name').style.textDecoration = 'line-through';
  showToast('Medicine marked as taken! 💊', 'success');

  // Update medicine count
  updateMedicineCount();
}

function isMedicineTimePassed(timeStr) {
  const now = new Date();
  const [time, period] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  const medTime = new Date();
  medTime.setHours(hours, minutes, 0, 0);
  return now > medTime;
}

function updateMedicineCount() {
  const remaining = medicines.filter(m => {
    const stored = localStorage.getItem(`med-${m.id}`);
    return stored !== 'taken' && !m.taken;
  }).length;
  document.getElementById('medCount').textContent = `${remaining} medicines remaining`;
}

function updateCheckinTime() {
  const stored = localStorage.getItem('lastCheckin');
  if (stored) {
    document.getElementById('lastCheckin').textContent = stored;
  }
}

/* ---------- QR Code ---------- */
function generateQR() {
  const qrContainer = document.getElementById('qrCodeContainer');
  if (qrContainer && qrContainer.children.length === 0) {
    const data = JSON.stringify({
      name: seniorData.name,
      bloodGroup: seniorData.bloodGroup,
      allergies: seniorData.allergies,
      emergency: seniorData.phone
    });
    if (typeof QRCode !== 'undefined') {
      new QRCode(qrContainer, {
        text: data,
        width: 200,
        height: 200,
        colorDark: '#212121',
        colorLight: '#ffffff'
      });
    }
  }
}
