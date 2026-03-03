/**
 * Environment configuration for API endpoints and app settings
 *
 * This file contains all environment-specific configuration.
 * Customize these values for your project.
 */

// ============================================================================
// API Configuration
// ============================================================================

/**
 * API Configuration
 *
 * Update BASE_URL with your backend API server
 * Customize headers based on your API requirements
 *
 * @example
 * ```
 * BASE_URL: 'https://api.yourproject.com'
 * TIMEOUT: 15000
 * ```
 */
export const API_CONFIG = {
  // Update this to your API server URL
  BASE_URL: 'https://api.example.com',
  // Request timeout in milliseconds
  TIMEOUT: 10000,
  // Default headers for all requests
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // Add custom headers as needed
    // 'x-app-id': 'your-app-id',
  },
} as const;

// ============================================================================
// API Endpoints
// ============================================================================

/**
 * API Endpoints
 *
 * Organize your API endpoints by feature.
 * Add feature-specific endpoints as needed.
 *
 * @example
 * Create a feature service that uses these endpoints:
 * ```tsx
 * // services/userService.ts
 * import { API_ENDPOINTS } from '@/shared/config';\n *
 * export const userService = {
 *   getProfile: async () => {
 *     return apiClient.get(API_ENDPOINTS.USER.PROFILE);
 *   },
 * };
 * ```
 */
export const API_ENDPOINTS = {
  // Template: Add your feature endpoints here
  // AUTH: {
  //   LOGIN: '/auth/login',
  //   LOGOUT: '/auth/logout',
  //   REFRESH_TOKEN: '/auth/refresh-token',
  // },
  // USER: {
  //   PROFILE: '/users/me',
  //   UPDATE: '/users/me',
  // },
  // PRODUCTS: {
  //   LIST: '/products',
  //   DETAIL: '/products/:id',
  // },
} as const;

// ============================================================================
// App Configuration
// ============================================================================

/**
 * App Configuration
 *
 * Basic app-wide settings
 */
export const APP_CONFIG = {
  // Your app name
  NAME: 'MyApp',
  // Your app version (update in package.json)
  VERSION: '1.0.0',
  // Environment based on __DEV__ flag
  ENVIRONMENT: __DEV__ ? 'development' : 'production',
} as const;

// ============================================================================
// Network Configuration
// ============================================================================

/**
 * Network Configuration
 *
 * Controls retry behavior and timeouts for network requests
 */
export const NETWORK_CONFIG = {
  // Number of retry attempts for failed requests
  RETRY_ATTEMPTS: 3,
  // Delay between retries in milliseconds
  RETRY_DELAY: 1000,
  // Request timeout in milliseconds
  REQUEST_TIMEOUT: 30000,
} as const;

// ============================================================================
// Storage Keys
// ============================================================================

/**
 * Storage Keys
 *
 * Keys for storing data in AsyncStorage.
 * Use these constants to ensure consistency across the app.
 */
export const STORAGE_KEYS = {
  // Authentication
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  // User settings
  USER_PREFERENCES: 'user_preferences',
  LANGUAGE: 'app_language',
  // Add more keys as needed
} as const;

// ============================================================================
// Centralized Configuration Export
// ============================================================================

/**
 * All environment configurations in one place
 *
 * @example
 * ```tsx
 * import { ENV } from '@/shared/config';
 *
 * // Access configuration
 * console.log(ENV.API.BASE_URL);
 * console.log(ENV.APP.NAME);
 * console.log(ENV.STORAGE.AUTH_TOKEN);
 * ```
 */
export const ENV = {
  API: API_CONFIG,
  ENDPOINTS: API_ENDPOINTS,
  APP: APP_CONFIG,
  NETWORK: NETWORK_CONFIG,
  STORAGE: STORAGE_KEYS,
} as const;

// ============================================================================
// Type Definitions
// ============================================================================

export type ApiConfig = typeof API_CONFIG;
export type ApiEndpoints = typeof API_ENDPOINTS;
export type AppConfig = typeof APP_CONFIG;
export type NetworkConfig = typeof NETWORK_CONFIG;
export type StorageKeys = typeof STORAGE_KEYS;
export type EnvConfig = typeof ENV;
