import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled, {css} from "styled-components/native";

import {Feather} from '@expo/vector-icons'

interface IconProps{
  type: 'up' | 'down';
  
}

interface ButtonProps{
  isActive:boolean;
  type: 'up' | 'down';
}


export const Container = styled.View<ButtonProps>`

width: 48%;


//background-color: ${({theme,isActive})=>isActive?  theme.colors.success_light: theme.colors.attention_light};

border-width: ${({isActive})=>isActive? 0 : 1.5 }px;
border-style: solid ;
border-color: ${({theme})=>theme.colors.text}; 
border-radius: 5px;


${({theme,type,isActive})=>isActive && type === 'up' && css`
background-color: ${({theme})=>theme.colors.success_light};
`}

${({theme,type,isActive})=>isActive && type === 'down' && css`
background-color: ${({theme})=>theme.colors.attention_light};
`}

`;

export const Button = styled(RectButton)`
flex-direction: row ;
align-items:center ;
justify-content:center ;

padding: 16px;

`;

export const Icon = styled(Feather)<IconProps>`
font-size: ${RFValue(24)}px ;
margin-right: 12px ;

color: ${({theme,type})=>type === 'up' ? theme.colors.success : theme.colors.attention};

`;

export const Title = styled.Text`
 
font-family: ${({theme})=>theme.fonts.regular};
font-size: ${RFValue(14)}px;
border-radius: 5px;
`;
