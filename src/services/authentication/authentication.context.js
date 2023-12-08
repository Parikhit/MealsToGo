import React, { useState, createContext, useRef } from 'react';
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signOut,
} from 'firebase/auth';

import { loginRequest } from './authentication.service';

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const auth = useRef(getAuth()).current;

    onAuthStateChanged(auth, (usr) => {
        if (usr) {
            setUser(usr);
            // setIsLoading(false);
        }
        // } else {
        //     setIsLoading(false);
        // }
    });

    const onLogin = (email, password) => {
        setIsLoading(true);
        loginRequest(auth, email, password)
            .then((u) => {
                setUser(u.user);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err.message.toString());
            });
    };

    const onRegister = (email, password, repeatedPassword) => {
        setIsLoading(true);
        if (password !== repeatedPassword) {
            setError('Error: Passwords do not match');
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((u) => {
                setUser(u.user);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err.message.toString());
            });
    };

    const onLogout = () => {
        signOut(auth).then(() => {
            setUser(null);
            setError(null);
        });
    };

    const value = {
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
    };
    return (
        <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
    );
};
