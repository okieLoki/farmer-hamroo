import React from 'react';
import { Text, FlatList } from 'react-native';
import { DataTable } from 'react-native-paper';
import { formatDate, EM } from '../utils/collectionFormatters';
import { tableStyles } from '../styles/TableStyles';

const CollectionTable = ({ collections }) => {

    if (collections.length === 0) {
        return <Text style={tableStyles.noData}>No Data Found</Text>;
    }

    return (
        <DataTable style={{ marginBottom: 16 }}>
            <DataTable.Header style={{ backgroundColor: '#fff' }}>
                <DataTable.Title style={{ flex: 1.5 }}>
                    <Text style={tableStyles.headerText}>Date</Text>
                </DataTable.Title>
                <DataTable.Title style={{ flex: 1 }}>
                    <Text style={tableStyles.headerText}>Shift</Text>
                </DataTable.Title>
                <DataTable.Title style={{ flex: 1 }}>
                    <Text style={tableStyles.headerText}>Qty</Text>
                </DataTable.Title>
                <DataTable.Title style={{ flex: 1 }}>
                    <Text style={tableStyles.headerText}>Fat</Text>
                </DataTable.Title>
                <DataTable.Title style={{ flex: 1 }}>
                    <Text style={tableStyles.headerText}>SNF</Text>
                </DataTable.Title>
                <DataTable.Title style={{ flex: 1 }}>
                    <Text style={tableStyles.headerText}>Rate</Text>
                </DataTable.Title>
                <DataTable.Title style={{ flex: 1 }}>
                    <Text style={tableStyles.headerText}>Amt</Text>
                </DataTable.Title>
            </DataTable.Header>
            <FlatList
                data={collections}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                    <DataTable.Row
                        key={item._id}
                        style={index % 2 === 0 ? tableStyles.dataRowEven : tableStyles.dataRowOdd}
                    >
                        <DataTable.Cell style={{ flex: 1.5 }}>{formatDate(item.collectionDate)}</DataTable.Cell>
                        <DataTable.Cell style={{ flex: 1 }}>{EM(item.shift)}</DataTable.Cell>
                        <DataTable.Cell style={{ flex: 1 }}>{item.qty}</DataTable.Cell>
                        <DataTable.Cell style={{ flex: 1 }}>{item.fat}</DataTable.Cell>
                        <DataTable.Cell style={{ flex: 1 }}>{item.snf}</DataTable.Cell>
                        <DataTable.Cell style={{ flex: 1 }}>{item.rate}</DataTable.Cell>
                        <DataTable.Cell style={{ flex: 1 }}>{item.amount}</DataTable.Cell>
                    </DataTable.Row>
                )}
            />
        </DataTable>
    );
};

export default CollectionTable;
