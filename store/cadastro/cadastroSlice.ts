import { CadastroState } from "@/types/store/slices/cadastro";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState: CadastroState = {
    passo1Email: {
        email: "",
        emailConfirma: "",
    },
    passo2Nome: {
        nome: "",
        sobrenome: "",
    },
    passo3Senha: {
        senha: "",
        senhaConfirma: "",
    },
    passo4Endereco: {
        cep: undefined,
    },
};

const cadastroSlice = createSlice({
    name: 'cadastro',
    initialState,
    reducers: {
        setPasso1Email: (state, action: PayloadAction<CadastroState['passo1Email']>) => {
            state.passo1Email = action.payload;
        },
        setPasso2Nome: (state, action: PayloadAction<CadastroState['passo2Nome']>) => {
            state.passo2Nome = action.payload;
        },
        setPasso3Senha: (state, action: PayloadAction<CadastroState['passo3Senha']>) => {
            state.passo3Senha = action.payload;
        },
        setPasso4Endereco: (state, action: PayloadAction<CadastroState['passo4Endereco']>) => {
            state.passo4Endereco = action.payload;
        },
    },
});

export const {
    setPasso1Email,
    setPasso2Nome,
    setPasso3Senha,
    setPasso4Endereco
} = cadastroSlice.actions;

export const selectCadastro = (state: RootState) => state.cadastroReducer;

export default cadastroSlice.reducer;