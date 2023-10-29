import React, { useState } from 'react';
import { View, SafeAreaView, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';
import { useToast } from "react-native-toast-notifications";
import { styles } from '../styles/LoginStyles';
import axios from 'axios';

const LoginPage = () => {

    // hooks
    const navigation = useNavigation();
    const toast = useToast();

    // Hide the header
    React.useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    // state management
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);

    // functions
    const handleSubmit = async () => {

        setLoading(true);

        if (phoneNumber.length !== 10) {
            toast.show('Please enter a valid phone number', {
                type: 'normal',
                placement: 'top',
                duration: 3000,
                animationType: 'slide-in'
            })
            return
        }

        try {
            const response = await axios.post(
                'https://busy-top-coat-bear.cyclic.app/api/farmer/otp',
                { mobileNumber: phoneNumber }
            )

            if(response.status !== 200) throw new Error('Something went wrong');

            else {
                setLoading(false);
                toast.show('OTP sent successfully', {
                    type: 'normal',
                    placement: 'top',
                    duration: 3000,
                    animationType: 'slide-in'
                })

                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

                navigation.navigate('OTPPage', {
                    phoneNumber
                });
            }
        } catch (error) {
            setLoading(false);
            toast.show('Something went wrong', {
                type: 'normal',
                placement: 'top',
                duration: 3000,
                animationType: 'slide-in'
            })
            return
        }

    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/appLogo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    label="Phone Number"
                    mode="outlined"
                    underlineColor='#3bac64'
                    activeUnderlineColor='#3bac64'
                    outlineColor='#3bac64'
                    activeOutlineColor='#3bac64'
                    style={styles.input}
                    keyboardType="numeric"
                    value={phoneNumber}
                    onChangeText={text => setPhoneNumber(text)}
                />
                <Button
                    mode="contained"
                    style={styles.submitButton}
                    onPress={handleSubmit}
                    loading={loading}
                >
                    GET OTP
                </Button>
            </View>
        </SafeAreaView>
    );
};


export { LoginPage };
