import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from '../../theme/ThemeProvider';

import { CoinValidator } from '../Validators/CoinValidator';
import { RootStackParamList } from '../routes';

type Props = {
    item: CoinValidator;
};

const largeNumFormatter = (marketCap: number) => {
    let formattedNum: string | number;
    if (marketCap >= 1000000000000) {
        // trillion
        formattedNum = (marketCap / 1000000000000).toFixed(2) + ' T';
    } else if (marketCap >= 1000000000) {
        // billion
        formattedNum = (marketCap / 1000000000).toFixed(2) + ' B';
    } else if (marketCap >= 1000000) {
        // million
        formattedNum = (marketCap / 1000000).toFixed(2) + ' M';
    } else if (marketCap >= 1000) {
        // thousands
        formattedNum = (marketCap / 1000).toFixed(2) + ' K';
    } else {
        formattedNum = marketCap;
    }

    return formattedNum;
};

export const CoinListItem: React.FC<Props> = React.memo(({ item }) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { colors } = useTheme();

    let coinImage: string = item.image.replace('large', 'small');
    let marketCap: string | number = item.market_cap;
    let currPrice: string | number = item.current_price;

    let priceChange: number = item.price_change_percentage_24h;
    let priceChangeNeg: boolean = false;

    if (priceChange < 0) {
        priceChangeNeg = true;
        priceChange = Math.abs(priceChange);
    }

    if (marketCap > 0.01) {
        marketCap = largeNumFormatter(marketCap);
    }

    if (String(currPrice).includes('e')) {
        currPrice = String(currPrice).split('e')[0];
        currPrice = Number(currPrice);
    }

    if (currPrice > 0.01) {
        currPrice = Number(currPrice).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    } else {
        currPrice = Number(currPrice).toFixed(8);
    }

    const onPressCoinDetail = () => {
        navigation.navigate('CoinDetail', { coinId: item.id });
    };

    return (
        <TouchableOpacity style={styles.listItem} onPress={onPressCoinDetail}>
            <Text
                style={[
                    styles.coinNum,
                    styles.textSize,
                    { color: colors.flipText },
                ]}>
                {item.market_cap_rank}
            </Text>
            <View style={styles.imageNameCapContainer}>
                <Image
                    style={[styles.coinImage, { width: 25, height: 25 }]}
                    source={{ uri: coinImage }}
                />
                <View>
                    <Text
                        style={[
                            styles.coinSymbol,
                            styles.textSize,
                            { color: colors.flipText },
                        ]}>
                        {item.symbol.toUpperCase()}
                    </Text>
                    <Text
                        style={[styles.marketCap, { color: colors.flipText }]}>
                        {marketCap}
                    </Text>
                </View>
            </View>
            <View style={styles.currPriceContainer}>
                <Text
                    style={[
                        styles.currPrice,
                        styles.textSize,
                        { color: colors.flipText },
                    ]}>
                    ${currPrice}
                </Text>
            </View>
            <View style={styles.changeContainer}>
                <View
                    style={[
                        styles.changeSmallContainer,
                        {
                            backgroundColor: `${
                                priceChangeNeg ? '#FFCCCB' : '#90EE90'
                            }`,
                        },
                    ]}>
                    <Icon
                        style={{
                            color: `${priceChangeNeg ? '#8B0000' : '#013220'}`,
                        }}
                        name={priceChangeNeg ? 'chevron-down' : 'chevron-up'}
                        size={15}
                    />
                    <Text
                        style={[
                            styles.textSize,
                            {
                                color: `${
                                    priceChangeNeg ? '#8B0000' : '#013220'
                                }`,
                            },
                        ]}>
                        {priceChange.toFixed(2)}%
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
    },
    coinNum: {
        width: 44,
        minWidth: 44,
    },
    imageNameCapContainer: {
        flex: 2,
        minWidth: 92,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginHorizontal: '1%',
    },
    currPriceContainer: {
        flex: 3,
        minWidth: 108,
        marginHorizontal: '3%',
    },
    changeContainer: {
        width: 88,
        minWidth: 88,
    },
    changeSmallContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        paddingVertical: 6,
        paddingHorizontal: 4,
        borderRadius: 4,
    },
    coinImage: {
        marginRight: 4,
    },
    coinSymbol: {
        fontWeight: '600',
    },
    marketCap: {
        fontWeight: '300',
        //color: '#ccc',
    },
    currPrice: {
        alignSelf: 'flex-end',
        fontWeight: '500',
    },
    textSize: {
        fontSize: 16,
    },
});
