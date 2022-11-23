import React from 'react';
import { ThemeProvider } from './theme/ThemeProvider';
import Screen from './components/Screen';
import Main from './components/Main';

// fetch('https://zanes-crypto-tracker-server.cyclic.app/api')
//   .then(res => res.json())
//   .then(data => console.log(JSON.stringify(data)))
//   .catch(err => console.error(err));

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
