import { LoginSchema } from '@/schemas/login';

export interface FormularioLoginProps {
    /**
     * Função a ser chamada ao submeter o formulário.
     */
    onSubmit: (data: LoginSchema) => void;
}