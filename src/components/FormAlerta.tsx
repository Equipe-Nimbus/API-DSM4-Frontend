'use client';
import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Select, { Option } from "./Select"
import Input from "./Input"
import { Button } from "./Button";
import { cadastroAlertaSchema } from "@lib/validations/alerta/cadastroAlertaSchema"
import { CadastroAlertaSchema } from "@lib/models/Alerta"
import estacaoRequests from "@services/requests/estacaoRequests";
import { condicionais } from "@lib/models/condicionais";
import parametroRequests from "@services/requests/parametroRequest";
import alertaRequests from "@services/requests/alertaRequests";
import { ToastContext } from "@contexts/ToastContext";

export default function FormAlerta() {
    const [estacoes, setEstacoes] = useState<Option[]>([]);
    const [tipoParametros, setTipoParametros] = useState<Option[]>([]);
    const { register, handleSubmit, formState: { errors }, getValues, watch, reset } = useForm<CadastroAlertaSchema>({
        resolver: zodResolver(cadastroAlertaSchema)
    })
    const selectedStation = watch("idEstacao")
    const { addToast } = useContext(ToastContext)

    useEffect(() => {
        estacaoRequests.getSelectEstacoes().then((response) => {
            setEstacoes(response)
        })
    }, [])

    useEffect(() => {
        if (!selectedStation) {
            setTipoParametros([])
            return
        }

        parametroRequests.getSelectParametrosPorEstacao(selectedStation)
            .then((response) => {
                setTipoParametros(response)
            })
    }, [selectedStation])

    async function handleCadastroAlerta(data: CadastroAlertaSchema) {
        try {
            const response = await alertaRequests.create(data)
            //console.log(response)
            if(response.status === 200) {
                addToast({ visible: true, message: `Alerta cadastrado com sucesso`, type: 'success', position: 'bottom-left' });
                reset()
            }
        } catch (error: any) {
            console.log(error);
            if(error.response && error.response.data) {
                addToast({ visible: true, message: `Erro ao cadastrar o alerta: ${error.response.data}`, type: 'error', position: 'bottom-left' });
            }
            else {
                addToast({ visible: true, message: "Erro ao cadastrar o alerta", type: 'error', position: 'bottom-left' });
            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleCadastroAlerta)} className="flex flex-col gap-5 min-w-96">
                <div className="flex gap-8">
                    <Select label="Estação" options={estacoes} {...register("idEstacao")} width="w-fit" error={errors.idEstacao?.message} />
                    <Select label="Parâmetro" options={tipoParametros} {...register("idTipoParametro")} width="w-fit" disabled={!selectedStation} error={errors.idTipoParametro?.message} />
                </div>

                <Input label="Nome do alerta" {...register("nomeAlerta")} error={errors.nomeAlerta?.message} width="w-full" />
                <Select label="Condição" options={condicionais} {...register("condicaoAlerta")} width="w-fit" error={errors.condicaoAlerta?.message} />
                <Input label="Valor" {...register("valorMedicaoAlerta")} error={errors.valorMedicaoAlerta?.message} width="w-full" />
                <div className="w-fit self-end">
                    <Button text="Salvar" type="submit" variant="primary" />

                </div>
            </form>
        </>

    )
}