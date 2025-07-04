import { useState, useEffect } from 'react';
import { UserStats, PracticeSession } from '../types';
import { LEVELS, getLevelByXP, getNextLevel, calculateXPProgress, calculateXPEarned } from '../constants/levels';

export function useLevels() {
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('soroban-stats');
    return saved ? JSON.parse(saved) : {
      totalSessions: 0,
      totalPracticeTime: 0,
      exactMatches: 0,
      consecutiveDays: 0,
      currentStreak: 0,
      bestStreak: 0,
      averageAccuracy: 0,
      lastPracticeDate: '',
      totalNumbersPracticed: 0,
      totalXP: 0,
      currentLevel: 1,
      currentXP: 0,
      xpToNextLevel: 50,
      bestSessionAccuracy: 0,
      bestSessionSpeed: 0,
      longestSession: 0,
      totalPerfectSessions: 0,
    };
  });

  const [levelUpNotification, setLevelUpNotification] = useState<{
    show: boolean;
    newLevel: number;
    rewards: any[];
  }>({ show: false, newLevel: 0, rewards: [] });

  const currentLevel = getLevelByXP(stats.totalXP);
  const nextLevel = getNextLevel(stats.totalXP);
  const xpProgress = calculateXPProgress(stats.totalXP);

  // Save stats to localStorage
  useEffect(() => {
    localStorage.setItem('soroban-stats', JSON.stringify(stats));
  }, [stats]);

  // Add XP from a practice session
  const addXPFromSession = (session: PracticeSession) => {
    const xpEarned = calculateXPEarned(session);
    const newTotalXP = stats.totalXP + xpEarned;
    const oldLevel = getLevelByXP(stats.totalXP);
    const newLevel = getLevelByXP(newTotalXP);

    setStats(prev => ({
      ...prev,
      totalXP: newTotalXP,
      currentLevel: newLevel.level,
      currentXP: xpProgress.current + xpEarned,
      xpToNextLevel: nextLevel ? nextLevel.xpRequired - newLevel.xpRequired : 0,
    }));

    // Check for level up
    if (newLevel.level > oldLevel.level) {
      setLevelUpNotification({
        show: true,
        newLevel: newLevel.level,
        rewards: newLevel.rewards,
      });

      // Auto-hide notification after 5 seconds
      setTimeout(() => {
        setLevelUpNotification({ show: false, newLevel: 0, rewards: [] });
      }, 5000);
    }

    return xpEarned;
  };

  // Update stats from a practice session
  const updateStatsFromSession = (session: PracticeSession) => {
    const xpEarned = addXPFromSession(session);
    
    setStats(prev => {
      const today = new Date().toDateString();
      const lastPractice = prev.lastPracticeDate ? new Date(prev.lastPracticeDate).toDateString() : '';
      
      let newConsecutiveDays = prev.consecutiveDays;
      let newCurrentStreak = prev.currentStreak;
      
      if (today !== lastPractice) {
        if (lastPractice && isConsecutiveDay(lastPractice, today)) {
          newCurrentStreak = prev.currentStreak + 1;
        } else {
          newCurrentStreak = 1;
        }
        newConsecutiveDays = Math.max(newConsecutiveDays, newCurrentStreak);
      }

      const accuracy = session.isCorrect ? 100 : 0;
      const totalSessions = prev.totalSessions + 1;
      const totalPerfectSessions = prev.totalPerfectSessions + (session.isCorrect ? 1 : 0);
      
      // Calculate session speed (numbers per minute)
      const sessionSpeed = session.duration > 0 ? (session.numbers.length / (session.duration / 60)) : 0;
      
      return {
        ...prev,
        totalSessions,
        totalPracticeTime: prev.totalPracticeTime + session.duration,
        exactMatches: prev.exactMatches + (session.isCorrect ? 1 : 0),
        consecutiveDays: newConsecutiveDays,
        currentStreak: newCurrentStreak,
        bestStreak: Math.max(prev.bestStreak, newCurrentStreak),
        averageAccuracy: totalSessions > 1 ? ((prev.averageAccuracy * (totalSessions - 1)) + accuracy) / totalSessions : accuracy,
        lastPracticeDate: new Date().toISOString(),
        totalNumbersPracticed: prev.totalNumbersPracticed + session.numbers.length,
        bestSessionAccuracy: Math.max(prev.bestSessionAccuracy, accuracy),
        bestSessionSpeed: Math.max(prev.bestSessionSpeed, sessionSpeed),
        longestSession: Math.max(prev.longestSession, session.duration),
        totalPerfectSessions,
      };
    });
  };

  // Check if two dates are consecutive
  const isConsecutiveDay = (date1: string, date2: string): boolean => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1;
  };

  // Get level info
  const getLevelInfo = (level: number) => {
    return LEVELS.find(l => l.level === level);
  };

  // Get all levels
  const getAllLevels = () => LEVELS;

  // Close level up notification
  const closeLevelUpNotification = () => {
    setLevelUpNotification({ show: false, newLevel: 0, rewards: [] });
  };

  return {
    stats,
    currentLevel,
    nextLevel,
    xpProgress,
    levelUpNotification,
    addXPFromSession,
    updateStatsFromSession,
    getLevelInfo,
    getAllLevels,
    closeLevelUpNotification,
  };
} 