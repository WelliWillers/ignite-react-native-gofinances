import { useEffect, useState } from "react";
import { Text } from "react-native";
import HightlightCard from "../../components/HightlightCard";
import TransactionCard, { TransactionCardProps } from "../../components/TransactionCard";
import AsyncStorage from '@react-native-async-storage/async-storage'

import * as styles from "./styles";

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export default function Dashboard(){

    const [transations, setTransations] = useState<DataListProps[]>([])

    function handleLogout () {
        console.log('logout')
    }

    async function loadTransations(){
        const dataKey = '@goFinances:transations'
        const response = await AsyncStorage.getItem(dataKey)
        const transationsFound = response ? JSON.parse(response) : []

        const transactionsFormated: DataListProps[] = transationsFound
        .map((item: DataListProps) => {
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

        setTransations(transactionsFormated)
    } 

    useEffect(() => {
        loadTransations()
    }, [])

    return (
        <styles.Container>
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
                <HightlightCard type="up" title="Entradas" amount="R$ 17.400,00" lastTransaction="Última entrada dia 13 de abril" />
                <HightlightCard type="down" title="Saídas" amount="R$ 17.400,00" lastTransaction="Última saídas dia 15 de abril" />
                <HightlightCard type="total" title="Total" amount="R$ 17.400,00" lastTransaction="Total geral de movimentações" />
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
        </styles.Container>
    )
}