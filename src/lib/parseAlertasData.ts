import { Alerta, AlertaListagem, AlertasFromServer } from "./models/Alerta";

export function parserAlertaFromServer(alerta: AlertasFromServer): Alerta {
    return {
        idAlerta: alerta.idAlerta,
        nomeAlerta: alerta.nomeAlerta,
        condicaoAlerta: alerta.condicaoAlerta,
        valorMedicaoAlerta: alerta.valorMedicaoAlerta,
        idEstacao: alerta.parametro.estacoes.idEstacao,
        idTipoParametro: alerta.parametro.__tiposParametro__.idTipoParametro
    }
}

export function parserAlertasArrayFromServer(alertas: AlertasFromServer[]): AlertaListagem[] {
    return alertas.map((alerta) => {
        return {
            idAlerta: alerta.idAlerta,
            nomeAlerta: alerta.nomeAlerta,
            condicaoAlerta: alerta.condicaoAlerta,
            valorMedicaoAlerta: alerta.valorMedicaoAlerta,
            estacao: alerta.parametro.estacoes,
            tipoParametro: alerta.parametro.__tiposParametro__
        }
    });
}
