import { RiCloseFill } from "react-icons/ri";

interface ModalCadastroHeaderProps {
    title: string;
    onClose: () => void;
}

export default function ModalCadastroHeader({ title, onClose }: ModalCadastroHeaderProps) {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-text-on-background text-lg font-medium">{title}</h1>
            <button onClick={onClose}>
                <RiCloseFill size={20} />
            </button>
        </div>
    )   

}