import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "./types";

type Props = StackScreenProps<RootStackParamList, "AddRecord">;

const DashboardScreen = ({ navigation }: Props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Dashboard Screen</Text>
      <Button
        title="Go to adding record"
        onPress={() => navigation.navigate("AddRecord")}
      />
    </View>
  );
};

export default DashboardScreen;
