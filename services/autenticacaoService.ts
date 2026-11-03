import api from "./apis/api";
import { CadastrarRequest, CadastrarResponse, LoginRequest, LoginResponse, RetificarRequest } from "@/types/services/autenticacao";

interface UsuarioCadastrarRequest {
    nome: string;
    email: string;
    senha: string;
    cep?: string;
}

interface UsuarioAutenticarRequest {
    email: string;
    senha: string;
}

interface RevalidarTokenResponse {
    token: string;
    refreshToken: string;
}

interface UsuarioResponse {
    id: string;
    nome: string;
    email: string;
    criadoEm: string;
    cep?: string;
}

export async function fazerLogin(dados: LoginRequest): Promise<LoginResponse> {
    const request: UsuarioAutenticarRequest = {
        email: dados.email,
        senha: dados.senha,
    };

    const resposta = await api.post<LoginResponse>("/api/Usuario/autenticar", request);
    return resposta.data;
}

export async function cadastrar(dados: CadastrarRequest): Promise<CadastrarResponse> {
    const request: UsuarioCadastrarRequest = {
        nome: [dados.nome, dados.sobrenome].filter(Boolean).join(" "),
        email: dados.email,
        senha: dados.senha,
        cep: dados.cep,
    };

    const resposta = await api.post<UsuarioResponse>("/api/Usuario", request);
    return fazerLogin({
        email: dados.email,
        senha: dados.senha,
    }).then((login) => ({
        ...login,
        nome: resposta.data.nome,
        email: resposta.data.email,
        cep: resposta.data.cep,
    }));
}

export async function revalidarToken(refreshToken: string): Promise<RevalidarTokenResponse> {
    const resposta = await api.post<RevalidarTokenResponse>("/api/Usuario/revalidar-token", {
        refreshToken,
    });
    return resposta.data;
}

export async function revogarToken(refreshToken: string): Promise<void> {
    await api.post("/api/Usuario/revogar-token", { refreshToken });
}

export async function retificar(dados: RetificarRequest): Promise<void> {
    throw new Error("A API ainda nao expoe o endpoint de atualizacao de usuario.");
}

export default {
    fazerLogin,
    cadastrar,
    revalidarToken,
    revogarToken,
    retificar,
};
