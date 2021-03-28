import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { RootStackParamList } from "./types";
import { Button } from "react-native-elements";

type Props = StackScreenProps<RootStackParamList, "AddRecord">;

interface Style {
  container: ViewStyle;
}

const AddRecordScreen: React.FC<Props> = ({ navigation }): JSX.Element => {
  return (
    <View style={ViewCenterStyles.container}>
      <Text>Adding record Screen</Text>
      <Button
        title="Go to adding record"
        onPress={() => navigation.push("AddRecord")}
      />
    </View>
  );
};

const ViewCenterStyles = StyleSheet.create<Style>({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default AddRecordScreen;
