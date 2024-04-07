import { Estacao } from "./models/Estacao";
import { ListagemParametroSchema } from "./models/Parametro";

const tipoParametrosPlaceholder: ListagemParametroSchema[] = [
    {
        idTipoParametro: 1,
        nomeTipoParametro: "Temperatura",
        unidadeTipoParametro: "°C",
        fatorTipoParametro: "1"
    },
    {
        idTipoParametro: 2,
        nomeTipoParametro: "Umidade",
        unidadeTipoParametro: "%",
        fatorTipoParametro: "1"
    }
]

const estacaoPlaceholder: Estacao = {
    idEstacao: 1,
    nomeEstacao: 'Caçapava 2',
    cepEstacao: "12289-486",
    ruaAvenidaEstacao: "Avenida Américo Ribeiro de Souza",
    numeroEnderecoEstacao: "260",
    bairroEstacao: "Jardim Panorama",
    cidadeEstacao: "Caçapava",
    estadoEstacao: "SP",
    latitudeEstacao: -23.07037930,
    longitudeEstacao: -45.71816510,
    tipoParametros: tipoParametrosPlaceholder
}



export { estacaoPlaceholder };