/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import ModalScreen from '../../screens/ModalScreen';
import AddNewScreen from '../../screens/AddNewScreen';
import NotFoundScreen from '../../screens/NotFoundScreen';
import { RootStackParamList } from '../../types';
import CategoryOptionsScreen from '../../screens/CategoryOptionsScreen';
import PaymentOptionsScreen from '../../screens/PaymentOptionsScreen';
import { BottomTabNavigator } from '.././BottomTabNavigator';
import AddCategoryScreen from '../../screens/AddCategoryScreen';
import { TransactionContext } from '../../contexts/TransactionContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const [transaction, setTransaction] = React.useState({ });

  const updateTransaction = (value: {}) => {
    setTransaction({ ...transaction, ...value });
  };

  return (
    <TransactionContext.Provider value={{ transaction, setTransaction: updateTransaction }}>
      <Stack.Navigator>
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="Modal" component={ModalScreen} />
          <Stack.Screen name="AddNewTransaction" component={AddNewScreen} options={({ route }) => ({ title: route?.params?.header }) } />
          <Stack.Screen name="AddCategoryScreen" component={AddCategoryScreen} options={({ route }) => ({ title: route.params.header }) } />
          <Stack.Screen name="CategoryOptionsScreen" component={CategoryOptionsScreen} options={({ route }) => ({ title: route.params.header }) } />
          <Stack.Screen name="PaymentOptionsScreen" component={PaymentOptionsScreen} options={({ route }) => ({ title: route.params.header }) } />
        </Stack.Group>
      </Stack.Navigator>
    </TransactionContext.Provider>
  );
}