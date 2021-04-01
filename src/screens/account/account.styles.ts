import { colors } from "./../../theme/colors";
import styled from "styled-components/native";
import { TextInput } from "react-native-paper";

export const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../../assets/money.jpeg"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AccountCover = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
`;

export const AuthInput = styled(TextInput).attrs({
  theme: {
    colors: {
      primary: colors.brand.primary,
    },
  },
})`
  width: 300px;
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
`;
