import { View, StyleSheet, } from 'react-native';
import CoinList from './CoinList';

function Body() {

    return (
        <View style={styles.container}>
            <CoinList />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    changeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Body;