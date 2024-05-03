'use client'
import { Estacao } from "@lib/models/Estacao"
import type { DashboardEstacao } from "@lib/models/Dashboard"
import dashboardRequests from "@services/requests/dashboardRequest"
import { useEffect, useState } from "react"
import estacaoRequests from "@services/requests/estacaoRequests"
import GraficoMedicoes from "@components/EstacaoDashboard/GraficoMedicoes"
import { EstacaoDashboard } from "@components/EstacaoDashboard"


export default function DashboardEstacao({ params }: { params: {id: string} }) {
    const [estacao, setEstacao] = useState<Estacao>({} as Estacao)
    const [dashboardEstacao, setDashboardEstacao] = useState<DashboardEstacao>({} as DashboardEstacao)

    useEffect(() => {
        estacaoRequests.getById(params.id)
            .then((response) => {
                setEstacao(response.data)
            })

        dashboardRequests.getDashboardEstacoes(params.id)
            .then((response) => {
                response.data.parametros.forEach(parametro => {
                    parametro.medicoes.sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
                });
                setDashboardEstacao(response.data)
            })
    }, [params.id])

    return (
        <>
            <div className="flex flex-col gap-2 px-4 py-3 bg-bg-100 rounded-md drop-shadow" key={estacao.idEstacao}>
                <span className="text-lg font-medium text-text-on-background">{estacao.nomeEstacao}</span>
                <span className=" text-neutral-47">{`${estacao.ruaAvenidaEstacao}, ${estacao.numeroEnderecoEstacao} - ${estacao.bairroEstacao} - ${estacao.cidadeEstacao} - ${estacao.estadoEstacao}`}</span>
                <span className=" text-neutral-47">{estacao.tipoParametros?.length} Parâmetros cadastrados</span>            
            </div>
            <EstacaoDashboard.GraficoMedicoes dadosDashboard={dashboardEstacao} />
        </>
    )
}