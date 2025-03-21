import React, { useState, useEffect } from 'react'; // Import useEffect
import { UploadSection } from '../components/UploadSection';
import { ArtAnalyzer } from '../components/analysis/ArtAnalyzer';
import { AnalysisResults } from '../components/analysis/AnalysisResults';
import { DetailedArtwork } from '../types/artwork';
import { AnalyzedArtworkDisplay } from '../components/analysis/AnalyzedArtworkDisplay';

export function Analyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analyzedArtwork, setAnalyzedArtwork] = useState<DetailedArtwork | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Add previewUrl state

  const handleFileSelect = (file: File) => {
    console.log("File selected in Analyzer:", file);
    setSelectedFile(file);
    // Don't set previewUrl directly here. Let useEffect handle it.
  };

  const handleAnalysisComplete = (artwork: DetailedArtwork) => {
    setAnalyzedArtwork(artwork);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setAnalyzedArtwork(null);
    // No need to manually revoke here, useEffect handles it.
  };

  // useEffect to manage the preview URL
  useEffect(() => {
    if (selectedFile) {
      const newPreviewUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(newPreviewUrl);

      // Cleanup function: Revoke the old URL when a new file is selected,
      // or when the component unmounts.  This is VERY important.
      return () => {
        if (newPreviewUrl) {
          URL.revokeObjectURL(newPreviewUrl);
        }
      };
    } else {
      setPreviewUrl(null); // Clear the preview URL if no file is selected
    }
  }, [selectedFile]); // Only re-run when selectedFile changes


  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Art Analyzer</h1>

        {!selectedFile ? (
          <UploadSection onFileSelect={handleFileSelect} />
        ) : (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Use previewUrl here */}
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt={`Preview of ${selectedFile.name}`}
                  className="w-full h-96 object-cover"
                />
              )}
            </div>

            {!analyzedArtwork ? (
              <ArtAnalyzer
                file={selectedFile}
                onAnalysisComplete={handleAnalysisComplete}
              />
            ) : (
              <AnalyzedArtworkDisplay
                artwork={analyzedArtwork}
                onReset={handleReset}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
