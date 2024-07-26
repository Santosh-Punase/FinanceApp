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
import { Transaction, TransactionContext, TransactionContextType } from '../../contexts/TransactionContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const [transaction, setTransaction] = React.useState<Transaction>({ });

  const updateTransaction = (value: {}) => {
    setTransaction({ ...transaction, ...value });
  };

  const resetTransaction: TransactionContextType['resetTransaction'] = (val) => {
    val ? setTransaction(val) : setTransaction({})
  };

  return (
    <TransactionContext.Provider value={{ transaction, setTransaction: updateTransaction, resetTransaction }}>
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