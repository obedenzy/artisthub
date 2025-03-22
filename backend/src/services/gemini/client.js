import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_CONFIG } from '../../config/gemini.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export class GeminiClient {
  private static instance = null;

  private constructor() {}

  public static getModel() {
    if (!this.instance) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Gemini API key is not configured');
      }
      this.instance = new GoogleGenerativeAI(apiKey);
    }

    return this.instance.getGenerativeModel({
      model: GEMINI_CONFIG.model,
      generationConfig: {
        maxOutputTokens: GEMINI_CONFIG.maxOutputTokens,
        temperature: GEMINI_CONFIG.temperature,
        topK: GEMINI_CONFIG.topK,
        topP: GEMINI_CONFIG.topP,
      }
    });
  }
}
