export interface ArtAnalysis {
  style: {
    movement: string;
    period: string;
    characteristics: string[];
  };
  technical: {
    medium: string;
    techniques: string[];
    composition: string;
    colorPalette: string[];
  };
  subject: {
    main: string;
    symbols: Array<{
      element: string;
      meaning: string;
    }>;
    narrative: string;
  };
  historical: {
    period: string;
    significance: string;
    influences: string[];
  };
}

export interface AnalysisResponse {
  structured: ArtAnalysis;
  text: string;
}
