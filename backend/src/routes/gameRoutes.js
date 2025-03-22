import express from 'express';
import * as gameController from '../controllers/gameController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, gameController.createGame);
router.get('/:id', gameController.getGame);
router.get('/', gameController.getAllGames);
router.get('/templates', gameController.getGameTemplates);

export default router;
