import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store';

const Profile = ({ setAuthenticated }) => {

    const navigation = useNavigation()

    const logout = async () => {
        await SecureStore.deleteItemAsync('authenticated');
        setAuthenticated(false);

        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginPage' }],
        });
    };

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>

            <TouchableOpacity onPress={()=>logout()}>
                <Text>Logout</Text>
            </TouchableOpacity>


        </View>
    )
}

export { Profile }