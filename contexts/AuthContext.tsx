import React, { Context, createContext, useContext, useEffect, useState } from "react";
import { AuthContextType } from "../store/type";
import { getValue, removeValue, setValue } from "../store/store";
import { View } from "../components/Themed";
import { ActivityIndicator } from "react-native";

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

  const onLogin = async (uname: string, pass: string) => {
    setIsLoading(true);
    const accessToken = `${uname}_${pass}`
    await setValue('at', accessToken);
    setTimeout(() => {
      setAccessToken(accessToken);
      setIsLoading(false);
    }, 500);
  }

  const onLogout = async () => {
    setIsLoading(true);
    await removeValue('at');
    setTimeout(() => {
      setAccessToken('');
      setIsLoading(false);
    }, 500);
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
      { isLoading
      ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={"large"} />
        </View>
      : children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext);