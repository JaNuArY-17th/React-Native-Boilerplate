/**
 * Configuration Module
 *
 * Central location for all app-wide configuration including API setup,
 * fonts, internationalization, and data persistence.
 *
 * @example
 * ```tsx
 * import {
 *   API_CONFIG,
 *   createPersistentQueryClient,
 *   initI18n,
 *   initializeFonts,
 *   setLanguage,
 * } from '@/shared/config';
 *
 * // In App.tsx
 * function App() {
 *   useEffect(() => {
 *     Promise.all([
 *       initializeFonts(),
 *       initI18n(),
 *     ]);
 *   }, []);
 *
 *   return (
 *     <QueryClientProvider client={queryClient}>
 *       {/* app content */}
 *     </QueryClientProvider>
 *   );
 * }
 * ```
 */

// ============================================================================
// Environment Configuration
// ============================================================================

/**
 * API configuration, endpoints, app settings
 *
 * Exports: API_CONFIG, API_ENDPOINTS, APP_CONFIG, NETWORK_CONFIG, STORAGE_KEYS, ENV
 */
export * from './env';

// ============================================================================
// Font Configuration
// ============================================================================

/**
 * Global font setup and initialization
 *
 * Exports: initializeFonts
 */
export * from './fonts';

// ============================================================================
// Query Client (React Query)
// ============================================================================

/**
 * Persistent query client for offline-first caching
 *
 * Exports: createPersistentQueryClient, DEFAULT_QUERY_CONFIG,
 *          SENSITIVE_QUERY_CONFIG, REALTIME_QUERY_CONFIG,
 *          clearAllCache, clearQueryCache
 */
export * from './queryClient';

// ============================================================================
// Internationalization (i18n)
// ============================================================================

/**
 * Multi-language support with i18next
 *
 * Exports: initI18n, setLanguage, getCurrentLanguage, resources,
 *          LANGUAGE_STORAGE_KEY, SUPPORTED_LANGUAGES
 */
export * from './i18n';
