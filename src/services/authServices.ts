import AsyncStorage from "@react-native-async-storage/async-storage";
import Erro from "../interfaces/Erro";
import Usuario from "../interfaces/models/Usuario";
import API from "./api";

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

    async fazerLogin(email: string, senha: string): Promise<string> {
        try {
            console.log("chamou no authServices");
            
            const api = await API.obterInstanciaAxios();
            const response = await api.post('/login', {
                email,
                senha
            });

            const token = response.data;

            if (token) {
                await AsyncStorage.setItem("bearerToken", token);
                console.log("salvou o token");
                
                return token;
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
    }
}

export default authServices;