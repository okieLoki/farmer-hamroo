import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    balanceContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16,
        backgroundColor: '#edfaed',
        borderColor: '#c4f0c2',
        borderWidth: 1,
        padding: 10
    },
    balanceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green'
    }
});