import { filtroHistoricoAlertasSchema } from "@lib/validations/alerta/filtroHistoricoAlertasSchema";
import { filtroRelatorioAlertasPorLocal } from "@lib/validations/relatorios/filtroRelatorioAlertasPorLocal";
import { filtroRelatorioMedicoesSchema } from "@lib/validations/relatorios/filtroRelatorioMedicoes";
import { filtroRelatorioMinMax } from "@lib/validations/relatorios/filtroRelatorioMinMax";
import zod from "zod";
import { OcorrenciaAlerta } from "./Alerta";

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

export type FiltroHistoricoAlertasSchema = zod.infer<typeof filtroHistoricoAlertasSchema>;

export type FiltroRelatorioAlertasPorLocal = zod.infer<typeof filtroRelatorioAlertasPorLocal>;

export interface RelatorioAlertasPorCidade {
    nome: string;
    estacoes: [
        {
            nome: string;
            medicoes: OcorrenciaAlerta[]
        }
    ]
}

export interface RelatorioAlertasPorEstado {
    estado: string;
    cidades: RelatorioAlertasPorCidade[]
}

