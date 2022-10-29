import * as React from 'react';
import { Switch } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export default Toggle = () => {
    const { setScheme, isDark } = useTheme();

    const toggleScheme = () => {
        isDark ? setScheme('light') : setScheme('dark');
    };

    const switchStyle = {
        color: 'red',
    }

    return <Switch style={{marginTop: 'auto'}} value={isDark} onValueChange={toggleScheme} />;
};
