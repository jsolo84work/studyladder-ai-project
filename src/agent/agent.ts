// src/agent/agent.ts
import ollama from 'ollama'

export async function processMessage(userMessage: string): Promise<string> {
  const response = await ollama.chat({
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
  })

  return response.message.content
}

export async function processMessageStream(
  userMessage: string,
  onChunk: (text: string) => void
): Promise<void> {
  const stream = await ollama.chat({
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
  })

  for await (const chunk of stream) {
    onChunk(chunk.message.content)
  }
}