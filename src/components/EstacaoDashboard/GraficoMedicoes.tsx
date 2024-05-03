import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useCallback, useEffect, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { DashboardEstacao } from "@lib/models/Dashboard";
import moment from "moment";
import 'moment-timezone';

interface GraficoMedicoesProps {
    dadosDashboard: DashboardEstacao
}

export default function GraficoMedicoes({ dadosDashboard }: GraficoMedicoesProps) {
    const dataAtual = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
    const [parametroSelecionado, setParametroSelecionado] = useState("")
    const [options, setOptions] = useState<ApexOptions>({});
    const [series, setSeries] = useState<ApexAxisChartSeries>([]);
    const [loading, setLoading] = useState(true)

    const selecionarParametro = useCallback((nomeParametro: string) => {
        setParametroSelecionado(nomeParametro)

        const parametro = dadosDashboard.parametros?.find(parametro => parametro.nomeTipoParametro === nomeParametro)
        if (!parametro) return

        const series = parametro.medicoes.map(medicao => ({
            x: moment.utc(medicao.data).add(3, 'hours').valueOf(),
            y: medicao.valor
        }))
        setSeries([{ name: parametro.nomeTipoParametro, data: series }])

        setOptions({
            xaxis: {
                type: 'datetime',
                tickAmount: 12,
                min: new Date().setHours(0, 0, 0, 0),
                max: new Date().setHours(23, 59, 59, 999),
                labels: {
                    style: {
                        colors: "#97A3B4",
                    },
                    formatter: function (value) {
                        return moment(value).tz('America/Sao_Paulo').format('HH:mm');
                    }
                },
            },
            yaxis: {
                title: {
                    text: parametro.unidadeMedida,
                    style: {
                        fontSize: '14px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600
                    }
                },
                labels: {
                    style: {
                        colors: "#97A3B4"
                    }
                },
            },
            tooltip: {
                enabled: true,
                theme: 'light',
                style: {
                    fontSize: '12px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                },
                x: {
                    format: 'HH:mm',
                    formatter: function (value) {
                        return moment(value).tz('America/Sao_Paulo').format('HH:mm');
                    }
                },
                y: {
                    formatter: function (value) {
                        return `${value} ${parametro.unidadeMedida}`;
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth"
            },
            colors: ["#52ACFA"],
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.8,
                    opacityTo: 0.6,
                    stops: [0, 100]
                }
            }
            
        });
    }, [dadosDashboard.parametros])

    useEffect(() => {
        if (dadosDashboard.parametros && dadosDashboard.parametros.length > 0) {
            selecionarParametro(dadosDashboard.parametros[0].nomeTipoParametro);
            setLoading(false);
        }
    }, [dadosDashboard.parametros, selecionarParametro]);

    if (loading) return <div>Carregando...</div>

    return (
        <div className="flex flex-col p-4 gap-8 bg-bg-100 rounded-md drop-shadow">
            <div className="flex flex-col ml-4 mt-4 gap-2">
                <h1 className="text-2xl font-semibold text-text-on-background">Dados do dia</h1>
                <h2 className="text-xl text-text-on-background">{dataAtual}</h2>
            </div>
            <div className="flex gap-4 ml-4 w-full">
                {dadosDashboard.parametros?.map((parametro, index) => (
                    <span
                        className={` text-text-on-background-disabled p-2 cursor-pointer ${parametroSelecionado === parametro.nomeTipoParametro ? "text-text-on-primary font-medium bg-primary-65 rounded-md" : ""}`}
                        key={index}
                        onClick={() => selecionarParametro(parametro.nomeTipoParametro)}
                    >
                        {parametro.nomeTipoParametro}
                    </span>
                ))}
            </div>
            <Chart height={350} width={"100%"} type="area" options={options} series={series} />
        </div>
    )

}