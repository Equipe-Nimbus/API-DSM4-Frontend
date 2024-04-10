import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@components/Button';
import Input from '@components/Input';
import { Dialog } from '@components/Dialog';
import { useRouter } from 'next/router';
import { ToastContext } from '@contexts/ToastContext';
import parametroRequests from '@services/requests/parametroRequest';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import filtroParametroSchema, { FiltroParametroSchema } from '@lib/validations/parametro/filtroParametroSchema';
import { AiFillWarning, AiOutlinePlus } from 'react-icons/ai';

export default function ListagemParametro() {
    const [parametros, setParametros] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [key, setKey] = useState(0);
    const [filterSubmitted, setFilterSubmitted] = useState<FiltroParametroSchema | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [parametroId, setParametroId] = useState<number | null>(null);

    const hasMorePages = pagina < totalPaginas;

    const { addToast } = useContext(ToastContext);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, getValues } = useForm<FiltroParametroSchema>({
        resolver: zodResolver(filtroParametroSchema)
    });

    useEffect(() => {
        const filter = filterSubmitted || {};
        parametroRequests
            .get({ pagina, tamanhoPagina: 10, ...filter })
            .then((response: { data: { parametros: any; quantidadePaginas: any; }; }) => {
                const { parametros, quantidadePaginas } = response.data;
                setParametros(parametros);
                setTotalPaginas(quantidadePaginas);
            })
            .finally(() => setIsLoading(false));
    }, [pagina, key, getValues, filterSubmitted]);

    function handleFiltroParametro(data: FiltroParametroSchema) {
        setFilterSubmitted(data);
        setKey(prev => prev + 1);
        if (pagina !== 1) {
            setPagina(1);
        }
    }

    async function handleDelecaoParametro() {
        if (!parametroId) return;

        try {
            const response = await parametroRequests.delete(parametroId);
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
                { }
                <Button text="Filtrar" variant="ghost" type="submit" />
            </form>
            <div className="flex flex-col gap-2 w-fit h-fit">
                { }
                <div className="bg-bg-100 px-4 py-4 rounded-md drop-shadow w-fit">
                    <Button type="button" text="Adicionar" Icon={AiOutlinePlus} iconPosition="left" variant="primary" onClick={() => router.push("/admin/parametros/cadastro")} />
                    <table className="w-fit">
                        <thead className="text-text-on-background-disabled text-sm font-semibold border-b-2 border-text-on-background-disabled">
                            <tr>
                                <th className="p-4 text-left">Nome</th>
                                <th className="p-4 text-left">Fator</th>
                                <th className="p-4 text-left">Unidade</th>
                                <th className="p-4 text-left">Ganho</th>
                                <th className="p-4 text-left">Offset</th>
                                <th className="p-4 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="text-text-on-background font-medium">
                            {parametros.map((parametro: any, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-4">{parametro.nomeTipoParametro}</td>
                                    <td className="px-4">{parametro.fatorTipoParametro}</td>
                                    <td className="px-4">{parametro.unidadeTipoParametro}</td>
                                    <td className="px-4">{parametro.ganhoTipoParametro}</td>
                                    <td className="px-4">{parametro.offsetTipoParametro}</td>
                                    <td className="px-4 text-center">
                                        { }
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
                    <Dialog.Content title="Atenção" text="Deseja deletar o parâmetro? Os dados de medição serão mantidos." />
                    <Dialog.Actions>
                        <Dialog.Action button={<Button text="Cancelar" variant="outline" onClick={() => setOpenDialog(false)} />} />
                        <Dialog.Action button={<Button text="Deletar" variant="accent" onClick={() => { handleDelecaoParametro() }} />} />
                    </Dialog.Actions>
                </Dialog.Root>
            }
        </>
    )

}
