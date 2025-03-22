import express from 'express';
import * as artworkController from '../controllers/artworkController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', authenticateToken, upload.single('image'), artworkController.uploadArtwork);
router.get('/history', authenticateToken, artworkController.getArtworkHistory);
router.post('/analyze', authenticateToken, upload.single('image'), artworkController.analyzeArtwork);
router.get('/:id', artworkController.getArtwork);
router.get('/', artworkController.getAllArtworks);
router.get('/user', authenticateToken, artworkController.getUserArtworks);

export default router;
