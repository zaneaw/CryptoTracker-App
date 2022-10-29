import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import Icon from 'react-native-vector-icons/Feather';

export default function Hero() {
    const { colors } = useTheme();

    return (
        // <View style={[styles.container, {backgroundColor: colors.primary}]}>
        <View style={styles.container}>
            <Text style={[styles.title, {color: colors.header}]}>Cracker</Text>
            <TouchableOpacity onPress={() => console.log('pressed')}>
                <Icon name="user" size={30} color={colors.header} />
            </TouchableOpacity>
            {/* <Image source={require('../assets/icons/cryptoIcon.png')} style={styles.image}/> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Roboto-MediumItalic',
    },
    // image: {
    //     resizeMode: 'contain',
    //     width: 40,
    // },
})
