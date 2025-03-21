import { ENV } from './env';

export const GEMINI_CONFIG = {
  apiKey: ENV.GEMINI_API_KEY,
  model: 'gemini-1.5-flash',
  maxOutputTokens: 2048,
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
} as const;

export type GeminiConfig = typeof GEMINI_CONFIG;
