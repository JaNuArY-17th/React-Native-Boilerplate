# Navigation

Handles all navigation and routing for the app.

## Structure

```
navigation/
├── RootNavigator.tsx    # Main navigator setup
├── types.ts             # Navigation type definitions
├── index.ts             # Public API exports
├── components/          # Navigation-related components
├── styles/              # Navigation styling
└── utils/               # Navigation utilities
```

## How It Works

The navigation is organized by `RootNavigator` which manages the main stack:

```tsx
// src/navigation/RootNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@/features/home';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* Add more screens here */}
    </Stack.Navigator>
  );
}
```

## Adding Screens

### 1. Add Route to Type Definitions

```tsx
// src/navigation/types.ts
export type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Settings: undefined;
};
```

### 2. Add Screen to Navigator

```tsx
// src/navigation/RootNavigator.tsx
import { ProfileScreen } from '@/features/profile';
import { SettingsScreen } from '@/features/settings';

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
```

### 3. Use in Components

```tsx
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <Button
      onPress={() =>
        navigation.navigate('Profile', { userId: '123' })
      }
    >
      Go to Profile
    </Button>
  );
}
```

## Nested Navigation

For features with multiple screens:

```tsx
// src/features/profile/navigation/ProfileNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileScreen } from '../screens/ProfileScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';

const Stack = createNativeStackNavigator();

export function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileHome" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}
```

Then add to root:

```tsx
<Stack.Screen
  name="Profile"
  component={ProfileNavigator}
  options={{
    headerShown: false,
  }}
/>
```

## Navigation Options

### Hide Header

```tsx
<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{
    headerShown: false,
  }}
/>
```

### Custom Header

```tsx
<Stack.Screen
  name="Settings"
  component={SettingsScreen}
  options={{
    title: 'Settings',
    headerStyle: {
      backgroundColor: colors.primary,
    },
    headerTintColor: colors.white,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}
/>
```

### Custom Back Button

```tsx
options={{
  headerBackTitle: 'Back',
  headerBackImage: () => <ChevronLeftIcon />,
}}
```

## Deep Linking

Configure deep linking for external URLs:

```tsx
const linking = {
  prefixes: ['myapp://', 'https://myapp.com'],
  config: {
    screens: {
      Home: '',
      Profile: 'profile/:userId',
      Settings: 'settings',
    },
  },
};

export function RootNavigator() {
  return (
    <NavigationContainer linking={linking}>
      {/* Navigator screens */}
    </NavigationContainer>
  );
}
```

## Navigation Tips

### Type-Safe Navigation

Always use TypeScript for navigation:

```tsx
// ✅ Good - Type-safe
const navigation = useNavigation<HomeScreenNavigationProp>();
navigation.navigate('Profile', { userId: '123' });

// ❌ Bad - Not type-safe
navigation.navigate('Profile', { userId: 123 }); // Type error
```

### Prevent Going Back

```tsx
options={{
  gestureEnabled: false,
}}
```

### Custom Transitions

```tsx
options={{
  animationEnabled: true,
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
}}
```

## Setup in App

The `RootNavigator` is used in the main App:

```tsx
// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from '@/navigation';

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
```

## Resources

- [React Navigation Docs](https://reactnavigation.org/)
- [Native Stack Navigator](https://reactnavigation.org/docs/native-stack-navigator)
- [Type Safety](https://reactnavigation.org/docs/typescript)
