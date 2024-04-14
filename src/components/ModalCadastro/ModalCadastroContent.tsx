import React from 'react';

interface ModalCadastroContentProps {
    children: React.ReactNode;
}

export default function ModalCadastroContent({ children: Form }: ModalCadastroContentProps) {
    return (
        <>
            {Form}
        </>
    )
}