import { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors } from './colorThemes';

export const ThemeContext = createContext({
    isDark: false,
    colors: lightColors,
    setScheme: () => {},
});

export const ThemeProvider = props => {
    const colorScheme = useColorScheme();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(colorScheme === 'dark');
    }, [colorScheme]);

    const defaultTheme = {
        isDark,
        colors: isDark ? darkColors : lightColors,
        setScheme: scheme => setIsDark(scheme === 'dark'),
    };

    return (
        <ThemeContext.Provider value={defaultTheme}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
