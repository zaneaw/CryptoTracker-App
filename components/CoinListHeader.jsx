import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '../theme/ThemeProvider';

export default function CoinListHeader() {
    const { colors } = useTheme();

    return (
        <View
            style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.number}>
                <Text style={[styles.headerText, { color: colors.flipText }]}>
                    #
                </Text>
            </View>
            <View style={styles.coin}>
                <Text style={[styles.headerText, { color: colors.flipText }]}>
                    Market Cap
                </Text>
            </View>
            <View style={styles.price}>
                <Text style={[styles.headerText, { color: colors.flipText }]}>
                    Price
                </Text>
            </View>
            <View style={styles.change}>
                <Text style={[styles.headerText, { color: colors.flipText }]}>
                    24h Change
                </Text>
            </View>
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
    },
    coin: {
        flex: 2,
        minWidth: 92,
        marginHorizontal: '1%',
    },
    price: {
        flex: 3,
        minWidth: 108,
        marginHorizontal: '3%',
        alignItems: 'center',
    },
    change: {
        width: 88,
        minWidth: 88,
        alignItems: 'flex-end',
    },
    headerText: {
        fontSize: 14,
        fontWeight: '500',
    },
});
