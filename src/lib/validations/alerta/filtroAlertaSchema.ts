import zod from 'zod';

export const filtroAlertaSchema = zod.object({
    nome: zod
        .string()
        .optional()
})

export type FiltroAlertaSchema = zod.infer<typeof filtroAlertaSchema>;