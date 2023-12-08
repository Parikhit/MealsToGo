import React from 'react';

import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import SettingsScreen from '../../features/restaurants/screens/Settings.screen';
import FavouritesScreen from '../../features/restaurants/screens/Favourites.screen';
const SettingsStack = createStackNavigator();

const SettingsNavigator = ({ route, navigation }) => {
    return (
        <SettingsStack.Navigator
            headerMode='screen'
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
        >
            <SettingsStack.Screen
                options={{ headerShown: false }}
                name='settings'
                component={SettingsScreen}
            />
            <SettingsStack.Screen
                options={{ headerShown: false }}
                name='Favourites'
                component={FavouritesScreen}
            />
        </SettingsStack.Navigator>
    );
};

export default SettingsNavigator;
