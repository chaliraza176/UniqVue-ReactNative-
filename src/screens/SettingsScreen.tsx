import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes } from '../config/theme';
import { setTheme, selectCurrentTheme, ThemeName } from '../store/slices/themeSlice';

interface SettingsScreenProps {
  navigation: any;
}

const THEME_STORAGE_KEY = '@uniqvue_theme';

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectCurrentTheme);
  const theme = themes[currentTheme];
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>(currentTheme);

  // Load theme from AsyncStorage on mount
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'modern')) {
        setSelectedTheme(savedTheme as ThemeName);
        dispatch(setTheme(savedTheme as ThemeName));
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  };

  const handleThemeChange = async (themeName: ThemeName) => {
    try {
      setSelectedTheme(themeName);
      dispatch(setTheme(themeName));
      await AsyncStorage.setItem(THEME_STORAGE_KEY, themeName);
      Alert.alert('Success', `Theme changed to ${themeName}`);
    } catch (error) {
      console.error('Failed to save theme:', error);
      Alert.alert('Error', 'Failed to save theme preference');
    }
  };

  const themeOptions: Array<{ name: ThemeName; label: string; description: string }> = [
    {
      name: 'light',
      label: 'Light',
      description: 'Classic light theme with bright colors',
    },
    {
      name: 'dark',
      label: 'Dark',
      description: 'Easy on the eyes with dark backgrounds',
    },
    {
      name: 'modern',
      label: 'Modern',
      description: 'Clean and contemporary design',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.white, borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Settings</Text>
      </View>

      {/* Theme Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Appearance</Text>
        <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>
          Choose your preferred theme
        </Text>

        {themeOptions.map((option) => {
          const isSelected = selectedTheme === option.name;
          const previewTheme = themes[option.name];

          return (
            <TouchableOpacity
              key={option.name}
              style={[
                styles.themeOption,
                {
                  backgroundColor: theme.colors.white,
                  borderColor: isSelected ? theme.colors.primary : theme.colors.border,
                  borderWidth: isSelected ? 2 : 1,
                },
              ]}
              onPress={() => handleThemeChange(option.name)}
            >
              <View style={styles.themeOptionContent}>
                <View style={styles.themeInfo}>
                  <Text style={[styles.themeLabel, { color: theme.colors.text }]}>
                    {option.label}
                  </Text>
                  <Text style={[styles.themeDescription, { color: theme.colors.textSecondary }]}>
                    {option.description}
                  </Text>
                </View>

                {/* Theme Preview */}
                <View style={styles.themePreview}>
                  <View
                    style={[
                      styles.previewBox,
                      { backgroundColor: previewTheme.colors.background },
                    ]}
                  >
                    <View
                      style={[
                        styles.previewAccent,
                        { backgroundColor: previewTheme.colors.primary },
                      ]}
                    />
                    <View
                      style={[
                        styles.previewText,
                        { backgroundColor: previewTheme.colors.text },
                      ]}
                    />
                  </View>
                </View>
              </View>

              {isSelected && (
                <View style={[styles.checkmark, { backgroundColor: theme.colors.primary }]}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Info Section */}
      <View style={[styles.infoCard, { backgroundColor: theme.colors.white }]}>
        <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
          Theme changes will be applied immediately and saved for future sessions.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  themeOption: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  themeOptionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  themeInfo: {
    flex: 1,
    marginRight: 16,
  },
  themeLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  themeDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  themePreview: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  previewBox: {
    flex: 1,
    padding: 8,
  },
  previewAccent: {
    width: '100%',
    height: 12,
    borderRadius: 4,
    marginBottom: 6,
  },
  previewText: {
    width: '70%',
    height: 6,
    borderRadius: 2,
    marginBottom: 4,
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  infoCard: {
    marginHorizontal: 24,
    marginTop: 8,
    marginBottom: 32,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});
