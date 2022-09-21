import React, { useState } from 'react';
import { View, Modal } from 'react-native';
import { Buttom } from '../../components/Buttom';
import { BaseInput } from '../../components/Form/BaseInput';
import { SelectCategoryButton } from '../../components/Form/SelectCategoryButton';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';

import * as styles from './styles'

export function Register() {

    const [category, setCategory] = useState({
        key: 'category',
        name: 'categoria',
        icon: 'any'
    })
    const [selectedType, setSelectedType] = useState('')
    const [modalOpen, setModelOpen] = useState(false)

    function handleToggleSelectedType(type: string){
        setSelectedType(type)
    }

    function handleToggleModal(){
        setModelOpen(!modalOpen)
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

                    <SelectCategoryButton onPress={handleToggleModal} title={category.name} />
                </styles.Fields>

                <Buttom title="Enviar" />
            </styles.Form>

            <Modal visible={modalOpen}>
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleToggleModal}
                />
            </Modal>
        </styles.Container>
    );
}