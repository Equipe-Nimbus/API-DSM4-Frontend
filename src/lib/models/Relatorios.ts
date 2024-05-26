import { filtroHistoricoAlertasSchema } from "@lib/validations/alerta/filtroHistoricoAlertasSchema";
import { filtroRelatorioMedicoesSchema } from "@lib/validations/relatorios/filtroRelatorioMedicoes";
import zod from "zod";

export type FiltroRelatorioMedicoesSchema = zod.infer<typeof filtroRelatorioMedicoesSchema>;

export type FiltroHistoricoAlertasSchema = zod.infer<typeof filtroHistoricoAlertasSchema>;