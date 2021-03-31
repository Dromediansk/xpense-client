import React, { useState, useContext } from "react";
import { AuthenticationContext } from "../../services/auth/Authentication";
import ViewCenter from "../../components/lib/ViewCenter";
import { validateEmail } from "../../utils/functions";
import { AuthInput } from "./account.styles";
import { Spacer } from "../../components/lib/Spacer";
import { Typography } from "../../components/lib/Typography";
import { Size } from "../../theme/sizes";
import { colors } from "../../theme/colors";
import { StackScreenProps } from "@react-navigation/stack";
import { AccountStackParamList } from "./types";
import { CustomButton } from "../../components/lib/Buttons";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

type Props = StackScreenProps<AccountStackParamList, "Register">;

const LoginScreen = ({ navigation }: Props): JSX.Element => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    email: false,
    password: false,
  });

  const { onLogin, error, isLoading } = useContext(AuthenticationContext);

  const handleLoginPress = (): void => {
    if (!validateEmail(formState.email)) {
      setFormError({ email: true, password: false });
      return;
    }
    onLogin(formState.email, formState.password);
  };

  const handleFormStateChange = (key: string, value: string): void => {
    if (key === "email") {
      setFormError({ email: false, password: false });
    }
    setFormState({
      ...formState,
      [key]: value,
    });
  };

  return (
    <ViewCenter>
      <AuthInput
        label={formError.email ? "Invalid e-mail address" : "E-mail"}
        value={formState.email}
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
        onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
          handleFormStateChange("email", event.nativeEvent.text)
        }
        error={formError.email}
      />
      <Spacer size={Size.MEDIUM} />
      <AuthInput
        label="Password"
        value={formState.password}
        textContentType="password"
        secureTextEntry
        autoCapitalize="none"
        onChange={(event: NativeSyntheticEvent<TextInputChangeEventData>) =>
          handleFormStateChange("password", event.nativeEvent.text)
        }
      />
      <Spacer size={Size.MEDIUM} />
      <CustomButton
        icon="lock-open-outline"
        mode="contained"
        onPress={() => handleLoginPress()}
      >
        Login
      </CustomButton>
      <Spacer size={Size.MEDIUM} />
      <Typography style={{ color: colors.ui.grayed }} variant="body">
        Don't have an account?
      </Typography>
      <Typography
        variant="body"
        onPress={() => navigation.navigate("Register")}
      >
        Register here
      </Typography>
    </ViewCenter>
  );
};

export default LoginScreen;
