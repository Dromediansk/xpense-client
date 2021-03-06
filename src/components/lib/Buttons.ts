import { Button } from 'react-native-paper';
import styled from 'styled-components/native';
import { colors } from '../../theme/colors';

export const CustomButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${props => props.theme.spacing[2]};
`;
