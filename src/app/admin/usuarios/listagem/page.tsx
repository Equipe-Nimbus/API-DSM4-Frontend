'use client';
import Input from "@components/Input"
import { Button } from "@components/Button"
import { ActionsDrodown } from "@components/ActionsDropdown";
import { RiSearch2Line } from "react-icons/ri"
import { AiOutlinePlus, AiOutlineMore, AiFillWarning } from "react-icons/ai"
import { Dialog } from "@components/Dialog";

import { UsuarioListagem } from "@lib/models/Usuario"
import { useContext, useEffect, useState } from "react"
import usuarioRequests from "@services/requests/usuarioRequests";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiltroUsuarioSchema, filtroUsuarioSchema } from "@lib/validations/usuario/filtroUsuarioSchema";
import { useRouter } from "next/navigation";
import { ToastContext } from "@contexts/ToastContext";

export default function ListagemUsuario() {
    const [usuarios, setUsuarios] = useState<UsuarioListagem[]>([]);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [key, setKey] = useState(0);
    const [filterSubmitted, setFilterSubmitted] = useState<FiltroUsuarioSchema | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [usuarioId, setUsuarioId] = useState<number | null>(null);

    const hasMorePages = pagina < totalPaginas;

    const { addToast } = useContext(ToastContext)
    const router = useRouter();

    const { register, handleSubmit, formState: { errors }, getValues } = useForm<FiltroUsuarioSchema>({
        resolver: zodResolver(filtroUsuarioSchema)
    });

    useEffect(() => {
        const filter = filterSubmitted || {};
        usuarioRequests
            .get({ pagina, tamanhoPagina: 10, ...filter })
            .then((response) => {
                //console.log(response.data);
                const { usuarios } = response.data;
                setUsuarios(usuarios);
                setTotalPaginas(response.data.quantidadePaginas);
            })
            .finally(() => setIsLoading(false));
    }, [pagina, key, getValues, filterSubmitted]);

    function handleFiltroUsuario(data: FiltroUsuarioSchema) {
        setFilterSubmitted(data);
        setKey(prev => prev + 1);

        if (pagina !== 1) {
            setPagina(1);
        }
    }

        async function handleDelecaoUsuario() {
            if(!usuarioId) return;
            
            try {
                const response = await usuarioRequests.delete(usuarioId)
                if(response.status === 200) {
                    addToast({ visible: true, message: `Usuário deletado com sucesso`, type: 'success', position: 'bottom-left' })
                }
            } catch (error: any) {
                console.log(error)
                if(error.response && error.response.data) {
                    addToast({ visible: true, message: `Erro ao deletar o usuário: ${error.response.data}`, type: 'error', position: 'bottom-left' })
                } else {
                    addToast({ visible: true, message: `Erro ao deletar o usuário`, type: 'error', position: 'bottom-left' })
                }
            }
            setKey(prev => prev + 1);
            setOpenDialog(false);
        }

        return (
            <>
                <div className="bg-bg-100 p-4 rounded-md drop-shadow">
                    <h1 className="text-text-on-background text-base font-medium">Gerenciamento de Usuários</h1>
                </div>
                <form onSubmit={handleSubmit(handleFiltroUsuario)} className="bg-bg-100 p-4 rounded-md drop-shadow flex gap-4">
                    <Input width="w-60" placeholder="Nome..." {...register("nome")} error={errors.nome?.message} />
                    <Input width="w-60" placeholder="Email" {...register("email")} error={errors.email?.message} />
                    <Button text="Filtrar" variant="ghost" type="submit" Icon={RiSearch2Line} iconPosition="left" />
                </form>
                <div className="flex flex-col gap-2 w-fit h-fit">
                    <Button text="Adicionar" variant="primary" Icon={AiOutlinePlus} iconPosition="left" onClick={() => router.push("/admin/usuarios/cadastro")} />
                    <div className="bg-bg-100 px-4 py-4 rounded-md drop-shadow w-fit">
                        <table className="w-fit">
                            <thead className="text-text-on-background-disabled text-sm font-semibold border-b-2 border-text-on-background-disabled">
                                <tr>
                                    <th className="p-4 text-left">ID</th>
                                    <th className="p-4 text-left">NOME</th>
                                    <th className="p-4 text-left">EMAIL</th>
                                    <th className="p-4 text-center">AÇÕES</th>
                                </tr>
                            </thead>
                            <tbody className="text-text-on-background font-medium">
                                {usuarios.map((usuario, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-4 w-24 max-w-24 truncate">{usuario.idUsuario}</td>
                                        <td className="px-4 w-80 max-w-80 truncate">{usuario.nomeUsuario}</td>
                                        <td className="px-4 w-80 max-w-80 truncate">{usuario.emailUsuario}</td>
                                        <td className="px-4 w-24 max-w-24 text-center">
                                            <ActionsDrodown actions={[
                                                { label: "Editar", onClick: () => { router.push(`/admin/usuarios/listagem/${usuario.idUsuario}`) } },
                                                { label: "Excluir", onClick: () => {
                                                        setUsuarioId(usuario.idUsuario)
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
                        <div className="bg-bg-100 w-fit px-2 py-2 rounded-md drop-shadow flex gap-2 items-center justify-items-end">
                            <Button text="Anterior" variant="ghost" onClick={() => setPagina(pagina - 1)} disabled={pagina <= 1} />
                            <span className="text-text-on-background font-medium">{pagina} de {totalPaginas}</span>
                            <Button text="Próximo" variant="ghost" onClick={() => setPagina(pagina + 1)} disabled={!hasMorePages} />
                        </div>
                    </div>

                </div>
                {openDialog &&
                    <Dialog.Root>
                        <Dialog.Icon icon={AiFillWarning} color="text-accent-65" />
                        <Dialog.Content title="Atenção" text="Deseja realmente deletar o usuário?" />
                        <Dialog.Actions>
                            <Dialog.Action button={<Button text="Cancelar" variant="outline" onClick={() => { setOpenDialog(false) }} />} />
                            <Dialog.Action button={<Button text="Confirmar" variant="accent" onClick={() => { handleDelecaoUsuario() }} />} />
                        </Dialog.Actions>
                    </Dialog.Root>
                }
            </>
        )
    }
