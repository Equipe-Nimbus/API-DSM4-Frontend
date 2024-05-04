import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useCallback, useEffect, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { DashboardEstacao, ParametroDashboard } from "@lib/models/Dashboard";
import moment from "moment";
import 'moment-timezone';
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa"

interface GraficoMedicoesProps {
    dadosDashboard: DashboardEstacao
}

export default function GraficoMedicoes({ dadosDashboard }: GraficoMedicoesProps) {
    const dataAtual = new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' });
    const [parametroSelecionado, setParametroSelecionado] = useState<ParametroDashboard>()
    const [options, setOptions] = useState<ApexOptions>({});
    const [series, setSeries] = useState<ApexAxisChartSeries>([]);
    const [loading, setLoading] = useState(true)

    const selecionarParametro = useCallback((parametroSelecionado: ParametroDashboard) => {
        setParametroSelecionado(parametroSelecionado)

        const parametro = dadosDashboard.parametros?.find(parametro => parametro.nomeTipoParametro === parametroSelecionado.nomeTipoParametro)
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
            selecionarParametro(dadosDashboard.parametros[0]);
        }
        setLoading(false);
    }, [dadosDashboard.parametros, selecionarParametro]);

    if (loading) return <div>Carregando...</div>

    return (
        <>
            {!dadosDashboard.parametros ?
                <div className="flex flex-col p-4 gap-10 bg-bg-100 rounded-md drop-shadow">
                    <div className="flex flex-col ml-4 mt-4 gap-2">
                        <h1 className="text-2xl font-semibold text-text-on-background">Dados do dia</h1>
                        <h2 className="text-xl text-text-on-background">{dataAtual}</h2>
                    </div>
                    <span className="text-neutral-47 text-lg font-medium ml-4">Nenhum dado disponível para o dia de hoje.</span>
                </div>
                :
                <div className="flex flex-col p-4 gap-10 bg-bg-100 rounded-md drop-shadow">
                    <div className="flex flex-col ml-4 mt-4 gap-2">
                        <h1 className="text-2xl font-semibold text-text-on-background">Dados do dia</h1>
                        <h2 className="text-xl text-text-on-background">{dataAtual}</h2>
                    </div>
                    <div className="flex gap-4 ml-4 w-full">
                        {dadosDashboard.parametros?.map((parametro, index) => (
                            <span
                                className={` text-text-on-background-disabled p-2 cursor-pointer ${parametroSelecionado?.nomeTipoParametro === parametro.nomeTipoParametro ? "text-text-on-primary font-medium bg-primary-65 rounded-md" : ""}`}
                                key={index}
                                onClick={() => selecionarParametro(parametro)}
                            >
                                {parametro.nomeTipoParametro}
                            </span>
                        ))}
                    </div>
                    <div>
                        <div className="flex gap-4 ml-4">
                            <div className="flex gap-1 items-center">
                                <FaLongArrowAltUp size={40} className="text-primary-65" />
                                <span className="text-text-on-background text-xl font-medium">{`${parametroSelecionado?.valorMaximo} ${parametroSelecionado?.unidadeMedida}`}</span>
                            </div>
                            <div className="flex gap-1 items-center">
                                <FaLongArrowAltDown size={40} className="text-primary-65" />
                                <span className="text-text-on-background text-xl font-medium">{`${parametroSelecionado?.valorMinimo} ${parametroSelecionado?.unidadeMedida}`}</span>
                            </div>
                        </div>
                        <Chart height={350} width={"100%"} type="area" options={options} series={series} />
                    </div>
                </div>
            }
        </>
    )

}