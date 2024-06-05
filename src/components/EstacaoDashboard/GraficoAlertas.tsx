const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { DashboardEstacao } from "@lib/models/Dashboard"
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import 'moment-timezone';

interface GraficoAlertasProps {
  dadosDashboard: DashboardEstacao
}

export default function GraficoAlertas({ dadosDashboard }: GraficoAlertasProps) {
  const [options, setOptions] = useState<ApexOptions>({});
  const [series, setSeries] = useState<ApexAxisChartSeries>([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (dadosDashboard && dadosDashboard.alertas) {
      setSeries([
        {
          name: 'Alertas',
          data: dadosDashboard.alertas.alertasNumero
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
          categories: dadosDashboard.alertas.alertasNome
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
    }
    setLoading(false)
  }, [dadosDashboard]);

  if (loading) return <div>Carregando...</div>

  return (
    <>
      <div className="flex flex-col p-4 pt-8 gap-2 bg-bg-100 rounded-md drop-shadow">
        <h1 className="text-xl font-medium text-text-on-background ml-6">Alertas do dia</h1>
        {dadosDashboard.alertas?.alertasNumero.length > 0 ?
          <Chart height={series[0]?.data?.length < 4 ? series[0]?.data?.length * 100 : series[0]?.data?.length * 50} width={"100%"} type="bar" options={options} series={series} />
          :
          <span className="text-neutral-47 text-lg font-medium ml-6">Nenhum alerta disparado hoje.</span>
        }
      </div>
    </>
  )
}