import axios, { AxiosInstance } from "axios";
import { API_ENDERECO } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class API {

    public static instancia: AxiosInstance;
    public static instanciaCustomSearch: AxiosInstance;

    public static async obterInstanciaAxios(): Promise<AxiosInstance> {

        if(!API.instancia) {

            const token = await AsyncStorage.getItem('bearerToken');
    
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

    public static async obterInstanciaCustomSearch(): Promise<AxiosInstance> {

        if(!API.instanciaCustomSearch) {
            API.instanciaCustomSearch = axios.create({
                baseURL: "https://customsearch.googleapis.com/customsearch/v1",
                params: {
                    key: "AIzaSyA8rvlyuiQbufUlv9VB99D6D_4tkOOZJtc",
                    cx: "443df3b9759194259",
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