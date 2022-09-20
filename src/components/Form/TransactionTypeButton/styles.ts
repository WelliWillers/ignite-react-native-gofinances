import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import {Feather} from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';

interface IconsProps {
    type: 'up' | 'down'
}

interface TransactionTypeButtonProps {
    type: 'up' | 'down'
    selected: boolean;
}

export const Container = styled(TouchableOpacity)<TransactionTypeButtonProps>`
    width: 48%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 16px;
    border-radius: 5px;

    border: ${({theme, type, selected}) => selected ? `0px solid ${theme.colors.text}` : `1.5px solid ${theme.colors.text}`};

    ${({theme, type, selected}) => selected && type === 'up' && css`background-color: ${theme.colors.success_light}`};
    ${({theme, type, selected}) => selected && type === 'down' && css`background-color: ${theme.colors.attention_light}`};
`;

export const Icon = styled(Feather)<IconsProps>`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;
    color: ${({type, theme}) => type === 'up' ? theme.colors.success : theme.colors.attention}
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${({theme}) => theme.fonts.regular};
`;