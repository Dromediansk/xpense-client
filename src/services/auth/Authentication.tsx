import React, { createContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface User {
  userId: number;
  token: string;
}

interface ProviderValue {
  user: User | null;
  setUser: Function;
}

const initialProviderValue: ProviderValue = {
  user: null,
  setUser: () => {},
};

export const AuthenticationContext = createContext(initialProviderValue);

const Authentication = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default Authentication;
