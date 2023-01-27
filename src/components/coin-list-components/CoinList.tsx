import {
    View,
    FlatList,
    ActivityIndicator,
    ListRenderItem,
} from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../../../theme/ThemeProvider';

import { CoinValidator } from '../../Validators/CoinValidator';
import { CoinListItem, CoinListHeader } from '../index';

export const CoinList = () => {
    const { colors } = useTheme();
    const [coins, setCoins] = useState<CoinValidator[]>([]);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [sortBy, setSortBy] = useState<string>('num');
    const [reverseSort, setReverseSort] = useState<boolean>(false);
    // const [sortByNumReverse, setSortByNumReverse] = useState<boolean>(false);
    // const [sortByMarketCapReverse, setSortByMarketCapReverse] =
    //     useState<boolean>(false);
    // const [sortByPriceReverse, setSortByPriceReverse] =
    //     useState<boolean>(false);
    // const [sortByChangeReverse, setSortByChangeReverse] =
    //     useState<boolean>(false);

    const numChecker = (num: number): number => {
        let numToString: string = String(num);
        if (numToString.includes('e')) {
            numToString = numToString.split('e')[0];
            num = Number(numToString);
        }

        return num;
    };

    useMemo(() => {
        const newCoins = coins.sort((a: CoinValidator, b: CoinValidator) => {
            let aNum!: number;
            let bNum!: number;

            if (sortBy === 'num') {
                // reversed
                bNum = a.market_cap_rank;
                aNum = b.market_cap_rank;
            }
            if (sortBy === 'marketCap') {
                // reversed
                bNum = a.market_cap_rank;
                aNum = b.market_cap_rank;
            }
            if (sortBy === 'price') {
                aNum = a.current_price;
                bNum = b.current_price;
            }
            if (sortBy === 'changePercentage') {
                aNum = a.price_change_percentage_24h;
                bNum = b.price_change_percentage_24h;
            }

            aNum = numChecker(aNum);
            bNum = numChecker(bNum);

            if (reverseSort) {
                return aNum - bNum;
            }

            return bNum - aNum;
        });

        setCoins(newCoins);
        setIsUpdating(false);
    }, [sortBy, reverseSort]);

    const clickSortOption = (option: string) => {
        if (sortBy === option) {
            if (reverseSort) {
                return setReverseSort(false);
            }
            return setReverseSort(true);
        }

        setSortBy(option);
        setReverseSort(false);
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
            {isUpdating ? (
                <ActivityIndicator size="large" color={colors.primary} />
            ) : undefined}
            {coins ? (
                <FlatList
                    data={coins}
                    renderItem={renderItem}
                    keyExtractor={(item: CoinValidator) => item.id}
                    ListHeaderComponent={
                        <CoinListHeader
                            sortBy={sortBy}
                            clickSortOption={clickSortOption}
                            reverseSort={reverseSort}
                            // sortByNumReverse={sortByNumReverse}
                            // sortByMarketCapReverse={sortByMarketCapReverse}
                            // sortByPriceReverse={sortByPriceReverse}
                            // sortByChangeReverse={sortByChangeReverse}
                            // reverseNumClick={reverseNumClick}
                            // reverseMarketCapClick={reverseMarketCapClick}
                            // reversePriceClick={reversePriceClick}
                            // reverseChangeClick={reverseChangeClick}
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
