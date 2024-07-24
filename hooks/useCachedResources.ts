import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { getValue } from '../store/store';
import { setAuthToken } from '../api/apiConfig';
import { User } from '../store/type';
import { getUser } from '../api/api';

export default function useCachedResources() {
  const [isLoading, setLoading] = useState(true);
  const [isLaunched, setLaunched] = useState(false);
  const [user, setUser] = useState<User>(null);

  const fetchUser = () => {
    return getUser()
    .then((user) => {
      // @ts-ignore
      setUser(user);
    })
    .catch();
  }
  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });

        const token = await getValue('at');
        const isLaunched = await getValue('launched');
        setLaunched(!!isLaunched)
        if (token) {
          setAuthToken(token);
          await fetchUser();
        }
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoading(false);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return { isLoading, isLaunched, user, fetchUser, setUser };
}
