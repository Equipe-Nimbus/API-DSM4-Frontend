import React, { useRef, useEffect } from "react";
import { AiOutlineMore } from "react-icons/ai"

interface ActionsDropdownProps {
    actions: { label: string, onClick: () => void }[]; 
}

export const ActionsDrodown: React.FC<ActionsDropdownProps> = ({ actions }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-neutral-65/15">
                <AiOutlineMore size={20} className="text-primary-65"/>
            </button>
            {isOpen && (
                <div className="absolute top-10 left-10 w-fit bg-bg-100 border rounded-md shadow-lg">
                    {actions.map((action, index) => (
                        <button key={index} onClick={action.onClick} className="w-full px-4 py-2 text-sm font-medium text-center text-text-on-background hover:bg-neutral-65/20">
                            {action.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}