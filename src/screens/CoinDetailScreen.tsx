import {
    SafeAreaView,
    View,
    ScrollView,
    Text,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../routes';
import { CoinDetailGraph, CoinDetailHeader } from '../components/coin-detail-components';

type Props = NativeStackScreenProps<RootStackParamList, 'CoinDetail'>;

export const CoinDetailScreen: React.FC<Props> = ({ route }) => {
    const { colors } = useTheme();
    const { coinId } = route.params;
    const [coinData, setCoinData] = useState<any>([]);
    const [coinGraphData, setCoinGraphData] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getCoinData = () => {
        setIsLoading(true);

        fetch(
            `https://zanes-crypto-tracker-server.cyclic.app/api/get-single-coin/${coinId}`,
        )
            .then(res => res.json())
            .then(json => setCoinData(json))
            .then(() => getCoinGraphData())
            .then(() => setIsLoading(false))
            .catch(err => console.error(err));
    };

    const getCoinGraphData = () => {
        fetch(
            `https://zanes-crypto-tracker-server.cyclic.app/api/get-single-coin-ohlc/${coinId}`,
        )
            .then(res => res.json())
            .then(json => setCoinGraphData(json))
            .catch(err => console.error(err));
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
                    ]}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={getCoinData}
                        />
                    }>
                    <CoinDetailHeader
                        coinSymbol={coinData.symbol}
                        coinCurrentPrice={
                            coinData.market_data.current_price.usd
                        }
                        coinPriceChange={
                            coinData.market_data.price_change_percentage_24h
                        }
                    />
                    {/* Display a tab navigation here for news, currency repos, etc */}
                    <CoinDetailGraph coinGraphData={coinGraphData} />
                    {/* <Text>
                        {JSON.stringify(coinGraphData)}
                        Hello
                    </Text> */}
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
        paddingVertical: 4,
    },
});
