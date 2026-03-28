import { configureStore } from '@reduxjs/toolkit';
import alertaReducer from './alerta/alertaSlice';
import cadastroReducer from './cadastro/cadastroSlice';
import usuarioReducer from './usuario/usuarioSlice';

export const store = configureStore({
    reducer: {
        alertaReducer,
        cadastroReducer,
        usuarioReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;