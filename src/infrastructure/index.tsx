import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import dayjs from 'dayjs';
import { AuthenticationContext } from '../services/auth/Authentication';

import DrawerNavigator from './DrawerNavigator';
import AccountNavigator from './AccountNavigator';
import { AUTH } from '../utils/constants';
import { ViewCenter } from '../components/lib/general';
import { colors } from '../theme/colors';

export const Navigation = () => {
  const { user, setUser } = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(true);

  const currentDate = dayjs();

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

  const navigatorToRender = () => {
    if (user !== null) {
      return <DrawerNavigator currentDate={currentDate} />;
    }
    return <AccountNavigator />;
  };

  return (
    <NavigationContainer>
      {isLoading ? (
        <ViewCenter>
          <ActivityIndicator animating color={colors.ui.primary} size="large" />
        </ViewCenter>
      ) : (
        navigatorToRender()
      )}
    </NavigationContainer>
  );
};
