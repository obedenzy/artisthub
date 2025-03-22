import supabase from '../config/supabase.js';
import { analyzeArtwork as geminiAnalyzeArtwork } from './geminiService.js'; // Import from geminiService

export const uploadArtwork = async (userId, file, metadata) => {
  const fileName = `${userId}/${Date.now()}-${file.originalname}`;

  const { data, error } = await supabase
    .storage
    .from('artwork-images')
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false
    });

  if (error) {
    return { error: { message: 'Error uploading image', status: 500, details: error } };
  }

  const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/artwork-images/${data.path}`;

  const { data: artworkData, error: artworkError } = await supabase
    .from('artworks')
    .insert([{
      user_id: userId,
      image_url: imageUrl,
      title: metadata.title || 'Untitled',
      artist: metadata.artist || 'Unknown',
      // ... other artwork metadata ...
    }])
    .select();

  if (artworkError) {
    return { error: { message: 'Error saving artwork metadata', status: 500, details: artworkError } };
  }

  return { artwork: artworkData[0] };
};

export const getArtworkHistory = async (userId) => {
  const { data: artworks, error } = await supabase
    .from('artworks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    return { error: { message: 'Error fetching artwork history', status: 500, details: error } };
  }

  return { artworks };
};

export const getArtworkById = async (artworkId) => {
    const { data: artwork, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('id', artworkId)
        .single();

    if (error) {
        return { error: { message: 'Error fetching artwork', status: 500, details: error }};
    }
    if (!artwork) {
        return { error: { message: 'Artwork not found', status: 404 } };
    }

    return { artwork };
};

// New function to analyze artwork (using Gemini)
export const analyzeArtwork = async (file) => {
    try {
        const analysisResult = await geminiAnalyzeArtwork(file); // Call the Gemini service
        return { analysis: analysisResult };
    } catch (error) {
        return { error: { message: 'Error analyzing artwork with Gemini', status: 500, details: error } };
    }
};

export const getAllArtworks = async () => {
    const { data: artworks, error } = await supabase
        .from('artworks')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        return { error: { message: 'Error fetching all artworks', status: 500, details: error } };
    }

    return { artworks };
};

export const getUserArtworks = async (userId) => {
    const { data: artworks, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        return { error: { message: 'Error fetching user artworks', status: 500, details: error } };
    }

    return { artworks };
};
