import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, Text, TouchableWithoutFeedback } from 'react-native';
import { Buttom } from '../../components/Buttom';
import { BaseInputForm } from '../../components/Form/BaseInputForm';
import { SelectCategoryButton } from '../../components/Form/SelectCategoryButton';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import * as yup from 'yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as styles from './styles'
import { yupResolver } from '@hookform/resolvers/yup';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/useAuth';

interface FormDataProps {
    name: string;
    amount: number;
}

const formValidation = yup.object({
    name: yup.string().required('Este campo é obrigatório'),
    amount: yup.number().positive('Deve ser um número positivo').integer('Deve ser um valor inteiro.').required('Este campo é obrigatório').typeError('Informe um valor numérioco'),
}).required();

export function Register() {

    const [selectedType, setSelectedType] = useState('')
    const [modalOpen, setModelOpen] = useState(false)
    const [category, setCategory] = useState({
        key: 'category',
        name: 'categoria',
        icon: 'any'
    })
    const { user } = useAuth()

    const { control, reset, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(formValidation)
    })

    const navigation = useNavigation()

    const dataKey = `@goFinances:transations_user:${user.id}`

    function handleToggleSelectedType(type: string){
        setSelectedType(type)
    }

    function handleToggleModal(){
        setModelOpen(!modalOpen)
    }

    const handleRegister = async ({name, amount}: FormDataProps) => {

        if(!selectedType) {
            return Alert.alert('Selecione o tipo da transação.')
        }

        if(category.key === 'category') {
            return Alert.alert('Selecione uma categoria.')
        }

        const newTransation = { 
            id: String(uuid.v4()),
            name: name,
            amount: amount,
            type: selectedType,
            category: category.key,
            date: new Date()
        }

        try {
            const data = await AsyncStorage.getItem(dataKey)
            const currentData = data ? JSON.parse(data) : []

            const dataFormated = [
                ...currentData,
                newTransation
            ]

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated))

            Alert.alert('Transação cadastrado com sucesso!')
            reset()
            setSelectedType('')
            setCategory({
                key: 'category',
                name: 'categoria',
                icon: 'any'
            })

            navigation.navigate('Listagem')
        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possível salvar')
        }
    }

    useEffect(() => {
        async function loadData() {
            const data = await AsyncStorage.getItem(dataKey)
        }

        loadData()
        // AsyncStorage.removeItem(dataKey)
    }, [])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <styles.Container>
                <styles.Header>
                    <styles.Title>Cadastro</styles.Title>
                </styles.Header>

                <styles.Form>
                    <styles.Fields>
                        
                        <BaseInputForm 
                            name="name" 
                            control={control} 
                            placeholder='Nome' 
                            autoCapitalize='sentences'
                            autoCorrect={false}
                            messageError={errors.name}
                        />

                        <BaseInputForm 
                            name="amount" 
                            control={control} 
                            placeholder='Preço'
                            keyboardType='numeric'
                            messageError={errors.amount}
                        /> 

                        <styles.TransationTypes>
                            <TransactionTypeButton selected={selectedType === 'up' } onPress={() => handleToggleSelectedType('up')} title="Entrada" type="up"/>
                            <TransactionTypeButton selected={selectedType === 'down' } onPress={() => handleToggleSelectedType('down')} title="Saída" type="down"/>
                        </styles.TransationTypes>

                        <SelectCategoryButton onPress={handleToggleModal} title={category.name} />
                    </styles.Fields>

                    <Buttom disabled={isSubmitting} onPress={handleSubmit(handleRegister)} title="Enviar" />
                </styles.Form>

                <Modal visible={modalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleToggleModal}
                    />
                </Modal>
            </styles.Container>
        </TouchableWithoutFeedback>
    );
}