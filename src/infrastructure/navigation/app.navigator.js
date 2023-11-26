import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import RestaurantNavigator from './restaurants.navigator';
import MapsScreen from '../../features/map/screens/Maps.screen';
import SettingsScreen from '../../features/restaurants/screens/Settings.screen';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
    Restaurants: 'md-restaurant',
    Maps: 'md-map',
    Settings: 'md-settings',
};

const createScreenOptions = ({ route }) => {
    const iconName = TAB_ICON[route.name];

    return {
        tabBarIcon: ({ size, color }) => <Ionicons name={iconName} size={size} color={color} />,
    };
};

const AppNavigator = () => (
    <NavigationContainer>
        <Tab.Navigator
            screenOptions={createScreenOptions}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen
                name='Restaurants'
                options={{ headerShown: false }}
                component={RestaurantNavigator}
            />
            <Tab.Screen name='Maps' options={{ headerShown: false }} component={MapsScreen} />
            <Tab.Screen name='Settings' component={SettingsScreen} />
        </Tab.Navigator>
    </NavigationContainer>
);

export default AppNavigator;
