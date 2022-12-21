
import { createContext } from 'react';
import { ThemeContextType } from '../store/type';

export const ThemeContext = createContext<ThemeContextType | null>(null);
