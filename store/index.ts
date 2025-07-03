import { configureStore } from '@reduxjs/toolkit';
import cadastroReducer from './slices/cadastro';

export const store = configureStore({
    reducer: {
        cadastroReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;