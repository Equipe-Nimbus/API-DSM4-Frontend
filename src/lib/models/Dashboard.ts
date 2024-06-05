import { OcorrenciaAlerta } from "./Alerta";

export interface EstacoesAtivasPorMes {
    quantidades: number[],
    meses: string[]
}

export interface DashboardGeral {
    estacoes: {
        numeroTotalEstacoes: number;
        ativasPorMes: EstacoesAtivasPorMes
    };
    alertas: {
        ultimosAlerta: OcorrenciaAlerta[];
        alertasDoMes: {
            totalAlertas: number,
            relacaoTipoParametro: {
                valorTipoParametro: number[],
                tiposParametros: string[]
            },
            relacaoEstado: {
                valorPorEstado: number[],
                estados: string[]
            }
        };
    };
};

export interface ParametroDashboard {
    nomeTipoParametro: string;
    unidadeMedida: string;
    valorMaximo: number;
    valorMinimo: number;
    medicoes: [
        {
            valor: number;
            data: string;
        }
    ],
    alertas: [
        {
            valor: number;
            data: string;
        }
    ]
}

export interface DashboardEstacao {
    parametros: ParametroDashboard[]
    alertas: {
        alertasNome: string[]
        alertasNumero: number[]
    }
}

