import autenticacaoService from "@/services/autenticacaoService";
import { definirAccessToken } from "@/services/authSession";
import { limparSessao, obterRefreshToken, obterUsuario, salvarSessao } from "@/services/authStorage";
import { LoginRequest } from "@/types/services/autenticacao/LoginRequest";
import { RetificarRequest } from "@/types/services/autenticacao/RetificarRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fazerLogout } from "./usuarioSlice";

function mensagemErro(erro: unknown): string {
    return erro instanceof Error ? erro.message : "Não foi possível autenticar. Tente novamente.";
}

export const fazerLogin = createAsyncThunk(
    "usuario/fazerLogin",
    async (dados: LoginRequest, { rejectWithValue }) => {
        try {
            const resposta = await autenticacaoService.fazerLogin(dados);
            definirAccessToken(resposta.token);
            await salvarSessao(resposta.refreshToken, resposta);
            return resposta;
        } catch (erro) {
            return rejectWithValue(mensagemErro(erro));
        }
    },
);

export const cadastrarUsuario = createAsyncThunk(
    "usuario/cadastrar",
    async (dados: Parameters<typeof autenticacaoService.cadastrar>[0], { rejectWithValue }) => {
        try {
            const resposta = await autenticacaoService.cadastrar(dados);
            definirAccessToken(resposta.token);
            await salvarSessao(resposta.refreshToken, resposta);
            return resposta;
        } catch (erro) {
            return rejectWithValue(mensagemErro(erro));
        }
    },
);

export const restaurarSessao = createAsyncThunk(
    "usuario/restaurarSessao",
    async (_, { rejectWithValue }) => {
        try {
            const refreshToken = await obterRefreshToken();
            const usuario = await obterUsuario();
            if (!refreshToken || !usuario)
                return null;

            const tokens = await autenticacaoService.revalidarToken(refreshToken);
            definirAccessToken(tokens.token);
            await salvarSessao(tokens.refreshToken, usuario);
            return { ...usuario, ...tokens };
        } catch (erro) {
            await limparSessao();
            return rejectWithValue(mensagemErro(erro));
        }
    },
);

export const renovarSessao = createAsyncThunk(
    "usuario/renovarSessao",
    async (_, { rejectWithValue }) => {
        try {
            const refreshToken = await obterRefreshToken();
            const usuario = await obterUsuario();
            if (!refreshToken || !usuario)
                return null;

            const tokens = await autenticacaoService.revalidarToken(refreshToken);
            definirAccessToken(tokens.token);
            await salvarSessao(tokens.refreshToken, usuario);
            return { ...usuario, ...tokens };
        } catch (erro) {
            await limparSessao();
            return rejectWithValue(mensagemErro(erro));
        }
    },
);

export const sairDaConta = createAsyncThunk(
    "usuario/sair",
    async (_, { dispatch }) => {
        const refreshToken = await obterRefreshToken();
        try {
            if (refreshToken)
                await autenticacaoService.revogarToken(refreshToken);
        } catch {
            // A sessao local deve ser encerrada mesmo se a API estiver indisponivel.
        } finally {
            definirAccessToken(null);
            await limparSessao();
            dispatch(fazerLogout());
        }
    },
);

export const retificar = createAsyncThunk(
    "usuario/retificar",
    async (dados: RetificarRequest, { rejectWithValue }) => {
        try {
            await autenticacaoService.retificar(dados);
        }
        catch (erro) {
            return rejectWithValue(
                erro instanceof Error
                    ? erro.message
                    : "Não foi possível atualizar os dados do usuário.",
            );
        }
    },
);
