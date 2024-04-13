'use client';
import { AuthContext } from "@contexts/AuthContext";
import { useContext } from "react";

export default function HomeAdmin() {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="bg-bg-100 p-4 rounded-md drop-shadow">
            <h1 className="text-text-on-background text-base font-medium">Bem-Vindo(a), {currentUser?.nomeUsuario}</h1>
        </div>
    )
}