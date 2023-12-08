import React, { useContext } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacer from '../../../utility-components/spacer/spacer.component';
import RestaurantInfoCard from '../components/Restaurant-Info-Card.component';
import { FavouritesContext } from '../../../services/favourites/favourites.context';

import styled from 'styled-components/native';
import { RestaurantList } from '../components/restaurant-list.styles';

const NoFavouritesArea = styled(SafeAreaView)`
    align-items: center;
    justify-content: center;
`;

const FavouritesScreen = ({ navigation }) => {
    const { favourites } = useContext(FavouritesContext);

    return favourites.length ? (
        <SafeAreaView>
            <RestaurantList
                data={favourites}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('RestaurantDetail', {
                                    restaurant: item,
                                })
                            }
                        >
                            <Spacer position='bottom' size='large'>
                                <RestaurantInfoCard restaurant={item} />
                            </Spacer>
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item) => item.name}
            />
        </SafeAreaView>
    ) : (
        <NoFavouritesArea>
            <Text>No favourites yet</Text>
        </NoFavouritesArea>
    );
};

export default FavouritesScreen;
