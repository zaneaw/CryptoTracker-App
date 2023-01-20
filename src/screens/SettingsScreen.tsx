import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';

import { ToggleTheme } from '../components';

export const SettingsScreen: React.FC = () => {
    const { colors } = useTheme();

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.navItemContainer]}>
                <Text style={{ color: colors.flipText }}>Option 1</Text>
            </View>

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
        position: 'relative',
        // margin: 8,
    },
    navItemContainer: {
        marginVertical: 8,
    },
    darkModeContainer: {
        width: '75%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 8,
        position: 'absolute',
        bottom: 60,
    },
    headerText: {
        fontSize: 24,
        position: 'relative',
    },
    header: {
        width: '100%',
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 6,
        marginBottom: 12,
    },
    footer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 2,
        position: 'absolute',
        bottom: 0,
    },
    closeButtonTop: {
        position: 'absolute',
        left: 10,
    },
    closeButtonBottom: {
        justifyContent: 'center',
        alignItems: 'center',
        //borderWidth: 2,
        borderRadius: 5,
        width: '100%',
        padding: 4,
    },
});
