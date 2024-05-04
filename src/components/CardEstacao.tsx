import { EstacaoListagemPublic } from "@lib/models/Estacao";

interface CardEstacaoProps {
    estacao: EstacaoListagemPublic
    onClick?: () => void
}
export default function CardEstacao({ estacao, onClick: redirecionar }: CardEstacaoProps) {
    return (
        <div className="flex flex-col gap-2 px-4 py-3 bg-bg-100 rounded-md drop-shadow border border-bg-100 cursor-pointer hover:border-secondary-65" key={estacao.idEstacao} onClick={redirecionar}>
            <span className="font-medium text-text-on-background">{estacao.nomeEstacao}</span>
            <span className="text-sm text-neutral-47">{`${estacao.ruaAvenidaEstacao}, ${estacao.numeroEnderecoEstacao} - ${estacao.bairroEstacao} - ${estacao.cidadeEstacao} - ${estacao.estadoEstacao}`}</span>
        </div>
    )
}