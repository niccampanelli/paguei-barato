import { UsuarioState } from "@/types/store/slices/usuario";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { cadastrarUsuario, fazerLogin, renovarSessao, restaurarSessao, retificar, sairDaConta } from "./usuarioThunks";

const initialState: UsuarioState = {
    nome: "Anônimo",
    sobrenome: "",
    nomeCompleto: "Anônimo",
    email: undefined,
    logado: false,
    cep: undefined,
    token: undefined,
    status: "carregando",
};

const usuarioSlice = createSlice({
    name: 'cadastro',
    initialState,
    reducers: {
        fazerLogout: (state) => {
            Object.assign(state, { ...initialState, status: "nao_autenticado" });
        },
    },
    extraReducers: (builder) => {
        const aplicarResposta = (state: UsuarioState, resposta: { id: string; nome: string; sobrenome?: string; email: string; cep?: string; token: string }) => {
            state.id = resposta.id;
            state.nome = resposta.nome;
            state.sobrenome = resposta.sobrenome ?? "";
            state.nomeCompleto = [resposta.nome, resposta.sobrenome].filter(Boolean).join(" ");
            state.email = resposta.email;
            state.cep = resposta.cep;
            state.token = resposta.token;
            state.logado = true;
            state.status = "autenticado";
        };

        builder.addCase(fazerLogin.fulfilled, (state, action) => aplicarResposta(state, action.payload));
        builder.addCase(cadastrarUsuario.fulfilled, (state, action) => aplicarResposta(state, action.payload));
        builder.addCase(restaurarSessao.pending, (state) => { state.status = "carregando"; });
        builder.addCase(restaurarSessao.fulfilled, (state, action) => {
            if (action.payload)
                aplicarResposta(state, action.payload);
            else {
                Object.assign(state, { ...initialState, status: "nao_autenticado" });
            }
        });
        builder.addCase(restaurarSessao.rejected, (state) => {
            Object.assign(state, { ...initialState, status: "nao_autenticado" });
        });
        builder.addCase(renovarSessao.fulfilled, (state, action) => {
            if (action.payload)
                aplicarResposta(state, action.payload);
        });
        builder.addCase(renovarSessao.rejected, (state) => {
            Object.assign(state, { ...initialState, status: "nao_autenticado" });
        });
        builder.addCase(sairDaConta.fulfilled, () => ({ ...initialState, status: "nao_autenticado" }));

        builder.addCase(retificar.fulfilled, (state, action) => {
            const { meta: { arg } } = action;
            state.nome = arg.nome ?? state.nome;
            state.sobrenome = arg.sobrenome ?? state.sobrenome;
            state.nomeCompleto = state.nome + " " + state.sobrenome;
            state.email = arg.email ?? state.email;
            state.cep = arg.cep ?? state.cep;
        });
    },
});

export const {
    fazerLogout,
} = usuarioSlice.actions;

export const selectUsuario = (state: RootState) => state.usuarioReducer;

export default usuarioSlice.reducer;
