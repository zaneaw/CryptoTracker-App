import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export default Screen = props => {
    const { children } = props;
    const { colors, isDark } = useTheme();

    return (
        <>
            <StatusBar animated backgroundColor={colors.background} barStyle={isDark ? 'light-content' : 'dark-content'} />
            <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
                {children}
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