// Use environment variables directly, and provide defaults
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') }); // Load from root

export const GEMINI_CONFIG = {
  apiKey: process.env.GEMINI_API_KEY || '', // Provide an empty string as default
  model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
  maxOutputTokens: process.env.GEMINI_MAX_OUTPUT_TOKENS ? parseInt(process.env.GEMINI_MAX_OUTPUT_TOKENS) : 2048,
  temperature: process.env.GEMINI_TEMPERATURE ? parseFloat(process.env.GEMINI_TEMPERATURE) : 0.7,
  topK: process.env.GEMINI_TOP_K ? parseInt(process.env.GEMINI_TOP_K) : 40,
  topP: process.env.GEMINI_TOP_P ? parseFloat(process.env.GEMINI_TOP_P) : 0.95,
} as const;

export type GeminiConfig = typeof GEMINI_CONFIG;
