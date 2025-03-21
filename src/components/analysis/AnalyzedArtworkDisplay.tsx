import React from 'react';
import { DetailedArtwork } from '../../types/artwork';
import { ArtworkBasicInfo } from '../artwork/ArtworkBasicInfo';
import { ArtworkStyleInfo } from '../artwork/ArtworkStyleInfo';
import { ArtworkHistoricalInfo } from '../artwork/ArtworkHistoricalInfo';
import { ArtworkSubjectInfo } from '../artwork/ArtworkSubjectInfo';
import { ArtworkTechnicalInfo } from '../artwork/ArtworkTechnicalInfo';
import { ArtworkProvenanceInfo } from '../artwork/ArtworkProvenanceInfo';
import { ArtworkCriticalInfo } from '../artwork/ArtworkCriticalInfo';
import { ArtworkScholarlyInfo } from '../artwork/ArtworkScholarlyInfo';
import { ArtworkIntention } from '../artwork/ArtworkIntention';
import { ArtworkPhilosophy } from '../artwork/ArtworkPhilosophy';
import { ArtworkMarket } from '../artwork/ArtworkMarket';
import { ArtworkDigital } from '../artwork/ArtworkDigital';
import { ArtworkRelated } from '../artwork/ArtworkRelated';
import { ArtworkFunFacts } from '../artwork/ArtworkFunFacts';

interface Props {
  artwork: DetailedArtwork;
  onReset: () => void;
}

export function AnalyzedArtworkDisplay({ artwork, onReset }: Props) {
  const hasPhilosophy = artwork.philosophicalContext || artwork.symbols?.length > 0;
  const hasDigitalInsights = artwork.digitalInsights;
  const hasScholarlyAnalysis = artwork.scholarlyAnalysis?.length > 0;
  const hasFunFacts = artwork.funFacts?.length > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Image Display - REMOVED */}

      {/* Information Sections */}
      <div className="space-y-8">
        {/* Title and Artist */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-2">{artwork.title}</h1>
          <p className="text-xl text-gray-600">by {artwork.artist}</p>
        </div>

        <ArtworkBasicInfo artwork={artwork} />
        <ArtworkStyleInfo artwork={artwork} />
        <ArtworkTechnicalInfo artwork={artwork} />
        <ArtworkSubjectInfo artwork={artwork} />
        <ArtworkHistoricalInfo artwork={artwork} />
        {hasPhilosophy && <ArtworkPhilosophy artwork={artwork} />}
        <ArtworkIntention artwork={artwork} />
        <ArtworkProvenanceInfo artwork={artwork} />
        <ArtworkMarket artwork={artwork} />
        {hasDigitalInsights && <ArtworkDigital artwork={artwork} />}
        <ArtworkCriticalInfo artwork={artwork} />
        {hasScholarlyAnalysis && <ArtworkScholarlyInfo artwork={artwork} />}
        <ArtworkRelated artwork={artwork} />
        {hasFunFacts && <ArtworkFunFacts artwork={artwork} />}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Analyze Another Artwork
        </button>
      </div>
    </div>
  );
}
