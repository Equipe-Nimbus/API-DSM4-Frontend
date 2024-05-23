import zod from "zod";

export const filtroRelatorioMedicoesSchema = zod.object({
    dataInicio: zod
        .string()
        .min(10, { message: "Data de início inválida" }),
    dataFim: zod
        .string()
        .min(10, { message: "Data de fim inválida" }),
    parametro: zod
        .string()
        .optional()
});