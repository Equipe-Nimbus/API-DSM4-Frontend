'use client'
import { ToastContext } from "@contexts/ToastContext";
import { zodResolver } from "@hookform/resolvers/zod";
import estados from "@lib/models/estados";
import { cadastroUsuarioSchema } from "@lib/validations/usuario/cadastroUsuarioSchema";
import enderecoRequests from "@services/requests/enderecoRequests";
import usuarioRequests from "@services/requests/usuarioRequests";
import { useRouter } from "next/navigation";
import Input  from "@components/Input";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import { Button } from "./Button";
import Select from "./Select";
import { CadastroUsuarioSchema, Usuario, UsuarioAtualizacao } from "@lib/models/Usuario";
import { set } from "zod";

interface FormUsuarioProps {
    usuario?: Usuario
}

export default function FormUsuario({ usuario }: FormUsuarioProps) {
    const { addToast } = useContext(ToastContext)
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<CadastroUsuarioSchema>({
        resolver: zodResolver(cadastroUsuarioSchema)
    });

    useEffect(() => {
        if (usuario) {
            setValue("nomeUsuario", usuario.nomeUsuario);
            setValue("cpfUsuario", usuario.cpfUsuario);
            setValue("dataNascimentoUsuario", usuario.dataNascimentoUsuario ? usuario.dataNascimentoUsuario.slice(0, 10) : "");
            setValue("emailUsuario", usuario.emailUsuario);
            setValue("senhaUsuario", usuario.senhaUsuario);
            setValue("perfilUsuario", usuario.perfilUsuario);   
            setValue("cepUsuario", usuario.cepUsuario);
            setValue("ruaAvenidaUsuario", usuario.ruaAvenidaUsuario);
            setValue("numeroCasaUsuario", usuario.numeroCasaUsuario);
            setValue("cidadeUsuario", usuario.cidadeUsuario);
            setValue("bairroUsuario", usuario.bairroUsuario);
            setValue("estadoUsuario", usuario.estadoUsuario);
        }
    }, [usuario, setValue])

    async function handleSubmitUsuario(data: CadastroUsuarioSchema) {
        if (usuario) {
            handleAtualizacaoUsuario(data);
        } else {
            handleCadastroUsuario(data);
        }   
    }

    async function handleCadastroUsuario(data: CadastroUsuarioSchema) {
        try {
            const response = await usuarioRequests.create(data);
            console.log(response);
            if (response.status === 200) {
                addToast({ visible: true, message: `Usuário cadastrado com sucesso`, type: 'success', position: 'bottom-left' });
                router.push('/admin/usuarios/listagem');
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

    async function handleAtualizacaoUsuario(data: CadastroUsuarioSchema) {
        if (!usuario) {
            return;
        }

        const body: UsuarioAtualizacao = {idUsuario: usuario.idUsuario, ...data} 
        try {
            const response = await usuarioRequests.update(body);
            console.log(response);
            if (response.status === 200) {
                addToast({ visible: true, message: `Usuário atualizado com sucesso`, type: 'success', position: 'bottom-left' });
            }
        } catch (error: any) {
            console.log(error);
            if (error.response && error.response.data) {
                addToast({ visible: true, message: `Ocorreu um erro durante a atualização do usuário: ${error.response.data}`, type: 'error', position: 'bottom-left' });
            }
            else {
                addToast({ visible: true, message: `Erro durante a atualização do usuário`, type: 'error', position: 'bottom-left' });
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
            <form onSubmit={handleSubmit(handleSubmitUsuario)} className="bg-bg-100 p-4 rounded-md drop-shadow flex flex-col gap-7">
                <h2 className="text-text-on-background text-base font-medium">
                    Informações Pessoais
                </h2>
                <div className="flex flex-col gap-4">
                    <Input label="Nome Completo" type="text" width="w-96" {...register("nomeUsuario")} error={errors.nomeUsuario?.message} id="nomeUsuario"/>
                    <div className="flex gap-4">
                        <Controller
                            name="cpfUsuario"
                            control={control}
                            rules={{ required: true }}
                            defaultValue={usuario?.cpfUsuario}
                            render={({ field }) => (
                                <ReactInputMask mask="999.999.999-99" value={field.value} onChange={field.onChange} disabled={!!usuario}>
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
                    <Select label="Perfil" width="w-40" options={[{ value: "Administrador", label: "Administrador" }]} {...register("perfilUsuario")} error={errors.perfilUsuario?.message} id="perfilUsuario"/>
                </div>
                <hr />
                <h2 className="text-text-on-background text-base font-medium">
                    Endereço
                </h2>
                <div className="flex flex-col gap-4">
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
                        <Input label="Rua" type="text" width="w-80" {...register("ruaAvenidaUsuario")} error={errors.ruaAvenidaUsuario?.message} id="ruaAvenidaUsuario"/>
                        <Input label="Número" type="text" width="w-24" {...register("numeroCasaUsuario")} error={errors.numeroCasaUsuario?.message} id="numeroCasaUsuario"/>
                    </div>
                    <div className="flex gap-4">
                        <Input label="Cidade" type="text" width="w-52" {...register("cidadeUsuario")} error={errors.cidadeUsuario?.message} id="cidadeUsuario"/>
                        <Input label="Bairro" type="text" width="w-52" {...register("bairroUsuario")} error={errors.bairroUsuario?.message} id="bairroUsuario"/>
                    </div>
                    <Select
                        label="Estado"
                        width="w-40"
                        options={estados}
                        {...register("estadoUsuario")}
                        error={errors.estadoUsuario?.message}
                        id="estadoUsuario"
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <Button text="Voltar" variant="outline" onClick={() => router.push("/admin/usuarios/listagem")} type="button"/>
                    <Button text="Salvar" variant="primary" type="submit"/>
                </div>
            </form>
        </>
    )
}