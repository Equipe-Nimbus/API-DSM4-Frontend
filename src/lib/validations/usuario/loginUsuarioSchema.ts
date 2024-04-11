import zod from 'zod';

export const loginUsuarioSchema = zod.object({
    email: zod
        .string()
        .email({ message: 'E-mail inválido'}),
    senha: zod
        .string()
        .min(6, { message: 'Senha deve ter no mínimo 6 caracteres'}),
});