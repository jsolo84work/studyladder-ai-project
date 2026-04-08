// src/routes/chat.ts
import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { processMessage, processMessageStream } from '../agent/agent'

const router = Router()

const chatSchema = z.object({
  message: z.string().min(1, 'Mensagem não pode ser vazia')
})

// Rota normal (sem streaming)
router.post('/chat', async (req: Request, res: Response) => {
  const result = chatSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      error: 'Dados inválidos',
      details: result.error.format()
    })
  }

  try {
    const { message } = result.data
    const response = await processMessage(message)
    res.json({ reply: response })
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

// Rota com streaming
router.post('/chat/stream', async (req: Request, res: Response) => {
  const result = chatSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      error: 'Dados inválidos',
      details: result.error.format()
    })
  }

  // Headers SSE
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.setHeader('X-Accel-Buffering', 'no') // evita buffer em proxies (nginx)

  try {
    const { message } = result.data

    await processMessageStream(message, (text) => {
      res.write(`data: ${JSON.stringify({ text })}\n\n`)
    })

    res.write('data: [DONE]\n\n')
    res.end()
  } catch (error) {
    res.write(`data: ${JSON.stringify({ error: 'Erro no streaming' })}\n\n`)
    res.end()
  }
})

export default router