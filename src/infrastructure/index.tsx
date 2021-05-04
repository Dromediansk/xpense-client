import { NavigationContainer } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { useContext } from 'react';
import { AuthenticationContext } from '../services/auth/Authentication';
import AccountNavigator from './AccountNavigator';
import DrawerNavigator from './DrawerNavigator';

const Navigation = () => {
  const { user } = useContext(AuthenticationContext);
  const currentDate = dayjs();

  return (
    <NavigationContainer>
      {user !== null ? (
        <DrawerNavigator currentDate={currentDate} />
      ) : (
        <AccountNavigator />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
