
import { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { Theme, ThemeContextType } from '../store/type';

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {

  const defaultTheme = useColorScheme();
  const { theme } = useContext(ThemeContext) as ThemeContextType;
  const currentTheme = theme === Theme.DEFAULT ? defaultTheme : theme;

  return currentTheme || 'light';
}
