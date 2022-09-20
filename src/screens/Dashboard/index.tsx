import { FlatList, ScrollView } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import HightlightCard from "../../components/HightlightCard";
import TransactionCard, { TransactionCardProps } from "../../components/TransactionCard";

import * as styles from "./styles";

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export default function Dashboard(){

    const data: DataListProps[] = [
        {
            id: '1',
            title:"Desenvolvimento de sistema",
            type:"up",
            category:{icon: 'dollar-sign', name:'Vendas'},
            amount:"R$ 17,00" ,
            date:"13/12/2022" 
        },
        {
            id: '2',
            title:"Desenvolvimento de site",
            type:"down",
            category:{icon: 'coffee', name:'Vendas'},
            amount:"R$ 17,00" ,
            date:"13/12/2022" 
        },
        {
            id: '3',
            title:"Desenvolvimento de sitsssssssadsdasdssssse",
            type:"up",
            category:{icon: 'dollar-sign', name:'Vendas'},
            amount:"R$ 17,00" ,
            date:"13/12/2022" 
        }
    ]

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

                    <styles.Icon name="power" />
                </styles.UserWrapper>
            </styles.Header>

            <styles.HightlightCards>
                <HightlightCard type="up" title="Entradas" amount="R$ 17.400,00" lastTransaction="Última entrada dia 13 de abril" />
                <HightlightCard type="down" title="Saídas" amount="R$ 17.400,00" lastTransaction="Última saídas dia 15 de abril" />
                <HightlightCard type="total" title="Total" amount="R$ 17.400,00" lastTransaction="Total geral de movimentações" />
            </styles.HightlightCards>

            <styles.Transactions>
                <styles.Title>
                    Listagem
                </styles.Title>

                <styles.TransactionsList
                    data={data}
                    keyExtractor={item  => item.id.toString()}
                    renderItem={({ item }) => <TransactionCard  data={item} /> }
                />

            </styles.Transactions>
        </styles.Container>
    )
}