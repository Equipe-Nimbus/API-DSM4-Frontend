import { Button } from "@components/Button"
import Input from "@components/Input"
import Select from "@components/Select"
import { ToastContext } from "@contexts/ToastContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { calcularDiferencaMeses } from "@lib/calcularDiferencaMeses"
import { MedicaoRelatorio } from "@lib/models/Medicao"
import { ListagemParametroSchema, Parametro } from "@lib/models/Parametro"
import { FiltroRelatorioMedicoesSchema } from "@lib/models/Relatorios"
import { filtroRelatorioMedicoesSchema } from "@lib/validations/relatorios/filtroRelatorioMedicoes"
import dashboardRequests from "@services/requests/dashboardRequest"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { usePagination } from "src/hooks/usePagination"

interface RelatorioMedicoesProps {
    idEstacao: string
    parametros: ListagemParametroSchema[]
}

export default function RelatorioMedicoes({ idEstacao, parametros }: RelatorioMedicoesProps) {
    const [medicoes, setMedicoes] = useState<MedicaoRelatorio[]>([]);
    const [consultaFeita, setConsultaFeita] = useState(false);
    const { page, currentItems, nextPage, prevPage, setPage } = usePagination(medicoes, 10);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const hasMorePages = page < totalPaginas;
    const { register, handleSubmit, formState: { errors } } = useForm<FiltroRelatorioMedicoesSchema>({
        resolver: zodResolver(filtroRelatorioMedicoesSchema),
        mode: "onChange"
    });
    const parametrosSelecao = parametros?.map(parametro => {
        return {
            value: parametro.nomeTipoParametro,
            label: parametro.nomeTipoParametro
        }
    });
    const { addToast } = useContext(ToastContext);

    function handleGerarRelatorio(data: FiltroRelatorioMedicoesSchema) {
        const dataAtual = new Date();
        const dataFormatada = new Date(data.dataInicio);
        const diferencaMeses = calcularDiferencaMeses(dataFormatada, dataAtual);
        if (diferencaMeses > 12){
            return addToast({ type: "error", message: "O intervalo de datas não pode ser maior que 12 meses.", position: "bottom-left", visible: true})
        }

        dashboardRequests.getRelatorioMedicoes(idEstacao, data)
            .then((response) => {
                setConsultaFeita(true)
                setMedicoes(response)
                setTotalPaginas(Math.ceil(response.length / 10))
            })
    };

    return (
        <>
            <div className="flex flex-col p-4 pt-8 gap-8 bg-bg-100 rounded-t-md drop-shadow">
                <form className="flex gap-4 ml-6 items-end" onSubmit={handleSubmit(handleGerarRelatorio)}>
                    <Input type="date" width="w-52" label="Data Início" {...register("dataInicio")} error={errors?.dataInicio?.message} />
                    <Input type="date" width="w-52" label="Data Fim" {...register("dataFim")} error={errors?.dataFim?.message} />
                    <Select width="w-52" label="Parâmetro" {...register("parametro")} error={errors?.parametro?.message} options={parametrosSelecao} />
                    <Button text="Gerar" variant="ghost" type="submit" />
                </form>
            </div>
            {
                consultaFeita ? (
                    currentItems?.length > 0 ? (
                        <div className="w-full bg-bg-100 p-6 drop-shadow border-t border-neutral-84 rounded-b-md">
                            <table className="w-fit ml-6">
                                <thead className="text-text-on-background-disabled text-sm font-semibold border-b-2 border-text-on-background-disabled">
                                    <tr>
                                        <th className="p-4 text-left">DATA</th>
                                        <th className="p-4 text-left">VALOR</th>
                                        <th className="p-4 text-left">UNIDADE</th>
                                        <th className="p-4 text-left">PARAMETRO</th>
                                    </tr>
                                </thead>
                                <tbody className="text-text-on-background font-medium">
                                    {currentItems?.map((medicao) => (
                                        <tr key={medicao.idMedicao}>
                                            <td className="px-4 py-4 w-60 max-w-80 truncate">{medicao.dataMedicao}</td>
                                            <td className="px-4 truncate">{medicao.valorMedicao}</td>
                                            <td className="px-4 truncate">{medicao.unidadeTipoParametro}</td>
                                            <td className="px-4 truncate">{medicao.nomeTipoParametro}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-end">
                                <div className="bg-bg-100 w-fit px-2 py-2 rounded-md drop-shadow flex gap-2 items-center justify-items-end">
                                    <Button text="Anterior" variant="ghost" onClick={prevPage} disabled={page <= 1} />
                                    <span className="text-text-on-background font-medium">{page} de {totalPaginas}</span>
                                    <Button text="Próximo" variant="ghost" onClick={nextPage} disabled={!hasMorePages} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full bg-bg-100 p-8 drop-shadow border-t border-neutral-84 rounded-b-md">
                            <span className="text-text-on-background font-medium ml-3">Nenhuma medição correspondente.</span>
                        </div>
                    )
                ) : null
            }
        </>
    )
}