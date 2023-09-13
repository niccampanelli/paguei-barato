import * as yup from 'yup';
import Login from '../models/Login';

const loginSchema: yup.ObjectSchema<Login> = yup.object().shape({
    email: yup
        .string()
        .required("Informe o email")
        .email("Informe um email válido")
        .defined("Informe o email"),
    senha: yup
        .string()
        .required("Informe a senha")
        .defined("Informe a senha")
});

export default loginSchema;