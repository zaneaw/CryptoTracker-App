import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

import { useTheme } from '@theme/.';
import { ToggleTheme } from '@components';

export const SettingsScreen: React.FC = () => {
    const { colors } = useTheme();

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.darkModeContainer]}>
                <Text style={{ color: colors.flipText }}>Dark Mode:</Text>
                <ToggleTheme />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // margin: 8,
    },
    darkModeContainer: {
        width: '75%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 20,
    },
});
