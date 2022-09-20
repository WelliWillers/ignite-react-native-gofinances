import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import * as styles from './styles';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export function Buttom({title, ...rest}: ButtonProps) {
  return (
    <styles.Container {...rest}>
        <styles.Title>
            {title}
        </styles.Title>
    </styles.Container>
  );
}