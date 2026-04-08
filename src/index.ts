// src/index.ts
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import chatRoute from './routes/chat'

dotenv.config()

// Validar variáveis de ambiente obrigatórias
if (!process.env.OLLAMA_MODEL) {
  console.error('❌ Erro: OLLAMA_MODEL não está configurada em .env')
  process.exit(1)
}

const app = express()
const PORT = process.env.PORT || 3333

app.use(cors({
  origin: '*', // Em produção, substitua pelo domínio do frontend
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}))

app.use(express.json())

// Rota de teste — confirma que o servidor está ativo
app.get('/teste', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor rodando!' })
})

app.use('/api', chatRoute)

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`)
})