import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthenticationContext } from "../services/auth/Authentication";

import DrawerNavigator from "./DrawerNavigator";
import AccountNavigator from "./AccountNavigator";

export const Navigation = () => {
  const { user } = useContext(AuthenticationContext);

  return (
    <NavigationContainer>
      {user?.success ? <DrawerNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
