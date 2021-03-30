import React, { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface User {
  userId: number;
  token: string;
  success: boolean;
}

interface ProviderValue {
  user: User | null;
  isLoading: boolean;
  error: string;
  onLogin: Function;
  onLogout: Function;
  onRegister: Function;
}

const initialProviderValue: ProviderValue = {
  user: null,
  isLoading: false,
  error: "",
  onLogin: (email: string, password: string) => {},
  onLogout: () => {},
  onRegister: (email: string, password: string, repeatedPassword: string) => {},
};

export const AuthenticationContext = createContext(initialProviderValue);

const Authentication = ({ children }: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState<string>("");

  const onLogin = (email: string, password: string) => {
    setIsLoading(true);
    // TODO Login service
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
