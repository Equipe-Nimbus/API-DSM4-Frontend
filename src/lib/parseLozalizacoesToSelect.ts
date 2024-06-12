import { Option } from "@components/Select";
import estadosDoBrasil from "./models/estados";
import { LocalizacoesCadastradas } from "./models/Relatorios";

export function parseEstadosToSelect(localizacoes: LocalizacoesCadastradas[]) {
    return localizacoes.map((localizacao) => {
        const estado = estadosDoBrasil.find(estado => estado.value === localizacao.estado)
        if(estado) {
            console.log(estado)
            return {
                value: estado.value,
                label: estado.label
            }
        }
    })
};

export function parseCidadesToSelect(estado: string, localizacoes: LocalizacoesCadastradas[]){
    const estadoSelecionado = localizacoes.filter((localizacao) => localizacao.estado === estado)
    return estadoSelecionado.flatMap((localizacao) => 
        localizacao.cidades.map((cidade: any) => {
            return {
                value: cidade.cidade,
                label: cidade.cidade
            }
        }))
}