import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { useCurrentPriceFormatter } from '../../Hooks';

import { PriceChangePercentageDisplay } from '../reusable-components';

type Props = {
    coinSymbol: string;
    coinCurrentPrice: number | string;
    coinPriceChange: number;
};

export const CoinDetailHeader: React.FC<Props> = React.memo(({
    coinSymbol,
    coinCurrentPrice,
    coinPriceChange,
}) => {
    const { colors } = useTheme();
    const coinCurrentPriceFormatted = useCurrentPriceFormatter(coinCurrentPrice);

    return (
        <View style={styles.topInfo}>
            <View style={styles.topLeft}>
                <Text style={[styles.headerText, { color: colors.flipText }]}>
                    {coinSymbol.toUpperCase()}
                </Text>
                <Text style={[styles.headerText, { color: colors.flipText }]}>
                    ${coinCurrentPriceFormatted}
                </Text>
            </View>
            <PriceChangePercentageDisplay priceChangeAmount={coinPriceChange} />
        </View>
    );
});

const styles = StyleSheet.create({
    topInfo: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topLeft: {},
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
