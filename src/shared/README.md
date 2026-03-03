# Shared Module

Centralized location for all shared resources used across the app.

## Structure

```
shared/
├── assets/              # Images, icons, animations
│   ├── icons/          # SVG icon components
│   ├── images/         # Image assets
│   └── lottie/         # Lottie animation files
│
├── components/          # Reusable UI components
│   ├── base/           # Base components (Button, Input, Text, etc.)
│   ├── skeleton/       # Loading skeleton components
│   └── success/        # Success state components
│
├── config/             # Configuration files
│   ├── env.ts          # Environment variables
│   ├── fonts.ts        # Font configuration
│   ├── queryClient.ts  # React Query setup
│   └── i18n.ts         # Internationalization
│
├── constants/          # App constants
│   └── routes.ts       # Route names and constants
│
├── hooks/              # Custom React hooks
│   ├── useCustomAlert.ts
│   ├── usePressFeedback.ts
│   └── useRedux.ts
│
├── providers/          # Context providers
│   └── AlertProvider.tsx
│
├── screens/            # Shared screens
│   └── OtpVerificationScreen.tsx
│
├── services/           # Utility services
│   ├── authGuard.ts
│   └── fileService.ts
│
├── store/              # Redux store
│   ├── slices/         # Redux slices
│   ├── middleware/     # Custom middleware
│   ├── persist/        # Redux persist config
│   └── utils/          # Store utilities
│
├── themes/             # Design system
│   ├── colors.ts       # Color palette
│   ├── spacing.ts      # Spacing scale
│   ├── typography.ts   # Font styles
│   ├── dimensions.ts   # Layout dimensions
│   └── shadows.ts      # Shadow styles
│
├── types/              # TypeScript definitions
│   ├── store.ts        # Redux types
│   ├── api.ts          # API types
│   └── timeframe.ts    # Time-related types
│
├── utils/              # Utility functions
│   ├── axios.ts        # HTTP client
│   ├── format.ts       # Formatting functions
│   ├── timeFormat.ts   # Date/time formatting
│   ├── tokenManager.ts # Token management
│   └── deviceInfo.ts   # Device information
│
├── index.ts            # Main export barrel
└── README.md           # This file
```

## Quick Start

### Using Base Components

```tsx
import { Button, Text, Input } from '@/shared';

export function MyComponent() {
  return (
    <>
      <Text>Hello World</Text>
      <Button onPress={() => console.log('Pressed')}>
        Click Me
      </Button>
    </>
  );
}
```

### Using Theme

```tsx
import { colors, spacing, typography } from '@/shared';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
});
```

### Using Hooks

```tsx
import { useAppDispatch, useAppSelector, usePressFeedback } from '@/shared';

export function MyComponent() {
  const dispatch = useAppDispatch();
  const counter = useAppSelector(state => state.counter.value);
  const { triggerFeedback } = usePressFeedback();

  return (
    <Button
      onPress={() => {
        triggerFeedback();
        dispatch(incrementCounter());
      }}
    >
      Count: {counter}
    </Button>
  );
}
```

### Using Services

```tsx
import { fileService } from '@/shared';

async function uploadFile() {
  const result = await fileService.upload(file);
  console.log(result);
}
```

### Using Utilities

```tsx
import { apiClient, formatCurrency, formatDate } from '@/shared';

// HTTP requests
const data = await apiClient.get('/users');

// Formatting
const price = formatCurrency(1000); // $1,000
const date = formatDate(new Date()); // Mon, Dec 14, 2025
```

## Adding New Shared Resources

### Add a New Base Component

1. Create component in `components/base/ComponentName.tsx`
2. Export from `components/base/index.ts`

### Add a New Hook

1. Create hook in `hooks/useHookName.ts`
2. Export from `hooks/index.ts`

### Add a New Utility

1. Create utility in `utils/utilityName.ts`
2. Export from `utils/index.ts`

### Add a New Type

1. Create type in `types/typeName.ts`
2. Export from `types/index.ts`

## Best Practices

### Component Organization

- Keep base components simple and focused
- Use TypeScript for all components
- Document component props with comments
- Avoid hardcoding colors/spacing - use theme

### Styling

Always use theme values:

```tsx
// ✅ Good
<View style={{ backgroundColor: colors.background, padding: spacing.md }} />

// ❌ Bad
<View style={{ backgroundColor: '#FFFFFF', padding: 16 }} />
```

### Naming Conventions

- **Files**: PascalCase for components, camelCase for utilities
- **Functions**: camelCase (e.g., `useCustomAlert`)
- **Constants**: UPPER_SNAKE_CASE
- **Components**: PascalCase

### Redux Store

Add feature slices to `store/slices/`:

```tsx
// slices/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { /* ... */ },
  reducers: { /* ... */ },
});

export default userSlice.reducer;
```

Then import in `store/index.ts`:

```tsx
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
```

## Theme Customization

Update theme values in:

- **Colors**: `themes/colors.ts`
- **Spacing**: `themes/spacing.ts`
- **Typography**: `themes/typography.ts`
- **Dimensions**: `themes/dimensions.ts`

All changes automatically apply across the app.

## Testing

When testing components from shared:

```tsx
import { render } from '@testing-library/react-native';
import { Button } from '@/shared';

describe('Button', () => {
  it('should render', () => {
    const { getByText } = render(<Button>Click</Button>);
    expect(getByText('Click')).toBeTruthy();
  });
});
```

## Dependencies

Key packages used in shared:

- `@reduxjs/toolkit` - State management
- `@tanstack/react-query` - Server state
- `react-native-reanimated` - Animations
- `react-native-bottom-sheet` - Bottom sheet component
- `axios` - HTTP client

See `package.json` for complete list.
