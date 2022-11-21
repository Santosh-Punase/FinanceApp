export type StoreKey = 'categories' | 'paymentModes' | 'transactionList';

export type Category = {
  name: string,
  timestamp: any
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
