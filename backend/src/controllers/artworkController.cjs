const artworkService = require('../services/artworkService.cjs'); // Note .cjs

    // ... (other controller functions - remove multer references if any) ...
    exports.uploadArtwork = async (req, res) => {
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

      exports.getArtworkHistory = async (req, res) => {
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
    exports.analyzeArtwork = async (req, res) => {
      console.log("--- analyzeArtwork controller called ---");
      try {
        if (!req.body.image) { // Now expecting req.body.image
            console.log("Error: No image data provided");
            return res.status(400).json({ message: 'No image data provided' });
        }

        const base64Image = req.body.image; // Get Base64 string from request body
        console.log("Received base64 image data (truncated):", base64Image.substring(0, 50) + "...");

        // Call artworkService and handle potential errors
        const { analysis, error } = await artworkService.analyzeArtwork(base64Image);

        if (error) {
          console.error("Error from artworkService:", error);
          // Return a more detailed error, including a potential status code
          return res.status(error.status || 500).json({ message: error.message || "An error occurred during analysis." });
        }

        console.log("Analysis successful, returning:", analysis); // Log before returning
        res.status(200).json({ message: 'Artwork analyzed successfully', analysis });

      } catch (error) {
        console.error("Error during artwork analysis (controller):", error);
        // Return a detailed error response, including the stack trace
        res.status(500).json({ message: 'Internal server error', error: error.toString(), stack: error.stack });
      }
    };

    exports.getArtwork = async (req, res) => {
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

    exports.getAllArtworks = async (req, res) => {
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

    exports.getUserArtworks = async (req, res) => {
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
