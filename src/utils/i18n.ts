import es from '../locales/es.json';
import en from '../locales/en.json';

const translations: any = {
  es,
  en,
};

let currentLanguage: 'es' | 'en' = 'es';

// Auto-detect language from browser
function detectLanguage(): 'es' | 'en' {
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('es')) {
    return 'es';
  }
  return 'en';
}

// Initialize language
export function initLanguage(): void {
  const savedLanguage = localStorage.getItem('soroban-language') as 'es' | 'en';
  if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
    currentLanguage = savedLanguage;
  } else {
    currentLanguage = detectLanguage();
    localStorage.setItem('soroban-language', currentLanguage);
  }
}

// Set language
export function setLanguage(lang: 'es' | 'en'): void {
  currentLanguage = lang;
  localStorage.setItem('soroban-language', lang);
  // Force page reload to update all translations
  window.location.reload();
}

// Get current language
export function getCurrentLanguage(): 'es' | 'en' {
  return currentLanguage;
}

// Translate function
export function t(key: string): string {
  const keys = key.split('.');
  let value: any = translations[currentLanguage];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English if translation not found
      value = keys.reduce((obj: any, k: string) => obj?.[k], translations.en);
      break;
    }
  }
  
  return typeof value === 'string' ? value : key;
}

// Get all available languages
export function getAvailableLanguages(): Array<{ code: 'es' | 'en'; name: string; flag: string }> {
  return [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];
}

// Format number based on language
export function formatNumber(num: number): string {
  if (isNaN(num) || !isFinite(num)) return '0';
  return new Intl.NumberFormat(currentLanguage === 'es' ? 'es-ES' : 'en-US').format(num);
}

// Format date based on language
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat(currentLanguage === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

// Format time based on language
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat(currentLanguage === 'es' ? 'es-ES' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
} 