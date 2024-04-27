import { UltimoAlertaDashboard } from "@lib/models/Alerta";
import { IoIosAlert } from "react-icons/io";

interface CardUltimoAlertaProps {
    alerta: UltimoAlertaDashboard;
}

export default function CardUltimoAlerta({ alerta }: CardUltimoAlertaProps) {
    return (
        <div className="flex gap-3 p-4 bg-bg-100 rounded-md drop-shadow">
            <div className="flex flex-col gap-2">
                <span className="text-text-on-background-disabled font-medium">Último Alerta</span>
                <span className="text-text-on-background text-lg font-medium">{alerta.nomeAlerta}</span>
                <span className="text-text-on-background text-lg font-medium">{`${alerta.valorMedida}${alerta.unidadeTipoParametro}`}</span>
            </div>
            <div className="flex grow justify-center items-center">
                <IoIosAlert size={50} className="text-accent-74" />
            </div>
        </div>
    )
}