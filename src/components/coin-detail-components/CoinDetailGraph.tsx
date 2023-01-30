import { Dimensions, StyleSheet, View } from 'react-native';
import React from 'react';

import { LineChart } from 'react-native-chart-kit';

type Props = {
    coinGraphData: number[][];
};

export const CoinDetailGraph: React.FC<Props> = ({ coinGraphData }) => {
    let timestamps: string[] = [];
    let graphPointsOpen: number[] = [];
    let graphPointsClose: number[] = [];
    const dataLength = coinGraphData.length;
    const graphLabelMath = Math.floor(dataLength / 4);

    for (let i = 0; i < dataLength; i++) {
        if (graphLabelMath % i === 0) {
            let date = new Date(coinGraphData[i][0]);
            let hours = date.getHours();
            let minutes = "0" + date.getMinutes();
            let dateStr = `${hours}:${minutes.substr(-2)}`
            console.log(dateStr)
            timestamps.push(dateStr);
        }
        graphPointsOpen.push(coinGraphData[i][1]);
        graphPointsClose.push(coinGraphData[i][4]);
    }

    return (
        <View>
            <LineChart
                data={{
                    labels: timestamps,
                    datasets: [
                        {
                            data: graphPointsOpen,
                        },
                    ],
                }}
                width={Dimensions.get('window').width} // from react-native
                height={300}
                withDots={false}
                yAxisLabel="$"
                yAxisInterval={100} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                        `rgba(255, 255, 255, ${opacity})`,
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({});
