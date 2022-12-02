import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../theme/ThemeProvider';
import CoinListItem from './CoinListItem';
import CoinListHeader from './CoinListHeader';
import coinData from '../exampleApi';

function CoinList() {
    const { colors } = useTheme();
    const [coins, setCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState('num');
    const [sortByNumReverse, setSortByNumReverse] = useState(false);
    const [sortByMarketCapReverse, setSortByMarketCapReverse] = useState(false);
    const [sortByPriceReverse, setSortByPriceReverse] = useState(false);
    const [sortByChangeReverse, setSortByChangeReverse] = useState(false);

    useEffect(() => {
        getCoins();
        setIsLoading(false);
    }, []);

    const numChecker = (num) => {
        if (String(num).includes('e')) {
            num = String(num).split('e')[0];
            num = Number(num);
        }

        return num;
    }

    const newSortClick = (curr) => {
        if (curr === 'num') {
            setSortByNumReverse(sortByMarketCapReverse);
        } else {
            setSortByNumReverse(false);
        };
        if (curr === 'marketCap') {
            setSortByMarketCapReverse(sortByNumReverse);
        } else {
            setSortByMarketCapReverse(false);
        };
        
        setSortByPriceReverse(false);
        setSortByChangeReverse(false);
    }

    const reverseNumClick = () => {
        if (sortBy !== 'num') {
            newSortClick('num');
            return setSortBy('num');
        };
        setSortByNumReverse(sortByNumReverse => !sortByNumReverse);
        setCoins(coins => coins.reverse());
    };

    const reverseMarketCapClick = () => {
        if (sortBy !== 'marketCap') {
            newSortClick('marketCap');
            return setSortBy('marketCap');
        };
        setSortByMarketCapReverse(sortByMarketCapReverse => !sortByMarketCapReverse);
        setCoins(coins => coins.reverse());
    }

    const reversePriceClick = () => {
        if (sortBy !== 'price') {
            newSortClick();
            setSortBy('price');
            setCoins(coins => coins.sort((a, b) => {
                let aPrice = numChecker(a.current_price);
                let bPrice = numChecker(b.current_price);
                return bPrice - aPrice;
            }));
            return // sort coins by price, decreasing
        };
        setSortByPriceReverse(sortByPriceReverse => !sortByPriceReverse);
        setCoins(coins.sort((a, b) => {
            let aPrice = numChecker(a.current_price);
            let bPrice = numChecker(b.current_price);
            return aPrice - bPrice;
        }));
        // sort by coins expensive to cheap, then cheap to expensive
        // setCoins()
    }

    const reverseChangeClick = () => {
        if (sortBy !== 'change') {
            newSortClick();
            setSortBy('change');
            setCoins(coins => coins.sort((a, b) => {
                let aChange = numChecker(a.price_change_percentage_24h);
                let bChange = numChecker(b.price_change_percentage_24h);
                return bChange - aChange;
            }))
            return // sort coins by change, decreasing
        };
        setSortByChangeReverse(sortByChangeReverse => !sortByChangeReverse);
        setCoins(coins => coins.sort((a, b) => {
            let aChange = numChecker(a.price_change_percentage_24h);
            let bChange = numChecker(b.price_change_percentage_24h);
            return aChange - bChange;
        }))
        // sort by change largest to smallest, then smallest to largest
        // setCoins()
    }

    const renderItem = ({ item, index }) => (
        <CoinListItem key={item.id} item={item} />
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
        }, 50);
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
                    ListHeaderComponent={
                        <CoinListHeader
                            sortBy={sortBy}
                            sortByNumReverse={sortByNumReverse}
                            sortByMarketCapReverse={sortByMarketCapReverse}
                            sortByPriceReverse={sortByPriceReverse}
                            sortByChangeReverse={sortByChangeReverse}
                            reverseNumClick={reverseNumClick}
                            reverseMarketCapClick={reverseMarketCapClick}
                            reversePriceClick={reversePriceClick}
                            reverseChangeClick={reverseChangeClick}
                        />
                    }
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
}

export default CoinList;
