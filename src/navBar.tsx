'use client'
import { useState } from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { RiSignalTowerFill } from "react-icons/ri";
import { RiDashboardFill } from "react-icons/ri";
import { RiTempColdLine } from "react-icons/ri";
import { RiErrorWarningLine } from "react-icons/ri";
import { RiUserLine } from "react-icons/ri";
import { RiFileList3Line } from "react-icons/ri";
import { RiSettings4Line } from "react-icons/ri";
import { AiOutlineCloud } from "react-icons/ai";
import Link from "next/link";

export default function NavBar() {
    const [opcoesMobile, setOpcoesMobile] = useState(false)
    const toggleOpcoesMobile = () => {
        setOpcoesMobile(!opcoesMobile)
    }
    return (
        <>
            <aside className={`bg-bg-100 p-2 ${opcoesMobile ? "h-screen block top-0 duration-300 z-50 w-full" : "h-16 duration-300 w-full"}`}>
                <div className="cursor-pointer">
                <ul className="my-10 flex flex-col gap-5">
                        <li className="flex cursor-pointer flex-row items-center gap-1 p-1.5 text-2xl font-medium text-on-bg22 duration-200 hover:rounded hover:bg-hover-bg22 xl:text-xl">
                            <AiOutlineCloud />
                        </li>
                    </ul>
                <ul className="my-10 flex flex-col gap-5">
                        <li className="flex cursor-pointer flex-row items-center gap-1 p-1.5 text-2xl font-medium text-on-bg22 duration-200 hover:rounded hover:bg-hover-bg22 xl:text-xl">
                            <RiDashboardFill />
                            <Link href="/admin">Admin</Link>
                        </li>
                    </ul>
                    <ul className="my-10 flex flex-col gap-5">
                        <li className="flex cursor-pointer flex-row items-center gap-1 p-1.5 text-2xl font-medium text-on-bg22 duration-200 hover:rounded hover:bg-hover-bg22 xl:text-xl">
                            <RiSignalTowerFill />
                            <Link href="/admin/estacoes/listagem">Estações</Link>
                        </li>
                    </ul>
                    <ul className="my-10 flex flex-col gap-5">
                        <li className="flex cursor-pointer flex-row items-center gap-1 p-1.5 text-2xl font-medium text-on-bg22 duration-200 hover:rounded hover:bg-hover-bg22 xl:text-xl">
                            <RiTempColdLine />
                            <Link href="/admin/parametro/listagem">Parâmetros</Link>
                        </li>
                    </ul>
                    <ul className="my-10 flex flex-col gap-5">
                        <li className="flex cursor-pointer flex-row items-center gap-1 p-1.5 text-2xl font-medium text-on-bg22 duration-200 hover:rounded hover:bg-hover-bg22 xl:text-xl">
                            <RiErrorWarningLine />
                            <Link href="/admin/alerta/listagem">Alertas</Link>
                        </li>
                    </ul>
                    <ul className="my-10 flex flex-col gap-5">
                        <li className="flex cursor-pointer flex-row items-center gap-1 p-1.5 text-2xl font-medium text-on-bg22 duration-200 hover:rounded hover:bg-hover-bg22 xl:text-xl">
                            <RiUserLine />
                            <Link href="/admin/usuarios/listagem">Usuários</Link>
                        </li>
                    </ul>
                    <ul className="my-10 flex flex-col gap-5">
                        <li className="flex cursor-pointer flex-row items-center gap-1 p-1.5 text-2xl font-medium text-on-bg22 duration-200 hover:rounded hover:bg-hover-bg22 xl:text-xl">
                            <RiFileList3Line />
                            <Link href="">Relatórios</Link>
                        </li>
                    </ul>
                    <hr></hr>
                    <ul className="my-10 flex flex-col gap-5">
                        <li className="flex cursor-pointer flex-row items-center gap-1 p-1.5 text-2xl font-medium text-on-bg22 duration-200 hover:rounded hover:bg-hover-bg22 xl:text-xl">
                            <RiSettings4Line />
                            <Link href="">Detalhes</Link>
                        </li>
                    </ul>
                    <ul className="my-10 flex flex-col gap-5">
                        <li className="flex cursor-pointer flex-row items-center gap-1 p-1.5 text-2xl font-medium text-on-bg22 duration-200 hover:rounded hover:bg-hover-bg22 xl:text-xl">
                            <RiLogoutCircleRLine />
                            <Link href="/login">Sair</Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}