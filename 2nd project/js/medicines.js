/* ============================================================
   Medicine Management – JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
  renderMedicineList();
  renderAdherenceCalendar();
  initMedicineForm();
});

/* ---------- Medicine Form ---------- */
function initMedicineForm() {
  const form = document.getElementById('addMedicineForm');
  const timesSelect = document.getElementById('medTimesPerDay');
  const timeInputsDiv = document.getElementById('timeInputs');

  // Generate time inputs based on times per day
  if (timesSelect) {
    timesSelect.addEventListener('change', function() {
      const count = parseInt(this.value);
      timeInputsDiv.innerHTML = '';
      for (let i = 0; i < count; i++) {
        timeInputsDiv.innerHTML += `
          <div class="form-group" style="flex:1;min-width:120px;">
            <label>Dose ${i + 1} Time</label>
            <input type="time" class="dose-time" required>
          </div>
        `;
      }
    });
    // Trigger initial
    timesSelect.dispatchEvent(new Event('change'));
  }

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('medName').value.trim();
      const dosage = document.getElementById('medDosage').value.trim();
      
      if (!name) {
        document.getElementById('medNameError').classList.add('visible');
        return;
      }
      document.getElementById('medNameError').classList.remove('visible');
      
      if (!dosage) {
        document.getElementById('medDosageError').classList.add('visible');
        return;
      }
      document.getElementById('medDosageError').classList.remove('visible');

      // Simulate adding medicine
      const newMed = {
        id: Date.now(),
        name: `${name} ${dosage}`,
        dosage: dosage,
        time: '8:00 AM',
        taken: false,
        category: 'New'
      };
      medicines.push(newMed);
      renderMedicineList();
      form.reset();
      timesSelect.dispatchEvent(new Event('change'));
      showToast('Medicine added successfully! 💊', 'success');
    });
  }
}

/* ---------- Medicine List ---------- */
function renderMedicineList() {
  const list = document.getElementById('medicineListPage');
  if (!list) return;
  list.innerHTML = '';

  medicines.forEach(med => {
    const storedStatus = localStorage.getItem(`med-${med.id}`);
    const isTaken = storedStatus === 'taken' || med.taken;
    const isPast = isMedTimePassed(med.time);
    let status, statusClass, statusIcon;
    
    if (isTaken) {
      status = 'Taken'; statusClass = 'badge-green'; statusIcon = '✅';
    } else if (isPast) {
      status = 'Missed'; statusClass = 'badge-red'; statusIcon = '❌';
    } else {
      status = 'Upcoming'; statusClass = 'badge-blue'; statusIcon = '⏰';
    }

    // Generate adherence dots for last 7 days
    const dots = generateAdherenceDots();

    list.innerHTML += `
      <div class="card mb-2 fade-on-scroll" id="med-card-${med.id}">
        <div style="display:flex;align-items:flex-start;gap:16px;flex-wrap:wrap;">
          <div style="flex:1;min-width:200px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
              <span style="font-size:1.3rem;">${statusIcon}</span>
              <h4 style="${isTaken ? 'text-decoration:line-through;color:var(--text-secondary);' : ''}">${med.name}</h4>
            </div>
            <p style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:6px;">
              <i class="far fa-clock"></i> ${med.time} • ${med.dosage}
            </p>
            <span class="badge ${statusClass}">${status}</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end;">
            <div style="display:flex;gap:8px;">
              <button class="btn btn-outline btn-sm" onclick="showToast('Edit mode','info')"><i class="fas fa-pen"></i></button>
              <button class="btn btn-sm" style="background:#FFEBEE;color:var(--primary);" onclick="deleteMedicine(${med.id})"><i class="fas fa-trash"></i></button>
            </div>
            ${!isTaken ? `<button class="btn btn-success btn-sm" onclick="markMedTaken(${med.id})">Mark as Taken</button>` : ''}
          </div>
        </div>
        <div style="margin-top:12px;">
          <p style="font-size:0.75rem;color:var(--text-secondary);margin-bottom:6px;">Last 7 days:</p>
          <div style="display:flex;gap:6px;">${dots}</div>
        </div>
      </div>
    `;
  });

  initScrollAnimations();
}

function generateAdherenceDots() {
  const colors = ['var(--accent)', 'var(--accent)', 'var(--primary)', 'var(--accent)', 'var(--accent)', 'var(--accent)', '#ccc'];
  return colors.map(c => `<span style="width:14px;height:14px;border-radius:50%;background:${c};display:inline-block;" title="${c === '#ccc' ? 'Future' : c === 'var(--primary)' ? 'Missed' : 'Taken'}"></span>`).join('');
}

function isMedTimePassed(timeStr) {
  const now = new Date();
  const parts = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!parts) return false;
  let hours = parseInt(parts[1]);
  const minutes = parseInt(parts[2]);
  const period = parts[3].toUpperCase();
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  const medTime = new Date();
  medTime.setHours(hours, minutes, 0, 0);
  return now > medTime;
}

function markMedTaken(id) {
  localStorage.setItem(`med-${id}`, 'taken');
  renderMedicineList();
  showToast('Medicine marked as taken! ✅', 'success');
}

function deleteMedicine(id) {
  const idx = medicines.findIndex(m => m.id === id);
  if (idx > -1) {
    medicines.splice(idx, 1);
    renderMedicineList();
    showToast('Medicine removed', 'warning');
  }
}

/* ---------- Adherence Calendar ---------- */
function renderAdherenceCalendar() {
  const calendarEl = document.getElementById('adherenceCalendar');
  if (!calendarEl) return;

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  let html = `<h4 style="text-align:center;margin-bottom:12px;">${monthNames[month]} ${year}</h4>`;
  html += '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;text-align:center;">';

  // Day headers
  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(d => {
    html += `<div style="font-size:0.7rem;font-weight:600;color:var(--text-secondary);padding:6px;">${d}</div>`;
  });

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    html += '<div></div>';
  }

  // Day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === now.getDate();
    const isPast = day < now.getDate();
    const isFuture = day > now.getDate();

    let bg = '#f5f5f5';
    let color = 'var(--text-secondary)';

    if (isPast) {
      // Simulate: ~80% taken (green), ~20% missed (red)
      const taken = Math.random() > 0.2;
      bg = taken ? '#C8E6C9' : '#FFCDD2';
      color = taken ? 'var(--accent)' : 'var(--primary)';
    } else if (isToday) {
      bg = '#BBDEFB';
      color = 'var(--secondary)';
    }

    html += `<div style="padding:8px 4px;border-radius:8px;background:${bg};color:${color};font-weight:${isToday ? '700' : '400'};font-size:0.8rem;${isFuture ? 'opacity:0.4;' : ''}">${day}</div>`;
  }

  html += '</div>';
  calendarEl.innerHTML = html;
}
