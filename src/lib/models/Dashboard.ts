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
        ultimoAlerta: {
            nomeAlerta: string;
            dataMedida: string;
            valorMedida: number;
            unidadeTipoParametro: string;
        };
        alertasDoMes: {
            totalAlertas: number;
            relacaoEstados: {
                estados: string[];
                valorPorEstado: number[];
            };
            relacaoTipoParametro: {
                tiposParametros: string[];
                valorTipoParametro: number[];
            };
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
}