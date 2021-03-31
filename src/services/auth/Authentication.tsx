import AsyncStorage from "@react-native-community/async-storage";
import { AxiosResponse } from "axios";
import React, { createContext, useState } from "react";
import { AUTH } from "../../utils/constants";
import { postLoginService } from "./authServices";

interface Props {
  children: React.ReactNode;
}

interface User {
  userId: number;
  token: string;
}

interface ProviderValue {
  user: User | null;
  isLoading: boolean;
  error: string;
  storeUser: Function;
  onLogin: Function;
  onLogout: Function;
  onRegister: Function;
}

interface LoginResponse {
  success: boolean;
  token: string;
  userId: number;
}

const initialProviderValue: ProviderValue = {
  user: null,
  isLoading: false,
  error: "",
  storeUser: (dataToRetrieve: User) => {},
  onLogin: async (email: string, password: string) => {},
  onLogout: () => {},
  onRegister: (email: string, password: string, repeatedPassword: string) => {},
};

export const AuthenticationContext = createContext(initialProviderValue);

const Authentication = ({ children }: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  const storeUser = (dataToRetrieve: User) => {
    setUser(dataToRetrieve);
  };

  const onLogin = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      const response: AxiosResponse<LoginResponse> = await postLoginService({
        email,
        password,
      });
      await AsyncStorage.setItem(
        AUTH.DATA,
        JSON.stringify({
          userId: response.data.userId,
          token: response.data.token,
        })
      );
      setUser({
        userId: response.data.userId,
        token: response.data.token,
      });
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = (
    email: string,
    password: string,
    repeatedPassword: string
  ) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }
    // TODO Register service
  };

  const onLogout = () => {
    // TODO Logout service
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isLoading,
        error,
        storeUser,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default Authentication;
