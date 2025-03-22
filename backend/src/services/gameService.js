import supabase from '../config/supabase.js';
import { generateQuestions } from '../utils/gameGenerators.js';
import { GAME_TEMPLATES } from '../data/gameTemplates.js';

export const createGame = async (type, artworkId, userId, settings) => {
  try {
    // Fetch the artwork details from Supabase
    const { data: artwork, error: artworkError } = await supabase
      .from('artworks')
      .select('*')
      .eq('id', artworkId)
      .single();

    if (artworkError) {
      return { error: { message: 'Error fetching artwork', status: 500, details: artworkError } };
    }
    if (!artwork) {
      return { error: { message: 'Artwork not found', status: 404 } };
    }

    // Generate questions based on the artwork and game type
    const questions = generateQuestions(type, artwork);

    // Create the game object
    const game = {
      title: settings.title || `${artwork.title} - ${type}`,
      description: settings.description || `Test your knowledge about ${artwork.title}`,
      type,
      artwork_id: artworkId, // Store the artwork ID, not the entire artwork object
      questions,
      created_by: userId,
      start_date: settings.startDate || new Date(),
      end_date: settings.endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      is_finished: false,
      difficulty: settings.difficulty || 'medium',
      time_limit: settings.timeLimit || 10,
      max_participants: settings.maxParticipants || 100,
      entry_fee: settings.entryFee || 2, // You might want to make this configurable
      prizes: settings.prizes || [
        { rank: 1, amount: 100, type: 'monetary' },
        { rank: 2, amount: 50, type: 'monetary' }
      ],
      participants: [], // Initially empty
      tags: settings.tags || [],
    };

    // Insert the game into the Supabase 'games' table
    const { data: newGame, error: gameError } = await supabase
      .from('games')
      .insert([game])
      .select();

    if (gameError) {
      return { error: { message: 'Error creating game', status: 500, details: gameError } };
    }

    return { game: newGame[0] };

  } catch (error) {
    console.error("Error in createGame service:", error);
    return { error: { message: 'Internal server error in createGame', status: 500, details: error } };
  }
};

export const getGameById = async (gameId) => {
    const { data: game, error } = await supabase
        .from('games')
        .select('*')
        .eq('id', gameId)
        .single();

    if (error) {
        return { error: { message: 'Error fetching game', status: 500, details: error }};
    }
    if(!game) {
        return { error: { message: 'Game not found', status: 404 } };
    }

    return { game };
};

export const getAllGames = async () => {
  const { data: games, error } = await supabase
    .from('games')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return { error: { message: 'Error fetching games', status: 500, details: error } };
  }
  return { games };
};

// Add other game-related functions here (e.g., joinGame, startGame, endGame, submitAnswer, etc.)

export const getGameTemplates = async () => {
  // This function now just returns the static game templates.
  return { templates: GAME_TEMPLATES };
};
