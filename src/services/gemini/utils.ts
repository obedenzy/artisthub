import { GoogleGenerativeAI } from '@google/generative-ai';
import { ArtAnalysis } from './types';
import { GeminiAPIError } from './errors';

export async function fileToGenerativePart(file: File): Promise<GoogleGenerativeAI.Part> {
  const base64Data = await fileToBase64(file);
  return {
    inlineData: {
      data: base64Data,
      mimeType: file.type
    }
  };
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function parseAnalysisResponse(response: string): ArtAnalysis {
  try {
    const jsonStr = response.replace(/```json\n?|\n?```/g, '').trim();
    const analysis = JSON.parse(jsonStr) as ArtAnalysis;
    validateAnalysis(analysis);
    return analysis;
  } catch (error) {
    console.error('Failed to parse analysis:', error);
    throw new GeminiAPIError('Invalid analysis format received');
  }
}

function validateAnalysis(analysis: ArtAnalysis) {
  const required = ['style', 'technical', 'subject', 'historical'];
  for (const field of required) {
    if (!analysis[field]) {
      throw new GeminiAPIError(`Missing required field: ${field}`);
    }
  }
}
