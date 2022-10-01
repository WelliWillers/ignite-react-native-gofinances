import React, { useCallback, useEffect, useState } from "react";
import { HistoryCard } from "../../components/HistoryCard";
import * as Styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { categories } from "../../utils/categories";
import { ActivityIndicator, ScrollView, Text } from "react-native";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { VictoryPie } from 'victory-native'
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../../global/styles/theme";
import { addMonths, format, subMonths } from "date-fns";
import { ptBR } from 'date-fns/locale'
import { useFocusEffect } from "@react-navigation/native";

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
    const [ selectedDate, setSelectedDate ] = useState(new Date())
    const [ isLoading, setIsLoading ] = useState(false)

    function handleChangeMouth(action: 'next' | 'prev'){
        if(action === 'next' ){
            setSelectedDate(addMonths(selectedDate, 1))
        } else {
            setSelectedDate(subMonths(selectedDate, 1))
        }
    }

    async function LoadData(){
        setIsLoading(true)
        const dataKey = '@goFinances:transations'
        const response = await AsyncStorage.getItem(dataKey)
        const responseFound = response ? JSON.parse(response) : []

        const expensives = responseFound.filter((exp: TransationData) => 
            exp.type === 'down' && 
            new Date(exp.date).getMonth() === selectedDate.getMonth() &&
            new Date(exp.date).getFullYear() === selectedDate.getFullYear()
        )

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
        setIsLoading(false)
    }

    useFocusEffect(
        useCallback(() => {
            LoadData()
        }, [selectedDate])
    )

    return (
        <Styles.Container>
            <Styles.Header>
                <Styles.Title>Resumo</Styles.Title>
                <Styles.Reload onPress={LoadData}>
                    <Styles.Icon name="refresh-cw" />
                </Styles.Reload>
            </Styles.Header>
            {
                isLoading ? (
                    <Styles.Loading>
                        <ActivityIndicator size={35} color={theme.colors.secondary}/>
                    </Styles.Loading>
                ) : (
                    <Styles.Content
                        contentContainerStyle={{ padding: 24, paddingBottom: useBottomTabBarHeight()}}
                        showsVerticalScrollIndicator={false}
                    >
                        <Styles.MonthSelect>
                            <Styles.MonthSelectButton onPress={() => handleChangeMouth('prev')}>
                                <Styles.MonthSelectIcon name="chevron-left" />
                            </Styles.MonthSelectButton>

                            <Styles.Month>
                                {format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}
                            </Styles.Month>

                            <Styles.MonthSelectButton onPress={() => handleChangeMouth('next')}>
                                <Styles.MonthSelectIcon name="chevron-right" />
                            </Styles.MonthSelectButton>
                        </Styles.MonthSelect>
                        {
                            totalByCategories.length > 0 ? (
                                <>
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
                )
            }

        </Styles.Container>
    );
}
