"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/chat.ts
const express_1 = require("express");
const zod_1 = require("zod");
const agent_1 = require("../agent/agent");
const router = (0, express_1.Router)();
const chatSchema = zod_1.z.object({
    message: zod_1.z.string().min(1, 'Mensagem não pode ser vazia')
});
// Rota normal (sem streaming)
router.post('/chat', async (req, res) => {
    const result = chatSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            error: 'Dados inválidos',
            details: result.error.format()
        });
    }
    try {
        const { message } = result.data;
        const response = await (0, agent_1.processMessage)(message);
        res.json({ reply: response });
    }
    catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
// Rota com streaming
router.post('/chat/stream', async (req, res) => {
    const result = chatSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            error: 'Dados inválidos',
            details: result.error.format()
        });
    }
    // Headers SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no'); // evita buffer em proxies (nginx)
    try {
        const { message } = result.data;
        await (0, agent_1.processMessageStream)(message, (text) => {
            res.write(`data: ${JSON.stringify({ text })}\n\n`);
        });
        res.write('data: [DONE]\n\n');
        res.end();
    }
    catch (error) {
        res.write(`data: ${JSON.stringify({ error: 'Erro no streaming' })}\n\n`);
        res.end();
    }
});
exports.default = router;
