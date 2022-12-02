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

    const coinSorter = () => {
        
    }

    const marketCapSort = (reverse) => {
        if (reverse) {
            return setCoins(coins => coins.sort((a, b) => {
                return a.market_cap_rank - b.market_cap_rank;
            }));
        };
        setCoins(coins => coins.sort((a, b) => {
            return b.market_cap_rank - a.market_cap_rank;
        }));
    }

    const reverseNumClick = () => {
        if (sortBy !== 'num') {
            if (sortBy !== 'marketCap') {
                marketCapSort(true);
            }
            newSortClick('num');
            setSortBy('num');
            return;
        };
        setSortByNumReverse(sortByNumReverse => !sortByNumReverse);
        marketCapSort(sortByNumReverse);
    };

    const reverseMarketCapClick = () => {
        if (sortBy !== 'marketCap') {
            if (sortBy !== 'num') {
                marketCapSort(true);
            };
            newSortClick('marketCap');
            setSortBy('marketCap');
            
            return;
        };
        setSortByMarketCapReverse(sortByMarketCapReverse => !sortByMarketCapReverse);
        marketCapSort(sortByMarketCapReverse);
    }

    const reversePriceClick = () => {
        if (sortBy !== 'price') {
            newSortClick();
            setSortBy('price');
            return setCoins(coins => coins.sort((a, b) => {
                let aPrice = numChecker(a.current_price);
                let bPrice = numChecker(b.current_price);
                return bPrice - aPrice;
            }));
        };
        setSortByPriceReverse(sortByPriceReverse => !sortByPriceReverse);
        
        setCoins(coins => coins.sort((a, b) => {
            let aPrice = numChecker(a.current_price);
            let bPrice = numChecker(b.current_price);
            if (sortByPriceReverse) {
                return bPrice - aPrice;
            } else {
                return aPrice - bPrice;
            }
        }));
    }

    const reverseChangeClick = () => {
        if (sortBy !== 'change') {
            newSortClick();
            setSortBy('change');
            return setCoins(coins => coins.sort((a, b) => {
                let aChange = numChecker(a.price_change_percentage_24h);
                let bChange = numChecker(b.price_change_percentage_24h);
                return bChange - aChange;
            }));
        };
        setSortByChangeReverse(sortByChangeReverse => !sortByChangeReverse);
        setCoins(coins => coins.sort((a, b) => {
            let aChange = numChecker(a.price_change_percentage_24h);
            let bChange = numChecker(b.price_change_percentage_24h);
            if (sortByChangeReverse) {
                return bChange - aChange;
            } else {
                return aChange - bChange;
            };
        }));
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
