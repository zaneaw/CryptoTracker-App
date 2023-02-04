import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';

import { RootStackParamList } from '@navigation/routes';

export const HeaderRight: React.FC = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const onPressSettings = () => {
        navigation.navigate('Settings');
    };

    return (
        <TouchableOpacity onPress={onPressSettings}>
            <Icon
                name="settings"
                size={20}
                color="#2D3142"
                style={{ padding: 4 }}
            />
        </TouchableOpacity>
    );
};
