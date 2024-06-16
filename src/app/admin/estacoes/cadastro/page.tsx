'use client';
import FormEstacao from "@components/FormEstacao";


export default function CadastroEstacao() {

    return (
        <>
            <div className="bg-bg-100 p-4 rounded-md drop-shadow">
                <h1 className="text-text-on-background text-base font-medium">Nova Estação</h1>
            </div>
            <FormEstacao />
        </>
    )
}