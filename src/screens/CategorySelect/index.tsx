import React, { FlatList } from 'react-native'
import { Button } from '../../components/Form/Button'

import { categories } from '../../utils/categories';

import {
Container,
Header,
Title,
Category,
Icon,
Name,
Separator,
Footer,

} from './styes'


interface Category {
  key: string;
  name: string;
}

interface Props{
  category: Category;
  setCategory: (category: Category)=> void;
  closeSelectCategory: () => void
  onPress: ()=>void
}

export function CategorySelect({category,closeSelectCategory,setCategory,onPress}:Props){

  function handleCategorySelect(item: Category){
    
    setCategory(item)
  }



  return(
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
      data= {categories}
      style={{flex:1,width:'100%'}}
      keyExtractor={(item)=>item.key}
      renderItem={({item})=>(
        <Category
        onPress={()=> handleCategorySelect(item)}
        isActive={category.key === item.key}
        >
          <Icon name={item.icon} />
          <Name>{item.name}</Name>
        </Category>
      )}
      ItemSeparatorComponent={()=><Separator />}
      
      />

      <Footer>
        <Button
        onPress={closeSelectCategory}
        title='Selecionar'/>

      </Footer>

    </Container>
  )
}