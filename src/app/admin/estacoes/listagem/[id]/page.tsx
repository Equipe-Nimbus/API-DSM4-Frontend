'use client';
import FormEstacao from "@components/FormEstacao";
import { Estacao } from "@lib/models/Estacao";
import estacaoRequests from "@services/requests/estacaoRequests";
import { useEffect, useState } from "react";

export default function ListagemEstacaoEspecifica({ params }: { params: {id: string}}) {
    const [estacao, setEstacao] = useState<Estacao>({} as Estacao)

    useEffect(() => {
        const id = params.id;
        //requisição para buscar estação pelo id
        estacaoRequests.getById(id)
            .then((response) => {
                setEstacao(response.data);
            })
            .catch((error) => {
                console.log(error.response);
            })
    }, [params.id])

    return (
        <>
            <div className="bg-bg-100 p-4 rounded-md drop-shadow">
                <h1 className="text-text-on-background text-base font-medium">Alterar dados de uma estação</h1>
            </div>
            <FormEstacao estacao={estacao}/>
        </>
    )
}