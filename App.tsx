import 'react-native-gesture-handler';
import 'intl'
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from './src/global/styles/theme'
import * as SplashScreen from 'expo-splash-screen' 

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
import { AppRoutes } from './src/routes/app.routes'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native';
import { Login } from './src/screens/Login';
import { AuthProvider } from './src/contexts/AuthContext';
import { Routes } from './src/routes';

export default function App() {
  SplashScreen.preventAutoHideAsync()

  const [ fontsLoaded ] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if(!fontsLoaded){
    return null
  }

  SplashScreen.hideAsync();

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle='light-content' translucent animated />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
