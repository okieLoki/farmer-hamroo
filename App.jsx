import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper'
import {
  LoginPage,
  OTPPage,
  HomePage,
  ProfileSelection
} from './src/pages'
import { ToastProvider } from 'react-native-toast-notifications'
import * as SecureStore from 'expo-secure-store'
import React, { useState, useEffect } from 'react'
import { setToken } from './src/utils/getToken';

const Stack = createNativeStackNavigator()

const AuthenticatedStack = ({ setAuthenticated }) => {
  return (
    <Stack.Navigator>

      <Stack.Screen name="ProfileSelection" component={ProfileSelection} />
      <Stack.Screen name="HomePage">
        {(props) => (
          <HomePage {...props} setAuthenticated={setAuthenticated} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};


const UnauthenticatedStack = ({ setAuthenticated }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="OTPPage">
        {(props) => (
          <OTPPage {...props} setAuthenticated={setAuthenticated} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};



export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await SecureStore.getItemAsync('authenticated');
      if (authenticated === 'true') {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    };

    const tokenSetter = async () => {
      await setToken();
    }

    tokenSetter();
    checkAuth();
  }, []);

  return (
    <NavigationContainer>
      <PaperProvider>
        <ToastProvider>
          {authenticated ? (
            <AuthenticatedStack setAuthenticated={setAuthenticated} />
          ) : (
            <UnauthenticatedStack setAuthenticated={setAuthenticated} />
          )}
        </ToastProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}
