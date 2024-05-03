import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { EstacoesAtivasPorMes } from "@lib/models/Dashboard";

interface GraficoEstacoesAtivasProps {
    estacoesAtivas: EstacoesAtivasPorMes
}

export default function GraficoEstacoesAtivas({ estacoesAtivas }: GraficoEstacoesAtivasProps) {
    const [options, setOptions] = useState<ApexOptions>({});
    const [series, setSeries] = useState<ApexAxisChartSeries>([{ name: "Estações ativas", data: [] }]);

    useEffect(() => {
        if(estacoesAtivas && estacoesAtivas.meses && estacoesAtivas.quantidades){
            const maiorQuantidade = Math.max(...estacoesAtivas.quantidades);
            const maximoEixoY = Math.ceil(maiorQuantidade + (maiorQuantidade * 0.1));
            setOptions({
                colors: ["#7F9AFA"],
                fill: {
                    opacity: 1
                },
                grid: {
                    strokeDashArray: 15,
                },
                plotOptions: {
                    bar: {
                        columnWidth: "20%",
                        borderRadius: 5,
                        borderRadiusApplication: "around",
                        dataLabels: {
                            position: "top",
                        }
                    }
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        colors: ["#363636"]
                    },
                    offsetY: -25
                },
                xaxis: {
                    categories: estacoesAtivas.meses,
                    labels: {
                        style: {
                            colors: "#97A3B4"
                        }
                    },
                    axisBorder: {
                        show: false
                    }
                },
                yaxis: {
                    max: maximoEixoY,
                    axisBorder: {
                        show: true
                    },
                    axisTicks: {
                        show: true,
                    },
                    labels: {
                        show: true,
                        style: {
                            colors: "#97A3B4"
                        }
                    }
                },
                legend: {
                    show: true,
                    showForSingleSeries: true,
                    position: "top",
                    horizontalAlign: "left",
                    customLegendItems: ["6 meses"],
                    labels: {
                        colors: "#64748B"
                        
                    }
                }
            })
            
            setSeries([
                {
                    name: "Estações ativas",
                    data: estacoesAtivas.quantidades || []
                }
            ])
        }
    }, [estacoesAtivas])

    return (   
        <div className=" bg-bg-100 p-4 rounded-md drop-shadow flex-grow min-w-[900px]">
            <span className="text-lg font-medium text-text-on-background ml-4">Estações Ativas por Mês</span>
            <Chart options={options} series={series} type="bar" width={"100%"} height={318}/>
        </div>
    )
}