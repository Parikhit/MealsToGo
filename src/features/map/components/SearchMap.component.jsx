import React, { useContext, useEffect, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import styled from 'styled-components';
import { LocationContext } from '../../../services/location/location.context';

const SearchContainer = styled.View`
    padding: ${(props) => props.theme.space[1]};
    position: absolute;
    z-index: 999;
    top: 40px;
    width: 100%;
`;

const SearchMap = () => {
    const { keyword, search } = useContext(LocationContext);
    const [searchKeyword, setSearchKeyword] = useState(keyword);

    useEffect(() => {
        setSearchKeyword(keyword);
    }, [keyword]);

    return (
        <SearchContainer>
            <Searchbar
                icon='map'
                iconColor='tomato'
                placeholder='Search for a location'
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

export default SearchMap;
