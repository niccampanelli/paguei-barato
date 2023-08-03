import axios, { AxiosInstance } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class API {

    public static instancia: AxiosInstance;
    public static instanciaCustomSearch: AxiosInstance;

    public static async obterInstanciaAxios(): Promise<AxiosInstance> {

        if(!API.instancia) {

            const token = await AsyncStorage.getItem('bearerToken');
    
            API.instancia = axios.create({
                baseURL: "url",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...(token ? {"Authorization": "Bearer " + token} : {})
                }
            });
        }

        return API.instancia;
    }

    public static async obterInstanciaCustomSearch(): Promise<AxiosInstance> {

        if(!API.instanciaCustomSearch) {
            API.instanciaCustomSearch = axios.create({
                baseURL: "url",
                params: {
                    key: "key",
                    cx: "cx",
                    searchType: "image",
                    cr: "countryBR",
                    hl: "pt-BR",
                    lr: "lang_pt"
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
        }

        return API.instanciaCustomSearch;
    }
}