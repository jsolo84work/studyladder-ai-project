// ── LIMPAR TUDO ──
function limparTudo() {
  const confirmar = confirm('Tem certeza que deseja limpar o conteúdo e iniciar uma nova pesquisa?');
  if (!confirmar) return;

  ['concurso', 'dataProva', 'horasDia', 'obs'].forEach(id => {
    document.getElementById(id).value = '';
    document.getElementById(id).classList.remove('error');
  });

  document.getElementById('nivel').value = '';
  document.getElementById('nivel').classList.remove('error');

  document.querySelectorAll('.chip.selected').forEach(c => c.classList.remove('selected'));

  ['err-concurso', 'err-dataProva', 'err-horasDia', 'err-nivel', 'err-chips'].forEach(id => {
    document.getElementById(id).classList.remove('visible');
  });

  document.getElementById('result-content').innerHTML = '';
  setEstado('empty');
}
