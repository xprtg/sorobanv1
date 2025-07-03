export interface PracticeConfig {
  timeBetweenNumbers: number;
  numberOfNumbers: number;
  minNumber: number;
  maxNumber: number;
  voiceEnabled: boolean;
  darkMode: boolean;
  showRealTimeSum: boolean;
  visualStyle: 'apple' | 'professional' | 'dojo' | 'neumorphism' | 'minimal-dark';
  fontSize: 'normal' | 'large';
  fontFamily: 'sf-pro' | 'inter' | 'atkinson';
  highContrast: boolean;
}

export interface PracticeState {
  currentNumber: number;
  numbersShown: number[];
  isShowing: boolean;
  isComplete: boolean;
  total: number;
  countdown: number;
  showNumbersList: boolean;
  userResult?: number;
  isCorrect?: boolean;
  difference?: number;
  isFreeMode: boolean;
  realTimeSum: number;
}

export interface UserPreferences {
  timeBetweenNumbers: number;
  numberOfNumbers: number;
  minNumber: number;
  maxNumber: number;
  voiceEnabled: boolean;
  darkMode: boolean;
  showRealTimeSum: boolean;
  visualStyle: 'apple' | 'professional' | 'dojo' | 'neumorphism' | 'minimal-dark';
  fontSize: 'normal' | 'large';
  fontFamily: 'sf-pro' | 'inter' | 'atkinson';
  highContrast: boolean;
  notificationsEnabled: boolean;
}

export interface DifficultyPreset {
  id: string;
  name: string;
  description: string;
  timeBetweenNumbers: number;
  numberOfNumbers: number;
  minNumber: number;
  maxNumber: number;
  color: string;
  icon: string;
}

export interface PracticeSession {
  id: string;
  date: string;
  config: PracticeConfig;
  numbers: number[];
  total: number;
  userResult?: number;
  isCorrect?: boolean;
  difference?: number;
  duration: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  unlocked: boolean;
  unlockedDate?: string;
  progress: number;
  maxProgress: number;
  color: string;
}

export interface UserStats {
  totalSessions: number;
  totalPracticeTime: number;
  exactMatches: number;
  consecutiveDays: number;
  currentStreak: number;
  bestStreak: number;
  averageAccuracy: number;
  lastPracticeDate: string;
  totalNumbersPracticed: number;
}

export interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  goal: number;
  timeLimit?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  reward: string;
  completed: boolean;
  progress: number;
  startDate: string;
  endDate: string;
}

export interface KeyboardShortcut {
  key: string;
  action: string;
  description: string;
} 