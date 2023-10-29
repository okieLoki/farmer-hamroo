import { StyleSheet } from "react-native";

export const tableStyles = StyleSheet.create({
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
    noData: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 16,
    }
});