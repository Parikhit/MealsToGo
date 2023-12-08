import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { FavouritesContext } from '../../services/favourites/favourites.context';

import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';

const FavouriteButton = styled(TouchableOpacity)`
    position: absolute;
    top: 25px;
    right: 25px;
    z-index: 9;
`;

const Favourite = ({ restaurant }) => {
    const { favourites, addFavourites, removeFavourites } = useContext(FavouritesContext);

    console.log(favourites.length);

    const isFavourite = favourites.find((r) => r.placeId === restaurant.placeId);

    return (
        <FavouriteButton
            onPress={() =>
                !isFavourite ? addFavourites(restaurant) : removeFavourites(restaurant)
            }
        >
            <AntDesign
                name={isFavourite ? 'heart' : 'hearto'}
                size={24}
                color={isFavourite ? 'red' : 'white'}
            />
        </FavouriteButton>
    );
};

export default Favourite;
