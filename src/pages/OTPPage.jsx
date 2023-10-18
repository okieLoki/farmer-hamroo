import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    SafeAreaView,
    StyleSheet,
    Image
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { useToast } from "react-native-toast-notifications";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { CommonActions } from '@react-navigation/native';

const OTPPage = ({setAuthenticated}) => {
    // hooks
    const navigation = useNavigation();
    const route = useRoute();
    const toast = useToast();
    const [otp, setOTP] = useState(['', '', '', '']);
    const otpInputRefs = [useRef(), useRef(), useRef(), useRef()];

    // hide the header
    React.useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    // states
    const [loading, setLoading] = useState(false);

    // route params
    const phoneNumber = route.params.phoneNumber;

    // functions
    const handleOtpInputChange = (index, value) => {
        if (/^\d*$/.test(value) && value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOTP(newOtp);
            if (index < 3 && value.length > 0) {
                otpInputRefs[index + 1].current.focus();
            }
        }
    };

    const handleBackspace = (index) => {
        if (index > 0 && !otp[index]) {
            otpInputRefs[index - 1].current.focus();
        }
    };

    const verifyOTP = async () => {
        setLoading(true);
        const finalOTP = otp.join('');

        const response = await axios.patch(
            'https://busy-top-coat-bear.cyclic.app/api/farmer/otp/verify',
            { otp: finalOTP }
        )

        if(response.status === 200) {

            console.log(response.data);
            setLoading(false);

            const farmerData = response.data.farmer;

            await SecureStore.setItemAsync('authenticated', 'true');
            await SecureStore.setItemAsync('farmerData', JSON.stringify(farmerData));

            setAuthenticated(true);

            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: 'HomePage' }
                    ],
                })
            );
        } else {
            setLoading(false);
            toast.show('Invalid OTP', {
                type: 'normal',
                placement: 'top',
                duration: 3000,
                animationType: 'slide-in'
            })
        }

    };

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.upperContainer}>

                <View style={styles.otpLogo}>
                    <Image
                        source={require('../../assets/otp.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                <Text style={styles.header}>
                    Verification
                </Text>

                <Text style={styles.otpText}>

                    We have sent an One Time Password (OTP) to your mobile number {phoneNumber}.
                </Text>

            </View>

            <View style={styles.lowerContainer}>
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={styles.otpInput}
                            value={digit}
                            onChangeText={(value) => handleOtpInputChange(index, value)}
                            onKeyPress={({ nativeEvent }) => {
                                if (nativeEvent.key === 'Backspace') {
                                    handleBackspace(index);
                                } else if (/^\d$/.test(nativeEvent.key)) {
                                    handleOtpInputChange(index, nativeEvent.key);
                                }
                            }}
                            keyboardType='numeric'
                            ref={otpInputRefs[index]}
                            maxLength={1}
                        />
                    ))}
                </View>
                <Button 
                style={styles.button} 
                onPress={verifyOTP}
                loading={loading}
                >
                    <Text style={styles.buttonText}>VERIFY</Text>
                </Button>
            </View>

        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    otpLogo: {
        backgroundColor: '#ECEDEC',
        borderRadius: 60,
        padding: 20,
        margin: 10
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#515151'
    },
    upperContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        gap: 12
    },
    lowerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        backgroundColor: '#f5f5f5',
    },
    otpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    otpInput: {
        width: 60,
        height: 60,
        borderWidth: 1,
        textAlign: 'center',
        marginRight: 10,
        fontSize: 16,
        borderRadius: 4,
        borderColor: '#ccc',
    },
    otpText: {
        fontSize: 15,
        marginBottom: 10,
        color: '#8E8E8F',
        textAlign: 'center',
        marginHorizontal: 20,
    },
    button: {
        marginBottom: 10,
        width: '100%',
        backgroundColor: '#3bac64',
    },
    buttonText: {
        color: '#fff',
    },
});


export { OTPPage };
