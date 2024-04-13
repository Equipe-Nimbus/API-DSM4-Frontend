'use client';
import { useState, useEffect, useContext } from 'react';
import { Button } from '@components/Button';
import Input from '@components/Input';
import { Dialog } from '@components/Dialog';
import { ToastContext } from '@contexts/ToastContext';
import parametroRequests from '@services/requests/parametroRequest';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import filtroParametroSchema, { FiltroParametroSchema } from '@lib/validations/parametro/filtroParametroSchema';
import { AiFillWarning, AiOutlinePlus } from 'react-icons/ai';
import { ModalCadastro } from '@components/ModalCadastro';
import FormParametros from '@components/FormParametros';
import { Parametro, ParametroListagem } from '@lib/models/Parametro';
import { ActionsDrodown } from '@components/ActionsDropdown';


export default function ListagemParametro() {
    const [parametros, setParametros] = useState<ParametroListagem[]>([]);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [key, setKey] = useState(0);
    const [filterSubmitted, setFilterSubmitted] = useState<FiltroParametroSchema | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [parametroIdDelete, setParametroIdDelete] = useState<number | null>(null);
    const [parametroIdEdit, setParametroIdEdit] = useState<number | null>(null);
    const [parametroToUpdate, setParametroToUpdate] = useState<Parametro | undefined>(undefined);
    const [cadastroOpen, setCadastroOpen] = useState(false)
    const hasMorePages = pagina < totalPaginas;

    const { addToast } = useContext(ToastContext);
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<FiltroParametroSchema>({
        resolver: zodResolver(filtroParametroSchema)
    });

    useEffect(() => {
        const filter = filterSubmitted || {};
        parametroRequests
            .get({ pagina, tamanhoPagina: 10, ...filter })
            .then((response) => {
                const { tiposParametros, quantidadePaginas } = response.data;
                //console.log(response)
                setParametros(tiposParametros);
                setTotalPaginas(quantidadePaginas);
            })
            .finally(() => setIsLoading(false));
    }, [pagina, key, getValues, filterSubmitted, cadastroOpen]);

    useEffect(() => {
        if (parametroIdEdit) {
            parametroRequests.getById(parametroIdEdit).then((response) => {
                setParametroToUpdate(response.data);
                setCadastroOpen(true);
            });
        }
    }, [parametroIdEdit])

    function handleFiltroParametro(data: FiltroParametroSchema) {
        setFilterSubmitted(data);
        setKey(prev => prev + 1);
        if (pagina !== 1) {
            setPagina(1);
        }
    }

    async function handleDelecaoParametro() {
        if (!parametroIdDelete) return;

        try {
            const response = await parametroRequests.delete(parametroIdDelete);
            if (response.status === 200) {
                addToast({ visible: true, message: `Parâmetro deletado com sucesso`, type: 'success', position: 'bottom-left' });
            }
        } catch (error: any) {
            console.log(error);
            if (error.response && error.response.data) {
                addToast({ visible: true, message: `Erro ao deletar o parâmetro: ${error.response.data}`, type: 'error', position: 'bottom-left' });
            } else {
                addToast({ visible: true, message: `Erro ao deletar o parâmetro`, type: 'error', position: 'bottom-left' });
            }
        }
        setKey(prev => prev + 1);
        setOpenDialog(false);
    }

    return (
        <>
            <div className="bg-bg-100 p-4 rounded-md drop-shadow">
                <h1 className="text-text-on-background text-base font-medium">Gerenciamento de Parâmetros</h1>
            </div>
            <form onSubmit={handleSubmit(handleFiltroParametro)} className="bg-bg-100 p-4 rounded-md drop-shadow flex gap-4">
                <Input width="w-60" placeholder="Nome..." {...register("nome")} error={errors.nome?.message} />
                <Input width="w-60" placeholder="Unidade..." {...register("unidade")} error={errors.unidade?.message} />
                <Button text="Filtrar" variant="ghost" type="submit" />
            </form>
            <div className="flex flex-col gap-2 w-fit h-fit">
                <Button type="button" text="Adicionar" Icon={AiOutlinePlus} iconPosition="left" variant="primary" onClick={() => { setCadastroOpen(!cadastroOpen) }} />
                <div className="bg-bg-100 px-4 py-4 rounded-md drop-shadow w-fit">
                    <table className="w-fit">
                        <thead className="text-text-on-background-disabled text-sm font-semibold border-b-2 border-text-on-background-disabled">
                            <tr>
                                <th className="p-4 text-left">Nome</th>
                                <th className="p-4 text-left">Unidade</th>
                                <th className="p-4 text-left">Fator</th>
                                <th className="p-4 text-left">Offset</th>
                                <th className="p-4 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="text-text-on-background font-medium">
                            {parametros?.map((parametro, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-4 w-80 max-w-80 truncate">{parametro.nomeTipoParametro}</td>
                                    <td className="px-4">{parametro.unidadeTipoParametro}</td>
                                    <td className="px-4">{parametro.fatorTipoParametro !== "1" ? parametro.fatorTipoParametro : "-"}</td>
                                    <td className="px-4">{parametro.offsetTipoParametro !== "0" ? parametro.offsetTipoParametro : "-"}</td>
                                    <td className="px-4 text-center">
                                        <ActionsDrodown actions={[
                                            { label: "Editar", onClick: () => { setParametroIdEdit(parametro.idTipoParametro) } },
                                            {
                                                label: "Excluir", onClick: () => {
                                                    setParametroIdDelete(parametro.idTipoParametro)
                                                    setOpenDialog(true)
                                                }
                                            }
                                        ]} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {isLoading && <span className="text-text-on-background font-medium">Carregando...</span>}
                </div>
                <div className="flex justify-end">
                    <div className="flex justify-end">
                        <div className="bg-bg-100 w-fit px-2 py-2 rounded-md drop-shadow flex gap-2 items-center justify-items-end">
                            <Button text="Anterior" variant="ghost" onClick={() => setPagina(pagina - 1)} disabled={pagina <= 1} />
                            <span className="text-text-on-background font-medium">{pagina} de {totalPaginas}</span>
                            <Button text="Próximo" variant="ghost" onClick={() => setPagina(pagina + 1)} disabled={!hasMorePages} />
                        </div>
                    </div>
                </div>
            </div>
            {openDialog &&
                <Dialog.Root>
                    <Dialog.Icon icon={AiFillWarning} color="text-accent-65" />
                    <Dialog.Content title="Atenção" text="Deseja deletar o parâmetro? Os vínculos com Estações e Alertas serão perdidos." />
                    <Dialog.Actions>
                        <Dialog.Action button={<Button text="Cancelar" variant="outline" onClick={() => setOpenDialog(false)} />} />
                        <Dialog.Action button={<Button text="Deletar" variant="accent" onClick={() => { handleDelecaoParametro() }} />} />
                    </Dialog.Actions>
                </Dialog.Root>
            }
            {
                cadastroOpen &&
                <ModalCadastro.Root>
                    <ModalCadastro.Header
                        title={!parametroToUpdate ? "Novo Parâmetro" : "Editar Parâmetro"}
                        onClose={() => {
                            setParametroIdEdit(null)
                            setParametroToUpdate(undefined)
                            setCadastroOpen(false)
                        }} />
                    <ModalCadastro.Content>
                        <FormParametros parametro={parametroToUpdate} />
                    </ModalCadastro.Content>
                </ModalCadastro.Root>
            }
        </>
    )

}
