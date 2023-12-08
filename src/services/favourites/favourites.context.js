import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthenticationContext } from '../authentication/authentication.context';
export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
    const { user } = useContext(AuthenticationContext);
    const [favourites, setFavourites] = useState([]);

    const saveFavourites = async (value, uid) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
        } catch (e) {
            console.log('error storing', e);
        }
    };

    const loadFavourites = async (uid) => {
        try {
            const jsonValue = await AsyncStorage.getItem(`@favourites-${uid}`);
            return jsonValue != null ? setFavourites(JSON.parse(jsonValue)) : null;
        } catch (e) {
            console.log('error loading', e);
        }
    };

    const addFavourites = (restaurant) => setFavourites([...favourites, restaurant]);

    const removeFavourites = (restaurant) => {
        const newFavourites = favourites.filter((x) => x.placeId !== restaurant.placeId);

        setFavourites(newFavourites);
    };

    useEffect(() => {
        if (user && user.uid) {
            loadFavourites(user.uid);
        }
    }, [user]);

    useEffect(() => {
        if (user && user.uid && favourites.length) {
            saveFavourites(favourites, user.uid);
        }
    }, [favourites, user]);

    const value = { favourites, addFavourites, removeFavourites };

    return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>;
};
