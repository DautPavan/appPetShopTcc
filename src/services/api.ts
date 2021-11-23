import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
    baseURL: 'http://192.168.0.6:45600/api/',
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(async config => {
    // Declaramos um token manualmente para teste.
    
    let result = await SecureStore.getItemAsync('token');  
    if (result) {
      api.defaults.headers.authorization = `Bearer ${result}`;
      console.log("token envio " + result)
    }
  
    return config;
});

export default api;