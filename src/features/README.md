# Features

Feature modules that implement specific app functionality.

## Feature Structure

Each feature follows a consistent structure:

```
feature-name/
├── screens/         # Screen components (pages)
│   ├── FeatureScreen.tsx
│   └── index.ts
├── components/      # Feature-specific components
├── hooks/          # Feature-specific hooks
├── services/       # Feature API calls & data
├── store/          # Feature Redux slices
├── types/          # Feature type definitions
├── utils/          # Feature utilities
└── index.ts        # Public API exports
```

## Creating a New Feature

### 1. Create Feature Folder

```bash
mkdir src/features/myfeature
```

### 2. Create Basic Structure

```
myfeature/
├── screens/
│   ├── MyFeatureScreen.tsx
│   └── index.ts
└── index.ts
```

### 3. Create Screen

```tsx
// screens/MyFeatureScreen.tsx
import React from 'react';
import { View } from 'react-native';
import { Text } from '@/shared';

export function MyFeatureScreen() {
  return (
    <View>
      <Text>My Feature Screen</Text>
    </View>
  );
}
```

### 4. Export from Index

```tsx
// screens/index.ts
export { MyFeatureScreen } from './MyFeatureScreen';
```

```tsx
// index.ts
export * from './screens';
```

## Feature Best Practices

### Organization

- **Screens** only for navigation targets
- **Components** for reusable feature components (not navigation)
- **Hooks** for feature-specific logic
- **Services** for API calls related to feature
- **Store** for feature-specific Redux slices
- **Types** for feature type definitions

### Naming

- **Screen**: `FeatureName.tsx` (e.g., `HomeScreen.tsx`)
- **Component**: `ComponentName.tsx` (e.g., `UserCard.tsx`)
- **Hook**: `useHookName.ts` (e.g., `useUserData.ts`)
- **Service**: `serviceName.ts` (e.g., `userService.ts`)
- **Type**: `typeName.ts` (e.g., `user.types.ts`)

### Redux Slices

Create feature slices in `store/` folder:

```tsx
// store/mySlice.ts
import { createSlice } from '@reduxjs/toolkit';

const mySlice = createSlice({
  name: 'myfeature',
  initialState: { /* ... */ },
  reducers: { /* ... */ },
});

export default mySlice.reducer;
```

Register in main store:

```tsx
// src/shared/store/index.ts
import myReducer from './features/myfeature/store/mySlice';

const store = configureStore({
  reducer: {
    myfeature: myReducer,
  },
});
```

### Using Shared Resources

Always prefer shared components and utilities:

```tsx
// ✅ Good - Using shared components
import { Button, Text, Input } from '@/shared';

// ❌ Avoid - Creating duplicate components
import { MyButton } from './components/MyButton';
```

### File Naming

Keep it consistent:

```
✅ Good:
- UserProfile.tsx
- useUserData.ts
- userService.ts
- user.types.ts

❌ Bad:
- userProfile.tsx
- usegetUserData.ts
- UserService.ts
- USER_TYPES.ts
```

## Navigation

Add feature screens to navigation in `src/navigation/RootNavigator.tsx`:

```tsx
import { MyFeatureScreen } from '@/features/myfeature';

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="MyFeature"
        component={MyFeatureScreen}
      />
    </Stack.Navigator>
  );
}
```

## Testing

Create `__tests__` folder for feature tests:

```
myfeature/
├── screens/
├── components/
└── __tests__/
    ├── MyFeatureScreen.test.tsx
    └── UserCard.test.tsx
```

Run tests:

```bash
npm test -- src/features/myfeature/__tests__
```

## Example: Creating User Feature

```tsx
// src/features/user/screens/UserProfileScreen.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Avatar } from '@/shared';
import { useAppDispatch, useAppSelector } from '@/shared';

export function UserProfileScreen({ navigation }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.profile);

  useEffect(() => {
    // Load user profile
    dispatch(fetchUserProfile());
  }, []);

  return (
    <View style={styles.container}>
      <Avatar source={{ uri: user?.avatar }} />
      <Text style={styles.name}>{user?.name}</Text>
      <Button onPress={() => navigation.navigate('Settings')}>
        Edit Profile
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});
```

## Current Features

- **home** - Main dashboard (template for feature development)

Add more features by following the structure above.
