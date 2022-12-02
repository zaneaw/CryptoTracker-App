import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTheme } from '../theme/ThemeProvider';
import CoinListItem from './CoinListItem';
import CoinListHeader from './CoinListHeader';
import coinData from '../exampleApi';

function CoinList() {
    const { colors } = useTheme();
    const [coins, setCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCoins();
        setIsLoading(false);
    }, []);

    const renderItem = ({ item, index }) => (
        <CoinListItem key={item.id} item={item} index={index} />
    );

    const getCoins = () => {
        // fetch('https://zanes-crypto-tracker-server.cyclic.app/api')
        //     .then((res) => res.json())
        //     .then((json) => setCoins(json))
        //     .catch((err) => console.error(err));
        // setCoins([{
        //     "id": "bitcoin",
        //     "symbol": "btc",
        //     "name": "Bitcoin",
        //     "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
        //     "current_price": 0.00000932,
        //     "market_cap": 311637927285,
        //     "market_cap_rank": 1,
        //     "fully_diluted_valuation": 340595662445,
        //     "total_volume": 24666032920,
        //     "high_24h": 16269.92,
        //     "low_24h": 15686.55,
        //     "price_change_24h": 307.8,
        //     "price_change_percentage_24h": 112.93398,
        //     "market_cap_change_24h": 5768303762,
        //     "market_cap_change_percentage_24h": 1.88587,
        //     "circulating_supply": 19214562,
        //     "total_supply": 21000000,
        //     "max_supply": 21000000,
        //     "ath": 69045,
        //     "ath_change_percentage": -76.50966,
        //     "ath_date": "2021-11-10T14:24:11.849Z",
        //     "atl": 67.81,
        //     "atl_change_percentage": 23818.43405,
        //     "atl_date": "2013-07-06T00:00:00.000Z",
        //     "roi": null,
        //     "last_updated": "2022-11-23T00:47:57.540Z"
        // }])
        setTimeout(() => {
            setCoins(coinData);
        }, 500)
    };
    
    return (
        <View>
            {isLoading ? (
                <ActivityIndicator size="large" color={colors.primary} />
            ) : (
                <FlatList
                    data={coins}
                    renderItem={renderItem}
                    keyExtractor={coin => coin.id}
                    ListHeaderComponent={CoinListHeader}
                    ListEmptyComponent={() => {
                        return (
                            <ActivityIndicator
                                size="large"
                                color={colors.primary}
                            />
                        );
                    }}
                    stickyHeaderIndices={[0]}
                />
            )}
        </View>
    );
};

export default CoinList;