import { ColorSchemeName } from "react-native";

export type StoreKey = 'categories' | 'paymentModes' | 'transactionList' | 'user' | 'theme' | 'at';

export type DropdownLabel = 'categories' | 'paymentModes';

export type Theme = Exclude<ColorSchemeName, null | undefined> | 'default'
export type StyleTheme = Exclude<Theme, 'default'>

export type Option = {
  name: string;
  createdAt: any;
  updatedAt?: any;
  lastUsedAt?: any;
};

export type CategoryOption = {
  _id: string;
  name: string;
  createdAt?: number | null;
  updatedAt?: number | null;
  budget: number;
  expenditure: number;
}

export type PaymentModeOption = {
  _id: string;
  name: string;
  createdAt?: number | null;
  updatedAt?: number | null;
  lastUsedAt?: number;
}

export enum TRANSACTION_TYPE {
  INCOME = 'income',
  EXPENSE = 'expense',
};

export type TransactionType = 'Cash-In' | 'Cash-Out';
export type DropdownOption = { id: string, name: string }; 
export type TransactionCategory = DropdownOption | undefined; 
export type TransactionPaymentMode = DropdownOption | undefined;

export type Transaction = {
  id?: number;
  type: TRANSACTION_TYPE;
  amount: string;
  category: TransactionCategory;
  paymentMode: TransactionPaymentMode;
  remark: string;
  date?: number;
}

export type User = {
  name: string;
  phoneNumber: string;
}

export type ThemeContextType = {
  theme: Theme
  setTheme: (theme:Theme) => void
}


export type AuthContextType = {
  isLoading: boolean;
  user?: any;
  accessToken: string;  
  onLogin: (token: string) => void;
  onLogout: () => void
}
