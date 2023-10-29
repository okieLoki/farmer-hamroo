import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { DataTable, Button } from 'react-native-paper';
import axios from 'axios';
import { formatDate, formatAmount, formatDateLedger } from '../utils/collectionFormatters';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../styles/LedgerStyles';

const Ledger = () => {
    const [ledgerData, setLedgerData] = useState([]);
    const [isPickerShow1, setIsPickerShow1] = useState(false);
    const [isPickerShow2, setIsPickerShow2] = useState(false);
    const [startDate, setStartDate] = useState(new Date(Date.now() - 60 * 24 * 60 * 60 * 1000));
    const [endDate, setEndDate] = useState(new Date());
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);

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

        const fetchData = async () => {
            setLoading(true);
            const response = await axios.get(`https://busy-top-coat-bear.cyclic.app/api/farmer/ledger?startDate=${formatDateLedger(startDate)}&endDate=${formatDateLedger(endDate)}`);
            setLedgerData(response.data.ledger);
            setBalance(response.data.balance);
            setLoading(false);
        }

        fetchData();

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

            {
                loading ? (
                    <ActivityIndicator size="large" color="green" />
                ) : (

                    <View>
                        {
                            ledgerData.length === 0 ? (
                                <Text style={styles.noData}>No data found</Text>
                            ) : (
                                <View>
                                    <View style={styles.balanceContainer}>
                                        <Text
                                            style={styles.balanceText}
                                        >BALANCE: {balance}</Text>
                                    </View>
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
                            )
                        }

                    </View>
                )
            }

        </SafeAreaView>
    );
};



export { Ledger };
