import zod from 'zod';
import { listagemParametroSchema } from '../parametro/listagemParametroSchema';

const cadastroEstacaoSchema = zod.object({
    nomeEstacao: zod
        .string()
        .min(1, { message: 'Nome é obrigatório' })
        .max(255, { message: 'Máximo de caracteres é 255' })
        .trim(),
    cepEstacao: zod
        .string()
        .length(9, { message: 'CEP inválido' }),
    ruaAvenidaEstacao: zod
        .string()
        .min(1, { message: 'Rua/Avenida é obrigatório' })
        .max(255, { message: 'Máximo de caracteres é 255' }),
    numeroEnderecoEstacao: zod
        .string()
        .min(1, { message: 'Número é obrigatório' })
        .max(10, { message: 'Máximo de caracteres é 10' }),
    cidadeEstacao: zod
        .string()
        .min(1, { message: 'Cidade é obrigatório' })
        .max(255, { message: 'Máximo de caracteres é 255' }),
    bairroEstacao: zod
        .string()
        .min(1, { message: 'Bairro é obrigatório' })
        .max(255, { message: 'Máximo de caracteres é 255' }),
    estadoEstacao: zod
        .string()
        .min(1, { message: 'Estado é obrigatório' }),
    latitudeEstacao: zod
        .number(),
    longitudeEstacao: zod
        .number(),
    tipoParametros: zod
        .array(listagemParametroSchema).nonempty()
});

export { cadastroEstacaoSchema };
