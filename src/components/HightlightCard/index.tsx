import React from 'react'
import { View, Text } from 'react-native'
import * as styles from './styles';

interface HightlightCardProps {
    title: string
    amount: string
    lastTransaction: string
    type: 'up' | 'down' | 'total'
}

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'
}

export default function HightlightCard({title, lastTransaction, type, amount}: HightlightCardProps){
    return (
        <styles.Container type={type}>
            <styles.Header>
                <styles.Title type={type}>{title}</styles.Title>
                <styles.Icon type={type} name={icon[type]}/>
            </styles.Header>

            <styles.Footer>
                <styles.Amount type={type}>{amount}</styles.Amount>
                <styles.LastTransaction type={type}>{lastTransaction}</styles.LastTransaction>
            </styles.Footer>
        </styles.Container>
    );
}