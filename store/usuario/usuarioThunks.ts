import autenticacaoService from "@/services/autenticacaoService";
import LoginRequest from "@/types/services/autenticacao/LoginRequest";
import RetificarRequest from "@/types/services/autenticacao/RetificarRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fazerLogin = createAsyncThunk(
    "usuario/fazerLogin",
    async (dados: LoginRequest, { rejectWithValue }) => {
        try {
            return await autenticacaoService.fazerLogin(dados);
        }
        catch {
            rejectWithValue("erro");
        }
    },
);

export const retificar = createAsyncThunk(
    "usuario/retificar",
    async (dados: RetificarRequest, { rejectWithValue }) => {
        try {
            await autenticacaoService.retificar(dados);
        }
        catch {
            rejectWithValue("erro");
        }
    },
);