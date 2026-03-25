import * as z from 'zod/v4';

export const UsuarioSchema = z.object({
    nome: z
        .string()
        .nonempty('Informe seu nome')
        .min(3, 'O nome informado é inválido'),
    sobrenome: z
        .string()
        .nonempty('Informe um sobrenome'),
    cep: z
        .string()
        .refine(
            (value) => value === '' || /^\d{5}-?\d{3}$/.test(value),
            'CEP inválido'
        )
        .optional(),
});

export type UsuarioSchema = z.infer<typeof UsuarioSchema>;