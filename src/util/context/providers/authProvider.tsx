import { createContext, useContext, useEffect, useState } from "react";
import Produto from "../../../interfaces/models/Produto";
import Usuario from "../../../interfaces/models/Usuario";
import ContextAuth from "../../../interfaces/context/ContextAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authServices from "../../../services/authServices";

const AuthContext = createContext<ContextAuth>({ usuarioLogado: undefined, cadastrarUsuario: async () => { }, fazerLogin: async () => { }, fazerLogout: async () => { } });

export default function AuthProvider(props: any) {
    
    const [usuarioLogado, setUsuarioLogado] = useState<Usuario>();

    // const verificarUsuarioLogado = async () => {
    //     try {
    //         const token = AsyncStorage.getItem("bearerToken");

    //         if(!token) {
    //             setUsuarioLogado(undefined);
    //             return;
    //         }

    //         const usuario: Usuario = {
    //             id: 1,
    //             nome: "Teste",
    //             email: "teste@email.com",
    //             senha: "123456",
    //             bairro: "Centro",
    //             cidade: "São Paulo",
    //             uf: "SP",
    //             cep: "12345678",
    //             logradouro: "Rua Teste",
    //             numero: 23,
    //             complemento: "Casa 2",
    //         }

    //         setUsuarioLogado(usuario);

    //     } catch (error) {
    //         console.log(error);            
    //     }
    // };

    const cadastrarUsuario = async (usuario: Usuario) => {
        try {
            
            usuario.numero = Number(usuario.numero);

            console.log("cadastrando");
            console.log(JSON.stringify(usuario, null, 2));
            console.log(typeof usuario.numero);
            
            const data = await authServices.cadastrarUsuario(usuario);
            console.log("cadastro: ", data);
            const token = await fazerLogin(usuario.email, usuario.senha);
            console.log("token: ", token);
        } catch (error) {
            throw error;
        }
    };

    const fazerLogin = async (email: string, senha: string) => {
        try {
            console.log("chamou o método no provider");
            
            await authServices.fazerLogin(email, senha);

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

            console.log("salvou o usuário no provider");
            console.log(JSON.stringify(usuario, null, 2));
            

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

    // useEffect(() => {
    //     verificarUsuarioLogado();
    // }, []);

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