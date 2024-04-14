'use client';
import { AuthContext } from "@contexts/AuthContext";
import { useContext } from "react";
import {RiArrowDownSFill} from "react-icons/ri";
import Card from "@components/Card";

export default function HomeAdmin() {
    const { currentUser } = useContext(AuthContext);

    return (
        <>
            <div className="bg-bg-100 p-4 rounded-md drop-shadow">
                <h1 className="text-text-on-background text-base font-medium">Bem-Vindo(a), {currentUser?.nomeUsuario}.</h1>
            </div>
            <div className="flex items-center gap-2">
                <span>Acessos</span>
                <span><RiArrowDownSFill/></span>
            </div>
            <div className="flex flex-wrap justify-between gap-10">
                <Card imageSrc="/station-icon.svg" altText="station icon" title="Estações" buttonText="Acessar" linkTo="/admin/estacoes/listagem"/>
                <Card imageSrc="/parameter-icon.svg" altText="parameter icon" title="Parâmetros" buttonText="Acessar" linkTo="/admin/parametros/listagem"/>
                <Card imageSrc="/alert-icon.svg" altText="alert icon" title="Alertas" buttonText="Acessar" linkTo="/admin/alertas/listagem"/>
                <Card imageSrc="/user-icon.svg" altText="user icon" title="Usuários" buttonText="Acessar" linkTo="/admin/usuarios/listagem"/>
            </div>
        </>
    )
}