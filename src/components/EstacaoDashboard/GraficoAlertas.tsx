const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { DashboardEstacao } from "@lib/models/Dashboard"
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import moment from "moment";
import 'moment-timezone';

interface GraficoAlertasProps {
    dadosDashboard: DashboardEstacao
}

export default function GraficoAlertas({ dadosDashboard }: GraficoAlertasProps) {
    const [options, setOptions] = useState<ApexOptions>({});
    const [series, setSeries] = useState<ApexAxisChartSeries>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
            setSeries([
                {
                    name: 'Alertas',
                    data: [3, 1]
                }
            ])
            setOptions({
                plotOptions: {
                    bar: {
                      barHeight: '100%',
                      distributed: true,
                      horizontal: true,
                      dataLabels: {
                        position: 'bottom',
                      },
                    }
                  },
                  stroke: {
                    width: 1,
                    colors: ['#fff']
                  },
                  xaxis: {
                    categories: ['Chuvas fortes', 'Alta umidade do ar'],
                  },
                  yaxis: {
                    labels: {
                      show: false
                    }
                  },
                  dataLabels: {
                    enabled: true,
                    textAnchor: 'start',
                    style: {
                      colors: ['#fff'],
                      fontSize: '14px',
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      fontWeight: 600
                    },
                    formatter: function (val, opt) {
                      return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
                    },
                    offsetX: 0,
                  },
            })
        setLoading(false)
    }, []);

    if (loading) return <div>Carregando...</div>

    return (
        <>
            {!dadosDashboard.parametros ?
                <></>
                :
                <div className="flex flex-col p-4 pt-8 gap-2 bg-bg-100 rounded-md drop-shadow">
                    <h1 className="text-xl font-medium text-text-on-background ml-6">Alertas do dia</h1>
                    <Chart height={series[0].data.length * 75} width={"100%"} type="bar" options={options} series={series} />
                </div>
            }
        </>
    )
}