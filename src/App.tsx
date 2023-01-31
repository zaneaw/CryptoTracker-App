import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider } from '../theme/ThemeProvider';
import { HomeScreen, CoinDetailScreen, SettingsScreen } from './screens';
import { Stack } from './routes';
import { HeaderRight } from './components/reusable-components';

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
