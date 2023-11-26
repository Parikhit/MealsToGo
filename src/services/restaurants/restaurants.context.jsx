import React, { useState, createContext, useEffect, useContext } from 'react';

import { restaurantsRequest, restaurantsTransform } from './restaurants.service';
import { LocationContext } from '../location/location.context';

export const RestaurantsContext = createContext();

export const RestaurantsProvider = ({ children }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { location } = useContext(LocationContext);

    const retrieveRestaurants = (loc) => {
        setIsLoading(true);
        setRestaurants([]);

        setTimeout(() => {
            restaurantsRequest(loc)
                .then(restaurantsTransform)
                .then((results) => {
                    setIsLoading(false);
                    setRestaurants(results);
                })
                .catch((err) => setError(err));
        }, 2000);
    };

    useEffect(() => {
        if (location) {
            const locationString = `${location.lat},${location.lng}`;
            retrieveRestaurants(locationString);
        }
    }, [location]);

    const value = {
        restaurants,
        isLoading,
        error,
    };
    return <RestaurantsContext.Provider value={value}>{children}</RestaurantsContext.Provider>;
};
