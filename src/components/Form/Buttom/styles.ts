import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled(TouchableOpacity)`
    width: 100%;
    background-color: ${({theme}) => theme.colors.secondary};
    padding: 18px;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(14)}px;;
`;