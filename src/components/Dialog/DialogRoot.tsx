import { FiVideo } from "react-icons/fi";

interface DialogRootProps {
    children?: React.ReactNode;
}

export default function DialogRoot({ children }: DialogRootProps) {
    return (
        <div className="fixed top-0 left-0 bg-black/10 flex justify-center items-center min-w-full min-h-full">
            <div className="w-1/4 h-fit bg-bg-100 rounded-md shadow-xl flex flex-col gap-4 py-5 px-4 items-center">
                {children}
            </div>
        </div>
    )
}