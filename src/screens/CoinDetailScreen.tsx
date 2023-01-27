import {
    SafeAreaView,
    View,
    ScrollView,
    Text,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { usePriceChangeOptions } from '../Hooks';
import { RootStackParamList } from '../routes';
import { PriceChangePercentageDisplay } from '../components/reusable-components';

type Props = NativeStackScreenProps<RootStackParamList, 'CoinDetail'>;

export const CoinDetailScreen: React.FC<Props> = ({ route }) => {
    const { colors } = useTheme();
    const { coinId } = route.params;
    const [coinData, setCoinData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getCoinData = async () => {
        try {
            const response = await fetch(
                `https://zanes-crypto-tracker-server.cyclic.app/api/get-single-coin/${coinId}`,
            );
            const json = await response.json();
            setCoinData(json);
        } catch (error) {
            console.error(error);
        } finally {
            return setIsLoading(false)
        }
    };

    useEffect(() => {
        getCoinData();
    }, []);

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: colors.background }]}>
            {isLoading ? (
                <ActivityIndicator size="large" color={colors.primary} />
            ) : (
                <ScrollView
                    style={[
                        styles.body,
                        { backgroundColor: colors.background },
                    ]}>
                    <View style={styles.topInfo}>
                        <View style={styles.topLeft}>
                            <Text style={[styles.headerText, { color: colors.flipText }]}>
                                {coinData.symbol.toUpperCase()}
                            </Text>
                            <Text style={[styles.headerText, {color: colors.flipText}]}>
                                {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(coinData.market_data.current_price.usd)}
                            </Text>
                        </View>
                        <PriceChangePercentageDisplay priceChangeAmount={coinData.market_data.price_change_percentage_24h} />
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    body: {
        width: '100%',
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
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
