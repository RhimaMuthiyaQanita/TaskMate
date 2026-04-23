// ==================== STATE ====================
let tasks = JSON.parse(localStorage.getItem('taskmate_tasks') || '[]');
let currentFilter = 'all';

// ==================== DARK MODE ====================
function toggleDark() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('toggle-icon').textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('taskmate_theme', isDark ? 'light' : 'dark');
}

// Load saved theme
(function () {
  const saved = localStorage.getItem('taskmate_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  const icon = document.getElementById('toggle-icon');
  if (icon) icon.textContent = saved === 'dark' ? '🌙' : '☀️';
})();

// ==================== SAVE ====================
function saveTasks() {
  localStorage.setItem('taskmate_tasks', JSON.stringify(tasks));
}

// ==================== ADD TASK ====================
function addTask() {
  const title = document.getElementById('input-title').value.trim();
  if (!title) {
    showToast('⚠️ Nama task tidak boleh kosong!');
    document.getElementById('input-title').focus();
    return;
  }

  const task = {
    id: Date.now().toString(),
    title,
    desc: document.getElementById('input-desc').value.trim(),
    priority: document.getElementById('input-priority').value,
    date: document.getElementById('input-date').value,
    done: false,
    createdAt: new Date().toISOString()
  };

  tasks.unshift(task);
  saveTasks();
  renderAll();
  resetForm();
  showToast('🎉 Task berhasil ditambahkan!');
}

function resetForm() {
  document.getElementById('input-title').value = '';
  document.getElementById('input-desc').value = '';
  document.getElementById('input-priority').value = 'Medium';
  document.getElementById('input-date').value = '';
}

// ==================== DELETE ====================
function deleteTask(id) {
  if (!confirm('Hapus task ini?')) return;
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderAll();
  showToast('🗑️ Task dihapus.');
}

// ==================== TOGGLE DONE ====================
function toggleDone(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  task.done = !task.done;
  saveTasks();
  renderAll();
  showToast(task.done ? '✅ Task selesai! Kerja bagus!' : '↩️ Task dikembalikan.');
}

// ==================== EDIT ====================
function openEdit(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  document.getElementById('edit-id').value = task.id;
  document.getElementById('edit-title').value = task.title;
  document.getElementById('edit-desc').value = task.desc || '';
  document.getElementById('edit-priority').value = task.priority;
  document.getElementById('edit-date').value = task.date || '';
  document.getElementById('modal-overlay').classList.remove('hidden');
  setTimeout(() => document.getElementById('edit-title').focus(), 100);
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}

function saveEdit() {
  const id = document.getElementById('edit-id').value;
  const title = document.getElementById('edit-title').value.trim();
  if (!title) { showToast('⚠️ Nama task tidak boleh kosong!'); return; }
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  task.title    = title;
  task.desc     = document.getElementById('edit-desc').value.trim();
  task.priority = document.getElementById('edit-priority').value;
  task.date     = document.getElementById('edit-date').value;
  saveTasks();
  renderAll();
  closeModal();
  showToast('💾 Task diperbarui!');
}

// ==================== FILTER ====================
function setFilter(btn, filter) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderTaskList();
}

function getFilteredTasks() {
  switch (currentFilter) {
    case 'done':    return tasks.filter(t => t.done);
    case 'pending': return tasks.filter(t => !t.done);
    case 'High':    return tasks.filter(t => t.priority === 'High');
    case 'Medium':  return tasks.filter(t => t.priority === 'Medium');
    case 'Low':     return tasks.filter(t => t.priority === 'Low');
    default:        return tasks;
  }
}

// ==================== RENDER ====================
function renderAll() {
  renderTaskList();
  renderSummary();
  renderHeader();
}

function renderHeader() {
  const done = tasks.filter(t => t.done).length;
  document.getElementById('stat-total').textContent = tasks.length + ' Task';
  document.getElementById('stat-done').textContent  = done + ' Selesai';
}

function renderSummary() {
  const total   = tasks.length;
  const done    = tasks.filter(t => t.done).length;
  const pending = total - done;
  const high    = tasks.filter(t => t.priority === 'High' && !t.done).length;
  const pct     = total === 0 ? 0 : Math.round((done / total) * 100);

  document.getElementById('s-total').textContent   = total;
  document.getElementById('s-done').textContent    = done;
  document.getElementById('s-pending').textContent = pending;
  document.getElementById('s-high').textContent    = high;
  document.getElementById('progress-pct').textContent = pct + '%';
  document.getElementById('progress-fill').style.width = pct + '%';
}

function renderTaskList() {
  const list     = document.getElementById('task-list');
  const emptyMsg = document.getElementById('empty-msg');
  const filtered = getFilteredTasks();

  list.innerHTML = '';

  if (filtered.length === 0) {
    emptyMsg.classList.add('show');
    return;
  }
  emptyMsg.classList.remove('show');

  filtered.forEach(task => {
    const card = document.createElement('div');
    card.className = `task-card priority-${task.priority}${task.done ? ' is-done' : ''}`;
    card.innerHTML = `
      <div class="task-top">
        <div class="task-check ${task.done ? 'checked' : ''}" onclick="toggleDone('${task.id}')">
          ${task.done ? '✓' : ''}
        </div>
        <div class="task-body">
          <div class="task-title">${escHtml(task.title)}</div>
          ${task.desc ? `<div class="task-desc">${escHtml(task.desc)}</div>` : ''}
          <div class="task-meta">
            <span class="badge badge-${task.priority}">${task.priority}</span>
            ${task.date ? `<span class="task-date">📅 ${formatDate(task.date)}</span>` : ''}
          </div>
        </div>
        <div class="task-actions">
          <button class="btn-icon btn-edit"   onclick="openEdit('${task.id}')"   title="Edit">✏️</button>
          <button class="btn-icon btn-delete" onclick="deleteTask('${task.id}')" title="Hapus">🗑️</button>
        </div>
      </div>
    `;
    list.appendChild(card);
  });
}

// ==================== UTILS ====================
function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des'];
  return `${d} ${months[parseInt(m, 10) - 1]} ${y}`;
}

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add('hidden'), 2800);
}

// Keyboard shortcuts
document.getElementById('input-title').addEventListener('keydown', e => {
  if (e.key === 'Enter') addTask();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ==================== INIT ====================
renderAll();
