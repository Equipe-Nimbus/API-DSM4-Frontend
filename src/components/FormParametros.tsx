'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { CadastroParametroSchema, Parametro, ParametroAtualizacao } from "@lib/models/Parametro";
import { cadastroParametroSchema } from "@lib/validations/parametro/cadastroParametroSchema";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { Button } from "./Button";
import parametroRequests from "@services/requests/parametroRequest";
import { useContext, useEffect } from "react";
import { ToastContext } from "@contexts/ToastContext";
import { set } from "zod";

interface FormParametrosProps {
    parametro?: Parametro
}

export default function FormParametros({ parametro }: FormParametrosProps) {
    const { addToast } = useContext(ToastContext)
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<CadastroParametroSchema>({
        resolver: zodResolver(cadastroParametroSchema)
    });

    useEffect(() => {
        if(parametro) {
            setValue("nomeTipoParametro", parametro.nomeTipoParametro);
            setValue("unidadeTipoParametro", parametro.unidadeTipoParametro);
            setValue("fatorTipoParametro", parametro.fatorTipoParametro);
            setValue("offsetTipoParametro", Number(parametro.offsetTipoParametro));
        }
    }, [parametro, setValue])

    function handleSubmitParametro(data: CadastroParametroSchema) {
        if(parametro) {
            handleAtualizacaoParametro(data);
        } else {
            handleCadastroParametro(data);
        }
    }

    async function handleCadastroParametro(data: CadastroParametroSchema) {
        try {
            const response = await parametroRequests.create(data)
            if(response.status === 200) {
                addToast({ visible: true, message: `Parâmetro cadastrado com sucesso`, type: 'success', position: 'bottom-left' });
                reset();
            }
        } catch (error: any) {
            console.log(error);
            if(error.response && error.response.data) {
                addToast({ visible: true, message: `Erro ao cadastrar o parâmetro: ${error.response.data}`, type: 'error', position: 'bottom-left' });
            }
            else {
                addToast({ visible: true, message: `Erro ao cadastrar o parâmetro: ${error.message}`, type: 'error', position: 'bottom-left' });
            }
        }
    }

    async function handleAtualizacaoParametro(data: CadastroParametroSchema) {
        if(!parametro) return;
        const parametroAtualizacao: ParametroAtualizacao = { idTipoParametro: parametro.idTipoParametro, ...data }
        try {
            const response = await parametroRequests.update(parametroAtualizacao)
            if(response.status === 200) {
                addToast({ visible: true, message: `Parâmetro atualizado com sucesso`, type: 'success', position: 'bottom-left' });
            }   
        } catch (error: any) {
            if(error.response && error.response.data) {
                addToast({ visible: true, message: `Erro ao atualizar o parâmetro: ${error.response.data}`, type: 'error', position: 'bottom-left' });
            }
            else {
                addToast({ visible: true, message: `Erro ao atualizar o parâmetro`, type: 'error', position: 'bottom-left' });
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitParametro)} className="flex flex-col gap-6 min-w-96">
            <div className="flex flex-col gap-4">
                <Input width="w-full" label="Nome" {...register("nomeTipoParametro")} error={errors.nomeTipoParametro?.message} />
                <Input width="w-full" label="Unidade" {...register("unidadeTipoParametro")} error={errors.unidadeTipoParametro?.message} disabled={!!parametro}/>
                <Input width="w-full" label="Fator (Opcional)" {...register("fatorTipoParametro")} error={errors.fatorTipoParametro?.message} disabled={!!parametro}/>
                <Input width="w-full" label="Offset (Opcional)" {...register("offsetTipoParametro")} error={errors.offsetTipoParametro?.message} disabled={!!parametro}/>
            </div>
            <div className="w-full flex gap-3 justify-end">
                <Button text="Salvar" type="submit" variant="primary" />
            </div>
        </form>
    )
}