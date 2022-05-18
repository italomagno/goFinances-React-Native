import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import  { SvgProps } from "react-native-svg";

interface Props extends RectButtonProps {
  title:  string;
  svg: React.FC<SvgProps>
}


import{
  Button,
  ImageContainer,
  Text,

} from './styles'


export function SignInSocialButton({
svg: Svg,
title,
...rest
}:Props){
  return(
    <Button {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>

      <Text>
        {title}
      </Text>

    </Button>
  )
}