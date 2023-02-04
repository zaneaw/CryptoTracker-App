import React from 'react';
import { Switch } from 'react-native';

import { useTheme } from '@theme/.';

export const ToggleTheme: React.FC = () => {
    const { setScheme, isDark } = useTheme();

    const toggleScheme = () => {
        isDark ? setScheme('light') : setScheme('dark');
    };

    return (
        <Switch
            style={{ marginTop: 'auto' }}
            value={isDark}
            onValueChange={toggleScheme}
        />
    );
};
