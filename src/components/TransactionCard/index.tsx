import React from 'react'
import { Amount, Category, CategoryName, Container, DateTransaction, Footer, Icon, Title } from './styles'

type CategoryProps = {
    name: string
    icon: string
}

export interface TransactionCardProps {
    title: string
    amount: string
    category: CategoryProps    
    type: 'up' | 'down'
    date: string
}

type Props = {
    data: TransactionCardProps
}

export default function TransactionCard({data}:Props){
    return (
        <Container>
            <Title>{data.title}</Title>
            <Amount type={data.type}>{data.type === 'down' && '-'} {data.amount}</Amount>
            <Footer>
                <Category >
                    <Icon name={data.category.icon}/>
                    <CategoryName>
                        {data.category.name}
                    </CategoryName>
                </Category>
                <DateTransaction>{data.date}</DateTransaction>
            </Footer>
        </Container>
    );
}