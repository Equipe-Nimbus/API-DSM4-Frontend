'use client';
import FormAlerta from "@components/FormAlerta"
import { ModalCadastro } from "@components/ModalCadastro"

export default function CadastroAlerta() {

    return (
        <>
            <ModalCadastro.Root>
                <ModalCadastro.Header title="Novo Alerta" onClose={() => { }} />
                <ModalCadastro.Content>
                    {FormAlerta}
                </ModalCadastro.Content>
            </ModalCadastro.Root>

        </>
    )
}