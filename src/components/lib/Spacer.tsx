import React from "react";
import { View } from "react-native";

export enum Size {
  SMALL = 8,
  MEDIUM = 16,
  LARGE = 24,
  HUGE = 32,
}

interface Props {
  children?: React.ReactNode;
  size: Size;
}

const Spacer = ({ children, size }: Props): JSX.Element => (
  <View style={{ padding: size }}>{children}</View>
);

export default Spacer;
