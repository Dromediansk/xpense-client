import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface Props {
  children: React.ReactNode;
  styles?: StyleProp<ViewStyle>;
}

interface Style {
  container: ViewStyle;
}

const ViewCenter = ({ children, styles }: Props, props: any): JSX.Element => {
  return (
    <View {...props} style={[ViewCenterStyles.container, styles]}>
      {children}
    </View>
  );
};

const ViewCenterStyles = StyleSheet.create<Style>({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default ViewCenter;
