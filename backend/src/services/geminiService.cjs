
  const { GeminiClient } = require('../config/gemini.cjs');
// No longer needed: import { fileToGenerativePart } from './utils.js';
const { GeminiAPIError } = require('./gemini/errors.cjs'); // Corrected import

const INSTRUCTIONS = `Analyze the artwork and provide information on: title, artist, date, medium, dimensions, style, movement, influences, techniques, composition, perspective, texture, lighting, historical period, cultural background, political context, philosophical context, theme, narrative, symbols, subject type, origin, ownership history, current location, estimated value, exhibitions, market trends, popularity, critical reception, cultural impact, significance, digital reconstruction, AI analysis, scholarly analysis, related works, purpose, inspiration, message, fun facts, and artist signature.`; //Corrected line

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
  "influences": "