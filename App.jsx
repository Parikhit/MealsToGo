import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { useFonts as useOswald, Oswald_400Regular } from '@expo-google-fonts/oswald';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';
import { theme } from './src/infrastructure/theme';

import { RestaurantsProvider } from './src/services/restaurants/restaurants.context';
import { LocationProvider } from './src/services/location/location.context';
import Navigation from './src/infrastructure/navigation';

const App = () => {
    let [oswaldLoaded] = useOswald({ Oswald_400Regular });
    let [latoLoaded] = useLato({ Lato_400Regular });

    if (!oswaldLoaded || !latoLoaded) return null;

    return (
        <>
            <ThemeProvider theme={theme}>
                <LocationProvider>
                    <RestaurantsProvider>
                        <Navigation />
                    </RestaurantsProvider>
                </LocationProvider>
            </ThemeProvider>
            <ExpoStatusBar style='auto' />
        </>
    );
};

export default App;
