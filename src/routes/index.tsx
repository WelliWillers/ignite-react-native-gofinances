import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import { useAuth } from '../hooks/useAuth';

export function Routes (){

    const { user } = useAuth()

    console.log(user)

    return (
        <NavigationContainer>
            {
                user.id ? (
                    <AppRoutes/>
                ) : (
                    <AuthRoutes/>
                )
            }
        </NavigationContainer>
    )
}