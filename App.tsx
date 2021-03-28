import React from "react";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "react-native-elements";
import { theme } from "./src/utils/theme";
import { RootStackParamList } from "./src/screens/types";
import HomeScreen from "./src/screens/DashboardScreen";
import AddRecordScreen from "./src/screens/AddRecordScreen";

export default function App() {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Dashboard">
            <Stack.Screen
              name="Dashboard"
              component={HomeScreen}
              options={{ title: "Title" }}
            />
            <Stack.Screen name="AddRecord" component={AddRecordScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
