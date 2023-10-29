import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Collection, Ledger, Profile } from './index';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const HomePage = ({ setAuthenticated }) => {
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Tab.Navigator
      initialRouteName='Collection'
      screenOptions={{
        headerShown: false,
      }}

    >
      <Tab.Screen
        name='Collection'
        component={Collection}
        options={{
          tabBarIcon: () => (
            <AntDesign name="table" size={24} color="green" />

          ),
          tabBarShowLabel: false,
        }}

      />
      <Tab.Screen
        name='Ledger'
        component={Ledger}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="collections-bookmark" size={24} color="green" />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen 
      name='Profile'
      options={{
        tabBarIcon: () => (
          <Ionicons name="person" size={24} color="green" />
        ),
        tabBarShowLabel: false,
      }}
      >
        {(props) => (
          <Profile {...props} setAuthenticated={setAuthenticated} />
        )
        }
      </Tab.Screen>
    </Tab.Navigator>
  );
};


export { HomePage };
