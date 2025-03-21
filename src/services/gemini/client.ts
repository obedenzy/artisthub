import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_CONFIG } from '../../config/gemini';

export class GeminiClient {
  private static instance: GoogleGenerativeAI | null = null;
  
  private constructor() {}
  
  public static getModel() {
    if (!this.instance) {
      if (!GEMINI_CONFIG.apiKey) {
        throw new Error('Gemini API key is not configured');
      }
      this.instance = new GoogleGenerativeAI(GEMINI_CONFIG.apiKey);
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
