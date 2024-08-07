/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { AuthStackParamList } from '../../types';
import InfoScreen from '../../screens/auth/InfoScreen';
import LoginScreen from '../../screens/auth/LoginScreen';
import SignupScreen from '../../screens/auth/SignupScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Loading" component={InfoScreen} options={{ animation: 'slide_from_right', headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ animation: 'slide_from_right', headerShown: false }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ animation: 'slide_from_right', headerShown: false }} />
    </Stack.Navigator>
  );
}