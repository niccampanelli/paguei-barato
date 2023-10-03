import axios, { AxiosInstance } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class API {

    public static instancia: AxiosInstance;
    public static instanciaCustomSearch: AxiosInstance;
    public static instanciaAzureMaps: AxiosInstance;
    public static instanciaViaCep: AxiosInstance;

    public static async obterInstanciaAxios(): Promise<AxiosInstance> {

        if (!API.instancia) {

            const token = await AsyncStorage.getItem('bearerToken');

            API.instancia = axios.create({
                baseURL: process.env.EXPO_PUBLIC_API_URL,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    ...(token ? { "Authorization": "Bearer " + token } : {})
                }
            });
        }

        return API.instancia;
    }

    public static async obterInstanciaCustomSearch(): Promise<AxiosInstance> {

        if (!API.instanciaCustomSearch) {
            API.instanciaCustomSearch = axios.create({
                baseURL: process.env.EXPO_PUBLIC_CUSTOMSEARCH_URL,
                params: {
                    key: process.env.EXPO_PUBLIC_CUSTOMSEARCH_API_KEY,
                    cx: process.env.EXPO_PUBLIC_CUSTOMSEARCH_CX,
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

    public static async obterInstanciaAzureMaps(): Promise<AxiosInstance> {

        if (!API.instanciaAzureMaps) {
            API.instanciaAzureMaps = axios.create({
                baseURL: process.env.EXPO_PUBLIC_AZUREMAPS_URL,
                params: {
                    "api-version": "1.0",
                    language: "pt-BR",
                    "subscription-key": process.env.EXPO_PUBLIC_AZUREMAPS_SUBSCRIPTION_KEY,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
        }

        return API.instanciaAzureMaps;
    }

    public static async obterInstanciaViaCep(): Promise<AxiosInstance> {

        if (!API.instanciaViaCep) {
            API.instanciaViaCep = axios.create({
                baseURL: process.env.EXPO_PUBLIC_VIACEP_URL,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
        }

        return API.instanciaViaCep;
    }

    public static definirTokenInstanciaAxios(token: string): void {
        API.instancia.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    public static removerTokenInstanciaAxios(): void {
        delete API.instancia.defaults.headers.common['Authorization'];
    }
}