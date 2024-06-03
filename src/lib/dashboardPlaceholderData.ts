import { AlertasPorMes, OcorrenciaAlerta } from "./models/Alerta";
import { MedicaoRelatorio } from "./models/Medicao";
import { ParametroRelatorioMinMax } from "./models/Relatorios";

export const totalEstacoesPlaceholder = 50;
export const ultimosAlertasPlaceholder: OcorrenciaAlerta[] = [
        {
            nomeAlerta: "Alerta de chuva",
            cidadeAlerta: "São Paulo",
            estadoAlerta: "SP",
            dataMedida: "2021-09-01",
            valorMedida: 80,
            nomeTipoParametro: "PRECIPITAÇÃO",
            unidadeTipoParametro: "mm"
        },
        {
            nomeAlerta: "Alta temperatura",
            cidadeAlerta: "Rio de Janeiro",
            estadoAlerta: "RJ",
            dataMedida: "2021-09-02",
            valorMedida: 39,
            nomeTipoParametro: "TEMPERATURA",
            unidadeTipoParametro: "ºC"
        },
        {
            nomeAlerta: "Ventos fortes",
            cidadeAlerta: "Belo Horizonte",
            estadoAlerta: "MG",
            dataMedida: "2021-09-03",
            valorMedida: 15,
            nomeTipoParametro: "VELOCIDADE DO VENTO",
            unidadeTipoParametro: "m/s"
        }
]



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

export const medicoesRelatorioPlaceholder: MedicaoRelatorio[] = [
    { idMedicao: 1, dataMedicao: '2024-05-01T08:00:00', valorMedicao: 25.3, nomeTipoParametro: 'Temperatura', unidadeTipoParametro: 'ºC' },
    { idMedicao: 2, dataMedicao: '2024-05-01T09:00:00', valorMedicao: 60.1, nomeTipoParametro: 'Umidade', unidadeTipoParametro: '%' },
    { idMedicao: 3, dataMedicao: '2024-05-02T10:00:00', valorMedicao: 26.4, nomeTipoParametro: 'Temperatura', unidadeTipoParametro: 'ºC' },
    { idMedicao: 4, dataMedicao: '2024-05-02T11:00:00', valorMedicao: 58.7, nomeTipoParametro: 'Umidade', unidadeTipoParametro: '%' },
    { idMedicao: 5, dataMedicao: '2024-05-03T12:00:00', valorMedicao: 24.8, nomeTipoParametro: 'Temperatura', unidadeTipoParametro: 'ºC' },
    { idMedicao: 6, dataMedicao: '2024-05-03T13:00:00', valorMedicao: 62.3, nomeTipoParametro: 'Umidade', unidadeTipoParametro: '%' },
    { idMedicao: 7, dataMedicao: '2024-05-04T14:00:00', valorMedicao: 27.1, nomeTipoParametro: 'Temperatura', unidadeTipoParametro: 'ºC' },
    { idMedicao: 8, dataMedicao: '2024-05-04T15:00:00', valorMedicao: 59.2, nomeTipoParametro: 'Umidade', unidadeTipoParametro: '%' },
    { idMedicao: 9, dataMedicao: '2024-05-05T16:00:00', valorMedicao: 25.9, nomeTipoParametro: 'Temperatura', unidadeTipoParametro: 'ºC' },
    { idMedicao: 10, dataMedicao: '2024-05-05T17:00:00', valorMedicao: 61.0, nomeTipoParametro: 'Umidade', unidadeTipoParametro: '%' },
    { idMedicao: 11, dataMedicao: '2024-05-06T18:00:00', valorMedicao: 26.7, nomeTipoParametro: 'Temperatura', unidadeTipoParametro: 'ºC' },
    { idMedicao: 12, dataMedicao: '2024-05-06T19:00:00', valorMedicao: 60.5, nomeTipoParametro: 'Umidade', unidadeTipoParametro: '%' },
    { idMedicao: 13, dataMedicao: '2024-05-07T20:00:00', valorMedicao: 24.5, nomeTipoParametro: 'Temperatura', unidadeTipoParametro: 'ºC' },
    { idMedicao: 14, dataMedicao: '2024-05-07T21:00:00', valorMedicao: 63.1, nomeTipoParametro: 'Umidade', unidadeTipoParametro: '%' },
    { idMedicao: 15, dataMedicao: '2024-05-08T22:00:00', valorMedicao: 28.3, nomeTipoParametro: 'Temperatura', unidadeTipoParametro: 'ºC' },
    { idMedicao: 16, dataMedicao: '2024-05-08T23:00:00', valorMedicao: 57.8, nomeTipoParametro: 'Umidade', unidadeTipoParametro: '%' },
    { idMedicao: 17, dataMedicao: '2024-05-09T07:00:00', valorMedicao: 25.2, nomeTipoParametro: 'Temperatura', unidadeTipoParametro: 'ºC' },
    { idMedicao: 18, dataMedicao: '2024-05-09T08:00:00', valorMedicao: 62.0, nomeTipoParametro: 'Umidade', unidadeTipoParametro: '%' },
    { idMedicao: 19, dataMedicao: '2024-05-10T09:00:00', valorMedicao: 27.6, nomeTipoParametro: 'Temperatura', unidadeTipoParametro: 'ºC' },
    { idMedicao: 20, dataMedicao: '2024-05-10T10:00:00', valorMedicao: 59.7, nomeTipoParametro: 'Umidade', unidadeTipoParametro: '%' }
]

export const relatorioMinMaxPlaceholder: ParametroRelatorioMinMax[] =[
    {
        nomeTipoParametro: 'TEMPERATURA',
        unidadeTipoParametro: 'ºC',
        minimosMaximos: {
            maximos: [30, 31, 32, 33, 34],
            minimos: [14, 14, 16, 12, 17],
            mesAno: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
        }
            
    },
    {
        nomeTipoParametro: 'PRECIPITACAO',
        unidadeTipoParametro: 'mm',
        minimosMaximos: {
            maximos: [60, 70, 80, 90, 100],
            minimos: [0, 0, 0, 0, 0],
            mesAno: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
        }
    }
]