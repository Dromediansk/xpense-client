import { View } from "react-native";
import styled from "styled-components";

export const ViewCenter = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export default ViewCenter;
