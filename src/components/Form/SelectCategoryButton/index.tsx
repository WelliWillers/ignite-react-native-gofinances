import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import * as styles from './styles';

interface SelectCategoryProps extends TouchableOpacityProps {
    title: string
}

export function SelectCategoryButton({title, ...rest}: SelectCategoryProps) {
  return (
    <styles.Container {...rest}>
        <styles.Category>
            {title}
        </styles.Category>

        <styles.Icon name="chevron-down"/>
    </styles.Container>
  );
}