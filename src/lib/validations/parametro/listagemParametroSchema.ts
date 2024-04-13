import zod from 'zod';

export const listagemParametroSchema = zod.object({
    idTipoParametro: zod
        .number(),
    nomeTipoParametro: zod
        .string(),
    unidadeTipoParametro: zod
        .string(),
    fatorTipoParametro: zod
        .string()
        .optional()
});