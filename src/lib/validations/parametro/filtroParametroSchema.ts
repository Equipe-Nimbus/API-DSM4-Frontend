import zod from 'zod';

const filtroParametroSchema = zod.object({
    nome: zod
        .string()
        .optional(),
    unidade: zod
        .string()
        .optional(),
    fator: zod
        .string()
        .optional(),
    offset: zod
        .string()
        .optional()
})

export type FiltroParametroSchema = zod.infer<typeof filtroParametroSchema>;
export default filtroParametroSchema;