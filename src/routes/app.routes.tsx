import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Dashboard from "../screens/Dashboard";
import { Register } from "../screens/Register";
import theme from "../global/styles/theme";
import { Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const { Navigator, Screen } = createBottomTabNavigator()


export function AppRoutes(){
    return (
        <Navigator 
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.secondary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    height: 88,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0
                }
            }}
        >
            <Screen options={{
                tabBarIcon: (({size, color}) => <MaterialIcons size={size} color={color} name="format-list-bulleted" /> )
            }} name="Listagem" component={Dashboard} />
            <Screen options={{
                tabBarIcon: (({size, color}) => <MaterialIcons size={size} color={color} name="attach-money" /> )
            }} name="Cadastro" component={Register} />
            <Screen options={{
                tabBarIcon: (({size, color}) => <MaterialIcons size={size} color={color} name="pie-chart" /> )
            }} name="Resumo" component={Register} />
        </Navigator>
    )
}