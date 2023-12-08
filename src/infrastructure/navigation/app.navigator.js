import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import RestaurantNavigator from './restaurants.navigator';
import SettingsNavigator from './settings.navigator';
import MapsScreen from '../../features/map/screens/Maps.screen';
import { FavouritesProvider } from '../../services/favourites/favourites.context';
import { RestaurantsProvider } from '../../services/restaurants/restaurants.context';
import { LocationProvider } from '../../services/location/location.context';

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
    <FavouritesProvider>
        <LocationProvider>
            <RestaurantsProvider>
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
                    <Tab.Screen
                        name='Maps'
                        options={{ headerShown: false }}
                        component={MapsScreen}
                    />
                    <Tab.Screen
                        name='Settings'
                        options={{ headerShown: false }}
                        component={SettingsNavigator}
                    />
                </Tab.Navigator>
            </RestaurantsProvider>
        </LocationProvider>
    </FavouritesProvider>
);

export default AppNavigator;
