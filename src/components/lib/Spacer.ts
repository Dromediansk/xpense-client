import { View } from "react-native";
import styled from "styled-components";
import { Size } from "../../theme/sizes";

interface Props {
  size: Size;
}

export const Spacer = styled(View)`
  padding: ${(props: Props) => props.size};
`;
