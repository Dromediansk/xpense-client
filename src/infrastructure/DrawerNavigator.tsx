import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import AddRecordScreen from "../screens/root/AddRecordScreen";
import DashboardScreen from "../screens/root/DashboardScreen";
import { RootDrawerParamList } from "../screens/root/types";

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator<RootDrawerParamList>();

  return (
    <>
      <Drawer.Navigator
        initialRouteName="Dashboard"
        drawerStyle={{
          backgroundColor: "#c6cbef",
          width: 240,
        }}
      >
        <Drawer.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ headerShown: true }}
        />
        <Drawer.Screen
          name="AddRecord"
          component={AddRecordScreen}
          options={{ headerShown: true }}
        />
      </Drawer.Navigator>
    </>
  );
};

export default DrawerNavigator;
