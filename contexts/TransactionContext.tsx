import { Context, createContext, useContext } from "react";
import { TRANSACTION_TYPE, TransactionCategory, TransactionPaymentMode } from "../store/type";

export type Transaction = {
  id?: string;
  type?: TRANSACTION_TYPE;
  amount?: string;
  category?: TransactionCategory;
  paymentMode?: TransactionPaymentMode;
  remark?: string;
}
export type TransactionContextType = {
  transaction: Transaction;
  setTransaction: (value: Transaction ) => void;
}

const TransactionContextInitialValues: TransactionContextType = {
  transaction: { type: TRANSACTION_TYPE.INCOME },
  setTransaction: () => null
}

export const TransactionContext: Context<TransactionContextType> = createContext(TransactionContextInitialValues)

export const useTransactionContext = () => useContext(TransactionContext);
