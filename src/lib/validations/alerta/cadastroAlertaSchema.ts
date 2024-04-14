import zod from 'zod';

export const cadastroAlertaSchema = zod.object({
    idEstacao: zod
        .coerce
        .number()
        .min(1, { message: 'Estação é obrigatória' }),
    idTipoParametro: zod
        .coerce
        .number({ invalid_type_error: 'Valor de medição do alerta é obrigatório'})
        .min(1, { message: 'Tipo de parâmetro é obrigatório' }),
    nomeAlerta: zod
        .string()
        .min(1, { message: 'Nome do alerta é obrigatório' })
        .max(255, { message: 'Nome do alerta deve ter no máximo 255 caracteres' }),
    condicaoAlerta: zod
        .string()
        .min(1, { message: 'Condição do alerta é obrigatória' }),
    valorMedicaoAlerta: zod
        .coerce
        .number({ invalid_type_error: 'Valor de medição do alerta é obrigatório'})
})