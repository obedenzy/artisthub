export class GeminiError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GeminiError';
  }
}

export class GeminiAPIError extends GeminiError {
  constructor(message) {
    super(`API Error: ${message}`);
    this.name = 'GeminiAPIError';
  }

  static fromError(error) {
    if (error instanceof Error) {
      if (error.message.includes('PERMISSION_DENIED')) {
        return new GeminiAPIError('API key is invalid or expired');
      }
      if (error.message.includes('RESOURCE_EXHAUSTED')) {
        return new GeminiAPIError('API quota exceeded. Please try again later.');
      }
      if (error.message.includes('MODEL_NOT_FOUND')) {
        return new GeminiAPIError('The selected Gemini model is not available');
      }
      return new GeminiAPIError(error.message);
    }
    return new GeminiAPIError('An unknown error occurred');
  }
}
