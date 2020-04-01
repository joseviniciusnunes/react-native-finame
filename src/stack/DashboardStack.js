import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/dashboard/Dashboard';
import MenuButtonStack from '../components/Button/MenuButtonStack';

const Stack = createStackNavigator();

export default function DashboardStack({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    title: 'Dashboard',
                    headerStyle: {
                        backgroundColor: '#0B6AC9',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: () => (
                        <MenuButtonStack onPress={() => navigation.openDrawer()} />
                    ),
                }}
            />
        </Stack.Navigator>
    );
}
