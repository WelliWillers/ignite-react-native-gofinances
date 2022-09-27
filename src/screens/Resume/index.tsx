import React, { useEffect, useState } from "react";
import { HistoryCard } from "../../components/HistoryCard";
import * as Styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { categories } from "../../utils/categories";
import { Text } from "react-native";

interface TransationData {
    name: string
    amount: string
    category: string    
    type: 'up' | 'down'
    date: string
}

interface totalByCategoryProps { 
    id: string
    name: string
    color: string
    total: string
}

export function Resume() {
    const [ totalByCategories, setTotalByCategories ] = useState<totalByCategoryProps[]>([])

    async function LoadData(){
        const dataKey = '@goFinances:transations'
        const response = await AsyncStorage.getItem(dataKey)
        const responseFound = response ? JSON.parse(response) : []
        
        const expensives = responseFound.filter((exp: TransationData) => exp.type === 'down')

        const totalByCategory: totalByCategoryProps[] = []

        categories.forEach(category => {
            let categorySum = 0

            expensives.forEach((exp: TransationData) => {
                if(exp.category === category.key){
                    categorySum += Number(exp.amount)
                }
            })

            if(categorySum > 0){
                const total = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })

                totalByCategory.push({
                    id: category.key,
                    name: category.name,
                    color: category.color,
                    total
                })
            }
            
        })

        setTotalByCategories(totalByCategory)
    }

    useEffect(() => {
        LoadData()
    },[])

    return (
        <Styles.Container>
        <Styles.Header>
            <Styles.Title>Resumo</Styles.Title>
        </Styles.Header>

        <Styles.Content>
            {
                totalByCategories.length > 0 ? 
                    totalByCategories.map(item => (
                        <HistoryCard key={item.id} title={item.name} color={item.color} amount={item.total} />
                    ))
                : (
                    <Text>Nenhuma categoria cadastrada</Text>
                )
            }
        </Styles.Content>

        </Styles.Container>
    );
}
