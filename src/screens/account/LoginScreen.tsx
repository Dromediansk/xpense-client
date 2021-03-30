import React, { useState, useContext } from "react";
import { AuthenticationContext } from "../../services/auth/Authentication";
import ViewCenter from "../../components/lib/ViewCenter";
import { validateEmail } from "../../utils/functions";
import { AuthButton, AuthInput } from "./account.styles";
import Spacer, { Size } from "../../components/lib/Spacer";

const LoginScreen = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({
    email: false,
    password: false,
  });

  const { onLogin, error, isLoading } = useContext(AuthenticationContext);

  const handleLoginPress = (): void => {
    if (!validateEmail(email)) {
      setFormError({ email: true, password: false });
      return;
    }
    onLogin(email, password);
  };

  return (
    <ViewCenter>
      <AuthInput
        label="E-mail"
        value={email}
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(u) => setEmail(u)}
      />
      <Spacer size={Size.SMALL} />
      <AuthInput
        label="Password"
        value={password}
        textContentType="password"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={(p) => setPassword(p)}
      />
      <Spacer size={Size.SMALL} />
      <AuthButton icon="lock-open-outline" onPress={() => handleLoginPress()}>
        Login
      </AuthButton>
    </ViewCenter>
  );
};

export default LoginScreen;
