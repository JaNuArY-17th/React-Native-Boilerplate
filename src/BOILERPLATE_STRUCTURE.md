# Mobile App Boilerplate - Refactored Structure

## Overview

This is a clean, minimal boilerplate for a React Native mobile app. All project-specific features have been removed, leaving only the core infrastructure needed to build new features.

## Directory Structure

```
src/
├── features/                    # Feature modules
│   └── home/                    # Home feature (template)
│       └── screens/
│           ├── HomeScreen.tsx   # Simple welcome screen
│           └── index.ts
│
├── navigation/                  # Navigation setup
│   ├── RootNavigator.tsx       # Main navigation container
│   ├── types.ts                # Navigation type definitions
│   └── index.ts
│
└── shared/                      # Shared resources
    ├── assets/                  # Images, icons, animations
    │   ├── icons/
    │   ├── images/
    │   └── lottie/
    │
    ├── components/              # Reusable UI components
    │   ├── base/                # Base components (Button, Text, etc.)
    │   ├── icons/               # Icon components
    │   ├── skeleton/            # Skeleton loaders
    │   ├── success/             # Success state components
    │   ├── test/                # Test components
    │   └── index.ts
    │
    ├── config/                  # Configuration files
    │   ├── env.ts              # Environment config
    │   ├── fonts.ts            # Font configuration
    │   ├── queryClient.ts       # React Query setup
    │   └── index.ts
    │
    ├── constants/               # App constants
    │   ├── routes.ts           # Route names/constants
    │   └── index.ts
    │
    ├── hooks/                   # Custom React hooks
    │   ├── useCustomAlert.ts    # Alert hook
    │   ├── usePressFeedback.ts  # Haptic feedback hook
    │   ├── useRedux.ts          # Redux hook
    │   └── index.ts
    │
    ├── providers/               # Context/Provider components
    │   ├── AlertProvider.tsx
    │   └── index.ts
    │
    ├── screens/                 # Shared screens
    │   └── OtpVerificationScreen.tsx
    │
    ├── services/                # API and utility services
    │   ├── fileService.ts
    │   └── index.ts
    │
    ├── store/                   # Redux store setup
    │   ├── slices/
    │   ├── middleware/
    │   ├── enhancers/
    │   ├── persist/
    │   ├── utils/
    │   └── index.ts
    │
    ├── themes/                  # Theme configuration
    │   ├── hooks/
    │   └── (color, spacing, typography configs)
    │
    ├── types/                   # TypeScript type definitions
    │   └── (shared types)
    │
    ├── utils/                   # Utility functions
    │   ├── StatusBarManager.ts
    │   ├── axios.ts             # HTTP client setup
    │   ├── deviceInfo.ts
    │   ├── format.ts
    │   ├── imageProcessing.ts
    │   ├── timeFormat.ts
    │   ├── tokenManager.ts
    │   └── index.ts
    │
    └── README.md
```

## What's Removed

- ✅ All feature modules except `home` (authentication, payment, orders, etc.)
- ✅ Complex bottom tab navigator - simplified to basic stack navigation
- ✅ Feature-specific components and hooks
- ✅ Feature-specific localization files
- ✅ Feature-specific services and utilities
- ✅ Firebase configuration (removed from config)
- ✅ i18n localization setup (removed from config)
- ✅ Custom auth provider (removed from components)
- ✅ All complex banner and overlay components

## What's Kept

- ✅ Navigation setup (RootNavigator)
- ✅ Core UI components (Button, Text, Input, etc. in base/)
- ✅ Redux store structure
- ✅ React Query setup
- ✅ Theme configuration
- ✅ Utility functions (axios, formatting, token management)
- ✅ TypeScript types
- ✅ Service layer foundation
- ✅ Safe Area context support

## Quick Start

### Adding a New Feature

1. Create feature folder structure:
```
src/features/[feature-name]/
├── screens/
│   ├── index.ts
│   └── [FeatureName]Screen.tsx
├── hooks/
├── services/
├── types/
└── index.ts
```

2. Export from feature index:
```typescript
// src/features/[feature-name]/index.ts
export { default as [FeatureName]Screen } from './screens/[FeatureName]Screen';
```

3. Add route to navigation:
```typescript
// src/navigation/RootNavigator.tsx
import { [FeatureName]Screen } from '@/features/[feature-name]';

<Stack.Screen name="[FeatureName]" component={[FeatureName]Screen} />
```

### Navigation

- **RootNavigator** is the main navigation container
- Currently uses **Stack Navigation**
- To add tab navigation, create a separate `BottomTabNavigator` and nest it in the stack

### State Management

- Uses **Redux** for global state (see `src/shared/store/`)
- Uses **React Query** for server state (see `src/shared/config/queryClient.ts`)

### Styling

- Theme colors, spacing, typography in `src/shared/themes/`
- Reusable style utilities in `src/shared/utils/`

## Configuration Files

- `.env` - Environment variables
- `babel.config.js` - Babel configuration
- `metro.config.js` - Metro bundler configuration
- `tsconfig.json` - TypeScript configuration
- `jest.config.js` - Jest testing configuration

## Dependencies

Key dependencies included:
- `@react-navigation/*` - Navigation
- `redux` + `@reduxjs/toolkit` - State management
- `@tanstack/react-query` - Server state
- `axios` - HTTP client
- `react-native-reanimated` - Animations
- `react-native-safe-area-context` - Safe area handling

## Next Steps

1. Customize theme colors in `src/shared/themes/`
2. Update API endpoints in `src/shared/utils/axios.ts`
3. Add feature modules following the structure above
4. Replace HomeScreen placeholder with actual app entry
5. Set up authentication flow if needed

---

**Last Updated**: December 14, 2025
