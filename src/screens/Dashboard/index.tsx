import { FlatList, ScrollView } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import HightlightCard from "../../components/HightlightCard";
import TransactionCard, { TransactionCardProps } from "../../components/TransactionCard";

import { 
    Container, 
    Header, 
    Icon, 
    Photo, 
    User, 
    UserGreeting, 
    UserInfo, 
    UserName, 
    UserWrapper,
    HightlightCards,
    Transactions,
    Title,
    TransactionsList
} from "./styles";

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export default function Dashboard(){

    const data: DataListProps[] = [
        {
            id: '1',
            title:"Desenvolvimento de site",
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
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{uri: 'https://github.com/WelliWillers.png'}}/>
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Wellington</UserName>
                        </User>
                    </UserInfo>

                    <Icon name="power" />
                </UserWrapper>
            </Header>

            <HightlightCards>
                <HightlightCard type="up" title="Entradas" amount="R$ 17.400,00" lastTransaction="Última entrada dia 13 de abril" />
                <HightlightCard type="down" title="Saídas" amount="R$ 17.400,00" lastTransaction="Última saídas dia 15 de abril" />
                <HightlightCard type="total" title="Total" amount="R$ 17.400,00" lastTransaction="Total geral de movimentações" />
            </HightlightCards>

            <Transactions>
                <Title>
                    Listagem
                </Title>

                <TransactionsList
                    data={data}
                    keyExtractor={item  => item.id.toString()}
                    renderItem={({ item }) => <TransactionCard  data={item} /> }
                />

            </Transactions>
        </Container>
    )
}