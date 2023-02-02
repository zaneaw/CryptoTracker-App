import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';

import { useTheme } from '../../../theme/ThemeProvider';

type Props = {
    amountOfDays: string;
    onPressDays: (apiParam: string) => void | Dispatch<SetStateAction<string>>;
};

type ItemData = {
    id: string;
    days: string;
    apiParam: string;
};

const dayOptions: ItemData[] = [
    {
        days: '1',
        apiParam: '1',
        id: '1',
    },
    {
        days: '7',
        apiParam: '7',
        id: '2',
    },
    {
        days: '14',
        apiParam: '14',
        id: '3',
    },
    {
        days: '30',
        apiParam: '30',
        id: '4',
    },
    {
        days: '90',
        apiParam: '90',
        id: '5',
    },
    {
        days: '180',
        apiParam: '180',
        id: '6',
    },
    {
        days: '365',
        apiParam: '365',
        id: '7',
    },
    {
        days: 'All Time',
        apiParam: 'max',
        id: '8',
    },
];

export const CoinDetailDays: React.FC<Props> = ({
    amountOfDays,
    onPressDays,
}) => {
    const { colors } = useTheme();

    const DisplayDayOptions = dayOptions.map((day: ItemData) => {
        return (
            <TouchableOpacity
                key={day.id}
                onPress={() =>onPressDays(day.apiParam)}
                style={[
                    styles.daysItem,
                    {
                        backgroundColor: `${
                            amountOfDays === day.apiParam ? colors.text : 'transparent'
                        }`,
                    },
                ]}>
                <Text style={[styles.itemText, { color: colors.flipText }]}>
                    {day.days}
                </Text>
            </TouchableOpacity>
        );
    });

    return (
        <View style={[styles.container, { backgroundColor: colors.backgroundDark, borderColor: colors.secondary }]}>
            {DisplayDayOptions}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 12,
        marginBottom: 6,
        justifyContent: 'center',
        borderRadius: 10,
    },
    daysItem: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
        borderRadius: 8,
    },
    itemText: {},
});
