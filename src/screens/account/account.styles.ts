import styled from 'styled-components/native';

export const AccountBackground = styled.ImageBackground.attrs({
  // eslint-disable-next-line global-require
  source: require('../../../assets/money.jpeg'),
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

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
`;
