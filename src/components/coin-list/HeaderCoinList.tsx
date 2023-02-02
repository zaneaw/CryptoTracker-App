import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { useTheme } from '../../../theme/ThemeProvider';

type Props = {
    sortBy: string;
    clickSortOption: (option: string) => void;
    reverseSort: boolean;
};

export const HeaderCoinList: React.FC<Props> = React.memo(
    ({ sortBy, clickSortOption, reverseSort }) => {
        const { colors } = useTheme();

        return (
            <View
                style={[
                    styles.container,
                    { backgroundColor: colors.background },
                ]}>
                <TouchableOpacity
                    style={styles.number}
                    onPress={() => clickSortOption('num')}>
                    <Text
                        style={[styles.headerText, { color: colors.flipText }]}>
                        #
                    </Text>
                    {sortBy === 'num' ? (
                        <Icon
                            name={reverseSort ? 'chevron-down' : 'chevron-up'}
                            size={15}
                            color={colors.flipText}
                        />
                    ) : undefined}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.marketCap}
                    onPress={() => clickSortOption('marketCap')}>
                    <Text
                        style={[styles.headerText, { color: colors.flipText }]}>
                        Market Cap
                    </Text>
                    {sortBy === 'marketCap' ? (
                        <Icon
                            name={reverseSort ? 'chevron-down' : 'chevron-up'}
                            size={15}
                            color={colors.flipText}
                        />
                    ) : undefined}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.price}
                    onPress={() => clickSortOption('price')}>
                    <View style={styles.priceSmallContainer}>
                        <Text
                            style={[
                                styles.headerText,
                                { color: colors.flipText },
                            ]}>
                            Price
                        </Text>
                        {sortBy === 'price' ? (
                            <Icon
                                style={styles.priceIcon}
                                name={
                                    reverseSort ? 'chevron-down' : 'chevron-up'
                                }
                                size={15}
                                color={colors.flipText}
                            />
                        ) : undefined}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.change}
                    onPress={() => clickSortOption('changePercentage')}>
                    <View style={styles.changeSmallContainer}>
                        <Text
                            style={[
                                styles.headerText,
                                { color: colors.flipText },
                            ]}>
                            Change
                        </Text>
                        {sortBy === 'changePercentage' ? (
                            <Icon
                                style={styles.changeIcon}
                                name={
                                    reverseSort ? 'chevron-down' : 'chevron-up'
                                }
                                size={15}
                                color={colors.flipText}
                            />
                        ) : undefined}
                    </View>
                </TouchableOpacity>
            </View>
        );
    },
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    number: {
        width: 44,
        minWidth: 44,
        flexDirection: 'row',
    },
    marketCap: {
        flex: 2,
        minWidth: 92,
        marginHorizontal: '1%',
        flexDirection: 'row',
    },
    price: {
        flex: 3,
        minWidth: 108,
        marginHorizontal: '3%',
        paddingLeft: 14,
        alignItems: 'center',
    },
    priceSmallContainer: {
        position: 'relative',
    },
    priceIcon: {
        position: 'absolute',
        right: -16,
    },
    change: {
        width: 88,
        minWidth: 88,
        alignItems: 'center',
    },
    changeSmallContainer: {
        position: 'relative',
    },
    changeIcon: {
        position: 'absolute',
        right: -16,
    },
    headerText: {
        fontSize: 14,
        fontWeight: '500',
    },
});
