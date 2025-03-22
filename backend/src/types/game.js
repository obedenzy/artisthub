// Shared types for the backend
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

export interface GameQuestion {
  id: string;
  type: GameType;
  question: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
  imageUrl?: string;
  details?: any; // For additional data like coordinates, differences, etc.
  hint?: string;
}

export interface GamePrize {
    rank: number;
    type: 'monetary' | 'custom';
    amount?: number;
    description?: string;
    imageUrl?: string;
}

  export interface Game {
    id: string;
    title: string;
    description: string;
    type: GameType;
    artwork_id: string; // Use artwork ID, not the full artwork object
    questions: GameQuestion[];
    created_by: string;
    created_at?: string; // Use strings for dates from Supabase
    updated_at?: string;
    start_date: Date;
    end_date: Date;
    is_finished: boolean;
    difficulty: 'easy' | 'medium' | 'hard';
    time_limit: number;
    max_participants: number;
    entry_fee: number;
    prizes: GamePrize[];
    participants: string[];
    tags: string[];
  }

  export interface GameTemplate {
    type: GameType;
    title: string;
    description: string;
    icon: string; // Assuming you'll use icon names as strings
    minQuestions: number;
    maxQuestions: number;
    supportedQuestionTypes: GameType[];
  }
