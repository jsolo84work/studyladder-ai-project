// ── CHIPS DE DISCIPLINAS ──
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    chip.classList.toggle('selected');
    document.getElementById('err-chips').classList.remove('visible');
  });
});

function getSelectedChips() {
  return [...document.querySelectorAll('.chip.selected')].map(c => c.dataset.value);
}
