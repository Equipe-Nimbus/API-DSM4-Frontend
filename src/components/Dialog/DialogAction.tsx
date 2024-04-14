import React from 'react';

interface DialogActionProps {
    button: React.ReactNode;
}

export default function DialogAction({ button: Button }: DialogActionProps) {
    return (
        <>
            {Button}
        </>
    )
}
