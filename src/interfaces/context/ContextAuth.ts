import Usuario from "../models/Usuario";

export default interface ContextAuth {
    usuarioLogado?: Usuario;
    cadastrarUsuario(usuario: Usuario): Promise<void>;
    fazerLogin(email: string, senha: string): Promise<void>;
    fazerLogout(): Promise<void>;
}