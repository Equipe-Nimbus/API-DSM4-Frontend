'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { CadastroParametroSchema } from "@lib/models/Parametro";
import { cadastroParametroSchema } from "@lib/validations/parametro/cadastroParametroSchema";
import { useForm } from "react-hook-form";
import Input from "./Input";
import { Button } from "./Button";
import parametroRequests from "@services/requests/parametroRequest";
import { useContext } from "react";
import { ToastContext } from "@contexts/ToastContext";

export default function FormParametros() {
    const { addToast } = useContext(ToastContext)

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CadastroParametroSchema>({
        resolver: zodResolver(cadastroParametroSchema)
    });

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

    return (
        <form className="flex flex-col gap-6 min-w-96">
            <div className="flex flex-col gap-4">
                <Input width="w-full" label="Nome" {...register("nomeTipoParametro")} error={errors.nomeTipoParametro?.message} />
                <Input width="w-full" label="Unidade" {...register("unidadeTipoParametro")} error={errors.unidadeTipoParametro?.message}/>
                <Input width="w-full" label="Fator (Opcional)" {...register("fatorTipoParametro")} error={errors.fatorTipoParametro?.message}/>
            </div>
            <div className="w-full flex gap-3 justify-end">
                <Button text="Cadastrar" type="submit" variant="primary" onClick={handleSubmit(handleCadastroParametro)} />
            </div>
        </form>
    )
}