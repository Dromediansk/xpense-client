import { View } from 'react-native';
import styled from 'styled-components';
import { TextInput } from 'react-native-paper';
import { colors } from '../../theme/colors';

export const ViewCenter = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const CustomInput = styled(TextInput).attrs({
  theme: {
    colors: {
      primary: colors.brand.primary,
    },
  },
})`
  width: 300px;
`;

export default ViewCenter;
