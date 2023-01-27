import {
    View,
    FlatList,
    ActivityIndicator,
    ListRenderItem,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../theme/ThemeProvider';

import { CoinValidator } from '../Validators/CoinValidator';
import { CoinListItem, CoinListHeader } from './index';

import coinData from '../../exampleApi';

export const CoinList = () => {
    const { colors } = useTheme();
    const [coins, setCoins] = useState<CoinValidator[]>([]);
    const [sortBy, setSortBy] = useState<string>('num');
    const [sortByNumReverse, setSortByNumReverse] = useState<boolean>(false);
    const [sortByMarketCapReverse, setSortByMarketCapReverse] =
        useState<boolean>(false);
    const [sortByPriceReverse, setSortByPriceReverse] =
        useState<boolean>(false);
    const [sortByChangeReverse, setSortByChangeReverse] =
        useState<boolean>(false);

    const numChecker = (num: number): number => {
        let numToString: string = String(num);
        if (numToString.includes('e')) {
            numToString = numToString.split('e')[0];
            num = Number(numToString);
        }

        return num;
    };

    const newSortClick = (curr?: string) => {
        if (curr === 'num') {
            setSortByNumReverse(sortByMarketCapReverse);
        } else {
            setSortByNumReverse(false);
        }
        if (curr === 'marketCap') {
            setSortByMarketCapReverse(sortByNumReverse);
        } else {
            setSortByMarketCapReverse(false);
        }

        setSortByPriceReverse(false);
        setSortByChangeReverse(false);
    };

    const coinSorter = (reverse: boolean, sorter: string) => {
        setCoins(coins =>
            coins.sort((a, b) => {
                let aNum!: number;
                let bNum!: number;

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
                }

                return bNum - aNum;
            }),
        );
    };

    const reverseNumClick = (): void => {
        if (sortBy !== 'num') {
            if (sortBy !== 'marketCap') {
                coinSorter(true, 'marketCap');
            }
            newSortClick('num');
            setSortBy('num');
            return;
        }
        setSortByNumReverse(sortByNumReverse => !sortByNumReverse);
        coinSorter(sortByNumReverse, 'marketCap');
    };

    const reverseMarketCapClick = (): void => {
        if (sortBy !== 'marketCap') {
            if (sortBy !== 'num') {
                coinSorter(true, 'marketCap');
            }
            newSortClick('marketCap');
            setSortBy('marketCap');

            return;
        }
        setSortByMarketCapReverse(
            sortByMarketCapReverse => !sortByMarketCapReverse,
        );
        coinSorter(sortByMarketCapReverse, 'marketCap');
    };

    const reversePriceClick = (): void => {
        if (sortBy !== 'price') {
            newSortClick();
            setSortBy('price');
            coinSorter(false, 'price');
        }
        setSortByPriceReverse(sortByPriceReverse => !sortByPriceReverse);

        coinSorter(sortByPriceReverse, 'price');
    };

    const reverseChangeClick = (): void => {
        if (sortBy !== 'change') {
            newSortClick();
            setSortBy('change');
            coinSorter(false, 'change');
        }
        setSortByChangeReverse(sortByChangeReverse => !sortByChangeReverse);
        coinSorter(sortByChangeReverse, 'change');
    };

    const renderItem: ListRenderItem<CoinValidator> = ({ item }) => (
        <CoinListItem key={item.id} item={item} />
    );

    const getCoins = () => {
        fetch(
            'https://zanes-crypto-tracker-server.cyclic.app/api/get-all-coins',
        )
            .then(res => res.json())
            .then(json => setCoins(json))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        getCoins();
    }, []);

    return (
        <View>
            {coins ? (
                <FlatList
                    data={coins}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
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
            ) : null}
        </View>
    );
};
