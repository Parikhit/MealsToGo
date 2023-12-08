import React, { useContext, useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import styled from 'styled-components';
import { LocationContext } from '../../../services/location/location.context';

const SearchContainer = styled.View`
    padding: ${(props) => props.theme.space[1]};
`;

const Search = ({ isFavouritesToggled, onFavouritesToggled }) => {
    const { keyword, search } = useContext(LocationContext);
    const [searchKeyword, setSearchKeyword] = useState(keyword);

    useEffect(() => {
        setSearchKeyword(keyword);
    }, [keyword]);

    return (
        <SearchContainer>
            <Searchbar
                icon={isFavouritesToggled ? 'heart' : 'heart-outline'}
                onIconPress={onFavouritesToggled}
                iconColor='tomato'
                placeholder='Search for a location'
                elevation={3}
                value={searchKeyword}
                onSubmitEditing={() => {
                    search(searchKeyword);
                }}
                onChangeText={(text) => {
                    setSearchKeyword(text);
                }}
                style={{ backgroundColor: 'white' }}
            />
        </SearchContainer>
    );
};

export default Search;
