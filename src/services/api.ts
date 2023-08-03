import axios, { AxiosInstance } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class API {

    public static instancia: AxiosInstance;

    public static async obterInstanciaAxios(): Promise<AxiosInstance> {

        if(!API.instancia) {

            const token = await AsyncStorage.getItem('token');
    
            API.instancia = axios.create({
                baseURL: "http://192.168.0.4:8080",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...(token ? {"Authorization": "Bearer " + token} : {})
                }
            });
        }

        return API.instancia;
    }
}