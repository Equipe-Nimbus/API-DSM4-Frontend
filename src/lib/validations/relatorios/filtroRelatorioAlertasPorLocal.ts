import zod from "zod";

export const filtroRelatorioAlertasPorLocal = zod.object({
    estado: zod
        .string()
        .optional(),
    cidade: zod
        .string()
        .optional(),
    dataInicio: zod
        .string()
        .min(10, { message: 'Data de início inválida' }),
    dataFim: zod
        .string()
        .min(10, { message: 'Data de fim inválida' }),
})