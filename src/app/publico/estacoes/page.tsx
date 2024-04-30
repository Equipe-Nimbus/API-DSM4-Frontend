'use client'
import { EstacaoListagemPublic } from "@lib/models/Estacao"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Input from "@components/Input"
import { Button } from "@components/Button"
import dynamic from "next/dynamic"
const MapaEstacoes = dynamic(() => import("@components/MapaEstacoes"), { ssr: false })
import { FiltroEstacaoSchema } from "@lib/validations/estacao/filtroEstacaoSchema"
import estacaoRequests from "@services/requests/estacaoRequests"
import { usePagination } from "src/hooks/usePagination"

export default function HomePublica() {
    const [estacoes, setEstacoes] = useState<EstacaoListagemPublic[]>([])
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [filterSubmitted, setFilterSubmitted] = useState<FiltroEstacaoSchema | null>(null)

    const estacoesPorPagina = 10;
    const { page, currentItems, nextPage, prevPage } = usePagination(estacoes, estacoesPorPagina);
    const hasMorePages = page < totalPaginas;
    

    const { register, handleSubmit } = useForm()
    function handleFiltroEstacao(data: FiltroEstacaoSchema) {
        return setFilterSubmitted(data)
    }

    useEffect(() => {
        estacaoRequests.getPublic()
            .then((response) => {
                const { data } = response;
                const totalPaginas = Math.ceil(data.length / estacoesPorPagina);
                setEstacoes(data);
                setTotalPaginas(totalPaginas);
            })
    }, [estacoesPorPagina])

    return (
        <>
            <div className="bg-bg-100 p-4 rounded-md drop-shadow">
                <h1 className="text-text-on-background text-base font-medium">Estações Meteorológicas Disponíveis</h1>
            </div>
            <MapaEstacoes estacoes={estacoes}/>
            <div className="flex flex-col gap-2">
            <form onSubmit={handleSubmit(handleFiltroEstacao)} className="bg-bg-100 p-4 rounded-md drop-shadow flex gap-4">
                <Input width="w-60" placeholder="Nome da estação..." {...register("nome")} />
                <Input width="w-52" placeholder="Endereço..." {...register("cidade")} />
                <Button type="submit" variant="ghost" text="Filtrar" />
            </form>
                {currentItems?.map((estacao) => (
                    <div className="flex flex-col gap-2 px-4 py-3 bg-bg-100 rounded-md drop-shadow border border-bg-100 cursor-pointer hover:border-secondary-65" key={estacao.idEstacao}>
                        <span className="font-medium text-text-on-background">{estacao.nomeEstacao}</span>
                        <span className="text-sm text-neutral-47">{`${estacao.ruaAvenidaEstacao}, ${estacao.numeroEnderecoEstacao} - ${estacao.bairroEstacao} - ${estacao.cidadeEstacao} - ${estacao.estadoEstacao}`}</span>
                    </div>
                ))
                }
                <div className="flex justify-end">
                    <div className="bg-bg-100 w-fit px-2 py-2 rounded-md drop-shadow flex gap-2 items-center justify-items-end">
                        <Button text="Anterior" variant="ghost" onClick={prevPage} disabled={page <= 1} />
                        <span className="text-text-on-background font-medium">{page} de {totalPaginas}</span>
                        <Button text="Próximo" variant="ghost" onClick={nextPage} disabled={!hasMorePages} />
                    </div>
                </div>
            </div>
        </>
    )
}