import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
    coinId: string;
};

export const MarketDataSection: React.FC<Props> = ({ coinId }) => {
    return (
        <View>
            <Text>{coinId}</Text>
        </View>
    );
};

const styles = StyleSheet.create({});
