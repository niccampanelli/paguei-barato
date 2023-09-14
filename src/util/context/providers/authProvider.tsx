import { createContext, useContext, useEffect, useState } from "react";
import Produto from "../../../interfaces/models/Produto";
import Usuario from "../../../interfaces/models/Usuario";
import ContextAuth from "../../../interfaces/context/ContextAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authServices from "../../../services/authServices";

const AuthContext = createContext<ContextAuth>({ usuarioLogado: undefined, cadastrarUsuario: async () => { }, fazerLogin: async () => { }, fazerLogout: async () => { } });

export default function AuthProvider(props: any) {
    
    const [usuarioLogado, setUsuarioLogado] = useState<Usuario>();

    const verificarUsuarioLogado = async () => {
        try {
            const token = AsyncStorage.getItem("bearerToken");

            if(!token) {
                setUsuarioLogado(undefined);
                return;
            }

            const usuario: Usuario = {
                id: 1,
                nome: "Teste",
                email: "teste@email.com",
                senha: "123456",
                bairro: "Centro",
                cidade: "São Paulo",
                uf: "SP",
                cep: "12345678",
                logradouro: "Rua Teste",
                numero: 23,
                complemento: "Casa 2",
            }

            setUsuarioLogado(usuario);

        } catch (error) {
            console.log(error);            
        }
    };

    const cadastrarUsuario = async (usuario: Usuario) => {
        try {
            
            usuario.numero = Number(usuario.numero);
            
            await authServices.cadastrarUsuario(usuario);
            await fazerLogin(usuario.email, usuario.senha);
        } catch (error) {
            throw error;
        }
    };

    const fazerLogin = async (email: string, senha: string) => {
        try {
            const response = await authServices.fazerLogin(email, senha);

            const usuario: Usuario = {
                id: response.id,
                nome: response.nome,
                email: response.email,
                senha: response.senha,
                bairro: response.bairro,
                cidade: response.cidade,
                uf: response.uf,
                cep: response.cep,
                logradouro: response.logradouro,
                numero: response.numero,
                complemento: response.complemento,
            }

            setUsuarioLogado(usuario);
        } catch (error) {
            throw error;
        }
    };

    const fazerLogout = async () => {
        try {
            await authServices.fazerLogout();
            setUsuarioLogado(undefined);
            console.log("deslogou");
            
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        verificarUsuarioLogado();
    }, []);

    return (
        <AuthContext.Provider value={{
            usuarioLogado,
            cadastrarUsuario,
            fazerLogin,
            fazerLogout
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);