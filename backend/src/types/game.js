/**
 * Shared types for the backend.
 * Defines the structure of Game, GameQuestion, GamePrize, and GameTemplate.
 */

// Define GameType as a union of string literals.  This is the correct and preferred way.
export type GameType =
  | 'movement'
  | 'trivia'
  | 'spot-fake'
  | 'puzzle'
  | 'symbols'
  | 'matching'
  | 'story'
  | 'quiz'
  | 'mystery'
  | 'color'
  | 'era'
  | 'zoom'
  | 'emoji'
  | 'price'
  | 'difference'
  | 'fact'
  | 'detail'
  | 'reverse'
  | 'timeline'
  | 'artist';

// Define the structure of a single game question.
export interface GameQuestion {
  id: string;
  type: GameType;
  question: string;
  options?: string[]; // Optional array of strings for multiple-choice questions.
  correctAnswer?: string; // Optional correct answer (string for multiple-choice, or other formats as needed).
  points: number;
  imageUrl?: string; // Optional image URL for the question.
  details?: any;     // Optional field for game-specific details (e.g., coordinates for "zoom" game).
  hint?: string;     // Optional hint for the question.
}

// Define the structure of a game prize.
export interface GamePrize {
  rank: number;
  type: 'monetary' | 'custom';
  amount?: number;    // Amount for monetary prizes.
  description?: string; // Description for custom prizes.
  imageUrl?: string;   // Image URL for custom prizes.
}

// Define the main Game interface.
export interface Game {
  id: string;
  title: string;
  description: string;
  type: GameType;
  artwork_id: string; // Reference to the artwork ID.
  questions: GameQuestion[];
  created_by: string; // User ID of the creator.
  created_at?: string; // Use string for dates from Supabase.
  updated_at?: string; // Use string for dates from Supabase.
  start_date: Date;
  end_date: Date;
  is_finished: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  time_limit: number; // Time limit in minutes.
  max_participants: number;
  entry_fee: number;
  prizes: GamePrize[];
  participants: string[]; // Array of user IDs.
  tags: string[];
}

// Define the structure of a game template (for pre-defined game types).
export interface GameTemplate {
  type: GameType;
  title: string;
  description: string;
  icon: string; // Icon name (string).
  minQuestions: number;
  maxQuestions: number;
  supportedQuestionTypes: GameType[];
}
