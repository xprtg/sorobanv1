import { useState, useEffect } from 'react';
import { UserStats, PracticeSession } from '../types';

const STORAGE_KEY = 'soroban-stats';

const defaultStats: UserStats = {
  totalSessions: 0,
  totalPracticeTime: 0,
  exactMatches: 0,
  consecutiveDays: 0,
  currentStreak: 0,
  bestStreak: 0,
  averageAccuracy: 0,
  lastPracticeDate: '',
  totalNumbersPracticed: 0,
};

export function useStats() {
  const [stats, setStats] = useState<UserStats>(defaultStats);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load stats from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setStats(parsed);
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save stats to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    }
  }, [stats, isLoaded]);

  const calculateStats = (sessions: PracticeSession[]) => {
    if (sessions.length === 0) {
      setStats(defaultStats);
      return;
    }

    const totalSessions = sessions.length;
    const totalPracticeTime = sessions.reduce((sum, s) => sum + s.duration, 0);
    const exactMatches = sessions.filter(s => s.isCorrect).length;
    const totalNumbersPracticed = sessions.reduce((sum, s) => sum + s.numbers.length, 0);
    const averageAccuracy = exactMatches / totalSessions;

    // Calculate streak
    const sortedSessions = sessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const today = new Date().toDateString();
    const lastPracticeDate = new Date(sortedSessions[0].date).toDateString();

    let currentStreak = 0;
    let bestStreak = 0;
    let tempStreak = 0;
    let lastDate = '';

    // Group sessions by date
    const sessionsByDate = new Map<string, PracticeSession[]>();
    sortedSessions.forEach(session => {
      const date = new Date(session.date).toDateString();
      if (!sessionsByDate.has(date)) {
        sessionsByDate.set(date, []);
      }
      sessionsByDate.get(date)!.push(session);
    });

    const dates = Array.from(sessionsByDate.keys()).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    // Calculate current streak
    for (let i = 0; i < dates.length; i++) {
      const currentDate = new Date(dates[i]);
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - i);
      
      if (currentDate.toDateString() === expectedDate.toDateString()) {
        currentStreak++;
      } else {
        break;
      }
    }

    // Calculate best streak
    for (let i = 0; i < dates.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const currentDate = new Date(dates[i]);
        const previousDate = new Date(dates[i - 1]);
        const dayDiff = Math.floor((previousDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (dayDiff === 1) {
          tempStreak++;
        } else {
          bestStreak = Math.max(bestStreak, tempStreak);
          tempStreak = 1;
        }
      }
    }
    bestStreak = Math.max(bestStreak, tempStreak);

    const newStats: UserStats = {
      totalSessions,
      totalPracticeTime,
      exactMatches,
      consecutiveDays: currentStreak,
      currentStreak,
      bestStreak,
      averageAccuracy,
      lastPracticeDate: sortedSessions[0].date,
      totalNumbersPracticed,
    };

    setStats(newStats);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const formatAccuracy = (accuracy: number) => {
    return `${(accuracy * 100).toFixed(1)}%`;
  };

  return {
    stats,
    calculateStats,
    formatTime,
    formatAccuracy,
    isLoaded,
  };
} 