import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { SafeArea } from "../components/lib/SafeArea";
import AddRecordScreen from "../screens/root/AddRecordScreen";
import DashboardScreen from "../screens/root/DashboardScreen";
import DrawerContent from "../screens/root/drawer/DrawerContent";
import { RootDrawerParamList } from "../screens/root/types";

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator<RootDrawerParamList>();

  return (
    <>
      <Drawer.Navigator
        initialRouteName="Dashboard"
        drawerContent={(props) => <DrawerContent {...props} />}
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
