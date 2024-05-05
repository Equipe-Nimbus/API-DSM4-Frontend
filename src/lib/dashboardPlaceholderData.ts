import { AlertasPorMes, UltimosAlertasDashboard } from "./models/Alerta";

export const totalEstacoesPlaceholder = 50;
export const ultimosAlertasPlaceholder: UltimosAlertasDashboard = {
    alertas: [
        {
            nomeAlerta: "Alerta de chuva",
            cidadeAlerta: "São Paulo",
            estadoAlerta: "SP",
            dataMedida: "2021-09-01"
        },
        {
            nomeAlerta: "Alta temperatura",
            cidadeAlerta: "Rio de Janeiro",
            estadoAlerta: "RJ",
            dataMedida: "2021-09-02"
        },
        {
            nomeAlerta: "Ventos fortes",
            cidadeAlerta: "Belo Horizonte",
            estadoAlerta: "MG",
            dataMedida: "2021-09-03"
        }
    ]
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