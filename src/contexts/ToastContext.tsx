'use client'
import { ReactNode, createContext, useState } from "react";
import { Toast, ToastProps } from "@components/Toast";

interface ToastContextData {
    addToast: (toast: Omit<ToastProps, 'id'>) => void;
    removeToast: (id: string) => void;
}

export const ToastContext = createContext({} as ToastContextData);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<ToastProps[]>([]);

    const addToast = (toast: Omit<ToastProps, 'id'>) => {
        const id = crypto.randomUUID().toString();
        setToasts(prev => [...prev, { ...toast, id: id }]);
        return id;
    }

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            {toasts.map(toast => (
                <Toast key={toast.id} {...toast} />
            ))}
        </ToastContext.Provider>
    )
}