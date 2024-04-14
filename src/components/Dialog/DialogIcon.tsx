import { IconType } from "react-icons";

interface DialogIconProps {
    icon: IconType;
    color: string;
}

export default function DialogIcon({ icon: Icon, color }: DialogIconProps) {
    return (
        <>
            <Icon size={40} className={color}/>
        </>
    )
}