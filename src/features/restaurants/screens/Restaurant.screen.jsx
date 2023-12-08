import { useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeArea } from '../../../utility-components/safe-area/safe-area.component';
import FadeInView from '../../../utility-components/animations/fade.animation';
import RestaurantInfoCard from '../components/Restaurant-Info-Card.component';
import Spacer from '../../../utility-components/spacer/spacer.component';
import styled from 'styled-components';

import Search from '../components/Search.component';
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';
import { FavouritesContext } from '../../../services/favourites/favourites.context';
import FavouritesBar from '../../../utility-components/favourites/favourites-bar.component';

import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { RestaurantList } from '../components/restaurant-list.styles';

const Loading = styled(ActivityIndicator)`
    margin-left: -25px;
`;

const LoadingContainer = styled.View`
    position: absolute;
    top: 50%;
    left: 50%;
`;

const RestaurantsScreen = ({ navigation }) => {
    const { isLoading, restaurants } = useContext(RestaurantsContext);
    const { favourites } = useContext(FavouritesContext);
    const [isToggled, setIsToggled] = useState(false);

    return (
        <SafeArea>
            {isLoading && (
                <LoadingContainer>
                    <Loading
                        size={50}
                        style={{ marginLeft: -25 }}
                        animating={true}
                        color={MD2Colors.blue300}
                    />
                </LoadingContainer>
            )}

            <Search
                isFavouritesToggled={isToggled}
                onFavouritesToggled={() => setIsToggled(!isToggled)}
            />

            {isToggled && (
                <FavouritesBar favourites={favourites} onNavigate={navigation.navigate} />
            )}

            <RestaurantList
                data={restaurants}
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
                                <FadeInView>
                                    <RestaurantInfoCard restaurant={item} />
                                </FadeInView>
                            </Spacer>
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item) => item.name}
            />
        </SafeArea>
    );
};

export default RestaurantsScreen;
