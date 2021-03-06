import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import  AsyncStorage  from '@react-native-async-storage/async-storage'

import { useFocusEffect } from '@react-navigation/native'

import { useTheme } from 'styled-components'


import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard , TransactionCardProps} from '../../components/TransactionCard'

import {
  Container,
  Header,
  Photo,
  UserInfo,
  UserGreetings,
  UserName,
  User,
  UserWrapper,
  LogoutButton,
  Icon,
  HighLightCards,
  Transactions,
  Title,
  TransactionList,
  LoadContainer,
} from './styles'
import { useAuth } from '../../hooks/auth'


export interface DataListProps extends TransactionCardProps{
  id: string;
}

interface HighLightDataProps{
  amount: string,
  lastTransaction: string
}

interface HighLightData {
  entries: HighLightDataProps;
  expensives: HighLightDataProps;
  total: HighLightDataProps;

}

export function Dashboard() {
  const[isLoading, setIsloading] = useState(true)
  
  const [transactions, setTransactions] = useState<DataListProps[]>();
  const [highLightData,setHighLightData] = useState<HighLightData>({} as HighLightData)
  
  const theme = useTheme();

  const { signOut , user} = useAuth()

  function getLastTransactionDate(
    collection: DataListProps[],
    type:'positive'| 'negative'){

      const collectionFilttered =   collection
        .filter( (transaction) => transaction.type ===type)
        if(collectionFilttered.length === 0){
          return 0
        }


    const lastTransaction =   new Date(Math.max.apply(Math,collectionFilttered
      .map((transaction)=> new Date(transaction.date).getTime())
      ))

      /* Intl.DateTimeFormat('pt-BR',{
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }).format(new Date(lastTransaction)) */
    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR',{
      month:'long'
    })}`
  }
  
  async function loadTransactions(){
    const dataKey = `@gofinances:transactions_user:${user.id}`
    /* await AsyncStorage.removeItem(dataKey) */
    const response = await AsyncStorage.getItem(dataKey)
    /* console.log(response) */
  const transactions : DataListProps[]= response? JSON.parse(response): [];
  let entriesTotal = 0;
  let expensiveTotal = 0;

  const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps)=>{

    if(item.type === 'positive'){
      entriesTotal += Number(item.amount)
    }else {
      expensiveTotal += Number(item.amount)
    }

    const amount = Number(item.amount).toLocaleString('pt-BR',{style: 'currency',currency: 'BRL'}) 
    const date = Intl.DateTimeFormat('pt-BR',{
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }).format(new Date(item.date))
  
    return {
      id: item.id,
      name: item.name,
      amount,
      type: item.type,
      category: item.category,
      date,


    }
  
  })

  setTransactions(transactionsFormatted)


  const lastTransactonsEntries = getLastTransactionDate(transactions,'positive')
  const lastTransactonsExpensives = getLastTransactionDate(transactions,'negative')

 
  const totalInterval = lastTransactonsExpensives === 0 ?
  'N??o h?? transa????es'
  :`01 a ${lastTransactonsExpensives}`



  
  
  
  
 
  

  const total = entriesTotal - expensiveTotal
  setHighLightData({
    entries: {
      amount: entriesTotal.toLocaleString('pt-BR',{style:'currency', currency: 'BRL'}),
      lastTransaction: lastTransactonsEntries ===0 ? "N??o h?? transa????es"  : `??ltima entrada dia ${ lastTransactonsEntries}`
    },
    expensives: {
      amount: expensiveTotal.toLocaleString('pt-BR',{style:'currency', currency: 'BRL'}),
      lastTransaction: lastTransactonsExpensives === 0 ? "N??o h?? transa????es" :`??ltima sa??da dia ${lastTransactonsExpensives}`
    },
    total: {
      amount: total.toLocaleString('pt-BR',{style:'currency', currency: 'BRL'}),
      lastTransaction: totalInterval
    },

  })

  setIsloading(false)
}

  useEffect(()=>{
    loadTransactions()
  },[])

  useFocusEffect(useCallback(()=>{loadTransactions()},[]))

  return (
    <Container>

     
      {
        isLoading ?  <LoadContainer><ActivityIndicator color={theme.colors.primary} size="large"/></LoadContainer> :
      <>
        
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                 uri: user.photo
              }}
            />
            <User>
              <UserGreetings>Ola,</UserGreetings>
              <UserName>{user.name}</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={signOut}>
          <Icon name="power" />

          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighLightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount={highLightData.entries.amount}
          lastTransaction={highLightData.entries.lastTransaction}
        />
        <HighlightCard
          type="down"
          title="Sa??das"
          amount={highLightData.expensives.amount}
          lastTransaction={highLightData.expensives.lastTransaction}
        />
        <HighlightCard
          type="total"
          title="Total"
          amount={highLightData.total.amount}
          lastTransaction={highLightData.total.lastTransaction}
        />
      </HighLightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
      </>
      }
    </Container>
  )
}
