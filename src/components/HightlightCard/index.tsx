import React from 'react'
import { View, Text } from 'react-native'
import { Amount, Container, Footer, Header, Icon, LastTransaction, Title } from './styles';

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
        <Container type={type}>
            <Header>
                <Title type={type}>{title}</Title>
                <Icon type={type} name={icon[type]}/>
            </Header>

            <Footer>
                <Amount type={type}>{amount}</Amount>
                <LastTransaction type={type}>{lastTransaction}</LastTransaction>
            </Footer>
        </Container>
    );
}