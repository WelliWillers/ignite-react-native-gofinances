import React from 'react';
import * as styles from './styles';

interface SelectCategoryProps {
    title: string
}

export function SelectCategory({title}: SelectCategoryProps) {
  return (
    <styles.Container>
        <styles.Category>
            {title}
        </styles.Category>

        <styles.Icon name="chevron-down"/>
    </styles.Container>
  );
}