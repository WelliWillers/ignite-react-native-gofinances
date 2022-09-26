import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { Text, TextInputProps } from 'react-native';
import { BaseInput } from '../BaseInput';
import * as styles from './styles';

interface Props extends TextInputProps {
    control: Control
    name: string
    messageError?: FieldError
}

export function BaseInputForm({name, control, messageError, ...rest}: Props) {
  return (
    <styles.Container>
        <Controller
            control={control}
            render={({ field: { onChange, value } } ) => (
              <BaseInput onChangeText={onChange} value={value} {...rest} />
            )}
            name={name}
        />
        {messageError?.message && <styles.Error>{messageError?.message}</styles.Error>}
    </styles.Container>
  );
}