'use client';
import FormUsuario from "@components/FormUsuario";

export default function CadastroUsuario() {
    return (
        <>
            <div className="bg-bg-100 p-4 rounded-md drop-shadow">
                <h1 className="text-text-on-background text-base font-medium">Novo Usuário</h1>
            </div>
            <FormUsuario />
        </>
    )
}