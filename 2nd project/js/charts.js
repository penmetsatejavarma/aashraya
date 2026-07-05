/* ============================================================
   Charts – Chart.js configurations for all chart pages
   ============================================================ */

/* Helper: create line chart */
function createLineChart(canvasId, labels, data, label, color, fill = false) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        borderColor: color,
        backgroundColor: fill ? color + '22' : 'transparent',
        fill: fill,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: color,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: 'top', labels: { font: { family: 'Poppins', size: 12 } } }
      },
      scales: {
        x: { ticks: { font: { family: 'Poppins', size: 11 }, maxTicksLimit: 10 }, grid: { display: false } },
        y: { beginAtZero: true, ticks: { font: { family: 'Poppins', size: 11 } }, grid: { color: '#f0f0f0' } }
      },
      animation: { duration: 1200, easing: 'easeOutQuart' }
    }
  });
}

/* Helper: create bar chart */
function createBarChart(canvasId, labels, data, label, colors) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        backgroundColor: colors || '#2E7D32',
        borderRadius: 6,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: 'top', labels: { font: { family: 'Poppins', size: 12 } } }
      },
      scales: {
        x: { ticks: { font: { family: 'Poppins', size: 11 } }, grid: { display: false } },
        y: { beginAtZero: true, max: 100, ticks: { font: { family: 'Poppins', size: 11 }, callback: v => v + '%' }, grid: { color: '#f0f0f0' } }
      },
      animation: { duration: 1200, easing: 'easeOutQuart' }
    }
  });
}

/* Helper: create doughnut chart */
function createDoughnutChart(canvasId, labels, data, colors) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;
  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors,
        borderWidth: 0,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: { position: 'bottom', labels: { font: { family: 'Poppins', size: 12 }, padding: 16 } }
      },
      animation: { duration: 1200, easing: 'easeOutQuart' }
    }
  });
}

/* Helper: create area chart (line with fill) */
function createAreaChart(canvasId, labels, data, label, color) {
  return createLineChart(canvasId, labels, data, label, color, true);
}

/* Helper: create line chart with threshold lines */
function createThresholdLineChart(canvasId, labels, data, label, color, thresholds) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  const datasets = [{
    label: label,
    data: data,
    borderColor: color,
    backgroundColor: 'transparent',
    tension: 0.4,
    pointRadius: 3,
    pointHoverRadius: 6,
    pointBackgroundColor: color,
    borderWidth: 2
  }];

  if (thresholds) {
    thresholds.forEach(t => {
      datasets.push({
        label: t.label,
        data: Array(labels.length).fill(t.value),
        borderColor: t.color,
        borderDash: [6, 4],
        borderWidth: 1.5,
        pointRadius: 0,
        fill: false
      });
    });
  }

  return new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true, position: 'top', labels: { font: { family: 'Poppins', size: 12 } } }
      },
      scales: {
        x: { ticks: { font: { family: 'Poppins', size: 11 }, maxTicksLimit: 10 }, grid: { display: false } },
        y: { beginAtZero: true, max: 100, ticks: { font: { family: 'Poppins', size: 11 } }, grid: { color: '#f0f0f0' } }
      },
      animation: { duration: 1200, easing: 'easeOutQuart' }
    }
  });
}
