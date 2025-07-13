import * as z from 'zod/v4';

export const UsuarioSchema = z.object({
    nome: z
        .string()
        .nonempty('Informe seu nome')
        .min(3, 'O nome informado é inválido')
        .optional(),
    sobrenome: z
        .string()
        .nonempty('Informe um sobrenome')
        .optional(),
    cep: z
        .string()
        .regex(/^\d{5}-?\d{3}$/, 'CEP inválido')
        .optional(),
});

export type UsuarioSchema = z.infer<typeof UsuarioSchema>;