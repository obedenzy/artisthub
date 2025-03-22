// Environment variable validation and access
    export const ENV = {
      VITE_BACKEND_API_URL: import.meta.env.VITE_BACKEND_API_URL, // Add backend URL
      NODE_ENV: import.meta.env.MODE,
      IS_DEV: import.meta.env.DEV,
    };

    // Validate required environment variables
    export function validateEnv() {
      const missing = [];

      // Add validation for the new variable
      if (!ENV.VITE_BACKEND_API_URL) {
        missing.push('VITE_BACKEND_API_URL');
      }

      if (missing.length > 0) {
        throw new Error(
          `Missing required environment variables:\n` +
          missing.map(key => `- ${key}`).join('\n') +
          `\n\nPlease add them to your .env file`
        );
      }
    }
