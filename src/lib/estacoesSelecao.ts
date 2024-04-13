import { EstacaoSelect } from "./models/Estacao";

export default function mapearEstacoesSelecao(estacoes: EstacaoSelect[]) {
    return estacoes.map((estacao) => {
        return {
            value: String(estacao.idEstacao),
            label: estacao.nomeEstacao
        }
    })
}