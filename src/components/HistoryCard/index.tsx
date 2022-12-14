import React from 'react';
import * as Styles from './styles';

interface Props {
  title: string;
  color: string;
  amount: string;
}

export function HistoryCard( {title, color, amount, ...rest}: Props) {
  return (
    <Styles.Container color={color} {...rest}>
        <Styles.Title>
            {title}
        </Styles.Title>
        <Styles.Amount>
            {amount}
        </Styles.Amount>
    </Styles.Container>
  );
}