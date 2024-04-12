import { AlertaListagem, AlertasFromServer } from "./models/Alerta";

export default function parserAlertasFromServer(alertas: AlertasFromServer[]): AlertaListagem[] {
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