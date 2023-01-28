import {
    View,
    FlatList,
    ActivityIndicator,
    ListRenderItem,
    RefreshControl,
} from 'react-native';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTheme } from '../../../theme/ThemeProvider';

import { CoinValidator } from '../../Validators/CoinValidator';
import { CoinListItem, CoinListHeader } from '../index';

export const CoinList = () => {
    const { colors } = useTheme();
    const [coins, setCoins] = useState<CoinValidator[]>([]);
    const [sortBy, setSortBy] = useState<string>('num');
    const [reverseSort, setReverseSort] = useState<boolean>(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const numChecker = (num: number): number => {
        let numToString: string = String(num);
        if (numToString.includes('e')) {
            numToString = numToString.split('e')[0];
            num = Number(numToString);
        }

        return num;
    };

    const coinsSorted = useMemo(() => {
        return coins.sort((a: CoinValidator, b: CoinValidator) => {
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
    }, [sortBy, reverseSort, coins]);

    const clickSortOption = useCallback((option: string) => {
        if (sortBy === option) {
            if (reverseSort) {
                return setReverseSort(false);
            }
            return setReverseSort(true);
        }

        setSortBy(option);
        setReverseSort(false);
    }, [sortBy, setSortBy, reverseSort, setReverseSort]);

    const renderItem: ListRenderItem<CoinValidator> = ({ item }) => (
        <CoinListItem key={item.id} item={item} />
    );

    const getCoins = () => {
        setIsRefreshing(true);

        fetch(
            'https://zanes-crypto-tracker-server.cyclic.app/api/get-all-coins',
        )
            .then(res => res.json())
            .then(json => setCoins(json))
            .then(() => setIsRefreshing(false))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        getCoins();
    }, []);

    return (
        <View>
            {coins ? (
                <FlatList
                    data={coinsSorted}
                    renderItem={renderItem}
                    keyExtractor={(item: CoinValidator) => item.id}
                    ListHeaderComponent={
                        <CoinListHeader
                            sortBy={sortBy}
                            clickSortOption={clickSortOption}
                            reverseSort={reverseSort}
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
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={getCoins}
                        />
                    }
                />
            ) : null}
        </View>
    );
};
