import { filtroRelatorioMedicoesSchema } from "@lib/validations/relatorios/filtroRelatorioMedicoes";
import zod from "zod";

export type FiltroRelatorioMedicoesSchema = zod.infer<typeof filtroRelatorioMedicoesSchema>;