export const API_CONSTANT = {
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',

  GET_USER: '/api/auth/me',
  UPDATE_USER: '/api/auth/user',

  SAVE_TRANSACTION: '/api/transactions/',
  GET_TRANSACTIONS: '/api/transactions?page=:page&limit=:limit',
  UPDATE_TRANSACTION: '/api/transactions/:id',
  DELETE_TRANSACTION: '/api/transactions/:id',

  SAVE_PAYMENT_MODE: '/api/payment-modes/',
  GET_PAYMENT_MODES: '/api/payment-modes/',
  UPDATE_PAYMENT_MODE: '/api/payment-modes/:id',
  DELETE_PAYMENT_MODE: '/api/payment-modes/:id',

  SAVE_CATEGORY: '/api/categories/',
  GET_CATEGORIES: '/api/categories/',
  UPDATE_CATEGORY: '/api/categories/:id',
  DELETE_CATEGORY: '/api/categories/:id',
}
