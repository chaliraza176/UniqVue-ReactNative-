const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

const typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
};

const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const lightTheme = {
  colors: {
    primary: '#6C63FF',
    secondary: '#FF6584',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#333333',
    textSecondary: '#666666',
    border: '#E0E0E0',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
    white: '#FFFFFF',
    black: '#000000',
  },
  spacing,
  typography,
  borderRadius,
};

export const darkTheme = {
  colors: {
    primary: '#8B7FFF',
    secondary: '#FF7A9A',
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    border: '#333333',
    error: '#FF453A',
    success: '#32D74B',
    warning: '#FF9F0A',
    white: '#FFFFFF',
    black: '#000000',
  },
  spacing,
  typography,
  borderRadius,
};

export const modernTheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#FF2D55',
    background: '#F2F2F7',
    surface: '#FFFFFF',
    text: '#000000',
    textSecondary: '#8E8E93',
    border: '#C6C6C8',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
    white: '#FFFFFF',
    black: '#000000',
  },
  spacing,
  typography,
  borderRadius,
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
  modern: modernTheme,
};

export type ThemeName = keyof typeof themes;

// Default export for backward compatibility
export const theme = lightTheme;

// Export COLORS for backward compatibility
export const COLORS = theme.colors;
