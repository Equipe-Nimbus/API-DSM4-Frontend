import zod from "zod";

export const cadastroParametroSchema = zod.object({
    nomeTipoParametro: zod
        .string()
        .min(1, { message: 'Nome do tipo de parâmetro é obrigatório' })
        .max(255, { message: 'Nome do tipo de parâmetro deve ter no máximo 255 caracteres' }),
    unidadeTipoParametro: zod
        .string()
        .min(1, { message: 'Unidade do tipo de parâmetro é obrigatório' })
        .max(255, { message: 'Unidade do tipo de parâmetro deve ter no máximo 255 caracteres' }),
    fatorTipoParametro: zod
        .coerce.number()
        .optional(),
    offsetTipoParametro: zod
        .coerce.number()
        .optional(),
});
