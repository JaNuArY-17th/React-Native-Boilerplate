/**
 * Internationalization (i18n) configuration
 *
 * Sets up i18next for multi-language support.
 *
 * How to use:
 * 1. Create translation files: src/shared/locales/en.json and vi.json
 * 2. Call initI18n() in App.tsx
 * 3. Use useTranslation() hook in components
 *
 * @example
 * ```tsx
 * // In App.tsx
 * useEffect(() => {
 *   initI18n();
 * }, []);
 *
 * // In components
 * import { useTranslation } from 'react-i18next';
 *
 * function MyComponent() {
 *   const { t } = useTranslation('common');
 *   return <Text>{t('key')}</Text>;
 * }
 * ```
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ============================================================================
// Import Translation Resources
// ============================================================================

/**
 * Import your translation JSON files here
 *
 * Template structure:
 * - src/shared/locales/en.json (English common translations)
 * - src/shared/locales/vi.json (Vietnamese common translations)
 * - src/features/[feature]/locales/en.json (Feature-specific English)
 * - src/features/[feature]/locales/vi.json (Feature-specific Vietnamese)
 *
 * Then import them below:
 */

// Shared translations (required)
import enCommon from '@/shared/locales/en.json';
import viCommon from '@/shared/locales/vi.json';

// Feature translations (add as needed)
// import enHome from '@/features/home/locales/en.json';
// import viHome from '@/features/home/locales/vi.json';
// import enProfile from '@/features/profile/locales/en.json';
// import viProfile from '@/features/profile/locales/vi.json';
// import enAuth from '@/features/authentication/locales/en.json';
// import viAuth from '@/features/authentication/locales/vi.json';

// ============================================================================
// Translation Resources
// ============================================================================

/**
 * Translation resources object
 * Add feature translations here as you create features
 *
 * @example
 * ```ts
 * export const resources = {
 *   en: {
 *     common: enCommon,
 *     home: enHome,
 *     profile: enProfile,
 *   },
 *   vi: {
 *     common: viCommon,
 *     home: viHome,
 *     profile: viProfile,
 *   },
 * } as const;
 * ```
 */
export const resources = {
  en: {
    common: enCommon,
    // Add feature namespaces:
    // home: enHome,
    // profile: enProfile,
    // auth: enAuth,
  },
  vi: {
    common: viCommon,
    // Add feature namespaces:
    // home: viHome,
    // profile: viProfile,
    // auth: viAuth,
  },
} as const;

// ============================================================================
// Configuration Constants
// ============================================================================

/** Key for storing language preference in AsyncStorage */
export const LANGUAGE_STORAGE_KEY = 'app_language';

/** Supported languages */
export const SUPPORTED_LANGUAGES = ['en', 'vi'] as const;
export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

/** Default language */
const DEFAULT_LANGUAGE: SupportedLanguage = 'vi';

// ============================================================================
// i18n Initialization
// ============================================================================

/**
 * Initialize i18n
 *
 * Call this function in App.tsx before rendering components that need translations
 *
 * @example
 * ```tsx
 * import { initI18n } from '@/shared/config';
 *
 * useEffect(() => {
 *   initI18n();
 * }, []);
 * ```
 *
 * @returns Promise<typeof i18n>
 */
export async function initI18n() {
  let lng = DEFAULT_LANGUAGE;

  // Try to load saved language preference
  try {
    const stored = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && SUPPORTED_LANGUAGES.includes(stored as SupportedLanguage)) {
      lng = stored as SupportedLanguage;
    }
  } catch (error) {
    console.warn('Could not load language preference from storage:', error);
  }

  // Initialize i18next
  if (!i18n.isInitialized) {
    await i18n.use(initReactI18next).init({
      // Use v4 JSON structure for async storage compatibility
      compatibilityJSON: 'v4',
      // Translation resources
      resources,
      // Current language
      lng,
      // Fallback language if translation not found
      fallbackLng: DEFAULT_LANGUAGE,
      // Namespaces (add feature namespaces here)
      ns: ['common'],
      defaultNS: 'common',
      // i18next settings
      interpolation: {
        // Don't escape values to allow HTML (use with care)
        escapeValue: false,
      },
      react: {
        // Don't use Suspense for async translation loading
        useSuspense: false,
      },
    });
  }

  return i18n;
}

// ============================================================================
// Language Management Functions
// ============================================================================

/**
 * Set the current language
 *
 * @param lng - Language code ('en' or 'vi')
 *
 * @example
 * ```tsx
 * import { setLanguage } from '@/shared/config';
 *
 * // Change language
 * await setLanguage('en');
 * ```
 */
export const setLanguage = async (lng: SupportedLanguage) => {
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
    return i18n.changeLanguage(lng);
  } catch (error) {
    console.warn('Failed to save language preference:', error);
    return i18n.changeLanguage(lng);
  }
};

/**
 * Get the current language
 *
 * @returns Current language code
 *
 * @example
 * ```tsx
 * import { getCurrentLanguage } from '@/shared/config';
 *
 * const lang = getCurrentLanguage(); // 'en' or 'vi'
 * ```
 */
export const getCurrentLanguage = (): SupportedLanguage => {
  return (i18n.language as SupportedLanguage) || DEFAULT_LANGUAGE;
};

// Export default i18n instance
export default i18n;
