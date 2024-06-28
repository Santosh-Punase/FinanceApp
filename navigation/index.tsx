/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import LinkingConfiguration from './LinkingConfiguration';
import { RootNavigator as AppStack } from './AppStack';
import { useAuthContext } from '../contexts/AuthContext';
import { AuthStack } from './AuthStack';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {

  const { accessToken } = useAuthContext()

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      { accessToken ? <AppStack /> : <AuthStack /> }
    </NavigationContainer>
  );
}


