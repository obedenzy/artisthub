import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Import route handlers
import authRoutes from './routes/authRoutes.js';
import artworkRoutes from './routes/artworkRoutes.js';
import userRoutes from './routes/userRoutes.js';
import gameRoutes from './routes/gameRoutes.js';

// __dirname workaround for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

// Define the port. Use the environment variable PORT if available, otherwise default to 3002.
const port = process.env.PORT || 3002;

// Enable CORS for all origins (for development).  MUST BE CONFIGURED FOR PRODUCTION.
app.use(cors({
  origin: '*' //  Replace with your frontend's URL in production!
}));

// Increase the request size limit to 50mb
app.use(express.json({ limit: '50mb' }));


// Mount the route handlers
app.use('/api', authRoutes);
app.use('/api/artworks', artworkRoutes);
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

// Custom error handling for payload too large and invalid JSON
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('JSON SyntaxError:', err);
    return res.status(400).send({ message: "Invalid JSON payload" }); // Bad request
  }
  if (err.type === 'entity.too.large') {
    console.error('Payload Too Large Error:', err);
    return res.status(413).json({ message: 'Payload too large.  Maximum size is 50mb.' }); // Payload Too Large
  }
  next(err); // Pass other errors to the default error handler
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
