import { Dimensions, View } from 'react-native';
import React from 'react';
import { LineChart } from 'react-native-chart-kit';

import { usePriceFormatter } from '../../Hooks';

type Props = {
    graphLabels: string[];
    graphPoints: number[];
};

export const CoinDetailGraph: React.FC<Props> = ({
    graphLabels,
    graphPoints,
}) => {
    return (
        <View>
            <LineChart
                data={{
                    labels: graphLabels,
                    datasets: [
                        {
                            data: (graphPoints.length !== 0 ? graphPoints : [0, 0, 0, 0, 0, 0, 0, 0]),
                        },
                    ],
                }}
                width={Dimensions.get('window').width}
                height={300}
                withDots={false}
                withShadow={false}
                xAxisLabel=""
                yAxisLabel="$"
                yAxisInterval={1000} // setting high to avoid vertical lines from appearing
                chartConfig={{
                    backgroundColor: '#e26a00',
                    // backgroundGradientTo: '#ffa726',
                    // decimalPlaces: (graphPoints[graphPoints.length - 1] > 999 ? 0 : 2), // helps with space, not needed now?
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                        `rgba(255, 255, 255, ${opacity})`,
                }}
                formatYLabel={(yValue: string) => {
                    return usePriceFormatter(yValue, true);
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </View>
    );
};

// const styles = StyleSheet.create({});
