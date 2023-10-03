import { createContext, useContext, useEffect, useState } from "react";
import Usuario from "../../../interfaces/models/Usuario";
import ContextAuth from "../../../interfaces/context/ContextAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authServices from "../../../services/authServices";

const AuthContext = createContext<ContextAuth>({ usuarioLogado: undefined, cadastrarUsuario: async () => { }, fazerLogin: async () => { }, fazerLogout: async () => { }, atualizarUsuarioLogado: async () => { }, verificarUsuarioLogado: async () => false });

export default function AuthProvider(props: any) {

    const [usuarioLogado, setUsuarioLogado] = useState<Usuario>();

    const verificarUsuarioLogado = async (): Promise<boolean> => {
        try {
            const token = await AsyncStorage.getItem("bearerToken");

            if (!token) {
                setUsuarioLogado(undefined);
                return false;
            }

            const obj = token.split('.').map(part => Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString());
            const data = JSON.parse(obj[1]);
            const id = Number(await AsyncStorage.getItem("usuarioId"));

            if (!id)
                return false;

            const response = await authServices.obterUsuario(id);
            const usuario = response.data;
            setUsuarioLogado(usuario);

            return true;
        } catch (error) {
            console.log(error);
            return false;
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
    };

    const fazerLogout = async () => {
        try {
            await authServices.fazerLogout();
            setUsuarioLogado(undefined);

        } catch (error) {
            throw error;
        }
    };

    const atualizarUsuarioLogado = async (usuario: Usuario) => {
        if (!usuarioLogado)
            return;

        if (usuario) {
            setUsuarioLogado(usuario);
            return;
        }

        if (!usuarioLogado.id)
            return;

        const response = await authServices.obterUsuario(usuarioLogado.id);
        const usuarioAtualizado = response.data;
        setUsuarioLogado(usuarioAtualizado);
    };

    useEffect(() => {
        verificarUsuarioLogado();
    }, []);

    return (
        <AuthContext.Provider value={{
            usuarioLogado,
            cadastrarUsuario,
            fazerLogin,
            fazerLogout,
            atualizarUsuarioLogado,
            verificarUsuarioLogado
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);