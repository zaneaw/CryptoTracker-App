import React from 'react';
import { ThemeProvider } from './theme/ThemeProvider';
import Screen from './components/Screen';
import Main from './components/Main';

const App = () => {
    return (
        <ThemeProvider>
            <Screen>
                <Main />
            </Screen>
        </ThemeProvider>
    );
};

export default App;
