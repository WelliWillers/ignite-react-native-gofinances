import { ScrollView } from "react-native";
import HightlightCard from "../../components/HightlightCard";
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
    HightlightCards
} from "./styles";

export default function Dashboard(){
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
                <HightlightCard title="Entradas" amount="R$ 17.400,00" lastTransation="Última entrada dia 13 de abril" />
                <HightlightCard title="Saídas" amount="R$ 17.400,00" lastTransation="Última saídas dia 15 de abril" />
                <HightlightCard title="Total" amount="R$ 17.400,00" lastTransation="Total geral de movimentações" />
            </HightlightCards>
        </Container>
    )
}