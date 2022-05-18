import React, { useState,useEffect } from 'react'

import { useForm } from 'react-hook-form'

import { 
Keyboard,
Modal , 
TouchableWithoutFeedback,
Alert } from 'react-native'

import * as Yup from 'yup'

import { yupResolver} from '@hookform/resolvers/yup'

import  AsyncStorage  from '@react-native-async-storage/async-storage'

import { Button } from '../../components/Form/Button'
import { CategorySelectButton } from '../../components/Form/CategorySelectButton'

import { useNavigation } from '@react-navigation/native'

import { InputForm } from '../../components/Form/inputForm'

import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import uuid from 'react-native-uuid'

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes
} from './styles'

interface FormData {
  [name: string]: string;
}

type NavigationProps={
  navigate: (screen:string)=>void
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number().typeError('Informe um valor numérico').positive('O valor não pode ser negativo').required('O valor é obrigatório')
})

import { CategorySelect } from '../CategorySelect'
import { useAuth } from '../../hooks/auth'

export function Register() {
 
  const navigation= useNavigation<NavigationProps>();
  
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryMoralOpen] = useState(false)

  const {user} = useAuth()

  const {
    control,
    handleSubmit,
    formState:{errors},
    reset

  }= useForm({
    resolver: yupResolver(schema)
  })

  function handletransactionTypeSelect(type: 'positive' | 'negative') {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryMoralOpen(true)
  }
  function handleCloseSelectCategoryModal() {
  
    setCategoryMoralOpen(false)
  }

 async function handleRegister(form: FormData) {
if(!transactionType){
  return Alert.alert('Selecione o tipo da transação')
}
if(category.key === 'category'){
  return Alert.alert('Selecione a categoria')
}


    const newTrasaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }
    try{
       const dataKey = `@gofinances:transactions_user:${user.id}`;
      const data = await AsyncStorage.getItem(dataKey)
      const currentData = data? JSON.parse(data):[];

      const dataFormatted = [
        ...currentData,
        newTrasaction
        
      ]


      await AsyncStorage.setItem(dataKey,JSON.stringify(dataFormatted))

      
      reset()
      setTransactionType('')
      setCategory({
        key: 'category',
        name: 'Categoria'
      })

      navigation.navigate( 'Listagem')

    
    
    }catch(error){
      console.log(error)
      Alert.alert("Não foi possível salvar");
    }

    
  }




  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <Container>


      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm 
          error={errors.name && errors.name.message}
          autoCapitalize='sentences' autoCorrect={false} name="name" control={control} placeholder="Nome" />

          <InputForm 
          error={errors.amount && errors.amount.message}
          name="amount"
          control={control}
          keyboardType="numeric"
          placeholder="Preço" />

          <TransactionsTypes>
            <TransactionTypeButton
              type="up"
              title="Income"
              isActive={transactionType === 'positive'}
              onPress={() => handletransactionTypeSelect('positive')}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() => handletransactionTypeSelect('negative')}
              isActive={transactionType === 'negative'}
            />
          </TransactionsTypes>
          <CategorySelectButton
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>
        <Button title="Enviar"
        onPress={handleSubmit(handleRegister)} />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          onPress={handleCloseSelectCategoryModal}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
      </TouchableWithoutFeedback>
  )
}
