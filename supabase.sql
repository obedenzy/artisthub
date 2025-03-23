-- Create the 'users' table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- Use UUIDs for user IDs
    username TEXT NOT NULL UNIQUE,                 -- Username (unique)
    email TEXT NOT NULL UNIQUE,                    -- Email (unique)
    password TEXT NOT NULL,                        -- Hashed password
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the 'artworks' table
CREATE TABLE artworks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- Use UUIDs for artwork IDs
    user_id UUID REFERENCES users(id) ON DELETE CASCADE, -- Foreign key to users table
    image_url TEXT NOT NULL,                       -- URL of the artwork image
    title TEXT,                                   -- Title of the artwork
    artist TEXT,                                  -- Artist of the artwork
    date_created TEXT,                            -- Date the artwork was created
    medium TEXT,                                  -- Medium of the artwork (e.g., "Oil on canvas")
    dimensions JSONB,                               -- Dimensions (e.g., { "height": 100, "width": 80, "unit": "cm" })
    style TEXT,                                   -- Art style (e.g., "Impressionism")
    movement TEXT,                                -- Art movement (e.g., "Post-Impressionism")
    influences TEXT[],                             -- Array of influences
    techniques TEXT[],                             -- Array of techniques used
    composition TEXT,                               -- Description of the composition
    color_palette TEXT[],                          -- Array of hex color codes
    perspective TEXT,                               -- Description of the perspective
    texture TEXT,                                   -- Description of the texture
    lighting TEXT,                                  -- Description of the lighting
    historical_period TEXT,                         -- Historical period of the artwork
    cultural_background TEXT,                       -- Cultural background of the artwork
    political_context TEXT,                         -- Political context (optional)
    philosophical_context TEXT,                    -- Philosophical context (optional)
    theme TEXT,                                   -- Main theme of the artwork
    narrative TEXT,                                -- Narrative of the artwork (optional)
    symbols JSONB[],                               -- Array of symbols and their meanings (e.g., [{ "element": "Rose", "meaning": "Love" }])
    subject_type TEXT,                              -- Type of subject (e.g., "portrait", "landscape")
    origin JSONB,                                  -- Origin information (location, date)
    ownership_history JSONB[],                      -- Array of ownership records
    current_location TEXT,                          -- Current location of the artwork
    estimated_value NUMERIC,                       -- Estimated value (optional)
    exhibitions JSONB[],                            -- Array of exhibition records
    market_trends JSONB,                            -- Market trends data (optional)
    popularity_metrics JSONB,                      -- Popularity metrics (optional)
    critical_reception TEXT,                       -- Critical reception of the artwork
    cultural_impact TEXT,                          -- Cultural impact of the artwork
    current_significance TEXT,                     -- Current significance of the artwork
    hasDigitalReconstruction BOOLEAN,            -- Whether a digital reconstruction exists
    digital_insights JSONB,                         -- Digital insights (optional)
    ai_analysis JSONB,                              -- AI analysis results (optional)
    scholarly_analysis JSONB[],                     -- Array of scholarly analysis records
    related_works JSONB[],                          -- Array of related works
    purpose TEXT,                                   -- Purpose of the artwork
    inspiration TEXT,                               -- Inspiration for the artwork (optional)
    intended_message TEXT,                         -- Intended message of the artwork (optional)
    fun_facts TEXT[],                              -- Array of fun facts
    artist_signature TEXT,                         -- Description of the artist's signature (optional)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    uploaded_by TEXT                               -- ID of the user who uploaded the artwork
);

-- Create the 'games' table
CREATE TABLE games (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL,  -- e.g., 'quiz', 'matching', 'timeline'
    artwork_id UUID REFERENCES artworks(id) ON DELETE CASCADE, -- Foreign key to artworks
    questions JSONB[] NOT NULL,  -- Array of questions (JSON format)
    created_by UUID REFERENCES users(id) ON DELETE SET NULL, -- Foreign key to users, allow null on delete
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    is_finished BOOLEAN DEFAULT FALSE,
    difficulty TEXT, -- e.g., 'easy', 'medium', 'hard'
    time_limit INTEGER, -- Time limit in minutes
    max_participants INTEGER,
    entry_fee NUMERIC,
    prizes JSONB[],   -- Array of prizes (e.g., [{ "rank": 1, "amount": 100 }])
    participants UUID[], -- Array of user IDs participating
    tags TEXT[]       -- Array of tags
);

-- Create the 'artwork_analysis' table
CREATE TABLE artwork_analysis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    artwork_id UUID REFERENCES artworks(id) ON DELETE CASCADE,
    analysis JSONB NOT NULL,  -- Store the entire JSON analysis from Gemini
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on all tables (for later use with Supabase policies)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE artwork_analysis ENABLE ROW LEVEL SECURITY;

-- Add indexes for performance (optional, but recommended)
CREATE INDEX idx_artworks_user_id ON artworks (user_id);
CREATE INDEX idx_games_artwork_id ON games (artwork_id);
CREATE INDEX idx_artwork_analysis_artwork_id ON artwork_analysis (artwork_id);

-- Function to update 'updated_at' column automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to update 'updated_at' on modification
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_artworks_updated_at
BEFORE UPDATE ON artworks
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_games_updated_at
BEFORE UPDATE ON games
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_artwork_analysis_updated_at
BEFORE UPDATE ON artwork_analysis
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
