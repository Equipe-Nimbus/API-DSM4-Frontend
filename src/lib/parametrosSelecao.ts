import { ListagemParametroSchema } from "./models/Parametro";
import { Option } from "@components/Select";

export default function mapeiaParametrosSelecao(parametros: ListagemParametroSchema[]): Array<Option> {
    return parametros.map(parametro => {
        if(parametro.fatorTipoParametro === "1"){
            return {
                value: String(parametro.idTipoParametro),
                label: `${parametro.nomeTipoParametro} ${parametro.unidadeTipoParametro}`
            }
        }
        return {
            value: String(parametro.idTipoParametro),
            label: `${parametro.nomeTipoParametro} ${parametro.unidadeTipoParametro} - fator ${parametro.fatorTipoParametro}`
        }
    })
}