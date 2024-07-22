import { API_CONSTANT } from "./apiConstants";
import { doDelete, doGet, doPost, doPut } from "./apiConfig";

export const login = (email: string, password: string) => {
  return doPost(API_CONSTANT.LOGIN, { email, password });
};

export const signup = (username: string, email: string, password: string, confirmPassword: string) => {
  return doPost(API_CONSTANT.REGISTER, { username, email, password, confirmPassword });
};

export const getCategories = () => {
  return doGet(API_CONSTANT.GET_CATEGORIES);
};

export const saveCategory = (data: { name: string, budget: number }) => {
  return doPost(API_CONSTANT.SAVE_CATEGORY, data);
};

export const updateCategory = (id: string, data: { name: string, budget: number }) => {
  return doPut(API_CONSTANT.UPDATE_CATEGORY, data, { id });
};

export const deleteCategory = (id: string) => {
  return doDelete(API_CONSTANT.DELETE_CATEGORY, { id });
};

export const getPaymentModes = () => {
  return doGet(API_CONSTANT.GET_PAYMENT_MODES);
};

export const savePaymentMode = (data: { name: string }) => {
  return doPost(API_CONSTANT.SAVE_PAYMENT_MODE, data);
};

export const updatePaymentMode = (id: string, data: { name: string }) => {
  return doPut(API_CONSTANT.UPDATE_PAYMENT_MODE, data, { id });
};

export const deletePaymentMode = (id: string) => {
  return doDelete(API_CONSTANT.DELETE_PAYMENT_MODE, { id });
};

export const getTransactions = () => {
  return doGet(API_CONSTANT.GET_TRANSACTIONS);
};
