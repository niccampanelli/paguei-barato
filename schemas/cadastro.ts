import { EnderecoUF } from '@/types/schemas';
import * as z from 'zod/v4';

export const Passo1EmailSchema = z.object({
    email: z
        .email('E-mail inválido')
        .nonempty('Informe o e-mail'),
    emailConfirma: z
        .email('E-mail de confirmação inválido')
        .nonempty('Confirme o e-mail'),
}).refine((data) => data.email === data.emailConfirma, {
    path: ['emailConfirma'],
    error: 'Confirme se os e-mails coincidem'
});

export const Passo2NomeSchema = z.object({
    nome: z
        .string()
        .nonempty('Informe seu nome')
        .min(3, 'O nome informado é inválido'),
    sobrenome: z
        .string()
        .nonempty('Informe um sobrenome'),
});

export const Passo3SenhaSchema = z.object({
    senha: z
        .string()
        .nonempty('Crie uma senha')
        .min(6, 'Sua senha deve ter ao menos 6 caracteres')
        .regex(/[A-Z]/, 'Sua senha deve conter ao menos uma letra maiúscula')
        .regex(/[a-z]/, 'Sua senha deve conter ao menos uma letra minúscula')
        .regex(/\d/, 'Sua senha deve conter ao menos um dígito')
        .regex(/[\W_]/, 'Sua senha deve conter ao menos um caractere especial'),
    senhaConfirma: z
        .string()
        .nonempty('Confirme a senha'),
})
.refine((data) => data.senha === data.senhaConfirma, {
    path: ['senhaConfirma'],
    message: 'As senhas não coincidem',
});

export const Passo4EnderecoSchema = z.object({
    cep: z
        .string()
        .regex(/^\d{5}-?\d{3}$/, 'CEP inválido')
        .optional(),
    logradouro: z
        .string()
        .min(3, 'Informe o logradouro')
        .optional(),
    numero: z
        .string()
        .optional(),
    complemento: z
        .string()
        .optional(),
    bairro: z
        .string()
        .min(3, 'Informe o bairro')
        .optional(),
    cidade: z
        .string()
        .min(3, 'Informe a cidade')
        .optional(),
    estado: z
        .custom<EnderecoUF>()
        .optional(),
});

export const CadastroSchema = z.object({
    passo1Email: Passo1EmailSchema,
    passo2Nome: Passo2NomeSchema,
    passo3Senha: Passo3SenhaSchema,
    passo4Endereco: Passo4EnderecoSchema,
});

export type Passo1EmailSchema = z.infer<typeof Passo1EmailSchema>;
export type Passo2NomeSchema = z.infer<typeof Passo2NomeSchema>;
export type Passo3SenhaSchema = z.infer<typeof Passo3SenhaSchema>;
export type Passo4EnderecoSchema = z.infer<typeof Passo4EnderecoSchema>;

export type CadastroSchema = z.infer<typeof CadastroSchema>;
