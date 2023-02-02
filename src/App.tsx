import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider } from '../theme/ThemeProvider';
import { CoinListScreen, CoinDetailScreen, SettingsScreen } from './screens';
import { Stack } from './routes';
import { HeaderRight } from './components/reusables';

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
