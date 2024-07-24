import { Context, createContext, useContext } from "react";

import { AuthContextType } from "../store/type";

const authContextInitialValues: AuthContextType = {
  isLoading: true,
  user: null,
  isLaunched: false,
  setUser: () => null,
  onLogin: () => null,
  onLogout: () => null,
}

export const AuthContext: Context<AuthContextType> = createContext(authContextInitialValues)

export const useAuthContext = () => useContext(AuthContext);