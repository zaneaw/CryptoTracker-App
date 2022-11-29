import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

const largeNumFormatter = (marketCap) => {
    if (marketCap >= 1000000000000) { // trillion
        marketCap = (marketCap / 1000000000000).toFixed(2) + ' T';
    } else if (marketCap >= 1000000000) { // billion
        marketCap = (marketCap / 1000000000).toFixed(2) + ' B';
    } else if (marketCap >= 1000000) { // million
        marketCap = (marketCap / 1000000).toFixed(2) + ' M';
    } else if (marketCap >= 1000) { // thousands
        marketCap = (marketCap / 1000).toFixed(2) + ' K';
    } else {
        marketCap = marketCap;
    }

    return marketCap;
};

// onPress = open specific coin in single coin view
function CoinListItem({ item, index }) {
    let coinImage = item.image.replace('large', 'small');
    let marketCap = item.market_cap;
    let currPrice = item.current_price;

    let priceChange = item.price_change_percentage_24h;
    let priceChangeNeg = false;

    if (priceChange < 0) {
        priceChangeNeg = true;
        priceChange = Math.abs(priceChange);
    }

    if (marketCap > .01) {
        marketCap = largeNumFormatter(marketCap);
    };

    if (currPrice > 0.01) {
        currPrice = currPrice.toFixed(2).toLocaleString();
    };

    return (
        <TouchableOpacity style={styles.listItem}>
            <Text>{index + 1}</Text>
            <Image
                style={{ width: 25, height: 25 }}
                source={{ uri: coinImage }}
            />
            <View style={styles.nameCapContainer}>
                <Text style={{}}>{item.symbol.toUpperCase()}</Text>
                <Text>{marketCap}</Text>
            </View>
            <Text>${currPrice}</Text>
            {/* arrow down if -, arrow up if + */}
            <View
                style={[
                    styles.changeContainer,
                    {
                        backgroundColor: `${priceChangeNeg ? 'red' : 'green'}`,
                    },
                ]}>
                <Icon
                    name={priceChangeNeg ? 'chevron-down' : 'chevron-up'}
                    size={15}
                />
                <Text>{priceChange.toFixed(2)}%</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    changeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default React.memo(CoinListItem);