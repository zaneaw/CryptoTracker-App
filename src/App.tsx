import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Stack } from '@navigation/routes';
import { ThemeProvider } from '@theme';
import { CoinListScreen, CoinDetailScreen, SettingsScreen } from '@screens';
import { HeaderRight } from '@components';

export const App = () => {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="CoinList"
                    screenOptions={{
                        headerTitleStyle: { color: '#2D3142' },
                    }}>
                    <Stack.Screen
                        name="CoinList"
                        component={CoinListScreen}
                        options={({ navigation }) => ({
                            title: 'Crypto Tracker',
                            headerRight: () => <HeaderRight />,
                        })}
                    />
                    <Stack.Screen
                        name="CoinDetail"
                        component={CoinDetailScreen}
                        options={({ route, navigation }) => ({
                            title: route.params.coinId.toUpperCase(),
                            headerRight: () => <HeaderRight />,
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
