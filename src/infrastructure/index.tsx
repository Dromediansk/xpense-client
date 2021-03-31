import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthenticationContext } from "../services/auth/Authentication";

import DrawerNavigator from "./DrawerNavigator";
import AccountNavigator from "./AccountNavigator";
import AsyncStorage from "@react-native-community/async-storage";
import { AUTH } from "../utils/constants";

export const Navigation = () => {
  const { user, storeUser } = useContext(AuthenticationContext);

  const retrieveAuthFromStorage = async () => {
    const dataToRetrieve = await AsyncStorage.getItem(AUTH.DATA);
    if (dataToRetrieve) {
      storeUser(JSON.parse(dataToRetrieve));
    }
  };

  useEffect(() => {
    retrieveAuthFromStorage();
  }, []);

  return (
    <NavigationContainer>
      {user?.token ? <DrawerNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
