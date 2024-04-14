import zod from 'zod';
import validarCPF from '@lib/validations/validarCPF';

const cadastroUsuarioSchema = zod.object({
    nomeUsuario: zod
        .string()
        .min(1, { message: 'Nome é obrigatório' })
        .max(255, { message: 'Máximo de caracteres é 255' })
        .trim(),
    cpfUsuario: zod
        .string()
        .length(14, { message: 'CPF inválido' })
        .refine(validarCPF, { message: 'CPF inválido' }),
    dataNascimentoUsuario: zod
        .string()
        .min(1, { message: 'Data de nascimento é obrigatória' }),
    emailUsuario: zod
        .string()
        .email({ message: 'E-mail inválido' })
        .min(1, { message: 'E-mail é obrigatório' }),
    senhaUsuario: zod
        .string()
        .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
        .max(255, { message: 'Máximo de caracteres é 255' }),
    perfilUsuario: zod
        .string()
        .min(1, { message: 'Perfil é obrigatório' }),
    cepUsuario: zod
        .string()
        .length(9, { message: 'CEP inválido' }),
    ruaAvenidaUsuario: zod
        .string()
        .min(1, { message: 'Rua/Avenida é obrigatório' })
        .max(255, { message: 'Máximo de caracteres é 255' }),
    numeroCasaUsuario: zod
        .string()
        .min(1, { message: 'Número é obrigatório' })
        .max(10, { message: 'Máximo de caracteres é 10' }),
    cidadeUsuario: zod
        .string()
        .min(1, { message: 'Cidade é obrigatório' })
        .max(255, { message: 'Máximo de caracteres é 255' }),
    bairroUsuario: zod
        .string()
        .min(1, { message: 'Bairro é obrigatório' })
        .max(255, { message: 'Máximo de caracteres é 255' }),
    estadoUsuario: zod
        .string()
        .min(1, { message: 'Estado é obrigatório' }),
});


export { cadastroUsuarioSchema };
