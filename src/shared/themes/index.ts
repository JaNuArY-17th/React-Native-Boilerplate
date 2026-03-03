/**
 * Theme Configuration
 * Centralized design system: colors, typography, spacing, dimensions
 */

import { colors, getColors, subscribeToColorChanges, updateColorsForAccountType, initializeColorsFromStorage } from './colors';
import { dimensions } from './dimensions';
import { FONT_WEIGHTS, getFontFamily, getPlatformFontExtras, textStyle } from './fonts';
import { spacing } from './spacing';
import typography from './typography';
import { shadows } from './shadows';

// Re-export hooks
export * from './hooks';

/**
 * Complete theme object
 * Access theme properties: theme.colors, theme.typography, theme.spacing, etc.
 */
export const theme = {
  colors,
  typography,
  spacing,
  dimensions,
  shadows,
  fonts: {
    weights: FONT_WEIGHTS,
    getFamily: getFontFamily,
    getPlatformExtras: getPlatformFontExtras,
  },
} as const;

// Type exports for TypeScript
export type { FontWeight } from './fonts';
export type Colors = typeof colors;
export type Typography = typeof typography;
export type Spacing = typeof spacing;
export type Dimensions = typeof dimensions;

// Direct exports for convenience
export { 
  // Colors
  colors, 
  getColors, 
  subscribeToColorChanges, 
  updateColorsForAccountType, 
  initializeColorsFromStorage,
  
  // Typography & Fonts
  FONT_WEIGHTS, 
  getFontFamily, 
  getPlatformFontExtras, 
  textStyle, 
  typography,
  
  // Layout
  spacing, 
  dimensions,
  
  // Visual Effects
  shadows,
};
