import { useState, useEffect } from 'react';
import { PracticeSession } from '../types';

const STORAGE_KEY = 'soroban-sessions';
const MAX_SESSIONS = 50; // Mantener solo las últimas 50 sesiones

export function useSessionHistory() {
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load sessions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSessions(parsed);
      } catch (error) {
        console.error('Error loading sessions:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    }
  }, [sessions, isLoaded]);

  const addSession = (session: Omit<PracticeSession, 'id' | 'date'>) => {
    const newSession: PracticeSession = {
      ...session,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };

    setSessions(prev => {
      const updated = [newSession, ...prev].slice(0, MAX_SESSIONS);
      return updated;
    });
  };

  const deleteSession = (id: string) => {
    setSessions(prev => prev.filter(session => session.id !== id));
  };

  const clearHistory = () => {
    setSessions([]);
  };

  const getSessionById = (id: string) => {
    return sessions.find(session => session.id === id);
  };

  return {
    sessions,
    addSession,
    deleteSession,
    clearHistory,
    getSessionById,
    isLoaded,
  };
} 