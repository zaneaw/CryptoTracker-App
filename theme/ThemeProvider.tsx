import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors } from './colorThemes';

type ThemeContextType = {
    isDark: boolean;
    colors: any;
    setScheme: (scheme: string) => any;
};

export const ThemeContext = createContext<ThemeContextType>({
    isDark: false,
    colors: lightColors,
    setScheme: () => {},
});

export const ThemeProvider: React.FC<React.PropsWithChildren> = props => {
    const colorScheme = useColorScheme();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(colorScheme === 'dark');
    }, [colorScheme]);

    const defaultTheme = {
        isDark,
        colors: isDark ? darkColors : lightColors,
        setScheme: (scheme: string) => setIsDark(scheme === 'dark'),
    };

    return (
        <ThemeContext.Provider value={defaultTheme}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
