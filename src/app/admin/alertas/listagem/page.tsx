'use client';
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { Button } from "@components/Button";
import Input from "@components/Input";
import { RiSearch2Line } from "react-icons/ri";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiltroAlertaSchema, filtroAlertaSchema } from "@lib/validations/alerta/filtroAlertaSchema";
import alertaRequests from "@services/requests/alertaRequests";
import { Alerta, AlertaListagem } from "@lib/models/Alerta";
import { AiFillWarning, AiOutlinePlus } from "react-icons/ai";
import { ActionsDrodown } from "@components/ActionsDropdown";
import { ModalCadastro } from "@components/ModalCadastro";
import FormAlerta from "@components/FormAlerta";
import { Dialog } from "@components/Dialog";
import { ToastContext } from "@contexts/ToastContext";

export default function ListagemAlerta() {
    const [alertas, setAlertas] = useState<AlertaListagem[]>([]);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const hasMorePages = pagina < totalPaginas;
    const [key, setKey] = useState(0);
    const [filterSubmitted, setFilterSubmitted] = useState<FiltroAlertaSchema | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [cadastroOpen, setCadastroOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [alertaIdDelete, setAlertaIdDelete] = useState<number | null>(null);
    const [alertaIdEdit, setAlertaIdEdit] = useState<number | null>(null);
    const [alertaToUpdate, setAlertaToUpdate] = useState<Alerta | undefined>(undefined);
    const { register, handleSubmit, formState: { errors } } = useForm<FiltroAlertaSchema>({
        resolver: zodResolver(filtroAlertaSchema)
    });
    const { addToast } = useContext(ToastContext);

    useEffect(() => {
        const filter = filterSubmitted || {};
        alertaRequests.get({ pagina, tamanhoPagina: 10, ...filter }).then((response) => {
            const { alertas, quantidadePaginas } = response;
            setAlertas(alertas);
            setTotalPaginas(quantidadePaginas);
        })
            .finally(() => setIsLoading(false));
    }, [pagina, filterSubmitted, key, cadastroOpen])

    useEffect(() => {
        if (alertaIdEdit) {
            alertaRequests.getById(alertaIdEdit)
                .then((response) => {
                    setAlertaToUpdate(response)
                })
                .finally(() => setCadastroOpen(true))
        }
    }, [alertaIdEdit])

    function handleFiltroAlerta(data: FiltroAlertaSchema) {
        setFilterSubmitted(data);
        setKey(prev => prev + 1);

        if (pagina !== 1) {
            setPagina(1);
        }
    }

    async function handleDelecaoAlerta() {
        if (!alertaIdDelete) return;

        try {
            const response = await alertaRequests.delete(alertaIdDelete);
            if (response.status === 200) {
                addToast({ type: "success", message: "Alerta deletado com sucesso!", position: "bottom-left", visible: true });
            }
        } catch (error: any) {
            if (error.response && error.response.data) {
                addToast({ type: "error", message: `Erro ao deletar o alerta: ${error.response.data}`, position: "bottom-left", visible: true });
            } else {
                addToast({ type: "error", message: `Erro ao deletar o alerta`, position: "bottom-left", visible: true });
            }
        } finally {
            setDialogOpen(false);
            setKey(prev => prev + 1);
        }
    }

    return (
        <>
            <div className="bg-bg-100 p-4 rounded-md drop-shadow">
                <h1 className="text-text-on-background text-base font-medium">Gerenciamento de Alertas</h1>
            </div>
            <form onSubmit={handleSubmit(handleFiltroAlerta)} className="bg-bg-100 p-4 rounded-md drop-shadow flex gap-4">
                <Input width="w-60" placeholder="Nome..."  {...register("nome")} />
                <Button text="Filtrar" variant="ghost" type="submit" Icon={RiSearch2Line} iconPosition="left" />
            </form>
            <div className="flex flex-col gap-2 w-fit h-fit">
                <Button text="Adicionar" variant="primary" Icon={AiOutlinePlus} iconPosition="left" onClick={() => { setCadastroOpen(true) }} />
                <div className="bg-bg-100 px-4 py-4 rounded-md drop-shadow w-fit">
                    <table className="w-fit">
                        <thead className="text-text-on-background-disabled text-sm font-semibold border-b-2 border-text-on-background-disabled">
                            <tr>
                                <th className="p-4 text-left">NOME</th>
                                <th className="p-4 text-left">PARAMETRO</th>
                                <th className="p-4 text-left">CONDIÇÃO</th>
                                <th className="p-4 text-left">VALOR</th>
                                <th className="p-4 text-left">UNIDADE</th>
                                <th className="p-4 text-center">AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody className="text-text-on-background font-medium">
                            {alertas?.map((alerta, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-4 w-60 max-w-80 truncate">{alerta.nomeAlerta}</td>
                                    <td className="px-4 truncate">{alerta.tipoParametro.nomeTipoParametro}</td>
                                    <td className="px-4 truncate">{alerta.condicaoAlerta}</td>
                                    <td className="px-4 truncate">{alerta.valorMedicaoAlerta}</td>
                                    <td className="px-4 truncate">{alerta.tipoParametro.unidadeTipoParametro}</td>
                                    <td className="px-4 w-24 max-w-24 text-center">
                                        <ActionsDrodown actions={[
                                            { label: "Editar", onClick: () => { setAlertaIdEdit(alerta.idAlerta) } },
                                            {
                                                label: "Excluir", onClick: () => {
                                                    setAlertaIdDelete(alerta.idAlerta)
                                                    setDialogOpen(true)
                                                }
                                            }
                                        ]} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {isLoading && <span className="text-text-on-background font-medium">Carregando...</span>}
                <div className="flex justify-end">
                    <div className="bg-bg-100 w-fit px-2 py-2 rounded-md drop-shadow flex gap-2 items-center justify-items-end">
                        <Button text="Anterior" variant="ghost" onClick={() => setPagina(pagina - 1)} disabled={pagina <= 1} />
                        <span className="text-text-on-background font-medium">{pagina} de {totalPaginas}</span>
                        <Button text="Próximo" variant="ghost" onClick={() => setPagina(pagina + 1)} disabled={!hasMorePages} />
                    </div>
                </div>
            </div>
            {cadastroOpen && (
                <ModalCadastro.Root>
                    <ModalCadastro.Header
                        title={!alertaToUpdate ? "Novo Alerta" : "Editar Alerta"}
                        onClose={() => {
                            setAlertaIdEdit(null)
                            setAlertaToUpdate(undefined)
                            setCadastroOpen(false)
                        }} />
                    <ModalCadastro.Content>
                        <FormAlerta alerta={alertaToUpdate}/>
                    </ModalCadastro.Content>
                </ModalCadastro.Root>
            )}
            {dialogOpen && (
                <Dialog.Root>
                    <Dialog.Icon icon={AiFillWarning} color="text-accent-65" />
                    <Dialog.Content title="Atenção" text="Deseja deletar o alerta? O histórico de medições será mantido." />
                    <Dialog.Actions>
                        <Dialog.Action button={<Button text="Cancelar" variant="outline" onClick={() => setDialogOpen(false)} />} />
                        <Dialog.Action button={<Button text="Deletar" variant="accent" onClick={() => { handleDelecaoAlerta() }} />} />
                    </Dialog.Actions>
                </Dialog.Root>
            )}
        </>
    )
}