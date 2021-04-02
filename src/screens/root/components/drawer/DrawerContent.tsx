import AsyncStorage from "@react-native-community/async-storage";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import React, { useContext } from "react";
import { View } from "react-native";
import { AuthenticationContext } from "../../../../services/auth/Authentication";
import { postLogoutService } from "../../../../services/auth/authServices";
import { AUTH } from "../../../../utils/constants";

const DrawerContent = (props: DrawerContentComponentProps) => {
  const { user, setUser } = useContext(AuthenticationContext);

  const handleLogout = async () => {
    try {
      if (user) {
        const response = await postLogoutService(user.userId, user.token);
        if (response.status === 200) {
          await AsyncStorage.removeItem(AUTH.DATA);
          setUser(null);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <View>
        <DrawerItemList {...props} />
      </View>
      <DrawerItem label="Log out" onPress={handleLogout} />
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
