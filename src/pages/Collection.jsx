import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { DataTable } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { formatDate, EM } from '../utils/collectionFormatters';

const Collection = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('All');
    const [isLoading, setIsLoading] = useState(true);

    const [collectionsAll, setCollectionsAll] = useState([]);
    const [collectionsDaily, setCollectionsDaily] = useState([]);
    const [collectionsWeekly, setCollectionsWeekly] = useState([]);
    const [collectionsMonthly, setCollectionsMonthly] = useState([]);

    const handleAsyncOperation = async (operation, period) => {
        try {
            const res = await operation();
            const { collections } = res.data;
            switch (period) {
                case 'All':
                    setCollectionsAll(collections);
                    break;
                case 'Daily':
                    setCollectionsDaily(collections);
                    break;
                case 'Weekly':
                    setCollectionsWeekly(collections);
                    break;
                case 'Monthly':
                    setCollectionsMonthly(collections);
                    break;
                default:
                    break;
            }
            await AsyncStorage.setItem(`collections_${period}`, JSON.stringify(collections));
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadCollectionsFromStorage = async (period) => {
        try {
            const storedCollections = await AsyncStorage.getItem(`collections_${period}`);
            if (storedCollections) {
                switch (period) {
                    case 'All':
                        setCollectionsAll(JSON.parse(storedCollections));
                        break;
                    case 'Daily':
                        setCollectionsDaily(JSON.parse(storedCollections));
                        break;
                    case 'Weekly':
                        setCollectionsWeekly(JSON.parse(storedCollections));
                        break;
                    case 'Monthly':
                        setCollectionsMonthly(JSON.parse(storedCollections));
                        break;
                    default:
                        break;
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePeriodChange = (period) => {
        setSelectedPeriod(period);
        setIsLoading(true);
    };

    const getCollections = (period) => {
        switch (period) {
            case 'All':
                return collectionsAll;
            case 'Daily':
                return collectionsDaily;
            case 'Weekly':
                return collectionsWeekly;
            case 'Monthly':
                return collectionsMonthly;
            default:
                return [];
        }
    };

    useEffect(() => {
        loadCollectionsFromStorage(selectedPeriod);
        handleAsyncOperation(() =>
            axios.get(`https://busy-top-coat-bear.cyclic.app/api/farmer/collections?period=${selectedPeriod.toLowerCase()}`),
            selectedPeriod
        );
    }, [selectedPeriod]);

    return (
        <View style={styles.container}>
            <View style={styles.periodOptions}>
                <Text style={styles.heading}>Collections</Text>
                <View style={styles.segmentedButtonGroup}>
                    {['All', 'Daily', 'Weekly', 'Monthly'].map((period) => (
                        <TouchableOpacity
                            key={period}
                            onPress={() => handlePeriodChange(period)}
                            style={[
                                styles.segmentedButton,
                                selectedPeriod === period ? styles.selectedSegment : styles.unselectedSegment,
                            ]}
                        >
                            <Text style={styles.segmentButtonText}>{period}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <View>
                    {getCollections(selectedPeriod).length === 0 ? (
                        <Text style={styles.noData}>No data found</Text>
                    ) : (
                        <DataTable style={tableStyles.tableContainer}>
                            <DataTable.Header>
                                <DataTable.Title style={{ flex: 1.5 }}>
                                    <Text style={tableStyles.headerText}>
                                        Date
                                    </Text>
                                </DataTable.Title>
                                <DataTable.Title style={{ flex: 1 }}>
                                    <Text style={tableStyles.headerText}>
                                        Shift
                                    </Text>
                                </DataTable.Title>
                                <DataTable.Title style={{ flex: 1 }}>
                                    <Text style={tableStyles.headerText}>
                                        Qty
                                    </Text>
                                </DataTable.Title>
                                <DataTable.Title style={{ flex: 1 }}>
                                    <Text style={tableStyles.headerText}>
                                        Fat
                                    </Text>
                                </DataTable.Title>
                                <DataTable.Title style={{ flex: 1 }}>
                                    <Text style={tableStyles.headerText}>
                                        SNF
                                    </Text>
                                </DataTable.Title>
                                <DataTable.Title style={{ flex: 1 }}>
                                    <Text style={tableStyles.headerText}>
                                        Rate
                                    </Text>
                                </DataTable.Title>
                                <DataTable.Title style={{ flex: 1 }}>
                                    <Text style={tableStyles.headerText}>
                                        Amt
                                    </Text>
                                </DataTable.Title>
                            </DataTable.Header>

                            <ScrollView>
                                {getCollections(selectedPeriod).map((collection, index) => (
                                    <DataTable.Row key={collection._id} style={index % 2 === 0 ? tableStyles.dataRowEven : tableStyles.dataRowOdd}>
                                        <DataTable.Cell style={{ flex: 1.5 }}>{formatDate(collection.collectionDate)}</DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 1 }}>{EM(collection.shift)}</DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 1 }}>{collection.qty}</DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 1 }}>{collection.fat}</DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 1 }}>{collection.snf}</DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 1 }}>{collection.rate}</DataTable.Cell>
                                        <DataTable.Cell style={{ flex: 1 }}>{collection.amount}</DataTable.Cell>
                                    </DataTable.Row>
                                ))}
                            </ScrollView>
                        </DataTable>
                    )}
                </View>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#e6fce6',
    },
    periodOptions: {
        marginBottom: 16,
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    radioButtonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    radioButton: {
        flex: 1,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noData: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 16,
    },
    segmentedButtonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    segmentedButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    selectedSegment: {
        backgroundColor: '#b8fcb8',
    },
    unselectedSegment: {
        backgroundColor: '#f7faf7',
    },
    segmentButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

const tableStyles = StyleSheet.create({
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
});

export { Collection };
