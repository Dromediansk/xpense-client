import { Text } from "react-native";
import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootDrawerParamList } from "../types";
import ViewCenter from "../../components/lib/ViewCenter";

type Props = StackScreenProps<RootDrawerParamList, "AddRecord">;

const DashboardScreen = ({ navigation }: Props): JSX.Element => {
  return (
    <ViewCenter>
      <Text>Dashboard Screen</Text>
      {/* <Button
        title="Go to adding record"
        onPress={() => navigation.navigate("AddRecord")}
      /> */}
    </ViewCenter>
  );
};

export default DashboardScreen;
