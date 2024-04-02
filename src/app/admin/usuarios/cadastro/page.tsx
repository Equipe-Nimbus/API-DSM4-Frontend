'use client';
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cadastroUsuarioSchema, CadastroUsuarioSchema } from "@lib/validations/usuario/cadastroUsuarioSchema";
import Input from "@components/Input";
import Select from "@components/Select";
import { Button } from "@components/Button";
import estados from "@lib/models/estados";
import usuarioRequests from "@services/requests/usuarioRequests";
import { ToastContext } from "@contexts/ToastContext";
import enderecoRequests from "@services/requests/enderecoRequests";
import ReactInputMask from "react-input-mask";
import { useRouter } from "next/navigation";

export default function CadastroUsuario() {
    const { addToast } = useContext(ToastContext)
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<CadastroUsuarioSchema>({
        resolver: zodResolver(cadastroUsuarioSchema),
    });

    async function handleCadastroUsuario(data: CadastroUsuarioSchema) {
        try {
            const response = await usuarioRequests.create(data);
            console.log(response);
            if (response.status === 200) {
                addToast({ visible: true, message: `Usuário cadastrado com sucesso`, type: 'success', position: 'bottom-left' });
                router.push('/admin/usuarios');
            }
        } catch (error: any) {
            console.log(error);
            if (error.response && error.response.data) {
                addToast({ visible: true, message: `Erro durante o cadastro do usuário: ${error.response.data}`, type: 'error', position: 'bottom-left' });
            }
            else {
                addToast({ visible: true, message: `Erro durante o cadastro do usuário`, type: 'error', position: 'bottom-left' });
            }
        }
    }

    async function handleCepBlur(cep: string) {
        const cepFormatted = cep.replace(/\D/g, "");
        
        if (cepFormatted.length !== 8) {
            return;
        }

        await enderecoRequests.get(cepFormatted).then((response) => {
            setValue("ruaAvenidaUsuario", response.data.logradouro);
            setValue("bairroUsuario", response.data.bairro);
            setValue("cidadeUsuario", response.data.localidade);
            setValue("estadoUsuario", response.data.uf);
        })
    }

    return (
        <>
            <div className="bg-bg-100 p-4 rounded-md drop-shadow">
                <h1 className="text-text-on-background text-base font-medium">Novo Usuário</h1>
            </div>
            <form onSubmit={handleSubmit(handleCadastroUsuario)} className="bg-bg-100 p-4 rounded-md drop-shadow flex flex-col gap-7">
                <h2 className="text-text-on-background text-base font-medium">
                    Informações Pessoais
                </h2>
                <div className="flex flex-col gap-4">
                    <Input label="Nome Completo" type="text" width="w-96" {...register("nomeUsuario")} error={errors.nomeUsuario?.message} id="nomeUsuario" />
                    <div className="flex gap-4">
                        <Controller
                            name="cpfUsuario"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <ReactInputMask mask="999.999.999-99" value={field.value} onChange={field.onChange}>
                                    <Input
                                        label="CPF"
                                        type="text"
                                        width="w-52"
                                        placeholder="000.000.000-00"
                                        error={errors.cpfUsuario?.message}
                                        id="cpfUsuario"
                                    />
                                </ReactInputMask>
                            )}
                        />
                        <Input label="Data de Nascimento" type="date" width="w-40" {...register("dataNascimentoUsuario")} error={errors.dataNascimentoUsuario?.message} id="dataNascimentoUsuario" />
                    </div>
                    <Input label="E-mail" type="email" width="w-96" {...register("emailUsuario")} error={errors.emailUsuario?.message} id="emailUsuario" />
                    <Input label="Senha" type="password" width="w-96" {...register("senhaUsuario")} error={errors.senhaUsuario?.message} id="senhaUsuario" />
                    <Select label="Perfil" width="w-40" options={[{ value: "Administrador", label: "Administrador" }]} {...register("perfilUsuario")} error={errors.perfilUsuario?.message} id="perfilUsuario" />
                </div>
                <hr />
                <h2 className="text-text-on-background text-base font-medium">
                    Endereço
                </h2>
                <div className="flex flex-col gap-4">
                    {/* <Input label="CEP" type="text" width="w-40" placeholder="00000-000" {...register("cepUsuario")} error={errors.cepUsuario?.message} id="cepUsuario" onBlur={(e) => handleCepBlur(e.target.value)} /> */}
                    <Controller
                            name="cepUsuario"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <ReactInputMask mask="99999-999" value={field.value} onChange={field.onChange} onBlur={(e) => handleCepBlur(e.target.value)}>
                                    <Input
                                        label="CEP"
                                        type="text"
                                        width="w-40"
                                        placeholder="00000-000"
                                        error={errors.cepUsuario?.message}
                                        id="cepUsuario"
                                    />
                                </ReactInputMask>
                            )}
                        />
                    <div className="flex gap-4">
                        <Input label="Rua" type="text" width="w-80" {...register("ruaAvenidaUsuario")} error={errors.ruaAvenidaUsuario?.message} id="ruaAvenidaUsuario" />
                        <Input label="Número" type="text" width="w-24" {...register("numeroCasaUsuario")} error={errors.numeroCasaUsuario?.message} id="numeroCasaUsuario" />
                    </div>
                    <div className="flex gap-4">
                        <Input label="Cidade" type="text" width="w-52" {...register("cidadeUsuario")} error={errors.cidadeUsuario?.message} id="cidadeUsuario" />
                        <Input label="Bairro" type="text" width="w-52" {...register("bairroUsuario")} error={errors.bairroUsuario?.message} id="bairroUsuario" />
                    </div>
                    <Select label="Estado" width="w-40" options={estados} {...register("estadoUsuario")} error={errors.estadoUsuario?.message} id="estadoUsuario" />
                </div>
                <div className="flex justify-end gap-4">
                    <Button text="Cancelar" variant="outline" />
                    <Button text="Salvar" variant="primary" />
                </div>
            </form>
        </>
    )
}