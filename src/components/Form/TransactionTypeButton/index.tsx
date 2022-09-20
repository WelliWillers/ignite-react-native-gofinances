import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import * as styles from './styles';

interface TransactionTypeButtonProps extends TouchableOpacityProps {
    title: string;
    type: 'up' | 'down'
    selected: boolean;
}

const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle'
}

export function TransactionTypeButton({title, type = 'up', selected, ...rest}: TransactionTypeButtonProps) {
  return (
    <styles.Container {...rest} type={type} selected={selected}>
        <styles.Icon type={type} name={icons[type]}/>
        <styles.Title>
            {title}
        </styles.Title>
    </styles.Container>
  );
}