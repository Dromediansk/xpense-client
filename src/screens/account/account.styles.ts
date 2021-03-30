import { colors } from "./../../theme/colors";
import styled from "styled-components";
import { Button, TextInput } from "react-native-paper";

export const AuthInput = styled(TextInput).attrs({
  theme: {
    colors: {
      primary: colors.brand.primary,
    },
  },
})`
  width: 300px;
`;

export const AuthButton = styled(Button).attrs({
  color: colors.brand.primary,
  mode: "contained",
})`
  padding: ${(props) => props.theme.spacing[2]};
`;
