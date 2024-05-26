import Link from "next/link"
import { HiArrowNarrowRight } from "react-icons/hi"

export default function HomeHistoricoAlertas() {
    return (
        <>
            <div className="bg-bg-100 p-4 rounded-md drop-shadow">
                <h1 className="text-text-on-background text-base font-medium">Histórico de alertas</h1>
            </div>
            <div className="bg-bg-100 p-4 rounded-md drop-shadow">
                <div className="flex flex-col gap-5">
                    <Link href="/publico/alertas/historico" className="flex gap-2 items-center text-lg text-text-on-background transform transition-all duration-200 hover:-translate-y-1">Histórico Geral <span><HiArrowNarrowRight size={24} className="text-text-on-background"/></span></Link>
                    <Link href="/publico/alertas/porLocal" className="flex gap-2 items-center text-lg text-text-on-background transform transition-all duration-200 hover:-translate-y-1">Alertas por localidade <span><HiArrowNarrowRight size={24} className="text-text-on-background"/></span></Link>
                </div>
            </div>
        </>
    )
}