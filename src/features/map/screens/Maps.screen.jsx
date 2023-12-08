import React, { useContext, useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import SearchMap from '../components/SearchMap.component';
import MapCallout from '../components/MapCallout.component';
import { LocationContext } from '../../../services/location/location.context';
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';

import styled from 'styled-components/native';

const Map = styled(MapView)`
    height: 100%;
    width: 100%;
`;

const MapsScreen = ({ navigation }) => {
    const { location } = useContext(LocationContext);
    const { restaurants = [] } = useContext(RestaurantsContext);

    const [latDelta, setLatDelta] = useState(0);
    const { viewport, lat, lng } = location;

    useEffect(() => {
        const northeastLat = viewport.northeast.lat;
        const southwestLat = viewport.southwest.lat;

        setLatDelta(northeastLat - southwestLat);
    }, [location, viewport]);
    return (
        <>
            <SearchMap />
            <Map
                region={{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: latDelta,
                    longitudeDelta: 0.02,
                }}
            >
                {restaurants.map((restaurant) => {
                    return (
                        <Marker
                            key={restaurant.name}
                            title={restaurant.name}
                            coordinate={{
                                latitude: restaurant.geometry.location.lat,
                                longitude: restaurant.geometry.location.lng,
                            }}
                        >
                            <Callout
                                onPress={() =>
                                    navigation.navigate('RestaurantDetail', {
                                        restaurant,
                                    })
                                }
                            >
                                <MapCallout restaurant={restaurant} />
                            </Callout>
                        </Marker>
                    );
                })}
            </Map>
        </>
    );
};

export default MapsScreen;
