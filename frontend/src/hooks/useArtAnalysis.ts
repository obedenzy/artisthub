    import { useState, useCallback } from 'react';
    import { DetailedArtwork } from '../types/artwork';
    import { ENV } from '../config/env';

    export function useArtAnalysis() {
      const [isAnalyzing, setIsAnalyzing] = useState(false);
      const [error, setError] = useState<string | null>(null);

      const analyzeArt = useCallback(async (file: File) => {
        setIsAnalyzing(true);
        setError(null);

        try {
          // Convert file to Base64
          const reader = new FileReader();
          const base64Promise = new Promise<string>((resolve, reject) => {
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
          const base64String = await base64Promise;
          const base64Data = base64String.split(',')[1]; // Remove data URL prefix


          const response = await fetch(`${ENV.VITE_BACKEND_API_URL}/api/artworks/analyze`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Set Content-Type
              // 'Authorization': `Bearer YOUR_AUTH_TOKEN`, // Add auth later
            },
            body: JSON.stringify({ image: base64Data }), // Send Base64 string
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Analysis failed');
          }

          const data = await response.json();
          return data.analysis as DetailedArtwork;

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
