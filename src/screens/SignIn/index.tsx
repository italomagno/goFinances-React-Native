import React , {useContext, useState} from 'react'
import { RFValue } from 'react-native-responsive-fontsize'


import { useAuth } from '../../hooks/auth'

import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { SignInSocialButton } from '../../components/SignInSocialButton'

import { useTheme } from 'styled-components'



import{
Container,
Header,
TitleWrapper,
Title,
SignInTitle,
Footer,
FooterWrapper,
} from './styles'
import { ActivityIndicator, Alert, Platform } from 'react-native'


export function SignIn(){
  const [isloading, setIsLoading] = useState(false)

  const {signInWithGoogle} = useAuth()
  const {signInWithApple} = useAuth()

  const theme = useTheme()

  async function handleSignInWithGoogle(){
    try{
      setIsLoading(true)
return await signInWithGoogle();
    }catch(error){
      console.log(error)

      Alert.alert('Não foi possível conectar a conta Google')
      setIsLoading(false)
    }
  }
  async function handleSignInWithApple(){
    try{
      setIsLoading(true)
      return await signInWithApple();

    }
    catch(error){
      console.log(error)

      Alert.alert('Não foi possível conectar a conta Apple')
      setIsLoading(false)
    }
  }
  
  return(
    <Container>

      <Header>
        <TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <Title>
          Controle suas {'\n'}
        finanças de forma {'\n'}
          muito simples {'\n'}
          </Title>
        </TitleWrapper>

        <SignInTitle>
        Faça seu login com {'\n'}
        uma das contas abaixo {'\n'}
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton 
          title='Entrar com Google'
          svg = {GoogleSvg}
          onPress={handleSignInWithGoogle}
          />


         {Platform.OS === 'ios' && <SignInSocialButton
          title='Entrar com Apple'
          svg={AppleSvg}
          onPress={handleSignInWithApple}
          />}
        </FooterWrapper>

        {isloading && <ActivityIndicator
        style={{marginTop: 18}}
        color={theme.colors.shape} />}

      </Footer>

    </Container>
  )
}