import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    ScrollView,
    Text,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useTheme } from '@theme/index';
import { RootStackParamList } from '@navigation/routes';
import { CoinDetailHeader, GraphSection, MarketDataSection } from '.';

type Props = NativeStackScreenProps<RootStackParamList, 'CoinDetail'>;

export const CoinDetailScreen: React.FC<Props> = ({ route }) => {
    const { colors } = useTheme();
    const { coinId } = route.params;
    const [coinData, setCoinData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    const getCoinData = () => {
        setIsLoading(true);

        fetch(
            `https://zanes-crypto-tracker-server.cyclic.app/api/get-single-coin/${coinId}`,
        )
            .then(res => res.json())
            .then(json => setCoinData(json))
            .then(() => setIsLoading(false))
            .catch(err => (console.error(err), setIsError(true)));
    };

    useEffect(() => {
        getCoinData();
    }, []);

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: colors.background }]}>
            {isLoading ? (
                <ActivityIndicator
                    size="large"
                    color={colors.primary}
                    style={{ marginVertical: 12 }}
                />
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
                    <GraphSection
                        coinId={coinId}
                        // graphLabels={graphLabels}
                        // graphPoints={graphPoints}
                        priceChange={
                            coinData.market_data.price_change_percentage_24h
                        }
                    />
                    <MarketDataSection coinId={coinId} />
                </ScrollView>
            )}
            {isError ? (
                <View>
                    <Text>Error fetching data, please try again.</Text>
                </View>
            ) : undefined}
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
