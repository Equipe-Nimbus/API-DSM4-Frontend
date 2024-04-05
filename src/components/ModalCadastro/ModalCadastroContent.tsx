import React from 'react';

interface ModalCadastroContentProps {
    children: React.ElementType;
}

export default function ModalCadastroContent({ children: Form }: ModalCadastroContentProps) {
    return (
        <>
            <Form />
        </>
    )
}