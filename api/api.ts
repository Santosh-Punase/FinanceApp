import { API_CONSTANT } from "./apiConstants";
import { doDelete, doGet, doPost, doPut } from "./apiConfig";
import { replaceUrlParams } from "../utils";

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
  return doPut(replaceUrlParams(API_CONSTANT.UPDATE_CATEGORY, { id }), data);
};

export const deleteCategory = (id: string) => {
  return doDelete(replaceUrlParams(API_CONSTANT.DELETE_CATEGORY, { id }));
};

export const getTransactions = () => {
  return doGet(API_CONSTANT.GET_TRANSACTIONS);
};
