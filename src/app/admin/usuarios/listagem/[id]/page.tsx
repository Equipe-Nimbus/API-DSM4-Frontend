'use client';

import { useEffect, useState } from "react";
import { Usuario } from "@lib/models/Usuario";
import usuarioRequests from "@services/requests/usuarioRequests";
import FormUsuario from "@components/FormUsuario";

export default function ListagemUsuarioEspecifico({ params }: { params: {id: string}}) {
    const [usuario, setUsuario] = useState<Usuario>({} as Usuario)

    useEffect(() => {
        const id = Number(params.id);
        usuarioRequests.getById(id)
            .then((response) => {
                console.log(response.data);
                setUsuario(response.data);
            })
    }, [params.id])

    return (
        <>
            <div className="bg-bg-100 p-4 rounded-md drop-shadow">
                <h1 className="text-text-on-background text-base font-medium">Alterar dados de um usuário</h1>
            </div>
            <FormUsuario usuario={usuario}/>
        </>
    )
}