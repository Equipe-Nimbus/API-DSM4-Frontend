import { AlertasPorMes, UltimoAlertaDashboard } from "./models/Alerta";

export const totalEstacoesPlaceholder = 50;
export const ultimoAlertaPlaceholder: UltimoAlertaDashboard = {
    nomeAlerta: "Alta temperatura crítica",
    valorMedida: 45,
    unidadeTipoParametro: "°C",
    dataMedida: "2021-10-10"
}


export const alertasPorMesPlaceholder: AlertasPorMes = {
    totalAlertas: 30,
    relacaoEstado: {
        valorPorEstado: [10, 9, 3, 2, 5],
        estados: ["RJ", "SP", "MG", "ES", "Outros"]
    },
    relacaoTipoParametro: {
        valorPorTipoParametro: [12, 10, 5, 2, 1],
        tipoParametros: ["Precipitação", "Temperatura", "Velocidade do Vento", "Umidade", "Outros"]
    }
}