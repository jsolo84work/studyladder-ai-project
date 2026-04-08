"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const chat_1 = __importDefault(require("./routes/chat"));
dotenv_1.default.config();
// Validar variáveis de ambiente obrigatórias
if (!process.env.OLLAMA_MODEL) {
    console.error('❌ Erro: OLLAMA_MODEL não está configurada em .env');
    process.exit(1);
}
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3333;
app.use((0, cors_1.default)({
    origin: '*', // Em produção, substitua pelo domínio do frontend
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express_1.default.json());
// Rota de teste — confirma que o servidor está ativo
app.get('/teste', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor rodando!' });
});
app.use('/api', chat_1.default);
app.listen(PORT, () => {
    console.log(`✅ Servidor rodando na porta ${PORT}`);
});
