import React from 'react';
import { FlatList } from 'react-native';
import * as styles from './styles';
import { categories } from '../../../src/utils/categories'
import { Buttom } from '../../components/Buttom';

interface CategoryProps {
  key: string
  name: string
  icon: string
}

interface CategorySelectProps {
  category: CategoryProps;
  setCategory: (category: CategoryProps) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({category, setCategory, closeSelectCategory}:CategorySelectProps) {

  function handleCategorySelect(category: CategoryProps){
    setCategory(category);
  }

  return (
    <styles.Container>
      <styles.Header>
        <styles.Title>Categorias</styles.Title>
      </styles.Header>

      <FlatList
        data={categories}
        style={{flex: 1, width: '100%'}}
        keyExtractor={(item) => item.key}
        renderItem={({item}) => (
          <styles.Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <styles.Icon name={item.icon} />
            <styles.Name>{item.name}</styles.Name>
          </styles.Category>
        )}
        ItemSeparatorComponent={() => <styles.Separator />}
      />

      <styles.Footer>
        <Buttom onPress={closeSelectCategory} title="Selecionar" />
      </styles.Footer>

    </styles.Container>
  );
}
