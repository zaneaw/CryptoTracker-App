import { View, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';

import { useTheme } from '../../theme/ThemeProvider';
import { CoinList } from '../components';

export const CoinListScreen = () => {
    const { colors } = useTheme();

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.body, { backgroundColor: colors.background }]}>
                <CoinList />
            </View>
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
});
