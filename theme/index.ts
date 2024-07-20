
import { createContext, useContext } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { StyleTheme, ThemeContextType } from '../store/type';

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme(): StyleTheme {

  const defaultTheme: ColorSchemeName = useColorScheme();
  const { theme } = useContext(ThemeContext) as ThemeContextType;
  const currentTheme = theme === 'default' ? defaultTheme ? defaultTheme : "light" : theme;

  return currentTheme;
}
