import { UsuarioState } from "@/types/store/slices/usuario";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

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
    },
});

export const {
    setUsuario
} = usuarioSlice.actions;

export const selectUsuario = (state: RootState) => state.usuarioReducer;

export default usuarioSlice.reducer;