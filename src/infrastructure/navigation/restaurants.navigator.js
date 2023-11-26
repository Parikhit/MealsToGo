import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import RestaurantsScreen from '../../features/restaurants/screens/Restaurant.screen';
import RestaurantDetailScreen from '../../features/restaurants/screens/RestaurantDetail.screen';

const RestaurantStack = createStackNavigator();

const RestaurantNavigator = () => {
    return (
        <RestaurantStack.Navigator
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.ModalPresentationIOS,
            }}
        >
            <RestaurantStack.Screen name='Restaurant' component={RestaurantsScreen} />
            <RestaurantStack.Screen name='RestaurantDetail' component={RestaurantDetailScreen} />
        </RestaurantStack.Navigator>
    );
};

export default RestaurantNavigator;
