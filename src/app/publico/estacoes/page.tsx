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
import { useRouter } from "next/navigation"
import CardEstacao from "@components/CardEstacao"

export default function HomePublica() {
    const [estacoes, setEstacoes] = useState<EstacaoListagemPublic[]>([])
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [filterSubmitted, setFilterSubmitted] = useState<FiltroEstacaoSchema | null>(null)

    const estacoesPorPagina = 10;
    const { page, currentItems, nextPage, prevPage } = usePagination(estacoes, estacoesPorPagina);
    const hasMorePages = page < totalPaginas;
    
    const router = useRouter()
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
                    <CardEstacao estacao={estacao} key={estacao.idEstacao} onClick={() => router.push(`/publico/estacoes/${estacao.idEstacao}`)} />
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