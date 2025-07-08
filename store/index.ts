import { configureStore } from '@reduxjs/toolkit';
import cadastroReducer from './slices/cadastro';
import usuarioReducer from './slices/usuario';

export const store = configureStore({
    reducer: {
        cadastroReducer,
        usuarioReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;