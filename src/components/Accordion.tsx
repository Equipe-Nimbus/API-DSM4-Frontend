import { useState } from "react";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";

interface AccordionProps {
    title: string;
    children: React.ReactNode;
}

export default function Accordion({ title, children }: AccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button className="flex gap-4 w-full items-center" onClick={() => setIsOpen(!isOpen)}>
                <h1 className="text-xl font-medium text-text-on-background">{title}</h1>
                {isOpen ? <RiArrowUpSFill size={24} className="text-text-on-background" /> : <RiArrowDownSFill size={24} className="text-text-on-background" />}
            </button>
            <div className={`overflow-hidden transition-all duration-200 ease-in-out  ${isOpen ? "opacity-100" : "opacity-0"}`} >
                {children}
            </div>
        </>
    )
}