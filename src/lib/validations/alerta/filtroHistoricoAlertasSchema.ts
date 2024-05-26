import zod from 'zod';

export const filtroHistoricoAlertasSchema = zod.object({
    dataInicio: zod
        .string()
        .min(10, { message: 'Data de início inválida' }),
    dataFim: zod
        .string()
        .min(10, { message: 'Data de fim inválida' })
});