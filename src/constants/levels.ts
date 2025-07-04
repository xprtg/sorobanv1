import { Level } from '../types';

export const LEVELS: Level[] = [
  {
    level: 1,
    name: 'Novato',
    xpRequired: 0,
    rewards: [],
    color: 'bg-gray-500',
    icon: '🌱',
  },
  {
    level: 2,
    name: 'Aprendiz',
    xpRequired: 50,
    rewards: [
      {
        type: 'theme',
        id: 'zen',
        name: 'Tema Zen',
        description: 'Diseño minimalista inspirado en la filosofía zen',
        icon: '🧘',
        unlocked: false,
      },
    ],
    color: 'bg-green-500',
    icon: '🌿',
  },
  {
    level: 3,
    name: 'Practicante',
    xpRequired: 150,
    rewards: [
      {
        type: 'avatar',
        id: 'meditation',
        name: 'Avatar Meditación',
        description: 'Ícono de meditación para tu perfil',
        icon: '🧘‍♀️',
        unlocked: false,
      },
    ],
    color: 'bg-blue-500',
    icon: '💧',
  },
  {
    level: 4,
    name: 'Estudiante',
    xpRequired: 300,
    rewards: [
      {
        type: 'theme',
        id: 'retro',
        name: 'Tema Retro',
        description: 'Estilo vintage de los años 80',
        icon: '🎮',
        unlocked: false,
      },
    ],
    color: 'bg-purple-500',
    icon: '📚',
  },
  {
    level: 5,
    name: 'Calculador',
    xpRequired: 500,
    rewards: [
      {
        type: 'badge',
        id: 'speed-demon',
        name: 'Insignia Velocidad',
        description: 'Demuestra tu rapidez mental',
        icon: '⚡',
        unlocked: false,
      },
    ],
    color: 'bg-yellow-500',
    icon: '⚡',
  },
  {
    level: 6,
    name: 'Experto',
    xpRequired: 800,
    rewards: [
      {
        type: 'theme',
        id: 'matrix',
        name: 'Tema Matrix',
        description: 'Inspirado en el mundo digital',
        icon: '💻',
        unlocked: false,
      },
    ],
    color: 'bg-indigo-500',
    icon: '🎯',
  },
  {
    level: 7,
    name: 'Maestro',
    xpRequired: 1200,
    rewards: [
      {
        type: 'avatar',
        id: 'sensei',
        name: 'Avatar Sensei',
        description: 'El maestro del ábaco',
        icon: '👨‍🏫',
        unlocked: false,
      },
    ],
    color: 'bg-red-500',
    icon: '🔥',
  },
  {
    level: 8,
    name: 'Gran Maestro',
    xpRequired: 1700,
    rewards: [
      {
        type: 'effect',
        id: 'particles',
        name: 'Efecto Partículas',
        description: 'Partículas doradas en los logros',
        icon: '✨',
        unlocked: false,
      },
    ],
    color: 'bg-pink-500',
    icon: '👑',
  },
  {
    level: 9,
    name: 'Leyenda',
    xpRequired: 2300,
    rewards: [
      {
        type: 'badge',
        id: 'legend',
        name: 'Insignia Leyenda',
        description: 'El más alto honor',
        icon: '🌟',
        unlocked: false,
      },
    ],
    color: 'bg-gradient-to-r from-yellow-400 to-orange-500',
    icon: '🌟',
  },
  {
    level: 10,
    name: 'Santo del Soroban',
    xpRequired: 3000,
    rewards: [
      {
        type: 'theme',
        id: 'divine',
        name: 'Tema Divino',
        description: 'El tema más exclusivo',
        icon: '👼',
        unlocked: false,
      },
    ],
    color: 'bg-gradient-to-r from-purple-400 to-pink-500',
    icon: '👼',
  },
];

export function getLevelByXP(xp: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpRequired) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

export function getNextLevel(currentXP: number): Level | null {
  const currentLevel = getLevelByXP(currentXP);
  const nextLevelIndex = LEVELS.findIndex(level => level.level === currentLevel.level + 1);
  return nextLevelIndex >= 0 ? LEVELS[nextLevelIndex] : null;
}

export function calculateXPProgress(currentXP: number): { current: number; next: number; progress: number } {
  const currentLevel = getLevelByXP(currentXP);
  const nextLevel = getNextLevel(currentXP);
  
  if (!nextLevel) {
    return { current: currentXP, next: currentLevel.xpRequired, progress: 100 };
  }
  
  const xpInCurrentLevel = currentXP - currentLevel.xpRequired;
  const xpNeededForNextLevel = nextLevel.xpRequired - currentLevel.xpRequired;
  const progress = (xpInCurrentLevel / xpNeededForNextLevel) * 100;
  
  return {
    current: xpInCurrentLevel,
    next: xpNeededForNextLevel,
    progress: Math.min(progress, 100),
  };
}

export function calculateXPEarned(session: any): number {
  let xp = 0;
  
  // XP base por números mostrados
  xp += session.numbers.length;
  
  // XP bonus por acierto exacto
  if (session.isCorrect) {
    xp += 5;
  }
  
  // XP bonus por velocidad (si es rápido)
  if (session.duration < 30 && session.numbers.length >= 10) {
    xp += 3;
  }
  
  // XP bonus por precisión alta
  if (session.isCorrect && session.numbers.length >= 15) {
    xp += 2;
  }
  
  // XP bonus por modo Pro
  if (session.config.numberOfNumbers === 20) {
    xp += 2;
  }
  
  return xp;
} 