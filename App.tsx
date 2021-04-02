import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import Authentication from './src/services/auth/Authentication';
import { Navigation } from './src/infrastructure';
import { ThemeProvider } from 'styled-components/native';

import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from '@expo-google-fonts/oswald';
import { theme } from './src/theme';

const App = (): JSX.Element | null => {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!latoLoaded || !oswaldLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Authentication>
          <Navigation />
        </Authentication>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
};

export default App;
