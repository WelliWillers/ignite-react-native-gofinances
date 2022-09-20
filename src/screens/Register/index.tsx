import React, { useState } from 'react';
import { View } from 'react-native';
import { BaseInput } from '../../components/Form/BaseInput';
import { Buttom } from '../../components/Form/Buttom';
import { SelectCategory } from '../../components/Form/SelectCategory';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import * as styles from './styles'

export function Register() {

    const [selectedType, setSelectedType] = useState('')

    function handleToggleSelectedType(type: string){
        setSelectedType(type)
    }

    return (
        <styles.Container>
            <styles.Header>
                <styles.Title>Cadastro</styles.Title>
            </styles.Header>

            <styles.Form>
                <styles.Fields>
                    <BaseInput placeholder='Nome' /> 
                    <BaseInput placeholder='Preço' /> 

                    <styles.TransationTypes>
                        <TransactionTypeButton selected={selectedType === 'up' } onPress={() => handleToggleSelectedType('up')} title="Entrada" type="up"/>
                        <TransactionTypeButton selected={selectedType === 'down' } onPress={() => handleToggleSelectedType('down')} title="Saída" type="down"/>
                    </styles.TransationTypes>

                    <SelectCategory title="Categoria"/>
                </styles.Fields>

                <Buttom title="Enviar" />
            </styles.Form>
        </styles.Container>
    );
}