import React from 'react'
import { categories } from '../../utils/categories'
import * as styles from './styles'

export interface TransactionCardProps {
    name: string
    amount: string
    category: string    
    type: 'up' | 'down'
    date: string
}

type Props = {
    data: TransactionCardProps
}

export default function TransactionCard({data}:Props){

    const [ category ] = categories.filter(cat => cat.key === data.category)

    return (
        <styles.Container>
            <styles.Title>{data.name}</styles.Title>
            <styles.Amount type={data.type}>{data.type === 'down' && '-'} {data.amount}</styles.Amount>
            <styles.Footer>
                <styles.Category >
                    <styles.Icon name={category.icon}/>
                    <styles.CategoryName>
                        {category.name}
                    </styles.CategoryName>
                </styles.Category>
                <styles.DateTransaction>{data.date}</styles.DateTransaction>
            </styles.Footer>
        </styles.Container>
    );
}