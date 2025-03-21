// Utility for consistent API logging
export const ApiLogger = {
  logRequest(url: string, body: any) {
    console.group('🚀 Gemini API Request');
    console.log('URL:', url);
    console.log('Body:', JSON.stringify(body, null, 2));
    console.groupEnd();
  },

  logResponse(response: any) {
    console.group('✨ Gemini API Response');
    console.log(JSON.stringify(response, null, 2));
    console.groupEnd();
  },

  logError(error: any) {
    console.group('❌ Gemini API Error');
    console.error(error);
    console.groupEnd();
  }
};
