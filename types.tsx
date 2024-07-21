/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { TransactionCategory, TransactionPaymentMode, TransactionType } from './store/type';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  AddNewTransaction: { category: TransactionCategory, paymentMode: TransactionPaymentMode, transactionType?: TransactionType } | undefined;
  AddCategoryScreen: { header: string, category: { name: string, budget?: number } | undefined, action: 'Add' | 'Edit' };
  CategoryOptionsScreen: { header: string, category: TransactionCategory, paymentMode: TransactionPaymentMode, action: 'select' | 'list' };
  PaymentOptionsScreen: { header: string, category: TransactionCategory, paymentMode: TransactionPaymentMode };
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type AuthStackParamList = {
  Loading: undefined;
  Login: undefined;
  Signup: undefined;
};

export type AuthStackScreenProps<Screen extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: { category: string, paymentMode: string } | undefined;
  TabTwo: undefined;
  TabThree: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Root">;
export type AddNewScreenProps = NativeStackScreenProps<RootStackParamList, "AddNewTransaction">;
export type AddCategoryScreenProps = NativeStackScreenProps<RootStackParamList, "AddCategoryScreen">;
export type CategoryOptionsScreenProps = NativeStackScreenProps<RootStackParamList, "CategoryOptionsScreen">;
export type PaymentOptionsScreenProps = NativeStackScreenProps<RootStackParamList, "PaymentOptionsScreen">;

export type HomeScreenNavigation = CompositeNavigationProp<BottomTabNavigationProp<RootTabParamList, 'TabOne', undefined>, NativeStackNavigationProp<RootStackParamList, 'Root', undefined>>;