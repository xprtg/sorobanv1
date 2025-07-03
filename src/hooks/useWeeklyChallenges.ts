import { useState, useEffect } from 'react';
import { WeeklyChallenge, PracticeSession } from '../types';
import { getCurrentWeekChallenge } from '../constants/challenges';

const STORAGE_KEY = 'soroban-weekly-challenges';

export function useWeeklyChallenges() {
  const [currentChallenge, setCurrentChallenge] = useState<WeeklyChallenge | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load challenges from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCompletedChallenges(parsed.completedChallenges || []);
        setCurrentChallenge(parsed.currentChallenge || getCurrentWeekChallenge());
      } catch (error) {
        console.error('Error loading challenges:', error);
        setCurrentChallenge(getCurrentWeekChallenge());
      }
    } else {
      setCurrentChallenge(getCurrentWeekChallenge());
    }
    setIsLoaded(true);
  }, []);

  // Save challenges to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        currentChallenge,
        completedChallenges,
      }));
    }
  }, [currentChallenge, completedChallenges, isLoaded]);

  // Check if we need to update the challenge (new week)
  useEffect(() => {
    if (currentChallenge && isLoaded) {
      const now = new Date();
      const endDate = new Date(currentChallenge.endDate);
      
      if (now > endDate) {
        // New week, get new challenge
        const newChallenge = getCurrentWeekChallenge();
        setCurrentChallenge(newChallenge);
      }
    }
  }, [currentChallenge, isLoaded]);

  const updateChallengeProgress = (sessions: PracticeSession[]) => {
    if (!currentChallenge) return;

    let progress = 0;
    const challengeStart = new Date(currentChallenge.startDate);
    const challengeEnd = new Date(currentChallenge.endDate);

    // Filter sessions within the challenge period
    const relevantSessions = sessions.filter(session => {
      const sessionDate = new Date(session.date);
      return sessionDate >= challengeStart && sessionDate <= challengeEnd;
    });

    switch (currentChallenge.id) {
      case 'speed-beginner':
      case 'speed-intermediate':
      case 'speed-expert':
        // Count sessions completed within time limit
        progress = relevantSessions.filter(s => 
          s.duration <= (currentChallenge.timeLimit || Infinity) && 
          s.numbers.length >= currentChallenge.goal
        ).length;
        break;

      case 'accuracy-beginner':
      case 'accuracy-intermediate':
      case 'accuracy-expert':
        // Count perfect sessions
        progress = relevantSessions.filter(s => s.isCorrect).length;
        break;

      case 'consistency-beginner':
        // Count consecutive days
        const dates = [...new Set(relevantSessions.map(s => 
          new Date(s.date).toDateString()
        ))].sort();
        let consecutiveDays = 0;
        let maxConsecutive = 0;
        let currentConsecutive = 0;
        
        for (let i = 0; i < dates.length; i++) {
          if (i === 0) {
            currentConsecutive = 1;
          } else {
            const currentDate = new Date(dates[i]);
            const previousDate = new Date(dates[i - 1]);
            const dayDiff = Math.floor((currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24));
            
            if (dayDiff === 1) {
              currentConsecutive++;
            } else {
              maxConsecutive = Math.max(maxConsecutive, currentConsecutive);
              currentConsecutive = 1;
            }
          }
        }
        maxConsecutive = Math.max(maxConsecutive, currentConsecutive);
        progress = Math.min(maxConsecutive, currentChallenge.goal);
        break;

      case 'pro-challenge':
        // Count pro mode sessions without errors
        progress = relevantSessions.filter(s => 
          s.config.numberOfNumbers === 20 && s.isCorrect
        ).length;
        break;

      case 'marathon':
        // Count total numbers in free mode
        progress = relevantSessions
          .filter(s => s.config.numberOfNumbers === -1)
          .reduce((sum, s) => sum + s.numbers.length, 0);
        break;

      case 'perfect-week':
        // Count consecutive days with perfect results
        const perfectDates = [...new Set(relevantSessions
          .filter(s => s.isCorrect)
          .map(s => new Date(s.date).toDateString())
        )].sort();
        
        let perfectConsecutive = 0;
        for (let i = 0; i < perfectDates.length; i++) {
          if (i === 0) {
            perfectConsecutive = 1;
          } else {
            const currentDate = new Date(perfectDates[i]);
            const previousDate = new Date(perfectDates[i - 1]);
            const dayDiff = Math.floor((currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24));
            
            if (dayDiff === 1) {
              perfectConsecutive++;
            } else {
              break;
            }
          }
        }
        progress = Math.min(perfectConsecutive, currentChallenge.goal);
        break;

      default:
        progress = 0;
    }

    const newChallenge = {
      ...currentChallenge,
      progress: Math.min(progress, currentChallenge.goal),
      completed: progress >= currentChallenge.goal,
    };

    setCurrentChallenge(newChallenge);

    // Check if challenge was just completed
    if (newChallenge.completed && !completedChallenges.includes(newChallenge.id)) {
      setCompletedChallenges(prev => [...prev, newChallenge.id]);
    }
  };

  const getCompletedCount = () => {
    return completedChallenges.length;
  };

  const isChallengeCompleted = (challengeId: string) => {
    return completedChallenges.includes(challengeId);
  };

  return {
    currentChallenge,
    updateChallengeProgress,
    getCompletedCount,
    isChallengeCompleted,
    isLoaded,
  };
} 