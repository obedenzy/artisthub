import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_CONFIG } from '../../config/gemini';

export function getModel() {
  const genai = new GoogleGenerativeAI(GEMINI_CONFIG.apiKey);
  return genai.getGenerativeModel({ model: GEMINI_CONFIG.model });
}
