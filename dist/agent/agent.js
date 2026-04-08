"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processMessage = processMessage;
exports.processMessageStream = processMessageStream;
// src/agent/agent.ts
const ollama_1 = __importDefault(require("ollama"));
async function processMessage(userMessage) {
    const response = await ollama_1.default.chat({
        model: 'llama3.2',
        messages: [
            {
                role: 'system',
                content: 'Você é um assistente prestativo. Responda sempre em português brasileiro.'
            },
            {
                role: 'user',
                content: userMessage
            }
        ]
    });
    return response.message.content;
}
async function processMessageStream(userMessage, onChunk) {
    const stream = await ollama_1.default.chat({
        model: 'llama3.2',
        stream: true,
        messages: [
            {
                role: 'system',
                content: 'Você é um assistente prestativo. Responda sempre em português brasileiro.'
            },
            {
                role: 'user',
                content: userMessage
            }
        ]
    });
    for await (const chunk of stream) {
        onChunk(chunk.message.content);
    }
}
