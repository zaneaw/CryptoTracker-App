import { View, Text, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import CoinListItem from './CoinListItem';
// import coinData from '../exampleApi';

function CoinList() {
    const [coins, setCoins] = useState([])


    useEffect(() => {
        getCoins();
        // setCoins(coinData)
    }, []);

    const renderItem = ({ item, index }) => (
        <CoinListItem key={item.id} item={item} index={index} />
    );

    // console.log('coins: ', coins)

    const getCoins = async () => {
        console.log('in getCoins!')
        // 'https://reactnative.dev/movies.json'
        // 
        try {
            const response = await fetch('http://localhost:5443/api');
            const json = await response.json();
            console.log('jsonMovies: ', json.movies)
            } catch (error) {
            console.error(error);
            }

        console.log('Leaving getCoins!')
    }
    
    return (
        <View>
            <FlatList
                data={coins}
                renderItem={renderItem}
                keyExtractor={coin => coin.id}
            />
        </View>
    )
}

export default CoinList;