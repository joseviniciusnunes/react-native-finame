import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DashboardStack from './stack/DashboardStack';
import AccountStack from './stack/AccountStack';
import GroupStack from './stack/GroupStack';

const Drawer = createDrawerNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Dashboard">
                <Drawer.Screen name="Dashboard" component={DashboardStack} />
                <Drawer.Screen name="Conta" component={AccountStack} />
                <Drawer.Screen name="Grupo" component={GroupStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default Routes;
