// import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import Toast from 'react-native-toast-message';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
// import { initialize } from './store/store';
// import { /* defaultCategories, */ defaultPaymentModes } from './constants/Store';
// import { stringifyObject } from './utils';
import { Theme } from './store/type';
import { ThemeContext } from './theme';
import { AuthContext } from './contexts/AuthContext';
import { setAuthToken, setLogoutHandler } from './api/apiConfig';
import { removeValue, setValue } from './store/store';


export default function App() {
  const [theme, setTheme] = useState<Theme>('default');
  const themeData = { theme, setTheme };

  const { isLoading, isLaunched, user, fetchUser, setUser } = useCachedResources();
  const defaultTheme = useColorScheme();
  const colorScheme = theme === 'default' ? defaultTheme : theme;

  // useEffect(() => {
    // initialize('categories', stringifyObject(defaultCategories));
    // initialize('paymentModes', stringifyObject(defaultPaymentModes));
  // }, [])

  const onLogin = async (token: string) => {
    if(token) {
      setAuthToken(token);
      await setValue('launched', 'true');
      await setValue('at', token);
      await fetchUser();
    }
  }

  const onLogout = async () => {
    await removeValue('at');
    setAuthToken(null);
    setUser(null);
  }

  useEffect(() => {
    setLogoutHandler(onLogout);
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeContext.Provider value={themeData}>
        <MenuProvider>
          <AuthContext.Provider value={{ isLoading, isLaunched, user, setUser, onLogin, onLogout }}>
            <Navigation colorScheme={colorScheme} />
          </AuthContext.Provider>
          {/* <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} /> */}
        </MenuProvider>
          <Toast />
      </ThemeContext.Provider>
    </SafeAreaProvider>
  );
}
