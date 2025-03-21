import React, { useEffect } from 'react';
import { useArtAnalysis } from '../../hooks/useArtAnalysis';
import { Loader2, AlertCircle } from 'lucide-react';

interface Props {
  file: File;
  onAnalysisComplete: (text: string) => void;
}

export function ArtAnalyzer({ file, onAnalysisComplete }: Props) {
  const { analyzeArt, isAnalyzing, error } = useArtAnalysis();

  useEffect(() => {
    let mounted = true;

    const analyze = async () => {
      try {
        const result = await analyzeArt(file);
        if (mounted && result) {
          onAnalysisComplete(result);
        }
      } catch (err) {
        console.error('Analysis failed:', err);
      }
    };

    analyze();

    return () => {
      mounted = false;
    };
  }, [file, onAnalysisComplete]); // Remove analyzeArt from dependencies

  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-lg">
        <div className="flex items-center gap-2 text-red-600 mb-2">
          <AlertCircle className="w-5 h-5" />
          <p className="font-medium">Analysis failed</p>
        </div>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-center gap-3 text-purple-600">
        <Loader2 className="w-6 h-6 animate-spin" />
        <p className="text-lg">Analyzing artwork with Gemini AI...</p>
      </div>
    </div>
  );
}
