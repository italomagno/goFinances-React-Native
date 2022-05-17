import React, {useState} from 'react'
import { RectButtonProps } from 'react-native-gesture-handler';


import { 
Container,
Button,
Icon,
Title,


 } from './styles'

 const Icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'

 }

interface Props extends RectButtonProps{
  title: string;
  type: 'up' | 'down';
  isActive:boolean;
}

export function TransactionTypeButton({
  title,
  type,
  isActive,
...rest}:Props){

  

  return(
<Container
 isActive={isActive} 
 type={type}
 >
   <Button
   {...rest}>

<Icon 
type={type}
name={Icons[type]}/>
<Title>
{title}
</Title>
   </Button>
</Container>

  )

}