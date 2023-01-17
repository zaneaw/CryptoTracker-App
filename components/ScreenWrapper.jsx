import React, { useEffect } from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Main from './Main';

export default Screen = () => {
    const { colors, isDark } = useTheme();

    return (
        <>
            {Platform.OS === 'android' ? (
                <StatusBar
                    animated
                    backgroundColor={colors.background}
                    barStyle={isDark ? 'light-content' : 'dark-content'}
                />
            ) : (
                ''
            )}
            <SafeAreaView
                style={[
                    styles.container,
                    { backgroundColor: colors.background },
                ]}>
                <Main />
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});