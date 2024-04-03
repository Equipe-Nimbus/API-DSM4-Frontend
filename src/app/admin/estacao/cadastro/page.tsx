'use client';
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cadastroEstacaoSchema, CadastroEstacaoSchema } from "@lib/validations/estacao/cadastroEstacaoSchema";
import Input from "@components/Input";
import Select from "@components/Select";
import { Button } from "@components/Button";
import estados from "@lib/models/estados";
import estacaoRequests from "@services/requests/estacaoRequests";
import { ToastContext } from "@contexts/ToastContext";
import enderecoRequests from "@services/requests/enderecoRequests";
import ReactInputMask from "react-input-mask";
import { useRouter } from "next/navigation";

export default function CadastroEstacao() {
    const { addToast } = useContext(ToastContext)
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<CadastroEstacaoSchema>({
        resolver: zodResolver(cadastroEstacaoSchema),
    });

    async function handleCadastroEstacao(data: CadastroEstacaoSchema) {
        try {
            const response = await estacaoRequests.create(data);
            console.log(response);
            if (response.status === 200) {
                addToast({ visible: true, message: `Estação cadastrada com sucesso`, type: 'success', position: 'bottom-left' });
                router.push('/admin/estacoes');
            }
        } catch (error: any) {
            console.log(error);
            if (error.response && error.response.data) {
                addToast({ visible: true, message: `Erro durante o cadastro da estação: ${error.response.data}`, type: 'error', position: 'bottom-left' });
            }
            else {
                addToast({ visible: true, message: `Erro durante o cadastro da estação`, type: 'error', position: 'bottom-left' });
            }
        }
    }

    async function handleCepBlur(cep: string) {
        const cepFormatted = cep.replace(/\D/g, "");

        if (cepFormatted.length !== 8) {
            return;
        }

        await enderecoRequests.get(cepFormatted).then((response) => {
            setValue("ruaAvenidaEstacao", response.data.logradouro);
            setValue("bairroEstacao", response.data.bairro);
            setValue("cidadeEstacao", response.data.localidade);
            setValue("estadoEstacao", response.data.uf);
        })
    }

    return (
        <>
            <div className="bg-bg-100 p-4 rounded-md drop-shadow">
                <h1 className="text-text-on-background text-base font-medium">Nova Estação</h1>
            </div>
            <form onSubmit={handleSubmit(handleCadastroEstacao)} className="bg-bg-100 p-4 rounded-md drop-shadow flex flex-col gap-7">
                <h2 className="text-text-on-background text-base font-medium">
                    Informações Básicas
                </h2>
                <div className="flex flex-col gap-4">
                    <Input label="Nome" type="text" width="w-96" {...register("nomeEstacao")} error={errors.nomeEstacao?.message} id="nomeEstacao" />
                </div>
                <hr />
                <h2 className="text-text-on-background text-base font-medium">
                    Endereço
                </h2>
                <div className="flex flex-col gap-4">
                    {/* <Input label="CEP" type="text" width="w-40" placeholder="00000-000" {...register("cepUsuario")} error={errors.cepUsuario?.message} id="cepUsuario" onBlur={(e) => handleCepBlur(e.target.value)} /> */}
                    <Controller
                        name="cepEstacao"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <ReactInputMask mask="99999-999" value={field.value} onChange={field.onChange} onBlur={(e) => handleCepBlur(e.target.value)}>
                                <Input
                                    label="CEP"
                                    type="text"
                                    width="w-40"
                                    placeholder="00000-000"
                                    error={errors.cepEstacao?.message}
                                    id="cepEstacao"
                                />
                            </ReactInputMask>
                        )}
                    />
                    <div className="flex gap-4">
                        <Input label="Rua" type="text" width="w-80" {...register("ruaAvenidaEstacao")} error={errors.ruaAvenidaEstacao?.message} id="ruaAvenidaEstacao" />
                        <Input label="Número" type="text" width="w-24" {...register("numeroEnderecoEstacao")} error={errors.numeroEnderecoEstacao?.message} id="numeroEnderecoUsuario" />
                    </div>
                    <div className="flex gap-4">
                        <Input label="Cidade" type="text" width="w-52" {...register("cidadeEstacao")} error={errors.cidadeEstacao?.message} id="cidadeEstacao" />
                        <Input label="Bairro" type="text" width="w-52" {...register("bairroEstacao")} error={errors.bairroEstacao?.message} id="bairroEstacao" />
                    </div>
                    <Select label="Estado" width="w-40" options={estados} {...register("estadoEstacao")} error={errors.estadoEstacao?.message} id="estadoEstacao" />
                </div>
                <div className="flex justify-end gap-4">
                    <Button text="Cancelar" variant="outline" />
                    <Button text="Salvar" variant="primary" />
                </div>
            </form>
        </>
    )
}