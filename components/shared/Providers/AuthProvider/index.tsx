import { AuthContext } from "@/context/auth/authContext";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import {
    cadastrar as cadastrarUsuario,
    fazerLogin,
    revalidarToken,
    revogarToken,
} from "@/services/autenticacaoService";
import {
    configurarSessao,
    definirAccessToken,
} from "@/services/authSession";
import {
    limparSessao,
    obterRefreshToken,
    obterUsuario,
    salvarSessao,
} from "@/services/authStorage";
import { fazerLogout, selectUsuario, setUsuario } from "@/store/usuario/usuarioSlice";
import { AuthProviderProps } from "@/types/components/shared/Providers/AuthProvider";
import { AuthContextType } from "@/types/context/auth/authContext";
import { AuthStatus, AuthUser } from "@/types/services/autenticacao";
import { useCallback, useEffect, useMemo, useState } from "react";

function converterUsuario(usuario: AuthUser) {
    return {
        id: usuario.id,
        nome: usuario.nome,
        sobrenome: usuario.sobrenome ?? "",
        nomeCompleto: [usuario.nome, usuario.sobrenome].filter(Boolean).join(" "),
        email: usuario.email,
        logado: true,
        cep: usuario.cep,
    };
}

export default function AuthProvider({
    children
}: AuthProviderProps) {

    const dispatch = useAppDispatch();

    const usuarioRedux = useAppSelector(selectUsuario);

    const [status, setStatus] = useState<AuthStatus>("carregando");
    const [usuario, setUsuarioAtual] = useState<AuthUser | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const aplicarSessao = useCallback(async (novoToken: string, novoRefreshToken: string, novoUsuario: AuthUser) => {
        definirAccessToken(novoToken);
        setAccessToken(novoToken);
        setUsuarioAtual(novoUsuario);
        dispatch(setUsuario({
            ...converterUsuario(novoUsuario),
            token: novoToken,
        }));
        await salvarSessao(novoRefreshToken, novoUsuario);
        setStatus("autenticado");
    }, [dispatch]);

    const limparSessaoLocal = useCallback(async () => {
        definirAccessToken(null);
        setAccessToken(null);
        setUsuarioAtual(null);
        dispatch(fazerLogout());
        await limparSessao();
        setStatus("nao_autenticado");
    }, [dispatch]);

    const renovarSessao = useCallback(async (): Promise<string | null> => {
        const refreshToken = await obterRefreshToken();
        if (!refreshToken)
            return null;

        try {
            const tokens = await revalidarToken(refreshToken);
            const usuarioPersistido = await obterUsuario();
            if (!usuarioPersistido)
                return null;

            await aplicarSessao(tokens.token, tokens.refreshToken, usuarioPersistido);
            return tokens.token;
        } catch {
            await limparSessaoLocal();
            return null;
        }
    }, [aplicarSessao, limparSessaoLocal]);

    useEffect(() => {
        configurarSessao(renovarSessao, limparSessaoLocal);
        return () => configurarSessao(async () => null, async () => undefined);
    }, [limparSessaoLocal, renovarSessao]);

    useEffect(() => {
        async function hidratar() {
            const refreshToken = await obterRefreshToken();
            const usuarioPersistido = await obterUsuario();
            if (!refreshToken || !usuarioPersistido) {
                await limparSessaoLocal();
                return;
            }

            const token = await renovarSessao();
            if (!token)
                await limparSessaoLocal();
        }

        hidratar();
    }, [limparSessaoLocal, renovarSessao]);

    const entrar = useCallback(async (email: string, senha: string): Promise<void> => {
        const resposta = await fazerLogin({ email, senha });
        await aplicarSessao(resposta.token, resposta.refreshToken, resposta);
    }, [aplicarSessao]);

    const cadastrar = useCallback(async (dados: { nome: string; sobrenome: string; email: string; senha: string; cep?: string }): Promise<void> => {
        const resposta = await cadastrarUsuario(dados);
        await aplicarSessao(resposta.token, resposta.refreshToken, resposta);
    }, [aplicarSessao]);

    const sair = useCallback(async (): Promise<void> => {
        const refreshToken = await obterRefreshToken();
        try {
            if (refreshToken)
                await revogarToken(refreshToken);
        } catch {
            // A sessão local deve ser encerrada mesmo se a API estiver indisponível.
        } finally {
            await limparSessaoLocal();
        }
    }, [limparSessaoLocal]);

    const valor = useMemo<AuthContextType>(() => ({
        status,
        usuario: usuario ?? (usuarioRedux.logado ? {
            id: usuarioRedux.id ?? "",
            nome: usuarioRedux.nome,
            sobrenome: usuarioRedux.sobrenome,
            email: usuarioRedux.email ?? "",
            criadoEm: "",
            cep: usuarioRedux.cep,
        } : null),
        accessToken,
        entrar,
        cadastrar,
        sair,
        exigirAutenticacao: () => status === "autenticado",
    }), [accessToken, cadastrar, entrar, sair, status, usuario, usuarioRedux]);

    return (
        <AuthContext.Provider value={valor}>
            {children}
        </AuthContext.Provider>
    );
}
