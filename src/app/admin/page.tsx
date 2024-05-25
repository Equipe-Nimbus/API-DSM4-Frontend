'use client';
import { AuthContext } from "@contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import Card from "@components/Card";
import { AdminDashboard } from "@components/AdminDashboard";
import { AlertasPorMes, UltimosAlertasDashboard } from "@lib/models/Alerta";
import { EstacoesAtivasPorMes } from "@lib/models/Dashboard";
import { RiArrowDownSFill } from "react-icons/ri";
import { FaSortAmountUp } from "react-icons/fa"
import { LuAlertCircle } from "react-icons/lu";
import dashboardRequests from "@services/requests/dashboardRequest";


//Imports de placeholders
import { ultimosAlertasPlaceholder, alertasPorMesPlaceholder } from "@lib/dashboardPlaceholderData";
import { useRouter } from "next/navigation";


export default function HomeAdmin() {
    const [totalEstacoes, setTotalEstacoes] = useState(0);
    const [estacoesAtivas, setEstacoesAtivas] = useState<EstacoesAtivasPorMes>({} as EstacoesAtivasPorMes);
    const [alertasDoMes, setAlertasDoMes] = useState<AlertasPorMes>({} as AlertasPorMes)
    const [historicoAlertas, setHistoricoAlertas] = useState<UltimosAlertasDashboard>({} as UltimosAlertasDashboard)
    const [loading, setLoading] = useState(true)
    const { currentUser } = useContext(AuthContext);
    const router = useRouter()

    useEffect(() => {
        dashboardRequests.getDashboardGeral()
            .then((response) => {
                const { data } = response;
                const ativasPorMes = data.estacoes.ativasPorMes
                //console.log(ativasPorMes)
                setTotalEstacoes(data.estacoes.numeroTotalEstacoes)
                setEstacoesAtivas(ativasPorMes)
                setAlertasDoMes(alertasPorMesPlaceholder)
                setHistoricoAlertas(ultimosAlertasPlaceholder)
            })
            .finally(() => setLoading(false))
    }, [])

    return (
        <>
            <div className="bg-bg-100 p-4 rounded-md drop-shadow">
                <h1 className="text-text-on-background text-base font-medium">Bem-Vindo(a), {currentUser?.nomeUsuario}.</h1>
            </div>
            <div className="flex items-center gap-2">
                <span>Acessos</span>
                <span><RiArrowDownSFill /></span>
            </div>
            <div className="flex flex-wrap justify-between gap-10">
                <Card imageSrc="/station-icon.svg" altText="station icon" title="Estações" buttonText="Acessar" linkTo="/admin/estacoes/listagem" />
                <Card imageSrc="/parameter-icon.svg" altText="parameter icon" title="Parâmetros" buttonText="Acessar" linkTo="/admin/parametros/listagem" />
                <Card imageSrc="/alert-icon.svg" altText="alert icon" title="Alertas" buttonText="Acessar" linkTo="/admin/alertas/listagem" />
                <Card imageSrc="/user-icon.svg" altText="user icon" title="Usuários" buttonText="Acessar" linkTo="/admin/usuarios/listagem" />
            </div>
            <div className="flex items-center gap-2">
                <span>Informações do sistema</span>
                <span><RiArrowDownSFill /></span>
            </div>
            {loading ?
                <p>Carregando...</p>
                :
                <AdminDashboard.Root>
                    <div className="flex gap-5">
                        <AdminDashboard.EstacoesAtivas estacoesAtivas={estacoesAtivas} />
                        <div className="flex flex-col gap-5">
                            <div className="flex gap-5 w-fit">
                                <AdminDashboard.Card icon={FaSortAmountUp} title="Total de Estações" value={totalEstacoes} />
                                <AdminDashboard.Card icon={LuAlertCircle} title="Alertas este mês" value={`${alertasDoMes.totalAlertas}`} />
                            </div>
                            <div className="w-full min-w-[550px] flex flex-col p-4 gap-3 bg-bg-100 rounded-md drop-shadow">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-lg font-medium text-text-on-background">Últimos alertas disparados</h1>
                                    <span className="text-sm text-primary-65 cursor-pointer" onClick={() => router.push(`/admin/alertas/historico`)}>Ver todos</span>
                                </div>
                                <table className="w-full">
                                    <thead className="text-text-on-background-disabled text-sm border-b-2 border-text-on-background-disabled">
                                        <tr>
                                            <th className="font-medium text-left">ALERTA</th>
                                            <th className="font-medium text-left">CIDADE</th>
                                            <th className="font-medium text-left">DATA</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-text-on-background">
                                        {historicoAlertas?.alertas?.map((alerta, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="py-4 w-2/3 max-w-38 truncate pr-3">{alerta.nomeAlerta}</td>
                                                    <td className="w-1/3 max-w-38 truncate pr-3">{`${alerta.cidadeAlerta} - ${alerta.estadoAlerta}`}</td>
                                                    <td className="w-1/3 max-w-38 truncate">{alerta.dataMedida}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-5">
                        <AdminDashboard.AlertasPorEstado alertasDoMes={alertasDoMes} />
                        <AdminDashboard.AlertasPorParametro alertasDoMes={alertasDoMes} />
                    </div>
                </AdminDashboard.Root>
            }
        </>
    )
}