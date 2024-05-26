import { filtroRelatorioMedicoesSchema } from "@lib/validations/relatorios/filtroRelatorioMedicoes";
import { filtroRelatorioMinMax } from "@lib/validations/relatorios/filtroRelatorioMinMax";
import zod from "zod";

export type FiltroRelatorioMedicoesSchema = zod.infer<typeof filtroRelatorioMedicoesSchema>;

export type FiltroRelatorioMinMax = zod.infer<typeof filtroRelatorioMinMax>;

export interface ParametroRelatorioMinMax {
    nomeTipoParametro: string;
    unidadeMedida: string;
    meses: string[];
    valoresMaximos: number[];
    valoresMinimos: number[];
}