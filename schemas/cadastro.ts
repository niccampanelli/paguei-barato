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
        .min(6, 'Sua senha deve ter no mínimo 6 caracteres')
        .regex(/[A-Z]/, 'Inclua ao menos uma letra maiúscula')
        .regex(/[a-z]/, 'Inclua ao menos uma letra minúscula')
        .regex(/\d/, 'Inclua ao menos um dígito')
        .regex(/[\W_]/, 'Inclua ao menos um caractere especial'),
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
});

export const CadastroSchema = z.object({
    passo1Email: Passo1EmailSchema,
    passo2Nome: Passo2NomeSchema,
    passo3Senha: Passo3SenhaSchema,
    passo4Endereco: Passo4EnderecoSchema,
});

export type Passo1EmailSchemaType = z.infer<typeof Passo1EmailSchema>;
export type Passo2NomeSchemaType = z.infer<typeof Passo2NomeSchema>;
export type Passo3SenhaSchemaType = z.infer<typeof Passo3SenhaSchema>;
export type Passo4EnderecoSchemaType = z.infer<typeof Passo4EnderecoSchema>;

export type CadastroSchemaType = z.infer<typeof CadastroSchema>;
