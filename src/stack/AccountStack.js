import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AccountList from '../pages/account/AccountList';
import AccountEdit from '../pages/account/AccountEdit';
import BackButtonStack from '../components/Button/BackButtonStack';

const Stack = createStackNavigator();

export default function AccountStack() {
    return (
        <Stack.Navigator initialRouteName="AccountList">
            <Stack.Screen
                name="AccountList"
                component={AccountList}
                options={({ navigation }) => ({
                    title: 'Contas',
                    headerStyle: {
                        backgroundColor: '#0B6AC9',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: () => (
                        <BackButtonStack onPress={() => navigation.goBack()} />
                    ),
                })}
            />
            <Stack.Screen
                name="AccountEdit"
                component={AccountEdit}
                options={({ navigation }) => ({
                    title: 'Nova Conta',
                    headerStyle: {
                        backgroundColor: '#0B6AC9',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: () => (
                        <BackButtonStack onPress={() => navigation.goBack()} />
                    ),
                })}
            />
        </Stack.Navigator>
    );
}
