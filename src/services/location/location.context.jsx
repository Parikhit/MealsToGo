import React, { useState, useEffect, createContext } from 'react';

import { locationRequest, locationTransform } from './location.service';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null);
    const [keyword, setKeyword] = useState('San Francisco');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSearch = (searchKeyword) => {
        setIsLoading(true);
        setKeyword(searchKeyword);
        if (!keyword.length) {
            return;
        }
    };

    useEffect(() => {
        locationRequest(keyword.toLowerCase())
            .then(locationTransform)
            .then((result) => {
                setIsLoading(false);
                setLocation(result);
                console.log(result);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
            });
    }, [keyword]);

    const value = {
        isLoading,
        error,
        location,
        search: onSearch,
        keyword,
    };
    return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};
