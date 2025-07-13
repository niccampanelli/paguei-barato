import { UsuarioState } from "@/types/store/slices/usuario";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState: UsuarioState = {
    nome: "Anônimo",
    sobrenome: "",
    nomeCompleto: "",
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
            return action.payload;
        },
    },
});

export const {
    setUsuario
} = usuarioSlice.actions;

export const selectUsuario = (state: RootState) => state.usuarioReducer;

export default usuarioSlice.reducer;