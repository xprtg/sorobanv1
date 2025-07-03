import { useState, useEffect } from 'react';
import { Achievement, PracticeSession, UserStats } from '../types';
import { ACHIEVEMENTS } from '../constants/achievements';

const STORAGE_KEY = 'soroban-achievements';

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load achievements from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAchievements(parsed);
      } catch (error) {
        console.error('Error loading achievements:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save achievements to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(achievements));
    }
  }, [achievements, isLoaded]);

  const updateAchievement = (id: string, progress: number, unlocked: boolean = false) => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === id) {
        return {
          ...achievement,
          progress,
          unlocked: unlocked || progress >= achievement.maxProgress,
          unlockedDate: (unlocked || progress >= achievement.maxProgress) && !achievement.unlocked 
            ? new Date().toISOString() 
            : achievement.unlockedDate,
        };
      }
      return achievement;
    }));
  };

  const checkAchievements = (sessions: PracticeSession[], stats: UserStats) => {
    const newUnlockedAchievements: Achievement[] = [];

    // First practice
    if (stats.totalSessions >= 1) {
      updateAchievement('first-practice', 1, true);
    }

    // Five sessions
    updateAchievement('five-sessions', Math.min(stats.totalSessions, 5));

    // First perfect
    if (stats.exactMatches >= 1) {
      updateAchievement('first-perfect', 1, true);
    }

    // Ten perfect
    updateAchievement('ten-perfect', Math.min(stats.exactMatches, 10));

    // Three day streak
    updateAchievement('three-day-streak', Math.min(stats.currentStreak, 3));

    // Week streak
    updateAchievement('week-streak', Math.min(stats.currentStreak, 7));

    // Pro mode
    const proSessions = sessions.filter(s => s.config.numberOfNumbers === 20);
    if (proSessions.length >= 1) {
      updateAchievement('pro-mode', 1, true);
    }

    // Free mode master
    const freeModeSessions = sessions.filter(s => s.config.numberOfNumbers === -1);
    const totalFreeNumbers = freeModeSessions.reduce((sum, s) => sum + s.numbers.length, 0);
    updateAchievement('free-mode-master', Math.min(totalFreeNumbers, 50));

    // Speed demon
    const fastSessions = sessions.filter(s => s.duration < 30 && s.numbers.length >= 10);
    if (fastSessions.length >= 1) {
      updateAchievement('speed-demon', 1, true);
    }

    // Accuracy master
    const recentSessions = sessions.slice(-20);
    if (recentSessions.length >= 20) {
      const accuracy = recentSessions.filter(s => s.isCorrect).length / recentSessions.length;
      if (accuracy >= 0.95) {
        updateAchievement('accuracy-master', 20, true);
      } else {
        updateAchievement('accuracy-master', recentSessions.filter(s => s.isCorrect).length);
      }
    }

    // Month streak
    updateAchievement('month-streak', Math.min(stats.currentStreak, 30));

    // Speed legend
    const ultraFastSessions = sessions.filter(s => s.duration < 60 && s.numbers.length >= 20);
    if (ultraFastSessions.length >= 1) {
      updateAchievement('speed-legend', 1, true);
    }

    // Ultimate streak
    updateAchievement('ultimate-streak', Math.min(stats.currentStreak, 100));

    // Check for newly unlocked achievements
    achievements.forEach(achievement => {
      if (!achievement.unlocked && achievement.progress >= achievement.maxProgress) {
        newUnlockedAchievements.push(achievement);
      }
    });

    return newUnlockedAchievements;
  };

  const getUnlockedCount = () => {
    return achievements.filter(a => a.unlocked).length;
  };

  const getTotalCount = () => {
    return achievements.length;
  };

  const getAchievementsByCategory = (category: string) => {
    return achievements.filter(a => a.category === category);
  };

  return {
    achievements,
    checkAchievements,
    getUnlockedCount,
    getTotalCount,
    getAchievementsByCategory,
    isLoaded,
  };
} 