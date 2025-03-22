import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ARTWORK_DATA } from '../data/mockArtworks';
import { USER_ARTWORKS } from '../data/mockUserArtworks';
import { DetailedArtworkView } from '../components/artwork/DetailedArtworkView';
import { BackButton } from '../components/artwork/BackButton';

export function ArtworkDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Look for artwork in both mock data and user artworks
  const artwork = USER_ARTWORKS.find(art => art.id === id) || 
                 ARTWORK_DATA[id as keyof typeof ARTWORK_DATA];

  if (!artwork) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Artwork not found</h1>
          <p className="text-gray-600 mt-2">The artwork you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <BackButton />
        </div>
        <DetailedArtworkView artwork={artwork} />
      </div>
    </div>
  );
}
