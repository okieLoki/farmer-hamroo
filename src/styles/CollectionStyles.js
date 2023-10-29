import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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