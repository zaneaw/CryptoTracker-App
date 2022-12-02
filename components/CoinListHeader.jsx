import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from '../theme/ThemeProvider';
import Icon from 'react-native-vector-icons/Feather';

export default function CoinListHeader({
    sortBy,
    sortByNumReverse,
    sortByMarketCapReverse,
    sortByPriceReverse,
    sortByChangeReverse,
    reverseNumClick,
    reverseMarketCapClick,
    reversePriceClick,
    reverseChangeClick,
}) {
    const { colors } = useTheme();

    return (
        <View
            style={[styles.container, { backgroundColor: colors.background }]}>
            <TouchableOpacity style={styles.number} onPress={reverseNumClick}>
                <Text style={[styles.headerText, { color: colors.flipText }]}>
                    #
                </Text>
                {sortBy === 'num' ? (
                    <Icon
                        name={sortByNumReverse ? 'chevron-up' : 'chevron-down'}
                        size={15}
                    />
                ) : (
                    ''
                )}
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.marketCap}
                onPress={reverseMarketCapClick}>
                <Text style={[styles.headerText, { color: colors.flipText }]}>
                    Market Cap
                </Text>
                {sortBy === 'marketCap' ? (
                    <Icon
                        name={
                            sortByMarketCapReverse
                                ? 'chevron-up'
                                : 'chevron-down'
                        }
                        size={15}
                    />
                ) : (
                    ''
                )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.price} onPress={reversePriceClick}>
                <Text style={[styles.headerText, { color: colors.flipText }]}>
                    Price
                </Text>
                {sortBy === 'price' ? (
                    <Icon
                        style={styles.priceIcon}
                        name={
                            sortByPriceReverse
                                ? 'chevron-up'
                                : 'chevron-down'
                        }
                        size={15}
                    />
                ) : (
                    ''
                )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.change} onPress={reverseChangeClick}>
                <Text style={[styles.headerText, { color: colors.flipText }]}>
                    Change
                </Text>
                {sortBy === 'change' ? (
                    <Icon
                        style={styles.changeIcon}
                        name={
                            sortByChangeReverse
                                ? 'chevron-up'
                                : 'chevron-down'
                        }
                        size={15}
                    />
                ) : (
                    ''
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
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
    priceIcon: {
        position: 'absolute',
        right: 16,
    },
    change: {
        width: 88,
        minWidth: 88,
        alignItems: 'center',
    },
    changeIcon: {
        position: 'absolute',
        right: 3,
    },
    headerText: {
        fontSize: 14,
        fontWeight: '500',
    },
});
