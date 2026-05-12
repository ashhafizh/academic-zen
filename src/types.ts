export type ViewType = 'Dashboard' | 'Study' | 'Library' | 'Analytics';

export interface VocabularyWord {
  id: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  category: 'Noun' | 'Verb' | 'Adjective' | 'Phrase' | 'Academic' | 'Scholarly';
  status: 'New' | 'Learning' | 'Mastered';
  lastSeen?: string;
  nextReview?: string;
  masteryPercent: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: 'locked' | 'unlocked' | 'in-progress';
  progress?: number;
  color: string;
}
