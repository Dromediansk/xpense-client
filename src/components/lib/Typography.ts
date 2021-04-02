import styled from 'styled-components/native';
import { CustomTheme } from '../../theme/types';

const defaultTextStyles = (theme: CustomTheme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = (theme: CustomTheme) => `
    font-size: ${theme.fontSizes.body};
`;

const hint = (theme: CustomTheme) => `
    font-size: ${theme.fontSizes.body};
`;

const error = (theme: CustomTheme) => `
    color: ${theme.colors.text.error};
`;

const caption = (theme: CustomTheme) => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
`;

const label = (theme: CustomTheme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
`;

const variants: any = {
  body,
  label,
  caption,
  error,
  hint,
};

interface Props {
  theme: CustomTheme;
  variant: string;
}

export const Typography = styled.Text<Props>`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;
