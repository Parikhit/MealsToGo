import { useContext } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeArea } from '../../../utility-components/safe-area.component';
import RestaurantInfoCard from '../components/Restaurant-Info-Card.component';
import Spacer from '../../../utility-components/spacer/spacer.component';
import styled from 'styled-components';

import Search from '../components/Search.component';
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const RestaurantList = styled(FlatList).attrs({
    contentContainerStyle: { padding: 16 },
})``;

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
            <Search />
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
                                <RestaurantInfoCard restaurant={item} />
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
