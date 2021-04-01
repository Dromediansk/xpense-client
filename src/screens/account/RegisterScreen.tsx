import AsyncStorage from "@react-native-community/async-storage";
import { StackScreenProps } from "@react-navigation/stack";
import { AxiosResponse } from "axios";
import React, { useContext, useState } from "react";
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  StyleSheet,
} from "react-native";
import { HelperText } from "react-native-paper";
import { CustomButton } from "../../components/lib/Buttons";
import { Spacer } from "../../components/lib/Spacer";
import { Typography } from "../../components/lib/Typography";
import ViewCenter from "../../components/lib/ViewCenter";
import { AuthenticationContext } from "../../services/auth/Authentication";
import { postRegisterService } from "../../services/auth/authServices";
import { AuthResponse } from "../../services/auth/types";
import { Size } from "../../theme/sizes";
import { AUTH } from "../../utils/constants";
import { validateEmail } from "../../utils/functions";
import {
  AccountBackground,
  AccountCover,
  AuthInput,
  ErrorContainer,
} from "./account.styles";
import { AccountStackParamList } from "./types";

type Props = StackScreenProps<AccountStackParamList, "Login">;

const RegisterScreen = ({ navigation }: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    repeatedPassword: "",
  });
  const [formError, setFormError] = useState({
    email: false,
    password: false,
  });
  const [error, setError] = useState("");

  const { setUser } = useContext(AuthenticationContext);

  const passwordsMatching = formState.password === formState.repeatedPassword;

  const validateForm = () => {
    if (!validateEmail(formState.email)) {
      setFormError({
        ...formError,
        email: true,
      });
      return false;
    } else if (!passwordsMatching) {
      setFormError({
        ...formError,
        password: true,
      });
      return false;
    }
    return true;
  };

  const onRegister = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response: AxiosResponse<AuthResponse> = await postRegisterService({
        email,
        password,
      });
      await AsyncStorage.setItem(
        AUTH.DATA,
        JSON.stringify({
          userId: response.data.userId,
          token: response.data.token,
        })
      );
      setIsLoading(false);
      setUser({
        userId: response.data.userId,
        token: response.data.token,
      });
    } catch (err) {
      setError("Email already in use");
      setIsLoading(false);
    }
  };

  const handleRegisterPress = (): void => {
    const isFormValid = validateForm();
    if (isFormValid) {
      onRegister(formState.email, formState.password);
    }
  };

  const handleFormStateChange = (key: string, value: string): void => {
    if (key === "email" || key === "password" || key === "repeatedPassword") {
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
          <AuthInput
            label="E-mail"
            value={formState.email}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
              handleFormStateChange("email", event.nativeEvent.text)
            }
            error={formError.email}
          />
          {formError.email ? (
            <HelperText type="error" visible style={styles.helperText}>
              Email address is invalid!{" "}
            </HelperText>
          ) : (
            <Spacer size={Size.MEDIUM} />
          )}

          <AuthInput
            label="Password"
            value={formState.password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
              handleFormStateChange("password", event.nativeEvent.text)
            }
            error={formError.password}
          />
          {formError.password ? (
            <HelperText type="error" visible style={styles.helperText}>
              Passwords don't match!{" "}
            </HelperText>
          ) : (
            <Spacer size={Size.MEDIUM} />
          )}
          <AuthInput
            label="Repeat password"
            value={formState.repeatedPassword}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
              handleFormStateChange("repeatedPassword", event.nativeEvent.text)
            }
            error={formError.password}
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
            onPress={handleRegisterPress}
            disabled={isLoading}
          >
            Register
          </CustomButton>
          <Spacer size={Size.SMALL} />
          <Typography
            variant="body"
            onPress={() => navigation.navigate("Login")}
          >
            Switch to login
          </Typography>
        </ViewCenter>
      </AccountCover>
    </AccountBackground>
  );
};

const styles = StyleSheet.create({
  helperText: {
    height: 24,
  },
});

export default RegisterScreen;
