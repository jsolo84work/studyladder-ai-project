// ── GERAR PLANO (STREAMING SSE via POST) ──
async function gerarPlano() {
  if (!validar()) return;

  const concurso  = document.getElementById('concurso').value.trim();
  const dataProva = document.getElementById('dataProva').value.trim();
  const horasDia  = document.getElementById('horasDia').value;
  const nivel     = document.getElementById('nivel').value;
  const chips     = getSelectedChips().join(', ');
  const obs       = document.getElementById('obs').value.trim();

  const prompt = `
Você é um especialista em preparação para concursos públicos no Brasil.
Crie um plano de estudos detalhado e personalizado com as seguintes informações:

- Concurso / cargo: ${concurso}
- Tempo disponível: ${dataProva}
- Horas de estudo por dia: ${horasDia}h
- Nível atual do candidato: ${nivel}
- Disciplinas do edital: ${chips}
${obs ? `- Observações do candidato: ${obs}` : ''}

O plano deve incluir:
1. Cronograma semanal com distribuição das disciplinas
2. Metas por semana
3. Estratégia de revisões
4. Dicas específicas para cada disciplina
5. Recomendação de materiais de estudo

Seja específico, prático e motivador.
  `.trim();

  const btn = document.getElementById('btn-gerar');
  btn.disabled = true;
  setEstado('loading');

  const rc = document.getElementById('result-content');
  rc.innerHTML = '';
  let accumulated = '';

  try {
    const response = await fetch(`${API_BASE}/api/chat/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt })
    });

    if (!response.ok) throw new Error(`Servidor retornou ${response.status}`);

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    setEstado('result');
    rc.innerHTML = '<span class="cursor"></span>';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const raw = line.slice(6).trim();
          if (raw === '[DONE]') continue;
          try {
            const parsed = JSON.parse(raw);
            const token = parsed.content ?? parsed.token ?? parsed.text ?? '';
            accumulated += token;
            rc.innerHTML = formatarMarkdown(accumulated) + '<span class="cursor"></span>';
            rc.scrollIntoView({ block: 'end', behavior: 'smooth' });
          } catch (_) {
            // token não-JSON — ignora
          }
        }
      }
    }

    rc.innerHTML = formatarMarkdown(accumulated);
    document.getElementById('status-dot').classList.remove('active');

  } catch (err) {
    setEstado('empty');
    showToast(`Erro ao conectar ao backend: ${err.message}`);
    console.error(err);
  } finally {
    btn.disabled = false;
  }
}
