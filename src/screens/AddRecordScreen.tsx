import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Text } from "react-native";
import { RootDrawerParamList } from "./types";
import ViewCenter from "../components/lib/ViewCenter";

type Props = StackScreenProps<RootDrawerParamList, "AddRecord">;

const AddRecordScreen = ({ navigation }: Props): JSX.Element => {
  return (
    <ViewCenter>
      <Text>Adding record Screen</Text>
    </ViewCenter>
  );
};

export default AddRecordScreen;
