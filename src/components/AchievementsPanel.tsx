import React, { useState } from 'react';
import { Achievement } from '../types';
import { ACHIEVEMENTS } from '../constants/achievements';
import { t } from '../utils/i18n';
import { ModalBase } from './ModalBase';

interface AchievementsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedAchievements: string[];
  achievementProgress: Record<string, number>;
}

const categoryIcons = {
  progress: '📈',
  performance: '🎯',
  challenges: '🔥',
  style: '🎨',
};

const tierColors = {
  bronze: 'bg-amber-600',
  silver: 'bg-gray-400',
  gold: 'bg-yellow-500',
  platinum: 'bg-gradient-to-r from-purple-400 to-pink-500',
};

const tierIcons = {
  bronze: '🥉',
  silver: '🥈',
  gold: '🥇',
  platinum: '💎',
};

export function AchievementsPanel({ isOpen, onClose, unlockedAchievements, achievementProgress }: AchievementsPanelProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showSecrets, setShowSecrets] = useState(false);

  if (!isOpen) return null;

  const categories = ['all', 'progress', 'performance', 'challenges', 'style'];
  
  const filteredAchievements = ACHIEVEMENTS.filter(achievement => {
    if (selectedCategory !== 'all' && achievement.category !== selectedCategory) return false;
    if (achievement.isSecret && !showSecrets && !unlockedAchievements.includes(achievement.id)) return false;
    return true;
  });

  const groupedAchievements = filteredAchievements.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, Achievement[]>);

  const unlockedCount = unlockedAchievements.length;
  const totalCount = ACHIEVEMENTS.filter(a => !a.isSecret).length;
  const secretCount = ACHIEVEMENTS.filter(a => a.isSecret).length;

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} maxWidth="max-w-6xl">
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-10">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">🏆</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('achievements.title')}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {unlockedCount} / {totalCount} desbloqueados
              {secretCount > 0 && ` • ${secretCount} secretos`}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="p-8 overflow-y-auto max-h-[calc(90vh-80px)]">
        {/* Category Filter */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category === 'all' ? '📋' : categoryIcons[category as keyof typeof categoryIcons]} {t(`achievements.categories.${category}`)}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowSecrets(!showSecrets)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              showSecrets
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            🔒 {showSecrets ? 'Ocultar' : 'Mostrar'} Secretos
          </button>
        </div>

        {/* Content */}
        {selectedCategory === 'all' ? (
          // Show grouped by category
          <div className="space-y-8">
            {Object.entries(groupedAchievements).map(([category, achievements]) => (
              <div key={category} className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{categoryIcons[category as keyof typeof categoryIcons]}</span>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {t(`achievements.categories.${category}`)}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({achievements.filter(a => unlockedAchievements.includes(a.id)).length}/{achievements.length})
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map(achievement => (
                    <AchievementCard
                      key={achievement.id}
                      achievement={achievement}
                      isUnlocked={unlockedAchievements.includes(achievement.id)}
                      progress={achievementProgress[achievement.id] || 0}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Show single category
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAchievements.map(achievement => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                isUnlocked={unlockedAchievements.includes(achievement.id)}
                progress={achievementProgress[achievement.id] || 0}
              />
            ))}
          </div>
        )}
      </div>
    </ModalBase>
  );
}

interface AchievementCardProps {
  achievement: Achievement;
  isUnlocked: boolean;
  progress: number;
}

function AchievementCard({ achievement, isUnlocked, progress }: AchievementCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  
  const progressPercentage = Math.min((progress / achievement.maxProgress) * 100, 100);
  const isInProgress = progress > 0 && !isUnlocked;

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-300 ${
        isUnlocked
          ? 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700'
          : isInProgress
          ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
      } border-2 rounded-xl p-4 hover:shadow-lg hover:scale-105`}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      {/* Secret Badge */}
      {achievement.isSecret && !isUnlocked && (
        <div className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
          🔒
        </div>
      )}

      {/* Tier Badge */}
      <div className="absolute -top-2 -left-2">
        <div className={`${tierColors[achievement.tier]} text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1`}>
          <span>{tierIcons[achievement.tier]}</span>
          <span className="capitalize">{achievement.tier}</span>
        </div>
      </div>

      {/* Achievement Icon */}
      <div className="flex items-center justify-center mb-3">
        <div className={`text-4xl ${isUnlocked ? 'animate-pulse' : 'opacity-50'}`}>
          {achievement.icon}
        </div>
      </div>

      {/* Achievement Info */}
      <div className="text-center space-y-2">
        <h4 className={`font-semibold text-sm ${
          isUnlocked ? 'text-green-800 dark:text-green-200' : 'text-gray-900 dark:text-white'
        }`}>
          {achievement.name}
        </h4>
        
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
          {achievement.description}
        </p>

        {/* Progress Bar */}
        {achievement.maxProgress > 1 && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Progreso</span>
              <span>{progress} / {achievement.maxProgress}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  isUnlocked
                    ? 'bg-green-500'
                    : isInProgress
                    ? 'bg-blue-500'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Status Badge */}
        <div className="mt-2">
          {isUnlocked ? (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              ✅ Desbloqueado
            </span>
          ) : isInProgress ? (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              🔄 En Progreso
            </span>
          ) : (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              🔒 Bloqueado
            </span>
          )}
        </div>
      </div>

      {/* Hover Details */}
      {/* Eliminado: ya no se muestra el overlay de detalles al hacer hover */}
    </div>
  );
} 