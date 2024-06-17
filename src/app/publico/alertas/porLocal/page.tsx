'use client';
import { Button } from "@components/Button";
import Input from "@components/Input";
import { RiSearch2Line } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { FiltroRelatorioAlertasPorLocal, LocalizacoesCadastradas, RelatorioAlertasPorCidade, RelatorioAlertasPorEstado } from "@lib/models/Relatorios";
import { zodResolver } from "@hookform/resolvers/zod";
import { filtroRelatorioAlertasPorLocal } from "@lib/validations/relatorios/filtroRelatorioAlertasPorLocal";
import Select, { Option } from "@components/Select";
import { useContext, useEffect, useState } from "react";
import enderecoRequests from "@services/requests/enderecoRequests";
import { ToastContext } from "@contexts/ToastContext";
import dashboardRequests from "@services/requests/dashboardRequest";
import RelatorioAlertasCidade from "@components/RelatorioAlertasCidade";
import RelatorioAlertasEstado from "@components/RelatorioAlertasEstado";
import { parseCidadesToSelect } from "@lib/parseLozalizacoesToSelect";

export default function AlertasPorLocal() {
    const [estados, setEstados] = useState<Option[]>([])
    const [cidadesDoEstado, setCidadesDoEstado] = useState<Option[]>([])
    const [localizacoesCadastradas, setLocalizacoesCadastradas] = useState<LocalizacoesCadastradas[]>([])
    const [relatorioEstado, setRelatorioEstado] = useState<RelatorioAlertasPorEstado>({} as RelatorioAlertasPorEstado)
    const [relatorioCidade, setRelatorioCidade] = useState<RelatorioAlertasPorCidade>({} as RelatorioAlertasPorCidade)
    const [consultaRealizada, setConsultaRealizada] = useState(false)
    const [tipoRelatorio, setTipoRelatorio] = useState<"estado" | "cidade" | null>()
    const { register, handleSubmit, watch, formState: { errors }, getValues } = useForm<FiltroRelatorioAlertasPorLocal>({
        resolver: zodResolver(filtroRelatorioAlertasPorLocal)
    });
    const { addToast } = useContext(ToastContext)

    useEffect(() => {
        enderecoRequests.getLocalizacoesCadastradas()
            .then((response) => {
                setEstados(response.estados)
                setLocalizacoesCadastradas(response.localizacoes.data)
            })

    }, [])

    const estadoSelecionado = watch("estado");
    useEffect(() => {
        if (!estadoSelecionado) return setCidadesDoEstado([])
        const cidades = parseCidadesToSelect(estadoSelecionado, localizacoesCadastradas)
        setCidadesDoEstado(cidades)
    }, [estadoSelecionado, localizacoesCadastradas])

    function handleGerarRelatorio(data: FiltroRelatorioAlertasPorLocal) {
        setConsultaRealizada(false)

        const filtradoPorCidade = data.cidade
        const filtradoPorEstado = data.estado

        if (!filtradoPorCidade && !filtradoPorEstado) return addToast({ type: "error", message: "Selecione um local para gerar o relatório", position: "bottom-left", visible: true })

        if (filtradoPorCidade) {
            dashboardRequests.getRelatorioAlertasPorCidade(data)
                .then((response) => {
                    setRelatorioCidade(response.data)
                    setTipoRelatorio("cidade")
                    setConsultaRealizada(true)
                })
                .catch((error) => {
                    if (error && error.response.data) {
                        return addToast({ type: "error", message: error.response.data.error, position: "bottom-left", visible: true })
                    }
                })
        } else if (filtradoPorEstado) {
            dashboardRequests.getRelatorioAlertasPorEstado(data)
                .then((response) => {
                    console.log(response.data)
                    setRelatorioEstado(response.data)
                    setTipoRelatorio("estado")
                    setConsultaRealizada(true)
                })
                .catch((error) => {
                    if (error && error.response.data) {
                        return addToast({ type: "error", message: error.response.data.error, position: "bottom-left", visible: true })
                    }
                })
        }
    }

    return (
        <>
            <div className="bg-bg-100 p-4 rounded-md drop-shadow">
                <h1 className="text-text-on-background text-base font-medium">Alertas por local</h1>
            </div>
            <form onSubmit={handleSubmit(handleGerarRelatorio)} className="bg-bg-100 p-4 rounded-md drop-shadow flex gap-4 items-end">
                <Select width="w-52" options={estados} label="Estado" {...register("estado")} />
                <div className='flex flex-col '>
                    <label htmlFor="cidade" className="text-text-on-background text-sm font-normal">
                        Cidade
                    </label>
                    <select className={`w-52 border border-neutral-65 text-base rounded-md px-3 py-2 focus:border-primary-65 focus:outline-none focus:ring-0`} {...register("cidade")}>
                        {cidadesDoEstado.length > 0 ? <option value="">Selecione uma opção</option> : <option value="">Selecione um estado</option>}
                        {cidadesDoEstado?.map((cidade, index) => (
                            <option key={index} value={cidade.value}>{cidade.label}</option>
                        ))}
                    </select>
                    {errors && errors.cidade && <span className="text-error-60 text-sm">{errors?.cidade?.message}</span>}
                </div>
                <Input width="w-52" type='date' label='Data Início'  {...register("dataInicio")} error={errors.dataInicio?.message} />
                <Input width="w-52" type='date' label='Data Fim'  {...register("dataFim")} error={errors.dataFim?.message} />
                <Button text="Consultar" variant="ghost" type="submit" Icon={RiSearch2Line} iconPosition="left" />
            </form>
            {consultaRealizada ? (
                tipoRelatorio === "cidade" ? <RelatorioAlertasCidade dadosRelatorio={relatorioCidade} dataInicio={getValues("dataInicio")} dataFim={getValues("dataFim")} />
                    : tipoRelatorio === "estado" ? <RelatorioAlertasEstado dadosRelatorio={relatorioEstado} dataInicio={getValues("dataInicio")} dataFim={getValues("dataFim")} />
                        : null
            ) : null}

        </>
    )
}