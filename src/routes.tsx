import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Home: undefined;
    Settings: undefined;
    CoinDetail: {
        coinId: string;
    };
};

export const Stack = createNativeStackNavigator<RootStackParamList>();
