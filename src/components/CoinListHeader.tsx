import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import Icon from 'react-native-vector-icons/Feather';

type Props = {
    sortBy: string;
    sortByNumReverse: boolean;
    sortByMarketCapReverse: boolean;
    sortByPriceReverse: boolean;
    sortByChangeReverse: boolean;
    reverseNumClick: () => void;
    reverseMarketCapClick: () => void;
    reversePriceClick: () => void;
    reverseChangeClick: () => void;
}

export const CoinListHeader: React.FC<Props> = ({
    sortBy,
    sortByNumReverse,
    sortByMarketCapReverse,
    sortByPriceReverse,
    sortByChangeReverse,
    reverseNumClick,
    reverseMarketCapClick,
    reversePriceClick,
    reverseChangeClick,
}) => {
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
                        color={colors.flipText}
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
                        color={colors.flipText}
                    />
                ) : (
                    ''
                )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.price} onPress={reversePriceClick}>
                <View style={styles.priceSmallContainer}>
                    <Text
                        style={[styles.headerText, { color: colors.flipText }]}>
                        Price
                    </Text>
                    {sortBy === 'price' ? (
                        <Icon
                            style={styles.priceIcon}
                            name={
                                !sortByPriceReverse
                                    ? 'chevron-up'
                                    : 'chevron-down'
                            }
                            size={15}
                            color={colors.flipText}
                        />
                    ) : (
                        ''
                    )}
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.change}
                onPress={reverseChangeClick}>
                <View style={styles.changeSmallContainer}>
                    <Text
                        style={[styles.headerText, { color: colors.flipText }]}>
                        Change
                    </Text>
                    {sortBy === 'change' ? (
                        <Icon
                            style={styles.changeIcon}
                            name={
                                !sortByChangeReverse
                                    ? 'chevron-up'
                                    : 'chevron-down'
                            }
                            size={15}
                            color={colors.flipText}
                        />
                    ) : (
                        ''
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
};

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
