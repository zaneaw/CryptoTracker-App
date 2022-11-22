import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '../theme/ThemeProvider';
import Icon from 'react-native-vector-icons/Feather';

import Toggle from './Toggle';

export default function SideNav({ clickNav }) {
    const { colors } = useTheme();
    

    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>

            <View style={[styles.header, {backgroundColor: colors.primary}]}>
                <TouchableOpacity onPress={() => clickNav()} style={[styles.closeButtonTop, {borderColor: colors.header}]}>
                    <Icon name="x" size ={30} color={colors.header} />
                </TouchableOpacity>
                <Text style={[styles.headerText, {color: colors.header}]}>SideNav</Text>
            </View>
            
            <View style={[styles.navItemContainer]}>
                <Text style={{color: colors.flipText}}>Option 1</Text>
            </View>

            <View style={[styles.darkModeContainer]}>
                <Text style={{color: colors.flipText}}>Dark Mode:</Text>
                <Toggle />
            </View>

            <View style={[styles.footer, {backgroundColor: colors.primary}]}>
                <TouchableOpacity onPress={() => clickNav()} style={[styles.closeButtonBottom, {borderColor: colors.header}]}>
                    <Icon name="x" size ={30} color={colors.header} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

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
})
