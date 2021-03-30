import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/account/LoginScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Login" component={LoginScreen} />
    {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
  </Stack.Navigator>
);

export default AccountNavigator;
