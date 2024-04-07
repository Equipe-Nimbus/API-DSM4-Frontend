import zod from 'zod';

const listagemParametroSchema = zod.object({
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

export { listagemParametroSchema };