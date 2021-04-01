import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthenticationContext } from "../services/auth/Authentication";

import DrawerNavigator from "./DrawerNavigator";
import AccountNavigator from "./AccountNavigator";
import AsyncStorage from "@react-native-community/async-storage";
import { AUTH } from "../utils/constants";
import ViewCenter from "../components/lib/ViewCenter";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "../theme/colors";

export const Navigation = () => {
  const { user, setUser } = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(true);

  const retrieveAuthFromStorage = async (): Promise<void> => {
    const dataToRetrieve = await AsyncStorage.getItem(AUTH.DATA);
    if (dataToRetrieve) {
      setUser(JSON.parse(dataToRetrieve));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    retrieveAuthFromStorage();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <ViewCenter>
          <ActivityIndicator animating color={colors.ui.primary} size="large" />
        </ViewCenter>
      ) : user?.token ? (
        <DrawerNavigator />
      ) : (
        <AccountNavigator />
      )}
    </NavigationContainer>
  );
};
