import { CategoryOption, PaymentModeOption } from "../store/type";

export const defaultCategories: CategoryOption[] = [
  { id: Math.random(), name: 'G', createdAt: 0, updatedAt: null, budget: 0, expense: 0 },
  { id: Math.random(), name: 'F', createdAt: 1, updatedAt: null, budget: 0, expense: 0 },
  { id: Math.random(), name: 'E', createdAt: 2, updatedAt: null, budget: 0, expense: 0 },
  // { name: 'Grocerry', timestamp: null, budget: 0, expense: 0 },
  // { name: 'Food', timestamp: null, budget: 0, expense: 0 },
  // { name: 'Entertainment', timestamp: null, budget: 0, expense: 0 },
];

export const defaultPaymentModes: PaymentModeOption[] = [
  { id: Math.random(), name: 'U', createdAt: 0, updatedAt: null, lastUsedAt: 1 },
  { id: Math.random(), name: 'O', createdAt: 1, updatedAt: null, lastUsedAt: 2 },
  { id: Math.random(), name: 'C', createdAt: 2, updatedAt: null, lastUsedAt: 3 },
];
// export const defaultPaymentModes = ['Upi', 'Online', 'Credit Card'];
