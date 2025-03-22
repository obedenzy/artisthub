import * as artworkService from '../services/artworkService.js';

export const uploadArtwork = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const userId = req.user.id;
    const file = req.file;
    const metadata = req.body;

    const { artwork, error } = await artworkService.uploadArtwork(userId, file, metadata);

    if (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }

    res.status(201).json({ message: 'Image uploaded successfully', artwork });

  } catch (error) {
    console.error("Error during image upload:", error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getArtworkHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { artworks, error } = await artworkService.getArtworkHistory(userId);

    if (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }

    res.status(200).json({ message: 'Artwork history fetched successfully', artworks });

  } catch (error) {
    console.error("Error fetching artwork history:", error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const analyzeArtwork = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided' });
        }

        const file = req.file;
        const { analysis, error } = await artworkService.analyzeArtwork(file);

        if (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }

        res.status(200).json({ message: 'Artwork analyzed successfully', analysis });

    } catch (error) {
        console.error("Error during artwork analysis:", error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const getArtwork = async (req, res) => {
    try {
        const { id } = req.params;
        const { artwork, error } = await artworkService.getArtworkById(id);

        if (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }

        res.status(200).json({ message: 'Artwork fetched successfully', artwork });

    } catch (error) {
        console.error("Error fetching artwork:", error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const getAllArtworks = async (req, res) => {
    try {
        const { artworks, error } = await artworkService.getAllArtworks();

        if (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }

        res.status(200).json({ message: 'All artworks fetched successfully', artworks });

    } catch (error) {
        console.error("Error fetching all artworks:", error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const getUserArtworks = async (req, res) => {
    try {
        const userId = req.user.id;
        const { artworks, error } = await artworkService.getUserArtworks(userId);

        if (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }

        res.status(200).json({ message: 'User artworks fetched successfully', artworks });

    } catch (error) {
        console.error("Error fetching user artworks:", error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
