import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '../../../theme/ThemeProvider';

import { usePriceFormatter, useLargeNumFormatter } from '../../Hooks';
import { CoinValidator } from '../../Validators/CoinValidator';
import { RootStackParamList } from '../../routes';
import { PriceChangePercentageDisplay } from '../reusable-components';

type Props = {
    item: CoinValidator;
};

export const CoinListItem: React.FC<Props> = React.memo(({ item }) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { colors } = useTheme();
    const coinCurrentPrice = usePriceFormatter(item.current_price);

    // let coinImage: string = item.image.replace('large', 'small');
    let marketCap: string | number = item.market_cap;
    // let currPrice: string | number = item.current_price;

    if (marketCap > 0.01) {
        marketCap = useLargeNumFormatter(marketCap);
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
                    source={{ uri: item.image }}
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
                    ${coinCurrentPrice}
                </Text>
            </View>
            <View style={styles.changeContainer}>
                <PriceChangePercentageDisplay priceChangeAmount={item.price_change_percentage_24h} />
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
