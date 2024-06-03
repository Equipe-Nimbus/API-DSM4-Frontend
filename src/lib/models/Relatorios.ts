import { filtroRelatorioMedicoesSchema } from "@lib/validations/relatorios/filtroRelatorioMedicoes";
import { filtroRelatorioMinMax } from "@lib/validations/relatorios/filtroRelatorioMinMax";
import zod from "zod";

export type FiltroRelatorioMedicoesSchema = zod.infer<typeof filtroRelatorioMedicoesSchema>;

export type FiltroRelatorioMinMax = zod.infer<typeof filtroRelatorioMinMax>;

export interface ParametroRelatorioMinMax {
    nomeTipoParametro: string;
    unidadeTipoParametro: string;
    minimosMaximos: {
        maximos: number[];
        minimos: number[];
        mesAno: string[];
    }
}