import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

const ProfileSelection = () => {
    const navigation = useNavigation();
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProfiles = async () => {
        try {
            const cachedProfiles = await SecureStore.getItemAsync('cachedProfiles');
            if (cachedProfiles) {
                setProfiles(JSON.parse(cachedProfiles));
            }

            const response = await axios.get('https://busy-top-coat-bear.cyclic.app/api/farmer/profiles');

            setProfiles(response.data.farmersWithMobile);
            setLoading(false);

            await SecureStore.setItemAsync('cachedProfiles', JSON.stringify(response.data.farmersWithMobile));
        } catch (error) {
            console.error('Error fetching profiles:', error);
            setLoading(false); 
        }
    }

    const handleProfileSelection = async (id) => {
        const response = await axios.get(
            `https://busy-top-coat-bear.cyclic.app/api/farmer/profile/${id}`
        )

        if (response.status === 200) {

            console.log(response.data.farmer);

            await SecureStore.setItemAsync('token', response.data.token);

            await SecureStore.setItemAsync('farmerData', JSON.stringify(response.data.farmer));

            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

            navigation.navigate('HomePage')
        }
    }

    useEffect(() => {
        fetchProfiles();
    }, []);

    return (
        <View>
            {loading ? (
                <ActivityIndicator size="large" color="green" />
            ) : (
                profiles.map((profile) => (
                    <TouchableOpacity
                        key={profile._id}
                        style={styles.selectionButton}
                        onPress={() => handleProfileSelection(profile._id)}
                    >
                        <Text style={styles.selectionButtonText}>{profile.farmerName}</Text>
                    </TouchableOpacity>
                ))
            )}
        </View>
    )
}

export { ProfileSelection }

const styles = StyleSheet.create({
    selectionButton: {
        backgroundColor: 'green',
        padding: 10,
        margin: 10,
        borderRadius: 10
    },
    selectionButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    }
})
