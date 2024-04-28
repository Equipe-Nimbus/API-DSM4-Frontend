import { AlertasPorMes, UltimoAlertaDashboard } from "./models/Alerta";
import { EstacoesAtivasPorMes } from "./models/Estacao";

export const totalEstacoesPlaceholder = 50;
export const ultimoAlertaPlaceholder: UltimoAlertaDashboard = {
    nomeAlerta: "Alta temperatura crítica",
    valorMedida: 45,
    unidadeTipoParametro: "°C",
    dataMedida: "2021-10-10"
}

export const estacoesAtivasPlaceholder: EstacoesAtivasPorMes = {
    quantidade: [10, 12, 8, 15, 5, 9, 11, 13, 7, 14, 6, 10],
    meses: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
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