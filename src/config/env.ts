// Environment variable validation and access
export const ENV = {
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY,
  NODE_ENV: import.meta.env.MODE,
  IS_DEV: import.meta.env.DEV,
};

// Validate required environment variables
export function validateEnv() {
  const missing = [];
  
  if (!ENV.GEMINI_API_KEY) {
    missing.push('VITE_GEMINI_API_KEY');
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n` +
      missing.map(key => `- ${key}`).join('\n') +
      `\n\nPlease add them to your .env file`
    );
  }
}
