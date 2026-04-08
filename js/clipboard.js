// ── COPIAR RESULTADO ──
function copiarResultado() {
  const text = document.getElementById('result-content').innerText;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copy-btn');
    btn.textContent = 'Conteúdo copiado!';
    setTimeout(() => btn.textContent = 'Copiar', 2500);
  });
}
