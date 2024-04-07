import { ToastContext } from "@contexts/ToastContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { CadastroEstacaoSchema, Estacao } from "@lib/models/Estacao";
import { ListagemParametroSchema } from "@lib/models/Parametro";
import estados from "@lib/models/estados";
import { cadastroEstacaoSchema } from "@lib/validations/estacao/cadastroEstacaoSchema";
import enderecoRequests from "@services/requests/enderecoRequests";
import estacaoRequests from "@services/requests/estacaoRequests";
import parametroRequests from "@services/requests/parametroRequest";
import { useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactInputMask from "react-input-mask";
import Input from "./Input";
import { Button } from "./Button";
import Select from "./Select";
import { Option } from "./Select";

interface FormEstacaoProps {
    estacao?: Estacao
}

export default function FormEstacao({ estacao }: FormEstacaoProps) {
    const [parametrosSelecao, setParametrosSelecao] = useState<Option[]>([]);
    const [parametrosResgatados, setParametrosResgatados] = useState<ListagemParametroSchema[]>([]);
    const [parametroSelecionado, setParametroSelecionado] = useState<ListagemParametroSchema | undefined>(undefined);
    
    const { addToast } = useContext(ToastContext)
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, setValue, getValues, control } = useForm<CadastroEstacaoSchema>({
        resolver: zodResolver(cadastroEstacaoSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "tipoParametros",
    });

    useEffect(() => {
        parametroRequests.getSelectEstacoes().then((response) => {
            const { parametrosSelecao, parametrosResgatados } = response;
            setParametrosSelecao(parametrosSelecao);
            setParametrosResgatados(parametrosResgatados);
        })
    }, [])

    useEffect(() => {
        if(estacao) {
            setValue("nomeEstacao", estacao.nomeEstacao);
            setValue("cepEstacao", estacao.cepEstacao);
            setValue("ruaAvenidaEstacao", estacao.ruaAvenidaEstacao);
            setValue("numeroEnderecoEstacao", estacao.numeroEnderecoEstacao);
            setValue("cidadeEstacao", estacao.cidadeEstacao);
            setValue("bairroEstacao", estacao.bairroEstacao);
            setValue("estadoEstacao", estacao.estadoEstacao);
            setValue("latitudeEstacao", estacao.latitudeEstacao);
            setValue("longitudeEstacao", estacao.longitudeEstacao);
            setValue("tipoParametros", estacao.tipoParametros);
        }
    }, [estacao, setValue])

    function handleSubmitEstacao(data: CadastroEstacaoSchema) {
        if(data.tipoParametros.length === 0) {
            return addToast({ visible: true, message: `É necessário adicionar ao menos um parâmetro de medição`, type: 'error', position: 'bottom-left' });
        }

        if (estacao) {
            handleAtualizacaoUsuario(data);
        } else {
            handleCadastroEstacao(data);
        }
    }

    function handleCadastroEstacao(data: CadastroEstacaoSchema) {
        estacaoRequests.create(data)
            .then((response) => {
                if (response.status === 200) {
                    addToast({ visible: true, message: `Estação cadastrada com sucesso`, type: 'success', position: 'bottom-left' });
                    router.push('/admin/estacoes/listagem');
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response && error.response.data) {
                    addToast({ visible: true, message: `Erro durante o cadastro da estação: ${error.response.data}`, type: 'error', position: 'bottom-left' });
                }
                else {
                    addToast({ visible: true, message: `Erro durante o cadastro da estação`, type: 'error', position: 'bottom-left' });
                }
            })
    }

    function handleAtualizacaoUsuario(data: CadastroEstacaoSchema) {
        if(!estacao) {
            return;
        }

        const body: Estacao = {idEstacao: estacao.idEstacao, ...data}
        estacaoRequests.update(body)
            .then((response) => {
                if (response.status === 200) {
                    return addToast({ visible: true, message: `Estação atualizada com sucesso`, type: 'success', position: 'bottom-left' });
                }
            })
            .catch((error) => {
                console.log(error);
                if (error.response && error.response.data) {
                    addToast({ visible: true, message: `Ocorreu um erro durante a atualização da estação: ${error.response.data}`, type: 'error', position: 'bottom-left' });
                }
                else {
                    addToast({ visible: true, message: `Erro durante a atualização da estação`, type: 'error', position: 'bottom-left' });
                }
            })
    }

    function handleCepBlur(cep: string) {
        const cepFormatted = cep.replace(/\D/g, "");

        if (cepFormatted.length !== 8) {
            return;
        }

        enderecoRequests.get(cepFormatted).then((response) => {
            setValue("ruaAvenidaEstacao", response.data.logradouro);
            setValue("bairroEstacao", response.data.bairro);
            setValue("cidadeEstacao", response.data.localidade);
            setValue("estadoEstacao", response.data.uf);
        })
    }

    function handleLatLong(numeroEndereco: string) {
        const ruaAvenida = getValues("ruaAvenidaEstacao");
        const cidade = getValues("cidadeEstacao");
        const estado = getValues("estadoEstacao");

        const endereco = `${ruaAvenida} ${numeroEndereco}, ${cidade}, ${estado}`;

        enderecoRequests.getLatLong(endereco).then((response) => {
            //console.log(response);
            const { lat, lng } = response.data.results[0].geometry.location;
            setValue("latitudeEstacao", lat);
            setValue("longitudeEstacao", lng);
        })
    }

    function handleAdicionarParametro() {
        if (parametroSelecionado) {
            append(parametroSelecionado);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleSubmitEstacao)} className="flex flex-col gap-8">
                <div className="bg-bg-100 p-4 rounded-md drop-shadow flex flex-col gap-7">
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
                            <Input label="Número" type="text" width="w-24" {...register("numeroEnderecoEstacao")} error={errors.numeroEnderecoEstacao?.message} id="numeroEnderecoUsuario" onBlur={(e) => { handleLatLong(e.target.value) }} />
                        </div>
                        <div className="flex gap-4">
                            <Input label="Cidade" type="text" width="w-52" {...register("cidadeEstacao")} error={errors.cidadeEstacao?.message} id="cidadeEstacao" />
                            <Input label="Bairro" type="text" width="w-52" {...register("bairroEstacao")} error={errors.bairroEstacao?.message} id="bairroEstacao" />
                        </div>
                        <Select label="Estado" width="w-40" options={estados} {...register("estadoEstacao")} error={errors.estadoEstacao?.message} id="estadoEstacao" />
                    </div>
                </div>
                <div className="bg-bg-100 p-4 rounded-md drop-shadow flex flex-col gap-7">
                    <h2 className="text-text-on-background text-base font-medium">
                        Parâmetros de medição
                    </h2>
                    <div className="flex gap-7">
                        <Select width="w-56"
                            options={parametrosSelecao}
                            onChange={(e) => {
                                const parametroSelecionado = parametrosResgatados
                                    .find(parametro => parametro.idTipoParametro === parseInt(e.target.value))
                                setParametroSelecionado(parametroSelecionado)
                            }} />
                        <Button text="Adicionar" variant="outline" type="button" onClick={() => { handleAdicionarParametro() }} />
                    </div>
                    <h2 className="text-text-on-background text-base font-medium">
                        Parâmetros de medição:
                    </h2>
                    {(fields && fields.length > 0) ? (
                        <div className="flex">
                            <table className="table-auto">
                                <thead className="text-text-on-background-disabled text-sm font-semibold border-b-2 border-text-on-background-disabled">
                                    <tr>
                                        <th className="p-4 text-left w-1/2">Nome</th>
                                        <th className="p-4 text-left w-1/6">Unidade</th>
                                        <th className="p-4 text-left w-1/6">Fator</th>
                                        <th className="p-4 text-center w-1/6">Ação</th>
                                    </tr>
                                </thead>
                                <tbody className="text-text-on-background font-medium">
                                    {fields.map((field, index) => (
                                        <tr key={field.id}>
                                            <td className="px-4 py-4 w-3/4">{field.nomeTipoParametro}</td>
                                            <td className="px-4 py-4 w-1/6">{field.unidadeTipoParametro}</td>
                                            <td className="px-4 py-4 w-1/6">{field.fatorTipoParametro === '1' ? "-" : field.fatorTipoParametro}</td>
                                            <td className="px-6 w-1/6 text-center">
                                                <RiDeleteBin6Line className="text-text-on-background-disabled cursor-pointer" onClick={() => remove(index)} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) :
                        <span className="text-text-on-background">Nenhum parâmetro adicionado</span>}
                    <div className="flex justify-end gap-4">
                        <Button text="Cancelar" variant="outline" type="button" onClick={() => { router.push("/admin/estacoes/listagem") }} />
                        <Button text="Salvar" variant="primary" type="submit" />
                    </div>
                </div>
            </form>

        </>

    )
}