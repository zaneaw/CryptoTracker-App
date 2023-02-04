import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// import { priceChangeOptions } from '@utils/.';
import { priceChangeOptions } from '@utils/.';

type Props = {
    priceChangeAmount: number;
};

export const PriceChangePercentageDisplay: React.FC<Props> = ({
    priceChangeAmount,
}) => {
    const [priceChangePercentage, priceChangeNegBool] =
        priceChangeOptions(priceChangeAmount);

    return (
        <View
            style={[
                styles.changeSmallContainer,
                {
                    backgroundColor: `${
                        priceChangeNegBool ? '#FFCCCB' : '#90EE90'
                    }`,
                },
            ]}>
            <Icon
                style={{
                    color: `${priceChangeNegBool ? '#8B0000' : '#013220'}`,
                }}
                name={priceChangeNegBool ? 'chevron-down' : 'chevron-up'}
                size={15}
            />
            <Text
                style={[
                    styles.textSize,
                    {
                        color: `${priceChangeNegBool ? '#8B0000' : '#013220'}`,
                    },
                ]}>
                {priceChangePercentage}%
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    changeSmallContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        paddingVertical: 6,
        paddingHorizontal: 4,
        borderRadius: 4,
    },
    textSize: {
        fontSize: 16,
    },
});
