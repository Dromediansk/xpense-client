import { Text } from "react-native";
import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { RootDrawerParamList } from "./types";
import ViewCenter from "../../components/lib/ViewCenter";
import { CustomButton } from "../../components/lib/Buttons";

type Props = StackScreenProps<RootDrawerParamList, "AddRecord">;

const DashboardScreen = ({ navigation }: Props): JSX.Element => {
  return (
    <ViewCenter>
      <Text>Dashboard Screen</Text>
      <CustomButton onPress={() => navigation.navigate("AddRecord")}>
        Add record
      </CustomButton>
    </ViewCenter>
  );
};

export default DashboardScreen;
