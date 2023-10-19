import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, SafeAreaView } from 'react-native';
import { DataTable } from 'react-native-paper';
import axios from 'axios';
import { formatDate, formatAmount } from '../utils/collectionFormatters';

const Ledger = () => {
    const [ledgerData, setLedgerData] = useState([]);

    useEffect(() => {
        axios
            .get('https://busy-top-coat-bear.cyclic.app/api/farmer/ledger?startDate=01-01-2004&endDate=01-01-2024')
            .then(response => {
                setLedgerData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>
                Ledgers
            </Text>

            <ScrollView>
                <DataTable style={styles.tableContainer}>
                    <DataTable.Header>
                        <DataTable.Title>
                            <Text style={styles.headerText}>Date</Text>
                        </DataTable.Title>
                        <DataTable.Title>
                            <Text style={styles.headerText}>Credit</Text>
                        </DataTable.Title>
                        <DataTable.Title >
                            <Text style={styles.headerText}>Debit</Text>
                        </DataTable.Title>
                        <DataTable.Title >
                            <Text style={styles.headerText}>Remarks</Text>
                        </DataTable.Title>
                    </DataTable.Header>

                    {ledgerData.map((entry, index) => (
                        <DataTable.Row key={index} style={index % 2 === 0 ? styles.dataRowEven : styles.dataRowOdd}>
                            <DataTable.Cell style={styles.cell}>{formatDate(entry.date)}</DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>{formatAmount(entry.credit)}</DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>{formatAmount(entry.debit)}</DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>{entry.remarks}</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#e6fce6',
    },
    heading:{
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 16,
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
