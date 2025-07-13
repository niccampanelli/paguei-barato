import autenticacaoService from "@/services/autenticacaoService";
import LoginRequest from "@/types/services/autenticacao/LoginRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fazerLogin = createAsyncThunk(
    "usuario/fazerLogin",
    async (dados: LoginRequest, { rejectWithValue }) => {
        try {
            return await autenticacaoService.fazerLogin(dados);
        }
        catch (error) {
            rejectWithValue("erro");
        }
    },
)