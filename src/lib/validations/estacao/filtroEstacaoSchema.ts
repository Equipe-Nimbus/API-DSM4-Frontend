import zod from 'zod';

const filtroEstacaoSchema = zod.object({
    nome: zod
        .string()
        .optional(),
    cidade: zod
        .string()
        .optional(),
})

export type FiltroEstacaoSchema = zod.infer<typeof filtroEstacaoSchema>;
export default filtroEstacaoSchema;