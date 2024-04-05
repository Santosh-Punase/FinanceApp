export type StoreKey = 'categories' | 'paymentModes' | 'transactionList' | 'user' | 'theme';

export type DropdownLabel = 'categories' | 'paymentModes';

export type Category = {
  name: string,
  timestamp: Date | null,
  budget: number,
  expense: number
}

export enum Theme {
  DEFAULT = 'default',
  LIGHT = 'light',
  DARK = 'dark',
}

export type Option = {
  name: string;
  createdAt: any;
  updatedAt?: any;
  lastUsedAt?: any;
};

export type CategoryOption = {
  id: number;
  name: string;
  createdAt: number | null;
  updatedAt: number | null;
  budget: number;
  expense: number;
}

export type PaymentModeOption = {
  id: number;
  name: string;
  createdAt: number | null;
  updatedAt: number | null;
  lastUsedAt: number;
}

export type TransactionType = 'Cash-In' | 'Cash-Out';
export type DropdownOption = { id: number, name: string }; 
export type TransactionCategory = DropdownOption | undefined; 
export type TransactionPaymentMode = DropdownOption | undefined;

export type Transaction = {
  id: number;
  transactionType: TransactionType;
  amount: string;
  category: TransactionCategory;
  paymentMode: TransactionPaymentMode;
  remark: string;
  createdAt: number;
}

export type User = {
  name: string;
  phoneNumber: string;
}

export type ThemeContextType = {
  theme: Theme
  setTheme: (theme:Theme) => void
}
