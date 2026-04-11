import { AlertaState } from "@/types/store/slices/alerta";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

const initialState: AlertaState = {
    alertas: [],
};

const alertaSlice = createSlice({
    name: 'alerta',
    initialState,
    reducers: {
        adicionarAlerta: (state, action: PayloadAction<AlertaState['alertas'][0]>) => {
            state.alertas.push(action.payload);
        },
        removerAlerta: (state, action: PayloadAction<AlertaState['alertas'][0]['id']>) => {
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