import React from 'react'
import * as styles from './styles'

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
        <styles.Container>
            <styles.Title>{data.title}</styles.Title>
            <styles.Amount type={data.type}>{data.type === 'down' && '-'} {data.amount}</styles.Amount>
            <styles.Footer>
                <styles.Category >
                    <styles.Icon name={data.category.icon}/>
                    <styles.CategoryName>
                        {data.category.name}
                    </styles.CategoryName>
                </styles.Category>
                <styles.DateTransaction>{data.date}</styles.DateTransaction>
            </styles.Footer>
        </styles.Container>
    );
}