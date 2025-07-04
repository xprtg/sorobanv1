import React, { useState } from 'react';
import { UserProfile as UserProfileType, UserPreferences } from '../types';
import { useLevels } from '../hooks/useLevels';
import { usePreferences } from '../hooks/usePreferences';
import { t } from '../utils/i18n';
import { formatDate, formatNumber } from '../utils/i18n';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserProfile({ isOpen, onClose }: UserProfileProps) {
  const { stats, currentLevel, xpProgress, getAllLevels } = useLevels();
  const { preferences, updatePreferences } = usePreferences();
  
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfileType>(() => {
    const saved = localStorage.getItem('soroban-profile');
    return saved ? JSON.parse(saved) : {
      id: '1',
      name: 'Usuario',
      nickname: '',
      avatar: '👤',
      level: 1,
      totalXP: 0,
      joinDate: new Date().toISOString(),
      preferences: preferences,
      unlockedThemes: ['apple'],
      unlockedAvatars: ['default'],
      achievements: [],
      bestSessions: [],
    };
  });

  const [editForm, setEditForm] = useState({
    name: profile.name,
    nickname: profile.nickname || '',
  });

  const allLevels = getAllLevels();
  const unlockedThemes = profile.unlockedThemes.length;
  const unlockedAvatars = profile.unlockedAvatars.length;

  // Save profile to localStorage
  React.useEffect(() => {
    localStorage.setItem('soroban-profile', JSON.stringify(profile));
  }, [profile]);

  const handleSave = () => {
    setProfile(prev => ({
      ...prev,
      name: editForm.name,
      nickname: editForm.nickname,
      level: currentLevel.level,
      totalXP: stats.totalXP,
    }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: profile.name,
      nickname: profile.nickname || '',
    });
    setIsEditing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('profile.title')}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-6 mb-8">
            <div className="text-6xl">{profile.avatar}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-lg font-semibold"
                    />
                  ) : (
                    profile.name
                  )}
                </h3>
                {profile.nickname && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({isEditing ? (
                      <input
                        type="text"
                        value={editForm.nickname}
                        onChange={(e) => setEditForm(prev => ({ ...prev, nickname: e.target.value }))}
                        className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm"
                      />
                    ) : (
                      profile.nickname
                    )})
                  </span>
                )}
              </div>
              
              {/* Level and XP */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{currentLevel.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {t(`levels.${currentLevel.name.toLowerCase().replace(' ', '_')}`)} {currentLevel.level}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {formatNumber(stats.totalXP)} XP total
                    </div>
                  </div>
                </div>
                
                {/* XP Progress Bar */}
                <div className="flex-1 max-w-xs">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>{formatNumber(xpProgress.current)}</span>
                    <span>{formatNumber(xpProgress.next)}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`${currentLevel.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${xpProgress.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isEditing ? t('common.cancel') : t('profile.edit_profile')}
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">📊</div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{t('stats.total_sessions')}</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {formatNumber(stats.totalSessions)}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">⏱️</div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{t('stats.total_time')}</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {Math.round(stats.totalPracticeTime / 60)} min
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🎯</div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{t('stats.exact_matches')}</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {formatNumber(stats.exactMatches)}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🔥</div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{t('stats.current_streak')}</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {stats.currentStreak} días
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">📈</div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{t('stats.average_accuracy')}</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {Math.round(stats.averageAccuracy)}%
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">🔢</div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{t('stats.numbers_practiced')}</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {formatNumber(stats.totalNumbersPracticed)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Best Marks */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('profile.best_marks')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl p-4 text-white">
                <div className="text-sm opacity-90">Mejor Precisión</div>
                <div className="text-2xl font-bold">{Math.round(stats.bestSessionAccuracy)}%</div>
              </div>
              <div className="bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl p-4 text-white">
                <div className="text-sm opacity-90">Mejor Velocidad</div>
                <div className="text-2xl font-bold">{Math.round(stats.bestSessionSpeed)} num/min</div>
              </div>
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl p-4 text-white">
                <div className="text-sm opacity-90">Sesión Más Larga</div>
                <div className="text-2xl font-bold">{Math.round(stats.longestSession / 60)} min</div>
              </div>
            </div>
          </div>

          {/* Unlocked Content */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('profile.unlocked_badges')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="text-2xl">🎨</div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Temas Desbloqueados</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {unlockedThemes} de {allLevels.length + 1} disponibles
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.unlockedThemes.map((theme, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="text-2xl">👤</div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Avatares Desbloqueados</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {unlockedAvatars} de {allLevels.length + 1} disponibles
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.unlockedAvatars.map((avatar, index) => (
                    <span key={index} className="text-2xl">
                      {avatar === 'default' ? '👤' : avatar}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Join Date */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            {t('profile.join_date')}: {formatDate(new Date(profile.joinDate))}
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {t('common.save')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 