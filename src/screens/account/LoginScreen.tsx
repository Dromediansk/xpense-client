import React, { useState, useContext } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthenticationContext } from '../../services/auth/Authentication';
import { validateEmail } from '../../utils/functions';
import {
  AccountBackground,
  AccountCover,
  ErrorContainer,
} from './account.styles';
import { Spacer } from '../../components/lib/Spacer';
import { Typography } from '../../components/lib/Typography';
import { Size } from '../../theme/sizes';
import { colors } from '../../theme/colors';
import { AccountStackParamList } from './types';
import { CustomButton } from '../../components/lib/Buttons';
import { CustomInput, ViewCenter } from '../../components/lib/general';
import { postLoginService } from '../../services/auth/authServices';
import { AuthResponse } from '../../services/auth/types';
import { AUTH } from '../../utils/constants';

type Props = StackScreenProps<AccountStackParamList, 'Register'>;

const LoginScreen = ({ navigation }: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState({
    email: false,
    password: false,
  });
  const [error, setError] = useState('');

  const { setUser } = useContext(AuthenticationContext);

  const onLogin = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      const response: AxiosResponse<AuthResponse> = await postLoginService({
        email,
        password,
      });
      await AsyncStorage.setItem(
        AUTH.DATA,
        JSON.stringify({
          userId: response.data.userId,
          token: response.data.token,
        }),
      );
      setIsLoading(false);
      setUser({
        userId: response.data.userId,
        token: response.data.token,
      });
    } catch (err) {
      setError('Invalid credentials!');
      setIsLoading(false);
    }
  };

  const handleLoginPress = (): void => {
    if (!validateEmail(formState.email)) {
      setFormError({ email: true, password: false });
      return;
    }
    onLogin(formState.email, formState.password);
  };

  const handleFormStateChange = (key: string, value: string): void => {
    if (key === 'email') {
      setFormError({ email: false, password: false });
    }
    setFormState({
      ...formState,
      [key]: value,
    });
  };

  return (
    <AccountBackground>
      <AccountCover>
        <ViewCenter>
          <CustomInput
            label={formError.email ? 'Invalid e-mail address' : 'E-mail'}
            value={formState.email}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
              handleFormStateChange('email', event.nativeEvent.text)
            }
            error={formError.email}
          />
          <Spacer size={Size.MEDIUM} />
          <CustomInput
            label="Password"
            value={formState.password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
              handleFormStateChange('password', event.nativeEvent.text)
            }
          />
          {error ? (
            <ErrorContainer>
              <Typography variant="error">{error}</Typography>
            </ErrorContainer>
          ) : null}
          <Spacer size={Size.MEDIUM} />
          <CustomButton
            icon="lock-open-outline"
            mode="contained"
            onPress={() => handleLoginPress()}
            disabled={isLoading}
          >
            Login
          </CustomButton>
          <Spacer size={Size.SMALL} />
          <Typography style={{ color: colors.common.black }} variant="body">
            Don&apos;t have an account?
          </Typography>
          <Typography
            variant="body"
            onPress={() => navigation.navigate('Register')}
          >
            Register here
          </Typography>
        </ViewCenter>
      </AccountCover>
    </AccountBackground>
  );
};

export default LoginScreen;
