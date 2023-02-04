import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { priceFormatter } from '@utils';
import { useTheme } from '@theme/.';

type Props = {
    graphLabels: string[];
    graphPoints: number[];
    priceChange: number;
};

export const Graph: React.FC<Props> = ({
    graphLabels,
    graphPoints,
    priceChange,
}) => {
    const { colors, isDark } = useTheme();

    return (
        <>
            <LineChart
                data={{
                    labels: graphLabels,
                    datasets: [
                        {
                            data:
                                graphPoints.length !== 0
                                    ? graphPoints
                                    : [0, 0, 0, 0, 0, 0, 0, 0],
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
                    backgroundColor: colors.background,
                    backgroundGradientFromOpacity: 0,
                    backgroundGradientToOpacity: 0,
                    // decimalPlaces: (graphPoints[graphPoints.length - 1] > 999 ? 0 : 2), // helps with space, not needed now?
                    color: () =>
                        priceChange >= 0
                            ? isDark
                                ? '#90EE90'
                                : 'green'
                            : isDark
                            ? '#FFCCCB'
                            : 'red',
                    labelColor: () => colors.flipText,
                }}
                formatYLabel={(yValue: string) => {
                    return priceFormatter(yValue, true);
                }}
            />
        </>
    );
};
