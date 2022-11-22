import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, Easing, withTiming } from 'react-native-reanimated';
import { useTheme } from '../theme/ThemeProvider';
import SideNav from './SideNav';

import Header from './Header';
import Body from './Body';

export default function Main() {
    const { colors } = useTheme();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const translateVal = useSharedValue(-325);

    const animatedTranslate = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: withTiming(translateVal.value, {
                duration: 250,
                easing: Easing.in
            }) }],
        };
    });

    const clickNav = () => {
        if (isNavOpen) {
            translateVal.value = -325;
            setTimeout(() => setIsNavOpen(!isNavOpen), 250);
        } else {
            translateVal.value = 0;
            setIsNavOpen(!isNavOpen);
        }  
    };

    return (
        <View style={styles.container}>
            <Header clickNav={clickNav} />
            {isNavOpen && (
                <Animated.View
                    style={[
                        styles.sideNav,
                        animatedTranslate,
                        {
                            backgroundColor: colors.secondary,
                            borderColor: colors.primary,
                        },
                    ]}>
                    <SideNav clickNav={clickNav} />
                </Animated.View>
            )}
            <View style={[styles.body, { backgroundColor: colors.secondary }]}>
                <Body />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        position: 'relative',
    },
    body: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    sideNav: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        width: '75%',
        height: '100%',
        borderRightWidth: 2,
        borderLeftWidth: 2,
    },
});
