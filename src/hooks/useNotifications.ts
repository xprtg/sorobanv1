import { useState, useEffect } from 'react';

const STORAGE_KEY = 'soroban-notifications';
const REMINDER_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface NotificationSettings {
  enabled: boolean;
  lastReminder: number;
  permission: NotificationPermission;
}

export function useNotifications() {
  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: false,
    lastReminder: 0,
    permission: 'default',
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load notification settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
      } catch (error) {
        console.error('Error loading notification settings:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
  }, [settings, isLoaded]);

  // Check notification permission on mount
  useEffect(() => {
    if ('Notification' in window) {
      setSettings(prev => ({
        ...prev,
        permission: Notification.permission,
      }));
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      setSettings(prev => ({
        ...prev,
        permission,
        enabled: permission === 'granted',
      }));
      return permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  };

  const enableNotifications = async () => {
    if (settings.permission === 'default') {
      const granted = await requestPermission();
      if (granted) {
        setSettings(prev => ({ ...prev, enabled: true }));
      }
    } else if (settings.permission === 'granted') {
      setSettings(prev => ({ ...prev, enabled: true }));
    }
  };

  const disableNotifications = () => {
    setSettings(prev => ({ ...prev, enabled: false }));
  };

  const shouldShowReminder = () => {
    if (!settings.enabled || settings.permission !== 'granted') {
      return false;
    }

    const now = Date.now();
    const timeSinceLastReminder = now - settings.lastReminder;
    
    return timeSinceLastReminder >= REMINDER_INTERVAL;
  };

  const showReminder = () => {
    if (!shouldShowReminder()) return;

    const notification = new Notification('Soroban Practice', {
      body: '¡Es hora de practicar! Mantén tu racha diaria activa.',
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      tag: 'practice-reminder',
      requireInteraction: false,
    });

    // Update last reminder time
    setSettings(prev => ({
      ...prev,
      lastReminder: Date.now(),
    }));

    // Auto close after 5 seconds
    setTimeout(() => {
      notification.close();
    }, 5000);
  };

  const markAsPracticed = () => {
    // Reset the reminder timer when user practices
    setSettings(prev => ({
      ...prev,
      lastReminder: Date.now(),
    }));
  };

  return {
    settings,
    enableNotifications,
    disableNotifications,
    shouldShowReminder,
    showReminder,
    markAsPracticed,
    isLoaded,
  };
} 