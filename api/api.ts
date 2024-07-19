import { API_CONSTANT } from "./apiConstants";
import { doPost } from "./apiConfig";

export const login = (email: string, password: string) => {
  return doPost(API_CONSTANT.LOGIN, { email, password });
};

export const signup = (username: string, email: string, password: string, confirmPassword: string) => {
  return doPost(API_CONSTANT.REGISTER, { username, email, password, confirmPassword });
};
