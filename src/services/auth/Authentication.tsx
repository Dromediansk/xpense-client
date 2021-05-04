import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { ViewCenter } from '../../components/lib/general';
import { colors } from '../../theme/colors';
import { AUTH, HttpStatus } from '../../utils/constants';

interface Props {
  children: React.ReactNode;
}

export interface User {
  userId: number;
  token: string;
}

interface ProviderValue {
  user: User | null;
  setUser: Function;
  isLoading: boolean;
}

type Error = {
  response: {
    data: {
      code: string;
    };
    status: HttpStatus;
  };
};

const initialProviderValue: ProviderValue = {
  user: null,
  setUser: () => {},
  isLoading: false,
};

export const AuthenticationContext = createContext(initialProviderValue);

const Authentication = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.interceptors.response.use(
      response => response,
      async (errorResp: Error) => {
        const { status } = errorResp.response;

        if (status === HttpStatus.UNAUTHORIZED) {
          setUser(null);
          await AsyncStorage.clear();
        }

        return Promise.reject(errorResp);
      },
    );
  }, [setUser]);

  useEffect(() => {
    (async () => {
      try {
        const dataToRetrieve = await AsyncStorage.getItem(AUTH.DATA);
        if (dataToRetrieve) {
          setUser(JSON.parse(dataToRetrieve));
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
        setUser(null);
      } catch (err) {
        setIsLoading(false);
        setUser(null);
      }
    })();
  }, [setUser]);

  if (isLoading) {
    return (
      <ViewCenter>
        <ActivityIndicator animating color={colors.ui.primary} size="large" />
      </ViewCenter>
    );
  }
  return (
    <AuthenticationContext.Provider
      value={{
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default Authentication;
