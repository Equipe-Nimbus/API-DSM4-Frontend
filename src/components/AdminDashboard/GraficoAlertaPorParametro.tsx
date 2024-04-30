import { useState, useEffect, use } from "react"
import dynamic from "next/dynamic"
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { AlertasPorMes } from "@lib/models/Alerta";
import { RiStopMiniFill } from "react-icons/ri";

interface GraficoAlertaPorEstadoProps {
    alertasDoMes: AlertasPorMes
}

export default function GraficoAlertaPorParametro({ alertasDoMes }: GraficoAlertaPorEstadoProps) {

    const [options, setOptions] = useState<ApexOptions>({});
    const [series, setSeries] = useState<ApexNonAxisChartSeries>([]);

    useEffect(() => {
        if (alertasDoMes && alertasDoMes.relacaoTipoParametro) {
            setOptions({
                colors: ["#5378F9", "#52ACFA", "#6452FA", "#9A52FA", "#94A3B8"],
                labels: alertasDoMes.relacaoTipoParametro.tipoParametros,
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: '14px',
                        fontFamily: 'Arial, sans-serif',
                        fontWeight: 500,

                    },
                    dropShadow: {
                        enabled: true,
                        top: 1
                    }
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'left'
                },
                plotOptions: {
                    pie: {
                        donut: {
                            size: '70%',
                            labels: {
                                show: true,
                            }

                        }
                    }
                },
                stroke: {
                    show: true,
                    width: 10,
                    colors: ['#FFF']
                },
            })

            setSeries(alertasDoMes.relacaoTipoParametro.valorPorTipoParametro)
        }
    }, [alertasDoMes])

    return (
        <div className="bg-bg-100 p-6 rounded-md drop-shadow w-fit flex flex-col items-center gap-4">
            <span className="text-lg font-medium text-text-on-background ml-4">Alertas por Parâmetros</span>
            <div className="flex gap-7 h-full items-end">
                <Chart options={options} series={series} type="donut" height={350} width={300} />
                <div className="flex flex-col gap-4 h-full justify-center">
                    {alertasDoMes.relacaoTipoParametro?.tipoParametros.map((parametro, index) => {
                        const valorCorrespondente = alertasDoMes.relacaoTipoParametro?.valorPorTipoParametro[index];
                        return (
                            <div className="flex items-center gap-2 justify-between" key={index}>
                                <div className="flex gap-3 items-center min-w-48">
                                    <RiStopMiniFill size={35} className="text-primary-65 p-0.5 bg-primary-74/20 rounded-md" />
                                    <span className="text-text-on-background font-medium">{parametro}</span>
                                </div>
                                <span className="text-text-on-background">{valorCorrespondente}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}