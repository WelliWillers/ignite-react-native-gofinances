import { useEffect, useState, useCallback } from "react";
import { Text } from "react-native";
import HightlightCard from "../../components/HightlightCard";
import TransactionCard, { TransactionCardProps } from "../../components/TransactionCard";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator } from 'react-native'
import * as styles from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import theme from "../../global/styles/theme";

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HightlightDataItemProps {
    amount: string
    lastTransation: string
}

interface HightlightDataProps {
    entries: HightlightDataItemProps
    expensives: HightlightDataItemProps
    total: HightlightDataItemProps
}

export default function Dashboard(){

    const [isLoading, setIsLoading] = useState(true)
    const [transations, setTransations] = useState<DataListProps[]>([])
    const [hightlightData, setHightlightData] = useState<HightlightDataProps>({} as HightlightDataProps)

    function handleLogout () {
        console.log('logout')
    }

    async function loadTransations(){
        const dataKey = '@goFinances:transations'
        const response = await AsyncStorage.getItem(dataKey)
        const transationsFound = response ? JSON.parse(response) : []

        let entrieTotal = 0
        let expensiveTotal = 0

        const transactionsFormated: DataListProps[] = transationsFound
        .map((item: DataListProps) => {

            if(item.type === 'up'){
                entrieTotal += Number(item.amount)
            } else {
                expensiveTotal += Number(item.amount)
            }

            const amount = Number(item.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date))

            return {
                id: item.id,
                name: item.name,
                category: item.category,
                type: item.type,
                amount,
                date
            }
        })

        const totalSum = entrieTotal - expensiveTotal

        const lastEntriesTransationDate  = getTheLastTransationData(transationsFound, 'up')
        const lastExpensivesTransationDate  = getTheLastTransationData(transationsFound, 'down')
        const totalInterval = `01 à ${lastExpensivesTransationDate}`

        setHightlightData({
            entries: {
                amount: entrieTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransation: lastEntriesTransationDate ? lastEntriesTransationDate : ''
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransation: lastExpensivesTransationDate ? lastExpensivesTransationDate : ''
            },
            total: {
                amount: totalSum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransation: totalInterval ? totalInterval : ''
            }
        })
        
        setTransations(transactionsFormated)
        
        setIsLoading(false)
    }

    function getTheLastTransationData(collectionTransationsFound: DataListProps[], type: 'up' | 'down'){
        
        const lastTransation = new Date( Math.max.apply( Math ,collectionTransationsFound
            .filter((item) => item.type === type)
            .map((item) => new Date(item.date).getTime())
        ))

        return `${lastTransation.getDate()} de ${lastTransation.toLocaleString('pt-BR', {
            month: 'long'
        })}`
    }

    useFocusEffect(
        useCallback(() => {
            loadTransations()
        }, [])
    )

    useEffect(() => {
        loadTransations()
        // const dataKey = '@goFinances:transations'
        // AsyncStorage.removeItem(dataKey)
    }, [])

    return (
        <styles.Container>
            {
                isLoading ? (
                    <styles.Loading>
                        <ActivityIndicator size={35} color={theme.colors.secondary}/>
                    </styles.Loading>
                ) : (
                    <>
                        <styles.Header>
                            <styles.UserWrapper>
                                <styles.UserInfo>
                                    <styles.Photo source={{uri: 'https://github.com/WelliWillers.png'}}/>
                                    <styles.User>
                                        <styles.UserGreeting>Olá,</styles.UserGreeting>
                                        <styles.UserName>Wellington</styles.UserName>
                                    </styles.User>
                                </styles.UserInfo>

                                <styles.Logout onPress={handleLogout}>
                                    <styles.Icon name="power" />
                                </styles.Logout>

                            </styles.UserWrapper>
                        </styles.Header>

                        <styles.HightlightCards>
                            <HightlightCard type="up" title="Entradas" amount={hightlightData.entries.amount} lastTransaction={`Última entrada dia ${hightlightData.entries.lastTransation}`} />
                            <HightlightCard type="down" title="Saídas" amount={hightlightData.expensives.amount} lastTransaction={`Última saídas dia ${hightlightData.expensives.lastTransation}`} />
                            <HightlightCard type="total" title="Total" amount={hightlightData.total.amount} lastTransaction={`${hightlightData.total.lastTransation}`} />
                        </styles.HightlightCards>

                        <styles.Transactions>
                            <styles.TitleReload>
                                <styles.Title>
                                    Listagem
                                </styles.Title>
                                
                                <styles.Reload onPress={loadTransations}>
                                    <styles.Icon name="refresh-cw" />
                                </styles.Reload>
                            </styles.TitleReload>

                            {
                                transations.length > 0 ? (
                                    <styles.TransactionsList
                                        data={transations}
                                        keyExtractor={item  => item.id.toString()}
                                        renderItem={({ item }) => <TransactionCard  data={item} /> }
                                    />
                                ) : (
                                    <Text>Nenhuma transação cadastrada</Text>
                                )
                            }

                        </styles.Transactions>
                    </>
                )
            }
        </styles.Container>
    )
}