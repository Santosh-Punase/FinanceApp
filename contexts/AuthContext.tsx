import React, { Context, createContext, useContext, useEffect, useState } from "react";

import { AuthContextType } from "../store/type";
import { getValue, removeValue, setValue } from "../store/store";
import { setAuthToken } from "../api/apiConfig";

const authContextInitialValues: AuthContextType = {
  isLoading: false,
  accessToken: '',
  onLogin: () => null,
  onLogout: () => null,
}

export const AuthContext: Context<AuthContextType> = createContext(authContextInitialValues)

export const AuthProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>('');

  const onLogin = async (token: string) => {
    if(token) {
      setAccessToken(token);
      setAuthToken(token);
      await setValue('at', token);
    }
  }

  const onLogout = async () => {
    setIsLoading(true);
    await removeValue('at');
    setAccessToken('');
    setIsLoading(false);
  }

  const isLoggedIn = async () => {
    setIsLoading(true);
    try {
      const token = await getValue('at') || '';
      setAccessToken(token);
      setIsLoading(false);
    } catch(_e) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, [])

  return (
    <AuthContext.Provider value={{ isLoading, accessToken, onLogin, onLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext);