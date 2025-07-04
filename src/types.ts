export interface PracticeConfig {
  timeBetweenNumbers: number;
  numberOfNumbers: number;
  minNumber: number;
  maxNumber: number;
  voiceEnabled: boolean;
  darkMode: boolean;
  showRealTimeSum: boolean;
  visualStyle: 'apple' | 'professional' | 'dojo' | 'neumorphism' | 'minimal-dark' | 'zen' | 'retro' | 'matrix';
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
  visualStyle: 'apple' | 'professional' | 'dojo' | 'neumorphism' | 'minimal-dark' | 'zen' | 'retro' | 'matrix';
  fontSize: 'normal' | 'large';
  fontFamily: 'sf-pro' | 'inter' | 'atkinson';
  highContrast: boolean;
  notificationsEnabled: boolean;
  language: 'es' | 'en';
  soundEnabled: boolean;
  expertMode: boolean;
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
  xpEarned: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'progress' | 'performance' | 'challenges' | 'style';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  unlocked: boolean;
  unlockedDate?: string;
  progress: number;
  maxProgress: number;
  color: string;
  isSecret: boolean;
  reward?: Reward;
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
  totalXP: number;
  currentLevel: number;
  currentXP: number;
  xpToNextLevel: number;
  bestSessionAccuracy: number;
  bestSessionSpeed: number;
  longestSession: number;
  totalPerfectSessions: number;
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

export interface UserProfile {
  id: string;
  name: string;
  nickname?: string;
  avatar: string;
  level: number;
  totalXP: number;
  joinDate: string;
  preferences: UserPreferences;
  unlockedThemes: string[];
  unlockedAvatars: string[];
  achievements: string[];
  bestSessions: PracticeSession[];
}

export interface Level {
  level: number;
  name: string;
  xpRequired: number;
  rewards: Reward[];
  color: string;
  icon: string;
}

export interface Reward {
  type: 'theme' | 'avatar' | 'effect' | 'badge';
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface Localization {
  [key: string]: {
    [key: string]: string | { [key: string]: string };
  };
}

export interface TopSession {
  id: string;
  date: string;
  accuracy: number;
  speed: number;
  duration: number;
  numbersCount: number;
  xpEarned: number;
} 