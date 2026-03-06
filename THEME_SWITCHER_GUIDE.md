# 🎨 Theme Switcher Feature Guide

## Overview
The UniqVue app now supports dynamic theme switching with three built-in themes: Light, Dark, and Modern. Users can change themes from the Settings screen, and their preference is persisted across app sessions.

## Features
- ✅ Three theme variants (Light, Dark, Modern)
- ✅ Real-time theme preview in Settings
- ✅ Persistent theme storage using AsyncStorage
- ✅ Redux state management for theme
- ✅ Custom hook for easy theme access
- ✅ Seamless navigation integration

## Architecture

### 1. Theme Configuration (`src/config/theme.ts`)
Defines three theme objects with consistent structure:
- **lightTheme**: Classic bright theme (default)
- **darkTheme**: Dark mode with OLED-friendly colors
- **modernTheme**: Contemporary iOS-style design

Each theme includes:
- `colors`: Primary, secondary, background, surface, text, borders, status colors
- `spacing`: Consistent spacing scale (xs to xxl)
- `typography`: Font styles (h1-h3, body, caption, button)
- `borderRadius`: Border radius scale (sm to full)

### 2. Redux State Management (`src/store/slices/themeSlice.ts`)
- **State**: `currentTheme` (ThemeName: 'light' | 'dark' | 'modern')
- **Actions**: `setTheme(themeName)` - Updates current theme
- **Selectors**: `selectCurrentTheme` - Gets current theme name

### 3. Custom Hook (`src/hooks/useTheme.ts`)
```typescript
import { useTheme } from '@hooks/useTheme';

const MyComponent = () => {
  const theme = useTheme(); // Returns active theme object
  // Use theme.colors.primary, theme.spacing.md, etc.
};
```

### 4. Settings Screen (`src/screens/SettingsScreen.tsx`)
- Displays all three theme options with visual previews
- Shows theme description and color samples
- Saves selection to AsyncStorage
- Dispatches theme change to Redux
- Loads saved theme on mount

### 5. Navigation Integration
- Added 'Settings' to MainStackParamList
- Settings screen accessible from Profile screen
- Proper TypeScript types for navigation

## Usage

### For Users
1. Open the app and navigate to **Profile** tab
2. Tap **⚙️ Settings** button (above Logout)
3. Select your preferred theme from the list
4. Theme applies immediately
5. Preference is saved automatically

### For Developers

#### Using Theme in Components
```typescript
import { useTheme } from '@hooks/useTheme';

const MyScreen = () => {
  const theme = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>
        Hello World
      </Text>
    </View>
  );
};
```

#### Accessing Current Theme Name
```typescript
import { useSelector } from 'react-redux';
import { selectCurrentTheme } from '@store/slices/themeSlice';

const currentTheme = useSelector(selectCurrentTheme); // 'light' | 'dark' | 'modern'
```

#### Changing Theme Programmatically
```typescript
import { useDispatch } from 'react-redux';
import { setTheme } from '@store/slices/themeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dispatch = useDispatch();

const changeTheme = async (themeName: 'light' | 'dark' | 'modern') => {
  dispatch(setTheme(themeName));
  await AsyncStorage.setItem('@uniqvue_theme', themeName);
};
```

## Theme Colors Reference

### Light Theme
- Primary: `#6C63FF` (Purple)
- Background: `#FFFFFF` (White)
- Surface: `#F5F5F5` (Light Gray)
- Text: `#333333` (Dark Gray)

### Dark Theme
- Primary: `#8B7FFF` (Light Purple)
- Background: `#121212` (True Black)
- Surface: `#1E1E1E` (Dark Gray)
- Text: `#FFFFFF` (White)

### Modern Theme
- Primary: `#007AFF` (iOS Blue)
- Background: `#F2F2F7` (iOS Gray)
- Surface: `#FFFFFF` (White)
- Text: `#000000` (Black)

## File Structure
```
UniqVue/
├── src/
│   ├── config/
│   │   └── theme.ts                    # Theme definitions
│   ├── store/
│   │   ├── index.ts                    # Redux store (includes themeReducer)
│   │   └── slices/
│   │       └── themeSlice.ts           # Theme Redux slice
│   ├── hooks/
│   │   ├── index.ts                    # Hook exports
│   │   └── useTheme.ts                 # Theme hook
│   ├── screens/
│   │   ├── index.ts                    # Screen exports
│   │   ├── SettingsScreen.tsx          # Settings UI
│   │   └── ProfileScreen.tsx           # Updated with Settings nav
│   └── navigation/
│       ├── types.ts                    # Updated with Settings type
│       └── MainNavigator.tsx           # Updated with Settings route
```

## Storage Key
Theme preference is stored in AsyncStorage with key: `@uniqvue_theme`

## Future Enhancements
- [ ] System theme detection (auto light/dark based on device)
- [ ] Custom theme builder
- [ ] Theme scheduling (auto-switch at sunset/sunrise)
- [ ] Per-screen theme overrides
- [ ] Animated theme transitions

## Testing
To test the theme switcher:
1. Navigate to Settings
2. Switch between themes
3. Verify immediate UI update
4. Close and reopen app
5. Confirm theme persists

## Troubleshooting

**Theme not persisting after app restart:**
- Check AsyncStorage permissions
- Verify `loadTheme()` is called in SettingsScreen useEffect

**Theme not updating in some screens:**
- Ensure screen uses `useTheme()` hook instead of static import
- Check that screen is re-rendering on theme change

**TypeScript errors:**
- Verify all theme objects have identical structure
- Check ThemeName type matches theme keys

## Support
For issues or questions about the theme system, refer to this guide or check the implementation in the files listed above.
