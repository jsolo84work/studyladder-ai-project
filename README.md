# StudyLadder AI

Aplicação de geração de planos de estudo personalizados para concursos públicos, com backend em Node.js/TypeScript integrado ao Ollama (llama3.2) e frontend em HTML/CSS/JS puro.

---

## Tecnologias

- **Runtime:** Node.js
- **Linguagem:** TypeScript
- **Framework:** Express
- **IA Local:** Ollama (modelo llama3.2)
- **Validação:** Zod
- **Dev Server:** ts-node-dev
- **Comunicação:** SSE (Server-Sent Events)

---

## Estrutura de Pastas

```
meu-backend/
├── src/
│   ├── index.ts          # Servidor Express + CORS
│   ├── routes/
│   │   └── chat.ts       # Rotas de chat (completo + stream)
│   └── agent/
│       └── agent.ts      # Lógica processMessage + processMessageStream
├── index.html            # Frontend completo
├── .env
├── package.json
└── tsconfig.json
```

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [Ollama](https://ollama.com/) instalado e rodando localmente
- Modelo llama3.2 baixado no Ollama

```bash
ollama pull llama3.2
```

---

## Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/meu-backend.git

# Acesse a pasta
cd meu-backend

# Instale as dependências
npm install
```

---

## Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3333
```

---

## Rodando o projeto

```bash
# Inicie o Ollama (em um terminal separado)
ollama run llama3.2

# Inicie o servidor em modo desenvolvimento
npm run dev
```

O servidor estará disponível em: `http://localhost:3333`

Abra o arquivo `index.html` no navegador para acessar a interface.

---

## Rotas da API

| Método | Rota              | Descrição                          |
|--------|-------------------|------------------------------------|
| GET    | `/teste`          | Verifica se o servidor está ativo  |
| POST   | `/api/chat`       | Resposta completa do modelo        |
| POST   | `/api/chat/stream`| Resposta em streaming via SSE      |

### Exemplo de requisição

```bash
# Teste de saúde
curl http://localhost:3333/teste

# Chat completo
curl -X POST http://localhost:3333/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Olá, tudo bem?"}'
```

---

## Funcionalidades do Frontend

- Formulário com os campos: concurso/cargo, data da prova, horas de estudo por dia, nível de conhecimento, disciplinas e observações
- Validação de campos obrigatórios com mensagens de erro inline
- Chips interativos para seleção de disciplinas
- Streaming de resposta token a token via SSE
- Formatação automática do conteúdo gerado (markdown básico)
- Indicadores visuais de carregamento (spinner, cursor piscante, status dot)
- Toast de erro para falhas de conexão
- Botão de copiar resultado
- Design dark theme responsivo

---

## Configurações Técnicas

### CORS

Configurado em `src/index.ts` com `origin: '*'` para ambiente de desenvolvimento. Em produção, substitua pelo domínio da aplicação.

```ts
app.use(cors({ origin: '*' }));
```

### Header SSE

Configurado em `src/routes/chat.ts` para evitar buffer em proxies reversos:

```ts
res.setHeader('X-Accel-Buffering', 'no');
```

---

## Próximos Passos

- [ ] Deploy do backend (Railway, Render ou VPS)
- [ ] Servir o frontend via servidor estático ou CDN
- [ ] Autenticação de usuários
- [ ] Histórico de planos gerados
- [ ] Suporte a múltiplos modelos de IA

---

## Licença

MIT © 2026 StudyLadder AI, by JulianSolo.
