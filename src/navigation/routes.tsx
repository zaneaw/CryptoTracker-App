import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
    CoinList: undefined;
    Settings: undefined;
    CoinDetail: {
        coinId: string;
    };
};

export const Stack = createNativeStackNavigator<RootStackParamList>();
