import { GEMINI_CONFIG } from '../../config/gemini';
import { GeminiAPIError } from './errors';
import { ApiLogger } from './logging';
import { RequestQueue } from './requestQueue';

export async function generateContent(prompt: string, imageData: string, mimeType: string) {
  const url = `${GEMINI_CONFIG.endpoint}/${GEMINI_CONFIG.model}:generateContent?key=${GEMINI_CONFIG.apiKey}`;
  
  const requestBody = {
    contents: [{
      parts: [
        { text: prompt },
        {
          inline_data: {
            mime_type: mimeType,
            data: imageData
          }
        }
      ]
    }]
  };

  ApiLogger.logRequest(url, {
    ...requestBody,
    contents: [{
      parts: [
        { text: prompt },
        { inline_data: { mime_type: mimeType, data: '[BASE64_IMAGE_DATA]' } }
      ]
    }]
  });

  try {
    const queue = RequestQueue.getInstance();
    const response = await queue.executeRequest(async () => {
      const result = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!result.ok) {
        const error = await result.json();
        throw new GeminiAPIError(error.error?.message || 'API request failed');
      }

      return result.json();
    });

    ApiLogger.logResponse(response);
    return response;
  } catch (error) {
    ApiLogger.logError(error);
    throw GeminiAPIError.fromError(error);
  }
}
