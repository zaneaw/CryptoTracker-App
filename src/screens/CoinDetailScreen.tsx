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
import {
    CoinDetailGraph,
    CoinDetailHeader,
} from '../components/coin-detail-components';

type Props = NativeStackScreenProps<RootStackParamList, 'CoinDetail'>;

export const CoinDetailScreen: React.FC<Props> = ({ route }) => {
    const { colors } = useTheme();
    const { coinId } = route.params;
    const [coinData, setCoinData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [graphLabels, setGraphLabels] = useState<string[]>([]);
    const [graphPoints, setGraphPoints] = useState<number[]>([]);

    const getCoinData = () => {
        setIsLoading(true);

        fetch(
            `https://zanes-crypto-tracker-server.cyclic.app/api/get-single-coin/${coinId}`,
        )
            .then(res => res.json())
            .then(json => setCoinData(json))
            .then(() => getCoinGraphData())
            .then(() => {
                
            })
            .then(() => setIsLoading(false))
            .catch(err => console.error(err));
    };

    const getCoinGraphData = () => {
        fetch(
            `https://zanes-crypto-tracker-server.cyclic.app/api/get-single-coin-ohlc/${coinId}`,
        )
            .then(res => res.json())
            .then(json => cleanGraphData(json))
            .catch(err => console.error(err));
    };

    const cleanGraphData = (json: number[][]) => {
        let currTimestamps = [];
        let currPointsOpen = [];

        for (let i = 0; i < json.length; i++) {
            if (Math.floor(json.length / 4) % i === 0) {
                let date = new Date(json[i][0]);
                let hours = date.getHours();
                let minutes = '0' + date.getMinutes();
                let dateStr = `${hours}:${minutes.substr(-2)}`;
                currTimestamps.push(dateStr);
            }
            currPointsOpen.push(json[i][1]);
            // graphPointsClose.push(json[i][4]);
        }

        setGraphLabels(currTimestamps);
        setGraphPoints(currPointsOpen);
        return;
    }

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
                    <CoinDetailGraph graphLabels={graphLabels} graphPoints={graphPoints} />
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
