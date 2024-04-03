'use client';
import Input from "@components/Input"
import { Button } from "@components/Button"
import { ActionsDrodown } from "@components/ActionsDropdown";
import { RiSearch2Line } from "react-icons/ri"
import { AiOutlinePlus, AiOutlineMore } from "react-icons/ai"

import { UsuarioListagem } from "@lib/models/Usuario"
import { useEffect, useState } from "react"
import usuarioRequests from "@services/requests/usuarioRequests";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiltroUsuarioSchema, filtroUsuarioSchema } from "@lib/validations/usuario/filtroUsuarioSchema";

export default function ListagemUsuario() {
    const [usuarios, setUsuarios] = useState<UsuarioListagem[]>([]);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [isLoading, setIsLoading] = useState(true); 
    const [key, setKey] = useState(0);
    const [filterSubmitted, setFilterSubmitted] = useState<FiltroUsuarioSchema| null>(null);;

    const hasMorePages = pagina < totalPaginas;

    const { register, handleSubmit, formState: { errors}, getValues } = useForm<FiltroUsuarioSchema>({
        resolver: zodResolver(filtroUsuarioSchema)
    });

    function handleFiltroUsuario(data: FiltroUsuarioSchema) {
        setFilterSubmitted(data);
        setKey(prev => prev + 1);

        if(pagina !== 1) {
            setPagina(1);
        }
    }


    useEffect(() => {
        const filter = filterSubmitted || {};
        console.log(filter);
        usuarioRequests
            .get({ pagina, tamanhoPagina: 10, ...filter})
            .then((response) => {
                //console.log(response.data);
                const { usuarios } = response.data;
                setUsuarios(usuarios);
                setTotalPaginas(response.data.quantidadePaginas);
            })
            .finally(() => setIsLoading(false));
    }, [pagina, key, getValues, filterSubmitted]);

    return (
        <>
            <div className="bg-bg-100 p-4 rounded-md drop-shadow">
                <h1 className="text-text-on-background text-base font-medium">Gerenciamento de Usuários</h1>
            </div>
            <form onSubmit={handleSubmit(handleFiltroUsuario)} className="bg-bg-100 p-4 rounded-md drop-shadow flex gap-4">
                <Input width="w-60" placeholder="Nome..." {...register("nome")} error={errors.nome?.message}/>
                <Input width="w-60" placeholder="Email" {...register("email")} error={errors.email?.message}/>
                <Button text="Filtrar" variant="ghost" type="submit" Icon={RiSearch2Line} iconPosition="left" />
            </form>
            <div className="flex flex-col gap-2 w-fit h-fit">
                <Button text="Adicionar" variant="primary" Icon={AiOutlinePlus} iconPosition="left" />
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
                                            { label: "Editar", onClick: () => { } },
                                            { label: "Excluir", onClick: () => { } }
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

        </>
    )
}