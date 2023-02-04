import React, {
    useEffect,
    useState,
    useCallback,
    Dispatch,
    SetStateAction,
} from 'react';
import { View } from 'react-native';

import { Graph } from './Graph';
import { DaysSelector } from './DaysSelector';

type Props = {
    coinId: string;
    priceChange: number;
};

export const GraphSection: React.FC<Props> = ({
    coinId,
    priceChange,
}) => {
    const [amountOfDays, setAmountOfDays] = useState<string>('1');
    const [graphLabels, setGraphLabels] = useState<string[]>([]);
    const [graphPoints, setGraphPoints] = useState<number[]>([]);

    const onPressDays = useCallback(
        (apiParam: string): void | Dispatch<SetStateAction<string>> => {
            if (amountOfDays === apiParam) {
                return;
            }

            setAmountOfDays(apiParam);
        },
        [],
    );

    const getCoinGraphData = () => {
        fetch(
            `https://zanes-crypto-tracker-server.cyclic.app/api/get-single-coin-ohlc/${coinId}?` +
                new URLSearchParams({
                    days: amountOfDays,
                }),
        )
            .then(res => res.json())
            .then(json => cleanGraphData(json))
            .catch(err => console.error(err));
    };

    const cleanGraphData = (json: number[][]) => {
        let currTimestamps = [];
        let currPointsOpen = [];

        for (let i = 0; i < json.length; i++) {
            if (Math.floor(json.length / 4) % i === 0) {
                let date = new Date(json[i][0]);
                let hours = date.getHours();
                let minutes = '0' + date.getMinutes();
                let dateStr = `${hours}:${minutes.substr(-2)}`;
                currTimestamps.push(dateStr);
            }
            currPointsOpen.push(json[i][1]);
            // graphPointsClose.push(json[i][4]);
        }

        setGraphLabels(currTimestamps);
        setGraphPoints(currPointsOpen);
    };

    useEffect(() => {
        getCoinGraphData();
    }, [amountOfDays]);

    return (
        <View style={{ marginVertical: 24 }}>
            <DaysSelector
                amountOfDays={amountOfDays}
                onPressDays={onPressDays}
            />
            <Graph
                graphLabels={graphLabels}
                graphPoints={graphPoints}
                priceChange={priceChange}
            />
        </View>
    );
};

// const styles = StyleSheet.create({});
