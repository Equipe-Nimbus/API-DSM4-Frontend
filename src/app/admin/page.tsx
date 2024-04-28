'use client';
import { AuthContext } from "@contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import Card from "@components/Card";
import { AdminDashboard } from "@components/AdminDashboard";
import { AlertasPorMes, UltimoAlertaDashboard } from "@lib/models/Alerta";
import { EstacoesAtivasPorMes } from "@lib/models/Estacao";
import { RiArrowDownSFill } from "react-icons/ri";
import { FaSortAmountUp } from "react-icons/fa"

//Imports de placeholders
import { totalEstacoesPlaceholder, ultimoAlertaPlaceholder, estacoesAtivasPlaceholder, alertasPorMesPlaceholder } from "@lib/dashboardPlaceholderData";

export default function HomeAdmin() {
    const [totalEstacoes, setTotalEstacoes] = useState(0);
    const [ultimoAlerta, setUltimoAlerta] = useState<UltimoAlertaDashboard>({} as UltimoAlertaDashboard);
    const [estacoesAtivas, setEstacoesAtivas] = useState<EstacoesAtivasPorMes>({} as EstacoesAtivasPorMes);
    const [alertasDoMes, setAlertasDoMes] = useState<AlertasPorMes>({} as AlertasPorMes)
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        setTotalEstacoes(totalEstacoesPlaceholder)
        setUltimoAlerta(ultimoAlertaPlaceholder)
        setEstacoesAtivas(estacoesAtivasPlaceholder)
        setAlertasDoMes(alertasPorMesPlaceholder)
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
            <AdminDashboard.Root>
                <div className="flex gap-5">
                    <AdminDashboard.EstacoesAtivas estacoesAtivas={estacoesAtivas}/>
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-5 w-fit">
                            <AdminDashboard.Card icon={FaSortAmountUp} title="Total de Estações" value={totalEstacoes} />
                            <AdminDashboard.Card icon={FaSortAmountUp} title="Dado Exemplo" value="XXX" />
                        </div>
                        <AdminDashboard.UltimoAlerta alerta={ultimoAlerta} />
                        <AdminDashboard.Card title="Total de alertas este mês" value={`${alertasDoMes.totalAlertas} Alertas`}/>
                    </div>
                </div>
                <div className="flex gap-5">
                    <AdminDashboard.AlertasPorEstado alertasDoMes={alertasDoMes}/>
                    <AdminDashboard.AlertasPorParametro alertasDoMes={alertasDoMes}/>
                </div>
            </AdminDashboard.Root>
            
        </>
    )
}