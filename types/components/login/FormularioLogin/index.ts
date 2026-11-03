import { LoginSchemaType } from '@/schemas/login';
import { FieldErrors } from 'react-hook-form';

export interface FormularioLoginProps {
    /**
     * Função a ser chamada ao submeter o formulário.
     */
    aoSubmeter: (dados: LoginSchemaType) => Promise<void>;
    /**
     * Função a ser chamada quando o formulário é submetido com erros de validação.
     */
    aoSubmeterInvalido?: (erro: FieldErrors<LoginSchemaType>) => void;
}