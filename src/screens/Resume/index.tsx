import React, { useEffect, useState } from "react";
import { HistoryCard } from "../../components/HistoryCard";
import * as Styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { categories } from "../../utils/categories";
import { ScrollView, Text } from "react-native";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { VictoryPie } from 'victory-native'
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../global/styles/theme";

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
    totalFormatted: string
    total: number
    percent: string
}

export function Resume() {
    const [ totalByCategories, setTotalByCategories ] = useState<totalByCategoryProps[]>([])

    async function LoadData(){
        const dataKey = '@goFinances:transations'
        const response = await AsyncStorage.getItem(dataKey)
        const responseFound = response ? JSON.parse(response) : []
        
        const expensives = responseFound.filter((exp: TransationData) => exp.type === 'down')

        const expensivesTotal = expensives.reduce((acc: number, expensive:TransationData) => {
            return acc + Number(expensive.amount)
        }, 0)

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

                const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`

                totalByCategory.push({
                    id: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted: total,
                    percent: percent
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
            <Styles.Reload onPress={LoadData}>
                <Styles.Icon name="refresh-cw" />
            </Styles.Reload>
        </Styles.Header>

        <Styles.Content
            contentContainerStyle={{ padding: 24, paddingBottom: useBottomTabBarHeight()}}
            showsVerticalScrollIndicator={false}
        >
            {
                totalByCategories.length > 0 ? (
                    <>
                        <Styles.MonthSelect>
                            <Styles.MonthSelectButton>
                                <Styles.MonthSelectIcon name="" />
                            </Styles.MonthSelectButton>

                            <Styles.Month>
                                Setembro
                            </Styles.Month>

                            <Styles.MonthSelectButton>
                                <Styles.MonthSelectIcon />
                            </Styles.MonthSelectButton>
                        </Styles.MonthSelect>

                        <Styles.ChartContainer>
                            <VictoryPie
                                data={totalByCategories}
                                x="percent"
                                y="total"
                                colorScale={totalByCategories.map(category => category.color)}
                                key="id"
                                style={{
                                    labels: {
                                        fontSize: RFValue(18),
                                        fontWeight: 'bold',
                                        fill: theme.colors.shape
                                    }
                                }}
                                labelRadius={50}
                            />
                        </Styles.ChartContainer>
                    </>
                ) : (
                    <Text>Gráficoa ainda não disponíves, Realize algumas movimentações de saída antes.</Text>
                )
            }

            {
                totalByCategories.length > 0 ? 
                    totalByCategories.map(item => (
                        <>
                            <HistoryCard key={item.id} title={item.name} color={item.color} amount={item.totalFormatted} />
                        </>
                    ))
                : (
                    <Text>Nenhuma categoria cadastrada</Text>
                )
            }
        </Styles.Content>

        </Styles.Container>
    );
}
