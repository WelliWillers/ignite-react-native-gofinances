import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import {Feather} from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    background-color: ${({theme}) => theme.colors.background};
    flex: 1;
`;

export const Content = styled.ScrollView`
`;

export const ChartContainer = styled.View`
    width: 100%;
    align-items: center;
`;

export const Header = styled.View`
    background-color: ${({theme}) => theme.colors.primary};
    width: 100%;
    flex-direction: row;
    height: ${RFValue(113)}px;
    justify-content: space-between;
    align-items: flex-end;
    padding: 24px;
    padding-bottom: 10px; 
`;

export const Reload =  styled.TouchableOpacity`
    font-size: ${RFValue(18)}px;  
    font-family: ${({theme}) => theme.fonts.regular};
    margin-bottom: 16px;
`

export const Icon = styled(Feather)`
    color: ${({theme}) => theme.colors.secondary};
    font-size: ${RFValue(24)}px;
`;

export const Title = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
`;

export const MonthSelect = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const MonthSelectButton = styled.TouchableOpacity`

`;

export const MonthSelectIcon = styled(Feather)`
    font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;
`;

export const Loading = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.background};
`