'use client'
import { Button } from '@components/Button';
import Input from '@components/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { OcorrenciaAlerta } from '@lib/models/Alerta';
import { FiltroHistoricoAlertasSchema } from '@lib/models/Relatorios';
import { filtroHistoricoAlertasSchema } from '@lib/validations/alerta/filtroHistoricoAlertasSchema';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiSearch2Line } from 'react-icons/ri';
import alertaRequests from '@services/requests/alertaRequests';

export default function OcorrenciasAlertas() {
    const [alertas, setAlertas] = useState<OcorrenciaAlerta[]>([])
    const [filterSubmitted, setFilterSubmitted] = useState<FiltroHistoricoAlertasSchema | null>(null)
    const { register, handleSubmit } = useForm<FiltroHistoricoAlertasSchema>({
        resolver: zodResolver(filtroHistoricoAlertasSchema)
    })

    function handleFilter(data: FiltroHistoricoAlertasSchema) {
        setFilterSubmitted(data)
    }

    useEffect(() => {
        const filter = filterSubmitted || { dataInicio: '', dataFim: '' }
        alertaRequests.getOcorrenciasAlertas(filter)
            .then((response) => {
                setAlertas(response)
            })
    }, [filterSubmitted])

    return (
        <>
            <div className="bg-bg-100 p-4 rounded-md drop-shadow">
                <h1 className="text-text-on-background text-base font-medium">Ocorrências de alertas</h1>
            </div>
            <form onSubmit={handleSubmit(handleFilter)} className="bg-bg-100 p-4 rounded-md drop-shadow flex gap-4 items-end">
                <Input width="w-52" type='date' label='Data Início'  {...register("dataInicio")} />
                <Input width="w-52" type='date' label='Data Fim'  {...register("dataFim")} />
                <Button text="Filtrar" variant="ghost" type="submit" Icon={RiSearch2Line} iconPosition="left" />
            </form>
            {
                alertas?.length > 0 ? (
                    <div className='bg-bg-100 p-4 rounded-md drop-shadow'>
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
                                {alertas?.map((alerta, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-4 w-60 max-w-80 truncate">{alerta.nomeAlerta}</td>
                                        <td className="px-4 truncate">{`${alerta.cidadeAlerta} - ${alerta.estadoAlerta}`}</td>
                                        <td className="px-4 truncate">{alerta.dataMedida}</td>
                                        <td className="px-4 truncate">{alerta.valorMedida}</td>
                                        <td className="px-4 truncate">{alerta.unidadeTipoParametro}</td>
                                        <td className="px-4 truncate">{alerta.nomeTipoParametro}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="bg-bg-100 p-8 drop-shadow border-t border-neutral-84 rounded-b-md">
                        <span className="text-text-on-background font-medium ml-3">Nenhuma ocorrência de alerta correspondente.</span>
                    </div>
                )
            }
        </>
    )
}