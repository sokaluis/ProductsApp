import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://192.168.20.30:8080/api';

const coffeAPI = Axios.create({ baseURL });

coffeAPI.interceptors.request.use(async (config: any) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers['x-token'] = token;
  }

  return config;
});

export default coffeAPI;
