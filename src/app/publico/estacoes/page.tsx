'use client'
import { EstacaoListagemPublic } from "@lib/models/Estacao"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Input from "@components/Input"
import { Button } from "@components/Button"
import dynamic from "next/dynamic"
const MapaEstacoes = dynamic(() => import("@components/MapaEstacoes"), { ssr: false })

//import de placeholder
import { estacoesAtivas } from "@lib/homePublicaPlaceholderData"
import { FiltroEstacaoSchema } from "@lib/validations/estacao/filtroEstacaoSchema"

export default function HomePublica() {
    const [estacoes, setEstacoes] = useState<EstacaoListagemPublic[]>([])
    const [key, setKey] = useState(0)
    const [pagina, setPagina] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)
    const [filterSubmitted, setFilterSubmitted] = useState<FiltroEstacaoSchema | null>(null)
    const hasMorePages = pagina < totalPaginas;

    const { register, handleSubmit } = useForm()
    function handleFiltroEstacao(data: FiltroEstacaoSchema) {
        setFilterSubmitted(data);
        setKey(prev => prev + 1);

        if (pagina !== 1) {
            setPagina(1);
        }
    }

    useEffect(() => {
        setEstacoes(estacoesAtivas) // Substituir pelo request de estacoes  
    }, [])

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
                {estacoes?.map((estacao) => (
                    <div className="flex flex-col gap-2 px-4 py-3 bg-bg-100 rounded-md drop-shadow border border-bg-100 cursor-pointer hover:border-secondary-65" key={estacao.idEstacao}>
                        <span className="font-medium text-text-on-background">{estacao.nomeEstacao}</span>
                        <span className="text-sm text-neutral-47">{`${estacao.ruaAvenidaEstacao}, ${estacao.numeroEnderecoEstacao} - ${estacao.bairroEstacao} - ${estacao.cidadeEstacao} - ${estacao.estadoEstacao}`}</span>
                    </div>
                ))
                }
                <div className="flex justify-end">
                    <div className="bg-bg-100 w-fit px-2 py-2 rounded-md drop-shadow flex gap-2 items-center justify-items-end">
                        <Button text="Anterior" variant="ghost" onClick={() => setPagina(pagina - 1)} disabled={pagina <= 1} />
                        <span className="text-text-on-background font-medium">{pagina} de {totalPaginas}</span>
                        <Button text="Próximo" variant="ghost" onClick={() => setPagina(pagina + 1)} disabled={!hasMorePages} />
                    </div>
                </div>
            </div>
        </>
    )
}