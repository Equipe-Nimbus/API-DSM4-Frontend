interface DialogContentProps {
    title?: string;
    text?: string;
}

export default function DialogContent({ title, text }: DialogContentProps) {
    return (
        <div className="flex flex-col gap-2 items-center">
            <h1 className="text-text-on-background text-lg font-medium text-center">{title}</h1>
            <p className="text-text-on-background text-base text-center">{text}</p>
        </div>
    )

}