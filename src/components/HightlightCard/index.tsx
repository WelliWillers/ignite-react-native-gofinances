import React from 'react'
import { View, Text } from 'react-native'
import { Amount, Container, Footer, Header, Icon, LastTransaction, Title } from './styles';

interface HightlightCardProps {
    title: string
    amount: string
    lastTransation: string
}

export default function HightlightCard({title, lastTransation, amount}: HightlightCardProps){
    return (
        <Container>
            <Header>
                <Title>{title}</Title>
                <Icon name="arrow-up-circle"/>
            </Header>

            <Footer>
                <Amount>{amount}</Amount>
                <LastTransaction>{lastTransation}</LastTransaction>
            </Footer>
        </Container>
    );
}