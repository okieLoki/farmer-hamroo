import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { styles } from '../styles/CollectionStyles';
import CollectionTable from '../components/CollectionTable';

const Collection = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('Daily');
    const [collections, setCollections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const url = `https://busy-top-coat-bear.cyclic.app/api/farmer/collections?period=${selectedPeriod.toLowerCase()}`;
            const response = await axios.get(url);
            arrangeCollections(response.data.collections);
            setCollections(response.data.collections);
            setIsLoading(false);

            console.log(response.data.collections[0].farmerName);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const arrangeCollections = (collections) => {
        collections.sort((a, b) => new Date(b.collectionDate) - new Date(a.collectionDate));
    };

    useEffect(() => {
        fetchData();
    }, [selectedPeriod]);

    const handlePeriodChange = (period) => {
        setSelectedPeriod(period);
    };

    return (
        <View style={styles.container}>
            <View style={styles.periodOptions}>
                <Text style={styles.heading}>Collections</Text>
                <View style={styles.segmentedButtonGroup}>
                    {['Daily', 'Weekly', 'Monthly', 'All'].map((period) => (
                        <TouchableOpacity
                            key={period}
                            onPress={() => handlePeriodChange(period)}
                            style={[
                                styles.segmentedButton,
                                selectedPeriod === period ? styles.selectedSegment : styles.unselectedSegment,
                            ]}
                        >
                            <Text style={styles.segmentButtonText}>{period}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {
                isLoading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="green" />
                    </View>
                ) : (
                    <CollectionTable collections={collections} />
                )
            }


        </View>
    );
};

export { Collection };
