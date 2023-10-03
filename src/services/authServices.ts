import AsyncStorage from "@react-native-async-storage/async-storage";
import Erro from "../interfaces/Erro";
import Usuario from "../interfaces/models/Usuario";
import API from "./api";
import RespostaLogin from "../interfaces/models/RespostaLogin";
import { AxiosResponse } from "axios";

const authServices = {

    async cadastrarUsuario(usuario: Usuario): Promise<Usuario> {
        const api = await API.obterInstanciaAxios();
        return await api.post('/usuario', {
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha,
            logradouro: usuario.logradouro,
            numero: usuario.numero,
            complemento: usuario.complemento,
            bairro: usuario.bairro,
            cidade: usuario.cidade,
            uf: usuario.uf,
            cep: usuario.cep
        });
    },

    async fazerLogin(email: string, senha: string): Promise<RespostaLogin> {
        try {
            const api = await API.obterInstanciaAxios();
            const response = await api.post('/login', {
                email,
                senha
            });

            const token = response.data.token;

            if (token) {
                await AsyncStorage.setItem("bearerToken", token);
                await AsyncStorage.setItem("usuarioId", response.data.id.toString());
                API.definirTokenInstanciaAxios(token);
                return response.data;
            }
            else {
                const erro: Erro<any> = {
                    mensagem: "Não foi possível realizar o login",
                    statusHttp: response.status,
                    codigoHttp: response.statusText,
                    corpo: response.data
                }
                throw erro;
            }
        } catch (error: any) {
            const erro: Erro<any> = {
                mensagem: error.message,
                statusHttp: error.response.status,
                codigoHttp: error.response.statusText,
                corpo: error.response.data
            };
            throw erro;
        }
    },

    async fazerLogout() {
        await AsyncStorage.removeItem("bearerToken");
        await AsyncStorage.removeItem("usuarioId");
        API.removerTokenInstanciaAxios();
    },

    async obterUsuario(id: number): Promise<AxiosResponse<Usuario>> {
        const api = await API.obterInstanciaAxios();
        return await api.get(`/usuario/${id}`);
    },

    async editarUsuario(id: number, modificacoes: Partial<Usuario>): Promise<AxiosResponse<Usuario>> {
        const api = await API.obterInstanciaAxios();
        return await api.patch(`/usuario/${id}`, modificacoes);
    },

    async excluirUsuario(id: number) {
        const api = await API.obterInstanciaAxios();
        return await api.delete(`/usuario/${id}`);
    }
}

export default authServices;