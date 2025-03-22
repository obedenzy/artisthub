import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { DetailedArtwork } from '../../types/artwork';
import { ENV } from '../../config/env';

interface Props {
    file: File;
    onAnalysisComplete: (artwork: DetailedArtwork) => void;
}

export function ArtAnalyzer({ file, onAnalysisComplete }: Props) {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        const analyze = async () => {
            setIsAnalyzing(true);
            setError(null);

            try {
                const reader = new FileReader();
                reader.onload = async () => {
                    const base64String = reader.result as string;
                    const base64Data = base64String.split(',')[1];

                    // Log the URL and the beginning of the base64 data:
                    console.log("Sending request to:", `${ENV.VITE_BACKEND_API_URL}/api/artworks/analyze`);
                    console.log("Base64 data (truncated):", base64Data.substring(0, 100) + "...");

                    const response = await fetch(`${ENV.VITE_BACKEND_API_URL}/api/artworks/analyze`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            // 'Authorization': `Bearer YOUR_AUTH_TOKEN`, //  Add auth later
                        },
                        body: JSON.stringify({ image: base64Data }),
                    });

                    if (!response.ok) {
                        // IMPORTANT: Try to get JSON error, but fall back to text
                        let errorMessage = 'Analysis failed';
                        try {
                            const errorData = await response.json();
                            errorMessage = errorData.message || errorMessage;
                        } catch (jsonError) {
                            // If parsing as JSON fails, get the raw text
                            const errorText = await response.text();
                            errorMessage = `Analysis failed: ${response.status} - ${errorText}`;
                        }
                        throw new Error(errorMessage);
                    }

                    const data = await response.json();
                    if (mounted) {
                        onAnalysisComplete(data.analysis);
                    }
                };

                reader.onerror = () => {
                    if (mounted) {
                        setError('Error reading file');
                    }
                };

                reader.readAsDataURL(file);

            } catch (err) {
                const message = err instanceof Error ? err.message : 'Analysis failed';
                if (mounted) {
                    setError(message);
                }
                console.error('Analysis failed:', err);
            } finally {
                if (mounted) {
                    setIsAnalyzing(false);
                }
            }
        };

        analyze();

        return () => {
            mounted = false;
        };
    }, [file, onAnalysisComplete]);

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
                <p className="text-lg">Analyzing artwork...</p>
            </div>
        </div>
    );
}
