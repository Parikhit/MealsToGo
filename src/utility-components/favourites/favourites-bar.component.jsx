import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import CompactRestaurantInfo from '../compact-restaurant-info/CompactRestaurantInfo.component';
import Spacer from '../spacer/spacer.component';

import Text from '../typography/text.component';
import styled from 'styled-components/native';

const FavouritesWrapper = styled.View`
    padding: 10px;
`;

const FavouritesBar = ({ favourites, onNavigate }) => {
    if (!favourites.length) {
        return null;
    }
    return (
        <FavouritesWrapper>
            <Spacer position='left' size='large'>
                <Text variant='caption'>Favourites</Text>
            </Spacer>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {favourites.map((restaurant) => {
                    const key = restaurant.name;

                    return (
                        <Spacer key={key} position='left' size='medium'>
                            <TouchableOpacity
                                onPress={() =>
                                    onNavigate('RestaurantDetail', {
                                        restaurant,
                                    })
                                }
                            >
                                <CompactRestaurantInfo restaurant={restaurant} />
                            </TouchableOpacity>
                        </Spacer>
                    );
                })}
            </ScrollView>
        </FavouritesWrapper>
    );
};

export default FavouritesBar;
