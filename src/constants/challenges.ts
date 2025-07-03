import { WeeklyChallenge } from '../types';

export const WEEKLY_CHALLENGES: Omit<WeeklyChallenge, 'completed' | 'progress' | 'startDate' | 'endDate'>[] = [
  // Easy Challenges
  {
    id: 'speed-beginner',
    title: 'Velocidad Básica',
    description: 'Completa 10 números en menos de 2 minutos',
    goal: 10,
    timeLimit: 120,
    difficulty: 'easy',
    reward: '🏃',
  },
  {
    id: 'accuracy-beginner',
    title: 'Precisión Básica',
    description: 'Obtén 3 resultados exactos en una sesión',
    goal: 3,
    difficulty: 'easy',
    reward: '🎯',
  },
  {
    id: 'consistency-beginner',
    title: 'Constancia Básica',
    description: 'Practica 3 días consecutivos',
    goal: 3,
    difficulty: 'easy',
    reward: '📅',
  },

  // Medium Challenges
  {
    id: 'speed-intermediate',
    title: 'Velocidad Intermedia',
    description: 'Completa 20 números en menos de 3 minutos',
    goal: 20,
    timeLimit: 180,
    difficulty: 'medium',
    reward: '⚡',
  },
  {
    id: 'accuracy-intermediate',
    title: 'Precisión Intermedia',
    description: 'Obtén 5 resultados exactos consecutivos',
    goal: 5,
    difficulty: 'medium',
    reward: '🎖️',
  },
  {
    id: 'pro-challenge',
    title: 'Desafío Pro',
    description: 'Completa una sesión en modo Pro sin errores',
    goal: 1,
    difficulty: 'medium',
    reward: '🔥',
  },

  // Hard Challenges
  {
    id: 'speed-expert',
    title: 'Velocidad Experta',
    description: 'Completa 30 números en menos de 2 minutos',
    goal: 30,
    timeLimit: 120,
    difficulty: 'hard',
    reward: '🚀',
  },
  {
    id: 'accuracy-expert',
    title: 'Precisión Experta',
    description: 'Mantén 100% de precisión en 10 sesiones',
    goal: 10,
    difficulty: 'hard',
    reward: '💎',
  },
  {
    id: 'marathon',
    title: 'Maratón de Números',
    description: 'Completa 50 números en modo libre',
    goal: 50,
    difficulty: 'hard',
    reward: '🏆',
  },
  {
    id: 'perfect-week',
    title: 'Semana Perfecta',
    description: 'Obtén resultados exactos en 7 días consecutivos',
    goal: 7,
    difficulty: 'hard',
    reward: '👑',
  },
];

export function getCurrentWeekChallenge(): WeeklyChallenge {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  // Use week number to select challenge
  const weekNumber = Math.floor(now.getTime() / (7 * 24 * 60 * 60 * 1000));
  const challengeIndex = weekNumber % WEEKLY_CHALLENGES.length;
  const challenge = WEEKLY_CHALLENGES[challengeIndex];

  return {
    ...challenge,
    completed: false,
    progress: 0,
    startDate: startOfWeek.toISOString(),
    endDate: endOfWeek.toISOString(),
  };
} 