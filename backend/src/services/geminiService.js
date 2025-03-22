import { GeminiClient } from '../config/gemini.js'; // Import the client
import { fileToGenerativePart } from '../services/gemini/utils.js'; // Import utility
import { GeminiAPIError } from '../services/gemini/errors.js'; // Import error

const INSTRUCTIONS = `Analyze the artwork and provide information on: title, artist, date, medium, dimensions, style, movement, influences, techniques, composition, perspective, texture, lighting, historical period, cultural background, political context, philosophical context, theme, narrative, symbols, subject type, origin, ownership history, current location, estimated value, exhibitions, market trends, popularity, critical reception, cultural impact, significance, digital reconstruction, AI analysis, scholarly analysis, related works, purpose, inspiration, message, fun facts, and artist signature.`;

const ARTWORK_ANALYSIS_PROMPT = `
${INSTRUCTIONS}

Return the analysis in JSON format, following this EXACT structure:

{
  "id": "string",
  "title": "string",
  "artist": "string",
  "imageUrl": "string",
  "dateCreated": "string",
  "medium": "string",
  "dimensions": {
    "height": "number",
    "width": "number",
    "depth": "number | null",
    "unit": "string"
  },
  "style": "string",
  "movement": "string",
  "influences": "string[]",
  "techniques": "string[]",
  "composition": "string",
  "colorPalette": "string[]",
  "perspective": "string",
  "texture": "string",
  "lighting": "string",
  "historicalPeriod": "string",
  "culturalBackground": "string",
  "politicalContext": "string | null",
  "philosophicalContext": "string | null",
  "theme": "string",
  "narrative": "string | null",
  "symbols": [
    { "element": "string", "meaning": "string" }
  ],
  "subjectType": "string",
  "origin": {
    "location": "string",
    "date": "string"
  },
  "ownershipHistory": [
    { "owner": "string", "period": "string" }
  ],
  "currentLocation": "string",
  "estimatedValue": "number | null",
  "exhibitions": [
    {
      "name": "string",
      "location": "string",
      "date": "string"
    }
  ],
  "marketTrends": {
    "dates": "string[]",
    "values": "number[]"
  },
  "popularityMetrics": {
    "monthlyViews": "number",
    "socialMentions": "number",
    "academicCitations": "number"
  },
  "criticalReception": "string",
  "culturalImpact": "string",
  "currentSignificance": "string",
  "hasDigitalReconstruction": "boolean",
  "digitalInsights": {
    "reconstruction": "string | null",
    "interactiveFeatures": "string[] | null"
  },
  "aiAnalysis": {
    "authenticityScore": "number",
    "hiddenDetails": "string[]",
    "styleConfidence": "number"
  },
  "scholarlyAnalysis": [
    {
      "author": "string",
      "publication": "string",
      "summary": "string"
    }
  ],
  "relatedWorks": [
    {
      "id": "string",
      "title": "string",
      "relationship": "string"
    }
  ],
  "purpose": "string",
  "inspiration": "string | null",
  "intendedMessage": "string | null",
  "funFacts": "string[]",
  "artistSignature": "string | null",
  "createdAt": "string",
  "updatedAt": "string",
  "uploadedBy": "string"
}

IMPORTANT:
*   The response MUST be a single, valid JSON object. No other text is allowed.
*   Do not leave ANY fields as "null" or empty arrays [] EXCEPT where explicitly allowed (marked with "| null").  You MUST provide a value for EVERY field, even if it's an educated guess.
*   **colorPalette**: This MUST be an array of 4-6 HEX color codes (e.g., ["#FF0000", "#00FF00", "#0000FF"]) representing the DOMINANT and VISUALLY REPRESENTATIVE colors in the artwork. Do NOT include color names.

"output":
`;

export async function analyzeArtwork(file) {
    try {
        const model = GeminiClient.getModel();
        const imagePart = await fileToGenerativePart(file);

        const result = await model.generateContent([
            { text: ARTWORK_ANALYSIS_PROMPT },
            imagePart
        ]);

        if (!result.response) {
            throw new GeminiAPIError('No response received from Gemini');
        }

        let rawResponse = result.response.text();

        let cleanedResponse = rawResponse
            .replace(/^\s*```(json)?\s*/i, '')
            .replace(/```\s*$/i, '')
            .trim();

        try {
            cleanedResponse = JSON.stringify(JSON.parse(cleanedResponse));
        } catch (purificationError) {
            console.error("Purification failed:", purificationError);
        }

        try {
            const parsedResult = JSON.parse(cleanedResponse);
            return parsedResult;
        } catch (parseError) {
            console.error("Error parsing Gemini response:", parseError);
            console.error("Cleaned response:", cleanedResponse);
            throw new GeminiAPIError("Invalid JSON format received from Gemini API: " + parseError.message);
        }
    } catch (error) {
        throw GeminiAPIError.fromError(error);
    }
}
