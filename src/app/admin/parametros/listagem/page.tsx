'use client';
import FormParametros from "@components/FormParametros";
import { useState } from "react";
import { ModalCadastro } from "@components/ModalCadastro";

export default function ListagemParametros() {
    const [cadastroOpen, setCadastroOpen] = useState(false);
    

    return (
        <div>
            <h1>Parametros</h1>
            <button onClick={() => {setCadastroOpen(!cadastroOpen)}}>Cadastrar</button>

            { cadastroOpen && 
                <ModalCadastro.Root>
                    <ModalCadastro.Header title="Novo Parâmetro" onClose={() => setCadastroOpen(false)} />
                    <ModalCadastro.Content>
                        {FormParametros}
                    </ModalCadastro.Content>
                </ModalCadastro.Root>
            }
        </div>
        
    )
}