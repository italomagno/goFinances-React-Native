import React from 'react'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import { ThemeProvider } from 'styled-components'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { StatusBar } from 'react-native'

import theme from './src/global/styles/theme'
import { Routes } from './src/routes'

import { AppRoutes } from './src/routes/app.routes'

import { SignIn } from './src/screens/SignIn'

import { AuthProvider, useAuth } from './src/hooks/auth'

import Apploading from 'expo-app-loading'

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

export default function App() {
  const [fontsloaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })
  const {userStorageLoading} = useAuth()

  if (!fontsloaded || userStorageLoading) {
    return <Apploading />
  }

  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>     
          <StatusBar barStyle='light-content' />
          <AuthProvider >
           <Routes />
          </AuthProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  )
}
