import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'

import { ThemeProvider } from 'styled-components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { StatusBar } from 'react-native';

import theme from './src/global/styles/theme'
import {NavigationContainer} from '@react-navigation/native'

import { AppRoutes} from './src/routes/app.routes'


import  Apploading from 'expo-app-loading'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold

} from '@expo-google-fonts/poppins'


export default function App() {
  const [ fontsloaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if(!fontsloaded){
    return <Apploading />
  }

  return (

    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
      <StatusBar />
      <AppRoutes />
      </NavigationContainer>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

