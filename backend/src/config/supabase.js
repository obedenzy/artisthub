import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log("Supabase URL (truncated):", supabaseUrl ? supabaseUrl.substring(0, 20) + "..." : "NOT FOUND");
console.log("Supabase Key (truncated):", supabaseKey ? supabaseKey.substring(0, 20) + "..." : "NOT FOUND");

if (!supabaseUrl || !supabaseKey) {
  throw new Error("SUPABASE_URL and SUPABASE_KEY must be provided in .env file");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
