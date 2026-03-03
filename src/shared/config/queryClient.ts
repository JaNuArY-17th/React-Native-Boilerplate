/**
 * React Query client configuration and setup
 *
 * Provides a persistent query client with offline-first caching strategy.
 * The client automatically caches API responses and supports offline-first mode.
 *
 * How to use:
 * 1. Initialize in App.tsx with QueryClientProvider
 * 2. Use useQuery() and useMutation() hooks in components
 * 3. Customize default options as needed
 *
 * @example
 * ```tsx
 * import { createPersistentQueryClient } from '@/shared/config';
 * import { QueryClientProvider } from '@tanstack/react-query';
 *
 * const queryClient = createPersistentQueryClient();
 *
 * function App() {
 *   return (
 *     <QueryClientProvider client={queryClient}>
 *       {/* app content */}
 *     </QueryClientProvider>
 *   );
 * }
 * ```
 */

import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/query-persist-client-core';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ============================================================================
// Persistence Configuration
// ============================================================================

/**
 * Define which queries should be persisted to AsyncStorage
 *
 * For example, if you want to persist 'user' queries:
 * const PERSIST_CACHE_KEYS = ['user', 'profile'];
 *
 * Only queries whose first key matches these strings will be persisted.
 */
const PERSIST_CACHE_KEYS: string[] = [
  // Add query keys that should be persisted:
  // 'user',
  // 'profile',
  // 'settings',
];

// Create the persister for AsyncStorage
const asyncStoragePersistor = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: 'REACT_QUERY_OFFLINE_CACHE',
  serialize: JSON.stringify,
  deserialize: JSON.parse,
});

// ============================================================================
// Query Configuration Presets
// ============================================================================

/**
 * Default query configuration
 *
 * Use for general API queries that don't need special handling
 */
export const DEFAULT_QUERY_CONFIG = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: 'always' as const,
  networkMode: 'offlineFirst' as const,
  retry: 2,
} as const;

/**
 * Sensitive query configuration
 *
 * Use for sensitive queries like user profile, authentication, payment data
 * - More frequent refetch
 * - Shorter cache duration
 */
export const SENSITIVE_QUERY_CONFIG = {
  staleTime: 1 * 60 * 1000, // 1 minute
  gcTime: 5 * 60 * 1000, // 5 minutes
  refetchOnWindowFocus: true,
  refetchOnMount: 'stale' as const,
  refetchOnReconnect: 'always' as const,
  networkMode: 'online' as const,
  retry: 1,
} as const;

/**
 * Real-time query configuration
 *
 * Use for queries that need real-time updates (chat, notifications, live feeds)
 * - Very short cache duration
 * - Frequent refetch
 */
export const REALTIME_QUERY_CONFIG = {
  staleTime: 10 * 1000, // 10 seconds
  gcTime: 1 * 60 * 1000, // 1 minute
  refetchOnWindowFocus: true,
  refetchOnMount: true,
  refetchOnReconnect: 'always' as const,
  networkMode: 'online' as const,
  retry: 1,
} as const;

// ============================================================================
// Query Client Factory
// ============================================================================

/**
 * Create and configure a persistent query client
 *
 * Features:
 * - Offline-first strategy with AsyncStorage persistence
 * - Automatic cache management
 * - Network-aware refetching
 * - Configurable per-query overrides
 *
 * @example
 * ```ts
 * // In App.tsx
 * const queryClient = createPersistentQueryClient();
 *
 * useQuery({
 *   queryKey: ['user', userId],
 *   queryFn: fetchUser,
 *   ...SENSITIVE_QUERY_CONFIG, // Use sensitive config for user profile
 * });
 * ```
 *
 * @returns Configured QueryClient instance
 */
export const createPersistentQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Default behavior: offline-first with moderate caching
        ...DEFAULT_QUERY_CONFIG,
      },
      mutations: {
        retry: false,
        networkMode: 'online', // Only run mutations when online
      },
    },
  });

  // Configure persistence
  try {
    persistQueryClient({
      queryClient,
      persister: asyncStoragePersistor,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      dehydrateOptions: {
        // Only persist queries that match PERSIST_CACHE_KEYS
        shouldDehydrateQuery: (query) => {
          const queryKey = query.queryKey;
          const firstKey = Array.isArray(queryKey) ? queryKey[0] : queryKey;

          // Persist matching queries
          if (typeof firstKey === 'string' && PERSIST_CACHE_KEYS.some(key => firstKey.startsWith(key))) {
            return true;
          }

          return false;
        },
      },
      hydrateOptions: {
        defaultOptions: {
          queries: {
            gcTime: 24 * 60 * 60 * 1000,
          },
        },
      },
    });
  } catch (error) {
    console.error('Failed to setup query cache persistence:', error);
  }

  return queryClient;
};

// ============================================================================
// Cache Management Functions
// ============================================================================

/**
 * Clear all cached queries
 *
 * @example
 * ```ts
 * import { clearAllCache } from '@/shared/config';
 *
 * // Clear all queries (e.g., on logout)
 * await clearAllCache(queryClient);
 * ```
 *
 * @param queryClient - QueryClient instance
 */
export const clearAllCache = async (queryClient: QueryClient) => {
  try {
    queryClient.clear();
    await asyncStoragePersistor.removeClient();
    console.log('All cache cleared successfully');
  } catch (error) {
    console.error('Failed to clear cache:', error);
  }
};

/**
 * Clear specific query cache by key
 *
 * @example
 * ```ts
 * import { clearQueryCache } from '@/shared/config';
 *
 * // Clear user-related queries
 * await clearQueryCache(queryClient, 'user');
 * ```
 *
 * @param queryClient - QueryClient instance
 * @param queryKeyPrefix - Query key prefix to match (e.g., 'user', 'profile')
 */
export const clearQueryCache = async (queryClient: QueryClient, queryKeyPrefix: string) => {
  try {
    await queryClient.invalidateQueries({
      queryKey: [queryKeyPrefix],
    });
    console.log(`Cache for '${queryKeyPrefix}' cleared successfully`);
  } catch (error) {
    console.error(`Failed to clear cache for '${queryKeyPrefix}':`, error);
  }
};
