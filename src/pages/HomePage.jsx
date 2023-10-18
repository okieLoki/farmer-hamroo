import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Collection, Ledger, Profile } from './index';

const HomePage = ({ setAuthenticated }) => {
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name='Collection' component={Collection} />
      <Tab.Screen name='Ledger' component={Ledger} />
      <Tab.Screen name='Profile' component={Profile} setAuthenticated={setAuthenticated} />
    </Tab.Navigator>
  );
};


export { HomePage };
