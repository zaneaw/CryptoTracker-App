import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider } from '../theme/ThemeProvider';
import { HomeScreen, CoinDetailScreen, SettingsScreen } from './screens';
import { Stack } from './routes';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';

export const App = () => {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerTitleStyle: { color: '#2D3142' },
                    }}>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={({ navigation }) => ({
                            title: 'Crypto Tracker',
                            headerRight: () => (
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('Settings')
                                    }>
                                    <Icon
                                        name="settings"
                                        size={15}
                                        color="#2D3142"
                                    />
                                </TouchableOpacity>
                            ),
                        })}
                    />
                    <Stack.Screen
                        name="CoinDetail"
                        component={CoinDetailScreen}
                        options={({ route, navigation }) => ({
                            title: route.params.coinId.toUpperCase(),
                            headerRight: () => (
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('Settings')
                                    }>
                                    <Icon
                                        name="settings"
                                        size={15}
                                        color="#2D3142"
                                    />
                                </TouchableOpacity>
                            ),
                        })}
                    />
                    <Stack.Screen
                        name="Settings"
                        component={SettingsScreen}
                        options={({ navigation }) => ({
                            title: 'Settings',
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
};
