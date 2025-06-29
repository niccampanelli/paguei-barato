import * as z from 'zod/v4';

export const LoginSchema = z.object({
    email: z
        .email('E-mail inválido'),
    senha: z
        .string()
        .nonempty('Informe a senha')
});

export type LoginSchema = z.infer<typeof LoginSchema>;