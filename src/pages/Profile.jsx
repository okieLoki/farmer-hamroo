import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const Profile = ({ setAuthenticated }) => {
  const navigation = useNavigation();
  const [farmer, setFarmer] = useState({});

  const logout = async () => {
    await SecureStore.deleteItemAsync('authenticated');
    setAuthenticated(false);

    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginPage' }],
    });
  };

  const getFarmerInfo = async () => {
    const farmerData = await SecureStore.getItemAsync('farmerData');
    const farmer = JSON.parse(farmerData);

    setFarmer(farmer);
  };

  useEffect(() => {
    getFarmerInfo();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      {/* User Info Table */}
      <View style={styles.userInfoTable}>
        <View style={styles.userInfoRow}>
          <Text style={styles.userInfoLabel}>Farmer ID:</Text>
          <Text style={styles.userInfoText}>{farmer.farmerID}</Text>
        </View>

        <View style={styles.userInfoRow}>
          <Text style={styles.userInfoLabel}>Name:</Text>
          <Text style={styles.userInfoText}>{farmer.farmer_name}</Text>
        </View>

        <View style={styles.userInfoRow}>
          <Text style={styles.userInfoLabel}>Mobile Number:</Text>
          <Text style={styles.userInfoText}>{farmer.mobile_number}</Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e6fce6',
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfoTable: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    elevation: 5,
  },
  userInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  userInfoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userInfoText: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export { Profile };
