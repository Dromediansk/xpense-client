import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
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
import { Size } from "../../theme/sizes";
import { validateEmail } from "../../utils/functions";
import { AuthInput } from "./account.styles";
import { AccountStackParamList } from "./types";
import { SafeArea } from "../../components/lib/SafeArea";

type Props = StackScreenProps<AccountStackParamList, "Login">;

const RegisterScreen = ({ navigation }: Props) => {
  const [formState, setFormState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    repeatedPassword: "",
  });
  const [formError, setFormError] = useState({
    email: false,
    password: false,
  });

  const passwordsMatching = formState.password === formState.repeatedPassword;

  const handleRegisterPress = (): void => {
    if (!validateEmail(formState.email)) {
      setFormError({
        ...formError,
        email: true,
      });
    } else if (!passwordsMatching) {
      setFormError({
        ...formError,
        password: true,
      });
    }
    // onLogin(formState.email, formState.password);
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
    <SafeArea>
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
        <Spacer size={Size.MEDIUM} />
        <CustomButton
          icon="lock-open-outline"
          mode="contained"
          onPress={handleRegisterPress}
        >
          Register
        </CustomButton>
        <Spacer size={Size.MEDIUM} />
        <Typography variant="body" onPress={() => navigation.navigate("Login")}>
          Switch to login
        </Typography>
      </ViewCenter>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  helperText: {
    height: 24,
  },
});

export default RegisterScreen;
