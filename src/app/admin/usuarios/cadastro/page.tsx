'use client';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cadastroUsuarioSchema, CadastroUsuarioSchema } from "@lib/validations/usuario/cadastroUsuarioSchema";
import Input from "@components/Input";
import Select from "@components/Select";
import Button from "@components/Button";
import estados from "@lib/models/estados";

export default function CadastroUsuario() {
    const { register, handleSubmit, formState: { errors } } = useForm<CadastroUsuarioSchema>({
        resolver: zodResolver(cadastroUsuarioSchema),
    });

    async function handleCadastroUsuario(data: CadastroUsuarioSchema) {
        console.log(data);
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
                    <Input label="Nome Completo" type="text" width="w-96" {...register("nomeUsuario")} error={errors.nomeUsuario?.message} />
                    <div className="flex gap-4">
                        <Input label="CPF" type="text" width="w-52" placeholder="000.000.000-00" {...register("cpfUsuario")} error={errors.cpfUsuario?.message} />
                        <Input label="Data de Nascimento" type="date" width="w-40" {...register("dataNascimentoUsuario")} error={errors.dataNascimentoUsuario?.message} />
                    </div>
                    <Input label="E-mail" type="email" width="w-96" {...register("emailUsuario")} error={errors.emailUsuario?.message}/>
                    <Input label="Senha" type="password" width="w-96" {...register("senhaUsuario")} error={errors.senhaUsuario?.message}/>
                    <Select label="Perfil" width="w-40" options={["Administrador"]} {...register("perfilUsuario")} error={errors.perfilUsuario?.message}/>
                </div>
                <hr />
                <h2 className="text-text-on-background text-base font-medium">
                    Endereço
                </h2>
                <div className="flex flex-col gap-4">
                    <Input label="CEP" type="text" width="w-40" placeholder="00000-000" {...register("cepUsuario")} error={errors.cepUsuario?.message}/>
                    <div className="flex gap-4">
                        <Input label="Rua" type="text" width="w-80" {...register("ruaAvenidaUsuario")} error={errors.ruaAvenidaUsuario?.message}/>
                        <Input label="Número" type="text" width="w-24" {...register("numeroCasaUsuario")} error={errors.numeroCasaUsuario?.message}/>
                    </div>
                    <div className="flex gap-4">
                        <Input label="Cidade" type="text" width="w-52" {...register("cidadeUsuario")} error={errors.cidadeUsuario?.message}/>
                        <Input label="Bairro" type="text" width="w-52" {...register("bairroUsuario")} error={errors.bairroUsuario?.message}/>
                    </div>
                    <Select label="Estado" width="w-40" options={estados} {...register("estadoUsuario")} error={errors.estadoUsuario?.message}/>
                </div>
                <div className="flex justify-end gap-4">
                    <Button text="Cancelar" variant="outline" />
                    <Button text="Salvar" variant="primary" />
                </div>

            </form>
        </>
    )
}