import { colors } from "./../../theme/colors";
import styled from "styled-components";
import { TextInput } from "react-native-paper";

export const AuthInput = styled(TextInput).attrs({
  theme: {
    colors: {
      primary: colors.brand.primary,
    },
  },
})`
  width: 300px;
`;
