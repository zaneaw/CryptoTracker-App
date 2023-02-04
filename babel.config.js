module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        // ['react-native-reanimated/plugin'],
        [
            'module-resolver',
            {
                root: ['./src'],
                extensions: [
                    '.ios.js',
                    '.android.js',
                    '.js',
                    '.ts',
                    '.tsx',
                    '.json',
                ],
                alias: {
                    '@assets': './src/assets',
                    '@components': './src/components',
                    '@hooks': './src/hooks',
                    '@navigation': './src/navigation',
                    '@screens': './src/screens',
                    '@theme': './src/theme',
                    '@utils': './src/utils',
                    '@validators': './src/validators',

                },
            },
        ],
    ],
};
