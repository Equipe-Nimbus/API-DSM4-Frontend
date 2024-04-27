import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

//imports de placeholders
import { estacoesAtivasPlaceholder } from "@lib/dashboardPlaceholderData";


export default function GraficoEstacoesAtivas() {
    const [options, setOptions] = useState<ApexOptions>({});
    const [series, setSeries] = useState<Array<{ name: string, data: number[] }>>([]);

    useEffect(() => {
        setOptions({
            colors: ["#52ACFA"],
            fill: {
                opacity: 1
            },
            grid: {
                strokeDashArray: 15,
            },
            plotOptions: {
                bar: {
                    columnWidth: "15%",
                    borderRadius: 10,
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
                categories: estacoesAtivasPlaceholder.meses,
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
            }
        })

        setSeries([
            {
                name: "Estações ativas",
                data: estacoesAtivasPlaceholder.quantidade
            }
        ])
    }, [])

    return (   
        <div className=" bg-bg-100 p-4 rounded-md drop-shadow" style={{ flexGrow: 1}}>
            <span className="text-lg font-medium text-text-on-background ml-10">Estações Ativas por Mês</span>
            <Chart options={options} series={series} type="bar" width={"100%"} height={348}/>
        </div>
    )
}