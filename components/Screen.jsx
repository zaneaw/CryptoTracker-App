import React from 'react';
import { View, StatusBar } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export default Screen = props => {
    const { children } = props;
    const { colors, isDark } = useTheme();

    const containerStyle = {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    };

    const statusBarStyle = {
        backgroundColor: colors.primary
    }

    return (
        <>
            <StatusBar animated backgroundColor={colors.background} barStyle={isDark ? 'light-content' : 'dark-content'} />
            <View style={containerStyle}>
                {children}
            </View>
        </>
    );
};
