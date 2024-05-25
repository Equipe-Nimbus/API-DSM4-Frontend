export interface MedicaoRelatorio {
    idMedicao: number;
    dataMedicao: string;
    valorMedicao: number;
    nomeTipoParametro: string;
    unidadeTipoParametro: string;
}

export interface MedicaoFromServer {
    medicao_idMedicao: number;
    medicao_unixTime: number;
    medicao_valorMedida: string;
    tiposParametro_nomeTipoParametro: string;
    tiposParametro_unidadeTipoParametro: string;
}