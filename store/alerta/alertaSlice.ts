import { AlertaState } from "@/types/store/slices/alerta";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState: AlertaState = {
    alertas: [
        {
            id: 1,
            iconeNome: "alert-triangle",
            mensagem: "Este produto não está mais disponível",
        }
    ],
};

const alertaSlice = createSlice({
    name: 'alerta',
    initialState,
    reducers: {
        adicionarAlerta: (state, action) => {
            state.alertas.push(action.payload);
        },
        removerAlerta: (state, action) => {
            state.alertas = state.alertas.filter(alerta => alerta.id !== action.payload);
        },
    },
});

export const {
    adicionarAlerta,
    removerAlerta,
} = alertaSlice.actions;

export const selectAlerta = (state: RootState) => state.alertaReducer;

export default alertaSlice.reducer;