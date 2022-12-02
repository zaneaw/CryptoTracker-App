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

    const coinSorter = (reverse, sorter) => {
        setCoins(coins => coins.sort((a, b) => {
            let aNum, bNum;

            if (sorter === 'marketCap') {
                aNum = a.market_cap_rank;
                bNum = b.market_cap_rank;
            }
            if (sorter === 'price') {
                aNum = a.current_price;
                bNum = b.current_price;
            } 
            if (sorter === 'change') {
                aNum = a.price_change_percentage_24h;
                bNum = b.price_change_percentage_24h;
            }

            aNum = numChecker(aNum);
            bNum = numChecker(bNum);

            if (reverse) {
                return aNum - bNum;
            } else {
                return bNum - aNum;
            }
        }));
    };

    const reverseNumClick = () => {
        if (sortBy !== 'num') {
            if (sortBy !== 'marketCap') {
                coinSorter(true, 'marketCap');
            }
            newSortClick('num');
            setSortBy('num');
            return;
        };
        setSortByNumReverse(sortByNumReverse => !sortByNumReverse);
        coinSorter(sortByNumReverse, 'marketCap');
    };

    const reverseMarketCapClick = () => {
        if (sortBy !== 'marketCap') {
            if (sortBy !== 'num') {
                coinSorter(true, 'marketCap');
            };
            newSortClick('marketCap');
            setSortBy('marketCap');
            
            return;
        };
        setSortByMarketCapReverse(sortByMarketCapReverse => !sortByMarketCapReverse);
        coinSorter(sortByMarketCapReverse, 'marketCap');
    }

    const reversePriceClick = () => {
        if (sortBy !== 'price') {
            newSortClick();
            setSortBy('price');
            coinSorter(false, 'price');
        };
        setSortByPriceReverse(sortByPriceReverse => !sortByPriceReverse);
        
        coinSorter(sortByPriceReverse, 'price');
    }

    const reverseChangeClick = () => {
        if (sortBy !== 'change') {
            newSortClick();
            setSortBy('change');
            coinSorter(false, 'change');
        };
        setSortByChangeReverse(sortByChangeReverse => !sortByChangeReverse);
        coinSorter(sortByChangeReverse, 'change')
    }

    const renderItem = ({ item, index }) => (
        <CoinListItem key={item.id} item={item} />
    );

    const getCoins = () => {
        // fetch('https://zanes-crypto-tracker-server.cyclic.app/api')
        //     .then((res) => res.json())
        //     .then((json) => setCoins(json))
        //     .catch((err) => console.error(err));
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
