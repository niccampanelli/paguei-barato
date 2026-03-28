import { configureStore } from '@reduxjs/toolkit';
import cadastroReducer from './cadastro/cadastroSlice';
import usuarioReducer from './usuario/usuarioSlice';

export const store = configureStore({
    reducer: {
        cadastroReducer,
        usuarioReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;