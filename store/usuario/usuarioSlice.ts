import { UsuarioState } from "@/types/store/slices/usuario";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { fazerLogin, retificar } from "./usuarioThunks";

const initialState: UsuarioState = {
    nome: "Anônimo",
    sobrenome: "",
    nomeCompleto: "Anônimo",
    email: undefined,
    logado: false,
    cep: undefined,
    token: undefined,
};

const usuarioSlice = createSlice({
    name: 'cadastro',
    initialState,
    reducers: {
        setUsuario: (_, action: PayloadAction<UsuarioState>) => {
            const { payload } = action;
            const valor: UsuarioState = {
                ...action.payload,
                nome: payload.nome.trim(),
                sobrenome: payload.sobrenome.trim(),
                nomeCompleto: payload.nome.trim() + " " + payload.sobrenome.trim(),
                email: payload.email?.trim(),
                cep: payload.cep?.trim(),
            }
            return valor;
        },
        fazerLogout: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fazerLogin.fulfilled, (state, action) => {
            const { payload } = action;
            state.id = payload!.id;
            state.nome = payload!.nome;
            state.sobrenome = payload!.sobrenome;
            state.nomeCompleto = payload!.nome + " " + payload!.sobrenome;
            state.email = payload!.email;
            state.cep = payload!.cep;
            state.token = payload!.token;
            state.logado = true;
        });

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
    setUsuario,
    fazerLogout,
} = usuarioSlice.actions;

export const selectUsuario = (state: RootState) => state.usuarioReducer;

export default usuarioSlice.reducer;