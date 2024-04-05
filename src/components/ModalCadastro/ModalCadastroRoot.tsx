interface DialogRootProps {
    children?: React.ReactNode;
}

export default function ModalCadastroRoot({ children }: DialogRootProps) {
    return (
        <div className="fixed top-0 left-0 bg-black/10 flex justify-center items-center min-w-full min-h-full">
            <div className="bg-bg-100 rounded-md shadow-2xl flex flex-col gap-6 px-6 py-5 w-fit">
                {children}
            </div>
            
        </div>
    )
}