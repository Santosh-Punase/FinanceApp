import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import Toast from 'react-native-toast-message';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { initialize } from './store/store';
import { defaultCategories, defaultPaymentModes } from './constants/Store';
import { stringifyObject } from './utils';
import { Theme } from './store/type';
import { ThemeContext } from './theme';
import { AuthProvider } from './contexts/AuthContext';


export default function App() {
  const [theme, setTheme] = useState<Theme>(Theme.DEFAULT);
  const themeData = { theme, setTheme };

  const isLoadingComplete = useCachedResources();
  const defaultTheme = useColorScheme();
  const colorScheme = theme === Theme.DEFAULT ? defaultTheme : theme;

  useEffect(() => {
    initialize('categories', stringifyObject(defaultCategories));
    initialize('paymentModes', stringifyObject(defaultPaymentModes));
  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ThemeContext.Provider value={themeData}>
          <MenuProvider>
            <AuthProvider>
              <Navigation colorScheme={colorScheme} />
            </AuthProvider>
            <StatusBar style={colorScheme === Theme.DARK ? 'light' : 'dark'} />
          </MenuProvider>
            <Toast />
        </ThemeContext.Provider>
      </SafeAreaProvider>
    );
  }
}
