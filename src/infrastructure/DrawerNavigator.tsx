import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Dayjs } from 'dayjs';
import NewRecordScreen from '../screens/root/NewRecordScreen';
import DashboardScreen from '../screens/root/DashboardScreen';
import DrawerContent from '../screens/root/components/drawer/DrawerContent';
import { RootDrawerParamList } from '../screens/root/types';
import { colors } from '../theme/colors';
import { Typography } from '../components/lib/Typography';
import { DateFormats } from '../utils/dateFormats';

interface Props {
  currentDate: Dayjs;
}

const DrawerNavigator = ({ currentDate }: Props) => {
  const Drawer = createDrawerNavigator<RootDrawerParamList>();

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
                  {currentDate.format(DateFormats.MONTH_YEAR)}
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
          {({ navigation }) => <DashboardScreen navigation={navigation} />}
        </Drawer.Screen>
        <Drawer.Screen name="NewRecord" component={NewRecordScreen} />
      </Drawer.Navigator>
    </>
  );
};

export default DrawerNavigator;
