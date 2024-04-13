'use client';
import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import filtroEstacaoSchema, { FiltroEstacaoSchema } from "@lib/validations/estacao/filtroEstacaoSchema";
import estacaoRequests from "@services/requests/estacaoRequests";
import { useRouter } from "next/navigation";
import Input from "@components/Input";
import { Button } from "@components/Button";
import { AiFillWarning, AiOutlinePlus } from "react-icons/ai";
import { EstacaoListagem } from "@lib/models/Estacao";
import { ActionsDrodown } from "@components/ActionsDropdown";
import { Dialog } from "@components/Dialog";
import { ToastContext } from "@contexts/ToastContext";


export default function ListagemEstacao() {
    const [estacoes, setEstacoes] = useState<EstacaoListagem[]>([])
    const [pagina, setPagina] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(0)
    const [key, setKey] = useState(0)
    const [filterSubmitted, setFilterSubmitted] = useState<FiltroEstacaoSchema | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [openDialog, setOpenDialog] = useState(false)
    const [estacaoId, setEstacaoId] = useState<number | null>(null)
    const hasMorePages = pagina < totalPaginas;

    const { addToast } = useContext(ToastContext)
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, getValues } = useForm<FiltroEstacaoSchema>({
        resolver: zodResolver(filtroEstacaoSchema)
    });

    useEffect(() => {
        const filter = filterSubmitted || {};
        estacaoRequests
            .get({ pagina, tamanhoPagina: 10, ...filter })
            .then((response) => {
                const { estacoes, quantidadePaginas } = response.data;
                setEstacoes(estacoes);
                setTotalPaginas(quantidadePaginas);
            })
            .finally(() => setIsLoading(false));
    }, [pagina, filterSubmitted, key])

    function handleFiltroEstacao(data: FiltroEstacaoSchema) {
        setFilterSubmitted(data);
        setKey(prev => prev + 1);

        if (pagina !== 1) {
            setPagina(1);
        }
    }

    function handleDelecaoEstacao() {
        if (!estacaoId) return;

        estacaoRequests
            .delete(estacaoId)
            .then(() => {
                addToast({ type: "success", message: "Estação deletada com sucesso!", position: "bottom-left", visible: true})
                setKey(prev => prev + 1);
            })
            .catch((error) => {
                console.log(error)
                if(error.response && error.response.data) {
                    addToast({ type: "error", message: `Erro ao deletar a estação: ${error.response.data}`, position: "bottom-left", visible: true})
                    return;
                }
                addToast({ type: "error", message: "Erro ao deletar estação", position: "bottom-left", visible: true})
            })
            .finally(() => setOpenDialog(false))
    }

    return (
        <>
            <div className="bg-bg-100 p-4 rounded-md drop-shadow">
                <h1 className="text-text-on-background text-base font-medium">Gerenciamento de Estações</h1>
            </div>
            <form onSubmit={handleSubmit(handleFiltroEstacao)} className="bg-bg-100 p-4 rounded-md drop-shadow flex gap-4">
                <Input width="w-60" placeholder="Nome da estação..." {...register("nome")} />
                <Input width="w-52" placeholder="Endereço..." {...register("cep")} />
                <Button type="submit" variant="ghost" text="Filtrar" />
            </form>
            <div className="flex flex-col gap-2 w-fit h-fit">
                <Button type="button" text="Adicionar" Icon={AiOutlinePlus} iconPosition="left" variant="primary" onClick={() => router.push("/admin/estacoes/cadastro")}/>
                <div className="bg-bg-100 px-4 py-4 rounded-md drop-shadow w-fit">
                    <table className="w-fit">
                        <thead className="text-text-on-background-disabled text-sm font-semibold border-b-2 border-text-on-background-disabled">
                            <tr>
                                <th className="p-4 text-left">ID</th>
                                <th className="p-4 text-left">NOME</th>
                                <th className="p-4 text-left">CEP</th>
                                <th className="p-4 text-center">AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody className="text-text-on-background font-medium">
                            {estacoes.map((estacao, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="px-4 py-4 w-24 max-w-24 truncate">{estacao.idEstacao}</td>
                                        <td className="px-4 w-80 max-w-80 truncate">{estacao.nomeEstacao}</td>
                                        <td className="px-4 w-52 max-w-52 truncate">{estacao.cepEstacao}</td>
                                        <td className="px-4 w-24 max-w-24 text-center">
                                            <ActionsDrodown actions={[
                                                { label: "Editar", onClick: () => {router.push(`/admin/estacoes/listagem/${estacao.idEstacao}`) } },
                                                { label: "Excluir", onClick: () => {
                                                    setEstacaoId(estacao.idEstacao)
                                                    setOpenDialog(true)
                                                 } }
                                            ]} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {isLoading && <span className="text-text-on-background font-medium">Carregando...</span>}
                </div>
                <div className="flex justify-end">
                    <div className="bg-bg-100 w-fit px-2 py-2 rounded-md drop-shadow flex gap-2 items-center justify-items-end">
                        <Button text="Anterior" variant="ghost" onClick={() => setPagina(pagina - 1)} disabled={pagina <= 1} />
                        <span className="text-text-on-background font-medium">{pagina} de {totalPaginas}</span>
                        <Button text="Próximo" variant="ghost" onClick={() => setPagina(pagina + 1)} disabled={!hasMorePages} />
                    </div>
                </div>
            </div>
            {openDialog &&
                <Dialog.Root>
                    <Dialog.Icon icon={AiFillWarning} color="text-accent-65"/>
                    <Dialog.Content title="Atenção" text="Deseja deletar a estação? Os dados de medição serão mantidos."/>
                    <Dialog.Actions>
                        <Dialog.Action button={<Button text="Cancelar" variant="outline" onClick={() => setOpenDialog(false)}/>}/>
                        <Dialog.Action button={<Button text="Deletar" variant="accent" onClick={() => {handleDelecaoEstacao()}}/>}/>
                    </Dialog.Actions>
                </Dialog.Root>
            }
        </>
    )
}