import { OcorrenciaAlerta } from "@lib/models/Alerta"
import { RelatorioAlertasPorCidade } from "@lib/models/Relatorios"
import { useEffect, useState } from "react"
import { LuDot } from "react-icons/lu";
import { usePagination } from "src/hooks/usePagination";
import { Button } from "./Button";

interface RelatorioAlertasCidadeProps {
    dadosRelatorio: RelatorioAlertasPorCidade;
    dataInicio: string;
    dataFim: string;
}
export default function RelatorioAlertasCidade({ dadosRelatorio, dataInicio, dataFim }: RelatorioAlertasCidadeProps) {
    const [listaOcorrencias, setListaOcorrencias] = useState<OcorrenciaAlerta[]>([])
    const [contagemAlertas, setContagemAlertas] = useState<{ nomeAlerta: string, quantidade: number }[]>([])
    const { currentItems, page, nextPage, prevPage } = usePagination(listaOcorrencias, 10)
    const [totalPaginas, setTotalPaginas] = useState(1);
    const hasMorePages = page < totalPaginas;
    useEffect(() => {
        if (!dadosRelatorio) return
        const contagemAlertas = contarAlertas(dadosRelatorio) || {};
        const contagemArray = Object.entries(contagemAlertas).map(([nomeAlerta, quantidade]) => ({ nomeAlerta, quantidade }));
        setContagemAlertas(contagemArray);
        const listaOcorrencias = gerarListaOcorrencias(dadosRelatorio)
        setListaOcorrencias(listaOcorrencias)
    }, [dadosRelatorio])

    function contarAlertas(relatorio: RelatorioAlertasPorCidade) {
        if (!relatorio.estacoes) return {};

        return relatorio.estacoes.reduce((cont: { [key: string]: number }, estacao) => {
            estacao.medicoes.forEach((medicao: OcorrenciaAlerta) => {
                cont[medicao.nomeAlerta] = (cont[medicao.nomeAlerta] || 0) + 1;
            });
            return cont;
        }, {});
    };

    function gerarListaOcorrencias(relatorio: RelatorioAlertasPorCidade) {
        if (!relatorio.estacoes) return [];
        const listaOcorrencias = relatorio.estacoes.flatMap((estacao) => estacao.medicoes);
        setTotalPaginas(Math.ceil(listaOcorrencias.length / 10))
        return listaOcorrencias;
    }

    return (
        <>
            <div className="bg-bg-100 py-6 px-10 rounded-md drop-shadow flex flex-col gap-4">
                <h1 className="text-lg font-semibold text-text-on-background">Alertas em {dadosRelatorio?.nome}</h1>
                <p className="font-medium text-text-on-background">Período: {dataInicio} a {dataFim}</p>
                <div className="flex flex-col gap-1">
                    {contagemAlertas?.map((alerta, index) => (
                        <div key={index} className="flex gap-1 items-center">
                            <LuDot size={30} className="text-text-on-background" />
                            <div className="flex gap-2">
                                <h2 className="font-medium text-text-on-background">{alerta.nomeAlerta}:</h2>
                                <p className="font-semibold text-text-on-background">{alerta.quantidade}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-bg-100 py-6 rounded-md drop-shadow flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-text-on-background px-10">Lista de ocorrências</h2>
                <table className="w-fit ml-6">
                    <thead className="text-text-on-background-disabled text-sm font-semibold border-b-2 border-text-on-background-disabled">
                        <tr>
                            <th className="p-4 text-left">ALERTA</th>
                            <th className="p-4 text-left">LOCAL</th>
                            <th className="p-4 text-left">DATA</th>
                            <th className="p-4 text-left">VALOR</th>
                            <th className="p-4 text-left">UNIDADE</th>
                            <th className="p-4 text-left">PARAMETRO</th>
                        </tr>
                    </thead>
                    <tbody className="text-text-on-background font-medium">
                        {currentItems?.map((alerta, index) => (
                            <tr key={index}>
                                <td className="px-4 py-4 w-60 max-w-80 truncate">{alerta.nomeAlerta}</td>
                                <td className="px-4 w-60 max-w-80 truncate">{`${alerta.cidadeAlerta} - ${alerta.estadoAlerta}`}</td>
                                <td className="px-4 truncate">{alerta.dataMedida}</td>
                                <td className="px-4 truncate">{alerta.valorMedida}</td>
                                <td className="px-4 truncate">{alerta.unidadeTipoParametro}</td>
                                <td className="px-4 truncate">{alerta.nomeTipoParametro}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end">
                <div className="bg-bg-100 w-fit px-2 py-2 rounded-md drop-shadow flex gap-2 items-center justify-items-end">
                    <Button text="Anterior" variant="ghost" onClick={prevPage} disabled={page <= 1} />
                    <span className="text-text-on-background font-medium">{page} de {totalPaginas}</span>
                    <Button text="Próximo" variant="ghost" onClick={nextPage} disabled={!hasMorePages} />
                </div>
            </div>

        </>
    )
}