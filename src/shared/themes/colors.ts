// import { blue } from "react-native-reanimated/lib/typescript/Colors";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage key for account type
const ACCOUNT_TYPE_STORAGE_KEY = '@account_type';

// Base color definitions
const baseColors = {
  // STORE colors (current primary colors)
  storePrimary: '#00492B',
  storePrimaryDark: '#033d24',
  storePrimaryLight: '#e5f5ef',
  storePrimarySoft: '#14945eff',

  // USER colors (current blue colors)
  userPrimary: '#003e7cff',
  userPrimaryDark: '#00294fff',
  userPrimaryLight: '#e6f0faff',
  userPrimarySoft: '#1d79b6ff',
  // userPrimary: '#00492B',
  // userPrimaryDark: '#033d24',
  // userPrimaryLight: '#e5f5ef',
  // userPrimarySoft: '#14945eff',

  // Common colors that don't change
  secondary: '#F8F9FA',
  secondaryDark: '#e6e7e8',
  accent: '#7BB661',
  success: '#4CAF50',
  successSoft: '#9df4c1ff',
  danger: '#E94235',
  dangerSoft: '#FFE9E7',
  warning: '#FFC107',
  warningDark: '#9C6F00',
  warningSoft: '#FFF4CC',
  info: '#2196F3',
  infoSoft: '#4bacfcff',
  light: '#FFFFFF',
  dark: '#333333',
  gray: '#757575',
  high: '#E93CFF',
  low: '#00BBF3',
  lightGray: '#EEEEEE',
  background: '#F9FCFB',
  border: '#E0E0E0',
  brand: '#164951',
  mutedLine: '#EBECEF',
  textOnPrimaryMuted: '#D1E0E4',
  text: {
    primary: '#333333',
    secondary: '#757575',
    light: '#FFFFFF',
  },
  chart: {
    green: '#4CAF50',
    red: '#E94235',
  },
  tab: {
    active: '#2376CB',
    inactive: '#757575',
  },
};