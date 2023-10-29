import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dcf2e5',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer: {
        flex: 1.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 390,
        height: 380,
    },
    formContainer: {
        flex: 0.6,
        width: '100%',
        padding: 20,
        backgroundColor: '#edf7f1',
        justifyContent: 'center',
    },
    input: {
        marginBottom: 20,
        backgroundColor: '#f2fcf7',
    },
    submitButton: {
        backgroundColor: '#3bac64',
        borderRadius: 40,
        padding: 5,
    },
});