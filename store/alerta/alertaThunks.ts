import { AlertaState } from "@/types/store/slices/alerta";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { adicionarAlerta, removerAlerta } from "./alertaSlice";

export const criarAlerta = createAsyncThunk(
    "alerta/criarAlerta",
    async (dados: Omit<AlertaState['alertas'][0], "id">, { dispatch, rejectWithValue }) => {
        try {
            const id = Date.now();
            const novoAlerta = { id, ...dados };
            dispatch(adicionarAlerta(novoAlerta));

            setTimeout(() => {
                dispatch(removerAlerta(id))
            }, 5000);
        }
        catch {
            rejectWithValue("erro");
        }
    },
);