import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper'
import {
  LoginPage,
  OTPPage,
  HomePage
} from './src/pages'
import { useFonts } from 'expo-font'
import { ToastProvider } from 'react-native-toast-notifications'

const Stack = createNativeStackNavigator()

export default function App() {

  const [loaded] = useFonts({
    Inter: require('./assets/fonts/Inter-Medium.ttf'),
    InterB: require('./assets/fonts/Inter-Bold.ttf'),
    LeagueSB: require('./assets/fonts/LeagueSpartan-Bold.ttf')
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <PaperProvider>
        <ToastProvider>
          <Stack.Navigator>
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="OTPPage" component={OTPPage} />
            <Stack.Screen name="HomePage" component={HomePage} />
          </Stack.Navigator>
        </ToastProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}

