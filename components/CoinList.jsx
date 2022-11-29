import { View, Text, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import CoinListItem from './CoinListItem';

function CoinList() {
    const [coins, setCoins] = useState([])

    useEffect(() => {
        getCoins();
    }, []);

    const renderItem = ({ item, index }) => (
        <CoinListItem key={item.id} item={item} index={index} />
    );

    const getCoins = () => {
        fetch('https://zanes-crypto-tracker-server.cyclic.app/api')
            .then((res) => res.json())
            .then((json) => setCoins(json))
            .catch((err) => console.error(err));
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