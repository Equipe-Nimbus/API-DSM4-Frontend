import React, { useContext, useEffect } from "react";
import clsx from "clsx";

import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillExclamationCircle } from "react-icons/ai";
import { ToastContext } from "@contexts/ToastContext";

export interface ToastProps {
    id: string;
    message: string;
    type: 'success' | 'error';
    position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | null;
    visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ id, message, type, position, visible }) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const { removeToast } = useContext(ToastContext);

    const toastType = clsx({
        'border-success-39': type === 'success',
        'border-error-60': type === 'error',

    })

    const positionClass = clsx({
        'top-8 right-8 animate-slide-in-right': position === 'top-right',
        'top-8 left-8 animate-slide-in-left': position === 'top-left',
        'bottom-8 right-8 animate-slide-in-right': position === 'bottom-right',
        'bottom-8 left-8 animate-slide-in-left': position === 'bottom-left',
    })

    useEffect(() => {
        setIsVisible(visible);
        const timeout = setTimeout(() => removeToast(id), 5000);
        return () => clearTimeout(timeout);
    }, [id, removeToast, visible])

    if (!isVisible) return null;

    return (
        <div className={`fixed ${positionClass} w-fit bg-bg-100 text-text-on-background px-4 py-2 rounded-md ${toastType} flex flex-col gap-1.5 border drop-shadow-lg`}>
            <div className="flex gap-1.5 items-center text-sm font-semibold">
                {type === 'success' ?
                    <AiFillCheckCircle className="text-success-39" size={20} />
                    :
                    <AiFillExclamationCircle className="text-error-60" size={20} />
                }
                {type === 'success' ? 
                    <span>Sucesso</span>
                    :
                    <span>Erro</span>
                } 
            </div>
            <span className="text-sm font-normal">{message}</span>
        </div>
    )
}