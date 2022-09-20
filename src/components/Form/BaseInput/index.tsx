import React from 'react';
import { TextInputProps } from 'react-native';
import * as styles from './styles';

export function BaseInput( {...rest}: TextInputProps) {
  return (
    <styles.Container {...rest}/>
  );
}