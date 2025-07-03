import { Passo1EmailSchema, Passo2NomeSchema, Passo3SenhaSchema, Passo4EnderecoSchema } from "@/schemas/cadastro";
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
        logradouro: undefined,
        numero: undefined,
        complemento: undefined,
        bairro: undefined,
        cidade: undefined,
        estado: undefined,
    },
};

const cadastroSlice = createSlice({
    name: 'cadastro',
    initialState,
    reducers: {
        setPasso1Email: (state, action: PayloadAction<Passo1EmailSchema>) => {
            state.passo1Email = action.payload;
        },
        setPasso2Nome: (state, action: PayloadAction<Passo2NomeSchema>) => {
            state.passo2Nome = action.payload;
        },
        setPasso3Senha: (state, action: PayloadAction<Passo3SenhaSchema>) => {
            state.passo3Senha = action.payload;
        },
        setPasso4Endereco: (state, action: PayloadAction<Passo4EnderecoSchema>) => {
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