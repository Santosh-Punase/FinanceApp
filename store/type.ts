export type StoreKey = 'categories' | 'paymentModes' | 'transactionList';

export type Option = {
  name: string,
  createdAt: any,
  updatedAt?: any,
  lastUsedAt?: any,
};

export type TransactionType = 'Cash-In' | 'Cash-Out';

export type Transaction = {
  transactionType: TransactionType,
  amount: string,
  category: string;
  paymentMode: string;
  remark: string;
  createdAt: number;
}
