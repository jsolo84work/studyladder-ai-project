// ── VALIDAÇÃO DOS CAMPOS ──
function validar() {
  let ok = true;

  const campos = [
    { id: 'concurso',  errId: 'err-concurso',  test: v => v.trim().length >= 3 },
    { id: 'dataProva', errId: 'err-dataProva',  test: v => v.trim().length >= 2 },
    { id: 'horasDia',  errId: 'err-horasDia',   test: v => v !== '' && +v >= 1 && +v <= 16 },
    { id: 'nivel',     errId: 'err-nivel',      test: v => v !== '' },
  ];

  campos.forEach(({ id, errId, test }) => {
    const el = document.getElementById(id);
    const err = document.getElementById(errId);
    if (!test(el.value)) {
      el.classList.add('error');
      err.classList.add('visible');
      ok = false;
    } else {
      el.classList.remove('error');
      err.classList.remove('visible');
    }
  });

  if (getSelectedChips().length === 0) {
    document.getElementById('err-chips').classList.add('visible');
    ok = false;
  }

  return ok;
}

// ── LIMPAR ERRO AO DIGITAR ──
['concurso', 'dataProva', 'horasDia', 'nivel'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    document.getElementById(id).classList.remove('error');
    const err = document.getElementById(`err-${id}`);
    if (err) err.classList.remove('visible');
  });
});
