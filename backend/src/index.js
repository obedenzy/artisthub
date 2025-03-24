import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js'; // Import directly

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
const port = process.env.PORT || 3002;

// Enable CORS for all origins (for development - change in production!)
app.use(cors({
  origin: '*' // IMPORTANT: Replace with your frontend's URL in production!
}));

// Increase the request size limit to 50mb
app.use(express.json({ limit: '50mb' }));

// --- Supabase Connection Setup and Testing ---

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log("Supabase URL (truncated):", supabaseUrl ? supabaseUrl.substring(0, 20) + "..." : "NOT FOUND");
console.log("Supabase Key (truncated):", supabaseKey ? supabaseKey.substring(0, 20) + "..." : "NOT FOUND");

if (!supabaseUrl || !supabaseKey) {
  console.error("CRITICAL ERROR: SUPABASE_URL and SUPABASE_KEY must be provided in .env file. Exiting.");
  process.exit(1); // Exit with an error code
}

let supabase; // Declare outside the try block

try {
  supabase = createClient(supabaseUrl, supabaseKey);
} catch (error) {
  console.error("CRITICAL ERROR: Failed to initialize Supabase client:", error);
  process.exit(1); // Exit with an error code
}

async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('artworks').select('id').limit(1);
    if (error) {
      console.error("Supabase connection test FAILED:", error);
      return false;
    } else {
      console.log("Supabase connection test SUCCESSFUL:", data);
      return true;
    }
  } catch (error) {
    console.error("Supabase connection test FAILED (exception):", error);
    return false;
  }
}

// --- End Supabase Setup ---

// Mount route handlers
app.use('/api', authRoutes);
app.use('/api/artworks', artworkRoutes);
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

// Custom error handling (for JSON parsing and payload size)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('JSON SyntaxError:', err);
    return res.status(400).send({ message: "Invalid JSON payload" });
  }
  if (err.type === 'entity.too.large') {
    console.error('Payload Too Large Error:', err);
    return res.status(413).json({ message: 'Payload too large.  Maximum size is 50mb.' });
  }
  next(err); // Pass other errors to the default error handler
});

// Start the server *after* testing the connection
testSupabaseConnection().then(connected => {
    if (connected) {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } else {
        console.error("CRITICAL ERROR: Could not connect to Supabase.  Server not started.");
        process.exit(1);
    }
});
