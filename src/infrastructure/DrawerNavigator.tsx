import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import dayjs from 'dayjs';
import AddRecordScreen from '../screens/root/AddRecordScreen';
import DashboardScreen from '../screens/root/DashboardScreen';
import DrawerContent from '../screens/root/components/drawer/DrawerContent';
import { RootDrawerParamList } from '../screens/root/types';
import { colors } from '../theme/colors';
import { Typography } from '../components/lib/Typography';
import { DateFormats } from '../utils/dateFormats';

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator<RootDrawerParamList>();

  const currentDate = dayjs().format(DateFormats.MONTH_YEAR);

  return (
    <>
      <Drawer.Navigator
        initialRouteName="Dashboard"
        drawerContent={({ navigation, state, descriptors }) => (
          <DrawerContent
            navigation={navigation}
            state={state}
            descriptors={descriptors}
          />
        )}
      >
        <Drawer.Screen
          name="Dashboard"
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: colors.ui.primary },
            headerTitle: () => (
              <View style={{ alignItems: 'center' }}>
                <Typography
                  variant="label"
                  style={{
                    color: colors.common.white,
                  }}
                >
                  {currentDate}
                </Typography>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity>
                <FontAwesome
                  name="calendar"
                  size={24}
                  color={colors.common.white}
                  style={{ padding: 12 }}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity>
                <FontAwesome
                  name="user-circle"
                  size={24}
                  color={colors.common.white}
                  style={{ padding: 12 }}
                />
              </TouchableOpacity>
            ),
          }}
        >
          {({ navigation }) => (
            <DashboardScreen
              navigation={navigation}
              selectedDate={currentDate}
            />
          )}
        </Drawer.Screen>
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
