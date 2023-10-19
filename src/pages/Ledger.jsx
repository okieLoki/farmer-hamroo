import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, SafeAreaView } from 'react-native';
import { DataTable, Button } from 'react-native-paper';
import axios from 'axios';
import { formatDate, formatAmount, formatDateLedger } from '../utils/collectionFormatters';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Ledger = () => {
    const [ledgerData, setLedgerData] = useState([]);
    const [isPickerShow1, setIsPickerShow1] = useState(false);
    const [isPickerShow2, setIsPickerShow2] = useState(false);
    const [startDate, setStartDate] = useState(new Date(Date.now() - 60 * 24 * 60 * 60 * 1000));
    const [endDate, setEndDate] = useState(new Date());

    const showPicker1 = () => {
        setIsPickerShow1(true);
    };

    const showPicker2 = () => {
        setIsPickerShow2(true);
    };

    const onChangeStart = (event, selectedDate) => {
        setIsPickerShow1(false);
        if (selectedDate) {
            setStartDate(selectedDate);
        }
    };

    const onChangeEnd = (event, selectedDate) => {
        setIsPickerShow2(false);
        if (selectedDate) {
            setEndDate(selectedDate);
        }
    };

    const startDateString = formatDateLedger(startDate);
    const endDateString = formatDateLedger(endDate);

    useEffect(() => {

        console.log(`https://busy-top-coat-bear.cyclic.app/api/farmer/ledger?startDate=${formatDateLedger(startDate)}&endDate=${formatDateLedger(endDate)}`);

        axios
            .get(`https://busy-top-coat-bear.cyclic.app/api/farmer/ledger?startDate=${formatDateLedger(startDate)}&endDate=${formatDateLedger(endDate)}`)
            .then(response => {
                setLedgerData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [startDate, endDate]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>
                Ledgers
            </Text>

            <View style={styles.dateContainer}>
                <View style={styles.dateWrapper}>
                    <Text style={[styles.dateText, { fontSize: 16 }]}>From</Text>

                    {!isPickerShow1 && (

                        <View style={styles.btnContainer}>
                            <Button mode='text'
                                icon={() => {
                                    return <MaterialCommunityIcons name="calendar-today" size={22} color="green" />
                                }
                                }
                                onPress={showPicker1}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: 'green'
                                    }}
                                >{startDateString}</Text>
                            </Button>
                        </View>
                    )}

                    {isPickerShow1 && (
                        <DateTimePicker
                            value={startDate}
                            mode='date'
                            display='spinner'
                            is24Hour={true}
                            onChange={onChangeStart}
                            style={styles.datePicker}
                        />
                    )}

                    <Text style={[styles.dateText, { fontSize: 16 }]}>To</Text>

                    {!isPickerShow2 && (
                        <View style={styles.btnContainer}>
                            <Button mode='text'
                                icon={() => {
                                    return <MaterialCommunityIcons name="calendar-today" size={22} color="green" />
                                }
                                }
                                onPress={showPicker1}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: 'green'
                                    }}
                                >{endDateString}</Text>
                            </Button>
                        </View>
                    )}

                    {isPickerShow2 && (
                        <DateTimePicker
                            value={endDate}
                            mode='date'
                            display='spinner'
                            is24Hour={true}
                            onChange={onChangeEnd}
                            style={styles.datePicker}
                        />
                    )}
                </View>
            </View>

            <View>
                <DataTable style={styles.tableContainer}>
                    <DataTable.Header>
                        <DataTable.Title>
                            <Text style={styles.headerText}>Date</Text>
                        </DataTable.Title>
                        <DataTable.Title>
                            <Text style={styles.headerText}>Credit</Text>
                        </DataTable.Title>
                        <DataTable.Title>
                            <Text style={styles.headerText}>Debit</Text>
                        </DataTable.Title>
                        <DataTable.Title>
                            <Text style={styles.headerText}>Remarks</Text>
                        </DataTable.Title>
                    </DataTable.Header>

                    <ScrollView>
                        {ledgerData.map((entry, index) => (
                            <DataTable.Row key={index} style={index % 2 === 0 ? styles.dataRowEven : styles.dataRowOdd}>
                                <DataTable.Cell style={styles.cell}>{formatDate(entry.date)}</DataTable.Cell>
                                <DataTable.Cell style={styles.cell}>{formatAmount(entry.credit)}</DataTable.Cell>
                                <DataTable.Cell style={styles.cell}>{formatAmount(entry.debit)}</DataTable.Cell>
                                <DataTable.Cell style={styles.cell}>{entry.remarks}</DataTable.Cell>
                            </DataTable.Row>
                        ))}
                    </ScrollView>

                </DataTable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#e6fce6',
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    dateContainer: {
        marginBottom: 16,
        backgroundColor: '#edfaed',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#c4f0c2',
    },
    dateText: {
        fontSize: 16,
    },
    dateWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    datePicker: {
        flex: 1,
    },
    tableContainer: {
        backgroundColor: '#fff',
    },
    dataRowOdd: {
        backgroundColor: '#f7faf7',
    },
    dataRowEven: {
        backgroundColor: '#e6fce6',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#000',
    },
    cell: {
        flex: 1,
    },
});

export { Ledger };
