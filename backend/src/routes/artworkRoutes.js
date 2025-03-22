import express from 'express';
import * as artworkController from '../controllers/artworkController.js';
// import { authenticateToken } from '../middleware/authMiddleware.js'; // Auth later
// import multer from 'multer'; // No longer needed

const router = express.Router();

// No multer setup needed

// Remove authentication and multer from the /analyze route:
router.post('/analyze', artworkController.analyzeArtwork);

// Other routes (keep authentication as needed, but remove multer)
// router.post('/upload', authenticateToken, upload.single('image'), artworkController.uploadArtwork); // Old upload route, keep commented out
router.get('/history', artworkController.getArtworkHistory); // Keep auth as needed
router.get('/:id', artworkController.getArtwork);
router.get('/', artworkController.getAllArtworks);
router.get('/user', artworkController.getUserArtworks); // Keep auth as needed

export default router;
