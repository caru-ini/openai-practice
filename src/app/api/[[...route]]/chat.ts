import { createOpenAI } from '@ai-sdk/openai';
import { zValidator } from '@hono/zod-validator';
import { StreamingTextResponse, streamText } from 'ai';
import { Hono } from 'hono';
import { z } from 'zod';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});

const chatReqModel = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string(),
    }),
  ),
});

export const chat = new Hono().post('', zValidator('json', chatReqModel), async (c) => {
  const params = c.req.valid('json');
  const result = await streamText({
    model: openai('gpt-4o'),
    messages: params.messages,
  });
  return new StreamingTextResponse(result.toAIStream());
});
