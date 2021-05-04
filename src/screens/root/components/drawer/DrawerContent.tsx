import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  DrawerDescriptorMap,
  DrawerNavigationHelpers,
} from '@react-navigation/drawer/lib/typescript/src/types';
import {
  DrawerNavigationState,
  ParamListBase,
} from '@react-navigation/routers';
import React, { useContext } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { AuthenticationContext } from '../../../../services/auth/Authentication';
import { postLogoutService } from '../../../../services/auth/authServices';
import { AUTH } from '../../../../utils/constants';

type Props = {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
};

const styles = StyleSheet.create({
  drawerContentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

const DrawerContent = ({ navigation, state, descriptors }: Props) => {
  const { user, setUser } = useContext(AuthenticationContext);

  const handleLogout = async () => {
    try {
      if (user?.userId) {
        const response = await postLogoutService(user.userId, user.token);
        if (response.status === 200) {
          await AsyncStorage.removeItem(AUTH.DATA);
          setUser(null);
        }
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log('err', err);
      // TODO handle error
    }
  };

  return (
    <DrawerContentScrollView
      contentContainerStyle={styles.drawerContentContainer}
    >
      <View>
        <DrawerItemList
          navigation={navigation}
          state={state}
          descriptors={descriptors}
        />
      </View>
      <DrawerItem label="Log out" onPress={handleLogout} />
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
