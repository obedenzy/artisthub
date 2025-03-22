import { useState, useCallback } from 'react';
import { analyzeArtwork } from '../services/gemini/analysis';
import { GeminiAPIError } from '../services/gemini/errors';
import { DetailedArtwork } from '../types/artwork';

export function useArtAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeArt = useCallback(async (file: File) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      // Call analyzeArtwork, which now returns the *parsed* object
      const result = await analyzeArtwork(file);
      return result; // Directly return the parsed object

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Analysis failed';
      setError(message);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  return {
    analyzeArt,
    isAnalyzing,
    error
  };
}
