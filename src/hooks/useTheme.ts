import { useSelector } from 'react-redux';
import { selectCurrentTheme } from '../store/slices/themeSlice';
import { themes } from '../config/theme';

/**
 * Custom hook to access the current theme
 * Returns the active theme object based on user's selection
 */
export const useTheme = () => {
  const currentTheme = useSelector(selectCurrentTheme);
  return themes[currentTheme];
};
