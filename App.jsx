import React, { useState, useEffect } from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFonts as useOswald, Oswald_400Regular } from '@expo-google-fonts/oswald';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';
import { theme } from './src/infrastructure/theme';
// import * as firebase from 'firebase';

import Navigation from './src/infrastructure/navigation';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { AuthenticationProvider } from './src/services/authentication/authentication.context';

const firebaseConfig = {
    apiKey: 'AIzaSyB4qZy9yfySN4bhtGGdjKq19ApBfs6M4Rc',
    authDomain: 'xpress-meals.firebaseapp.com',
    projectId: 'xpress-meals',
    storageBucket: 'xpress-meals.appspot.com',
    messagingSenderId: '166351790967',
    appId: '1:166351790967:web:3cd1d918e9addf76f3f772',
};

initializeApp(firebaseConfig);

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        signInWithEmailAndPassword('parikhitritzz@gmail.com', '12341234')
            .then((user) => {
                console.log(user);
                setIsAuthenticated(true);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    let [oswaldLoaded] = useOswald({ Oswald_400Regular });
    let [latoLoaded] = useLato({ Lato_400Regular });

    if (!oswaldLoaded || !latoLoaded) return null;

    return (
        <>
            <ThemeProvider theme={theme}>
                <AuthenticationProvider>
                    <Navigation />
                </AuthenticationProvider>
            </ThemeProvider>
            <ExpoStatusBar style='auto' />
        </>
    );
};

export default App;
