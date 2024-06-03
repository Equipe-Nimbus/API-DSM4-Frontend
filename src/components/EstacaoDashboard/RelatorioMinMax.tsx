'use client';
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useCallback, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { FiltroRelatorioMinMax, ParametroRelatorioMinMax } from "@lib/models/Relatorios";
import { useForm } from "react-hook-form";
import Input from "@components/Input";
import { Button } from "@components/Button";
import { filtroRelatorioMinMax } from "@lib/validations/relatorios/filtroRelatorioMinMax";
import { zodResolver } from "@hookform/resolvers/zod";
import dashboardRequests from "@services/requests/dashboardRequest";


interface RelatorioMinMaxProps {
    idEstacao: string;
}

export default function RelatorioMinMax({ idEstacao }: RelatorioMinMaxProps) {
    const [parametros, setParametros] = useState<ParametroRelatorioMinMax[]>([])
    const [parametroSelecionado, setParametroSelecionado] = useState<ParametroRelatorioMinMax>()
    const [consultaRealizada, setConsultaRealizada] = useState(false)
    const [options, setOptions] = useState<ApexOptions>({});
    const [series, setSeries] = useState<ApexAxisChartSeries>([]);
    const { register, handleSubmit, formState: { errors } } = useForm<FiltroRelatorioMinMax>({
        resolver: zodResolver(filtroRelatorioMinMax),
    });

    function handleGerarRelatorio(data: FiltroRelatorioMinMax) {
        dashboardRequests.getRelatorioMinMax(idEstacao, data)
            .then((response) => {
                const { data } = response
                setParametros(data)
                selecionarParametro(data[0])
                //console.log(data[0].mesAno)
            })
            .finally(() => setConsultaRealizada(true))
    }

    const selecionarParametro = useCallback((parametroSelecionado: ParametroRelatorioMinMax) => {
        if (!parametroSelecionado) return

        setParametroSelecionado(parametroSelecionado)
        setSeries([
            {
                name: "Máximas",
                data: parametroSelecionado.minimosMaximos.maximos
            },
            {
                name: "Mínimas",
                data: parametroSelecionado.minimosMaximos.minimos
            }
        ])
        setOptions({
            xaxis: {
                categories: parametroSelecionado.minimosMaximos.mesAno
            },
            yaxis: {
                title: {
                    text: parametroSelecionado.unidadeTipoParametro,
                    style: {
                        fontSize: '14px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600
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
                y: {
                    formatter: function (value) {
                        return `${value} ${parametroSelecionado.unidadeTipoParametro}`;
                    }
                }
            },
        })

    }, [])

    return (
        <div className="flex flex-col p-4 gap-10 bg-bg-100 rounded-md drop-shadow">
            <form className="flex gap-4 ml-6 items-end" onSubmit={handleSubmit(handleGerarRelatorio)}>
                <Input type="date" width="w-52" label="Data Início" {...register("dataInicio")} error={errors?.dataInicio?.message} />
                <Input type="date" width="w-52" label="Data Fim" {...register("dataFim")} error={errors?.dataFim?.message} />
                <Button text="Gerar" variant="ghost" type="submit" />
            </form>
            <div>
                <div className="flex gap-4 ml-4 w-full">
                    {parametros?.map((parametro, index) => (
                        <span
                            className={` text-text-on-background-disabled p-2 cursor-pointer ${parametroSelecionado?.nomeTipoParametro === parametro.nomeTipoParametro ? "text-text-on-primary font-medium bg-primary-65 rounded-md" : ""}`}
                            key={index}
                            onClick={() => selecionarParametro(parametro)}
                        >
                            {parametro.nomeTipoParametro}
                        </span>
                    ))}
                </div>
                {
                    consultaRealizada ? (
                        parametros.length > 0 ? (
                            <Chart type="line" options={options} series={series} width={"100%"} height={350} />
                        ) : (
                            <span className="text-neutral-47 text-lg font-medium ml-4">Nenhum dado disponível para o período selecionado.</span>
                        )
                    ) : null
                }
            </div>
        </div>
    )

}