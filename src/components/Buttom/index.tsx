import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import * as styles from './styles';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
}

export function Buttom({title, onPress, ...rest}: ButtonProps) {
  return (
    <styles.Container {...rest} onPress={onPress}>
        <styles.Title>
          {title}
        </styles.Title>
    </styles.Container>
  );
}