// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
}

// ── ESTADOS DE UI ──
function setEstado(estado) {
  const estados = { empty: false, loading: false, result: false };
  estados[estado] = true;

  document.getElementById('empty-state').style.display = estados.empty ? 'flex' : 'none';

  const ls = document.getElementById('loading-state');
  ls.style.display = estados.loading ? 'flex' : 'none';
  ls.classList.toggle('visible', estados.loading);

  const rc = document.getElementById('result-content');
  rc.style.display = estados.result ? 'block' : 'none';
  rc.classList.toggle('visible', estados.result);

  document.getElementById('status-dot').classList.toggle('active', estados.loading);
  document.getElementById('copy-btn').classList.toggle('visible', estados.result);
  document.getElementById('btn-limpar').classList.toggle('visible', estados.result);
}
