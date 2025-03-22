import * as gameService from '../services/gameService.js';

export const createGame = async (req, res) => {
  try {
    const { type, artworkId, settings } = req.body;
    const userId = req.user.id;

    if (!type || !artworkId) {
      return res.status(400).json({ message: 'Game type and artwork ID are required' });
    }

    const { game, error } = await gameService.createGame(type, artworkId, userId, settings);

    if (error) {
      return res.status(error.status || 500).json({ message: error.message });
    }

    res.status(201).json({ message: 'Game created successfully', game });
  } catch (error) {
    console.error("Error in createGame controller:", error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getGame = async (req, res) => {
    try {
        const { id } = req.params;
        const { game, error } = await gameService.getGameById(id);

        if (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }
        res.status(200).json({ message: 'Game fetched successfully', game });
    } catch (error) {
        console.error("Error in getGame controller:", error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const getAllGames = async (req, res) => {
    try {
        const { games, error } = await gameService.getAllGames();
        if (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }
        res.status(200).json({ message: 'Games fetched successfully', games });

    } catch (error) {
        console.error("Error in getAllGames controller:", error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const getGameTemplates = async (req, res) => {
    try {
        const { templates, error } = await gameService.getGameTemplates();

        if (error) {
            return res.status(error.status || 500).json({ message: error.message });
        }

        res.status(200).json({ message: 'Game templates fetched successfully', templates });
    } catch (error) {
        console.error("Error in getGameTemplates controller:", error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
