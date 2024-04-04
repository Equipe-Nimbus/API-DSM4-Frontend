interface DialogActionsProps { 
    children: React.ReactNode;
}
export default function DialogActions({ children }: DialogActionsProps) {
    return (
        <div className="flex mt-2 gap-4 justify-center">
            {children}
        </div>
    )
}