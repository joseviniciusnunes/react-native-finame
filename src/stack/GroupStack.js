import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import GroupList from '../pages/group/GroupList';
import GroupEdit from '../pages/group/GroupEdit';
import BackButtonStack from '../components/Button/BackButtonStack';

const Stack = createStackNavigator();

export default function GroupStack() {
    return (
        <Stack.Navigator initialRouteName="GroupList">
            <Stack.Screen
                name="GroupList"
                component={GroupList}
                options={({ navigation }) => ({
                    title: 'Grupos',
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
                name="GroupEdit"
                component={GroupEdit}
                options={({ navigation }) => ({
                    title: 'Novo Grupo',
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
