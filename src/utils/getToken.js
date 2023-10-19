import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const setToken = async () => {
    const token = await SecureStore.getItemAsync('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export { setToken }