'use client'
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { RiSignalTowerFill } from "react-icons/ri";
import { RiDashboardFill } from "react-icons/ri";
import { RiTempColdLine } from "react-icons/ri";
import { RiErrorWarningLine } from "react-icons/ri";
import { RiUserLine } from "react-icons/ri";
import { RiFileList3Line } from "react-icons/ri";
import { RiSettings4Line } from "react-icons/ri";
import Link from "next/link";

function navBar() {
    const [opcoesMobile, setOpcoesMobile] = useState(false)
    const router = useRouter();
    const toggleOpcoesMobile = () => {
        setOpcoesMobile(!opcoesMobile)
    }
    return (
        <>
            <aside className={`bg-bg-100 p-2 ${opcoesMobile ? "h-screen block top-0 duration-300 z-50 w-full" : "h-16 duration-300 w-full"}`}>
                <div className="cursor-pointer" onClick={() => toggleOpcoesMobile()}>
                <ul className="my-10 flex flex-col gap-5">
                        <li className="flex cursor-pointer flex-row items-center gap-1 p-1.5 text-2xl font-medium text-on-bg22 duration-200 hover:rounded hover:bg-hover-bg22 xl:text-xl">
                            <RiDashboardFill />
                            <Link to="">Admin</Link>
                        </li>
                    </ul>
                    <ul className="my-10 flex flex-col gap-5">
                        <li className="flex cursor-pointer flex-row items-center gap-1 p-1.5 text-2xl font-medium text-on-bg22 duration-200 hover:rounded hover:bg-hover-bg22 xl:text-xl">
                            <RiSignalTowerFill />
                            <Link to="/estacao">Estações</Link>
                        </li>
                    </ul>
                    <ul className="my-10 flex flex-col gap-5">
                        <li className="flex cursor-pointer flex-row items-center gap-1 p-1.5 text-2xl font-medium text-on-bg22 duration-200 hover:rounded hover:bg-hover-bg22 xl:text-xl">
                            <RiTempColdLine />
                            <Link to="/parametro">Parâmetros</Link>
                        </li>
                    </ul>
                    <ul className="my-10 flex flex-col gap-5">
                        <li className="flex cursor-pointer flex-row items-center gap-1 p-1.5 text-2xl font-medium text-on-bg22 duration-200 hover:rounded hover:bg-hover-bg22 xl:text-xl">
                            <RiErrorWarningLine />
                            <Link to="/alerta">Alertas</Link>
                        </li>
                    </ul>
                    <ul className="my-10 flex flex-col gap-5">
                        <li className="flex cursor-pointer flex-row items-center gap-1 p-1.5 text-2xl font-medium text-on-bg22 duration-200 hover:rounded hover:bg-hover-bg22 xl:text-xl">
                            <RiUserLine />
                            <Link to="/usuario">Usuários</Link>
                        </li>
                    </ul>
                    <ul className="my-10 flex flex-col gap-5">
                        <li className="flex cursor-pointer flex-row items-center gap-1 p-1.5 text-2xl font-medium text-on-bg22 duration-200 hover:rounded hover:bg-hover-bg22 xl:text-xl">
                            <RiFileList3Line />
                            <Link to="">Relatórios</Link>
                        </li>
                    </ul>
                    <hr></hr>
                    <ul className="my-10 flex flex-col gap-5">
                        <li className="flex cursor-pointer flex-row items-center gap-1 p-1.5 text-2xl font-medium text-on-bg22 duration-200 hover:rounded hover:bg-hover-bg22 xl:text-xl">
                            <RiSettings4Line />
                            <Link to="">Detalhes</Link>
                        </li>
                    </ul>
                    <ul className="my-10 flex flex-col gap-5">
                        <li className="flex cursor-pointer flex-row items-center gap-1 p-1.5 text-2xl font-medium text-on-bg22 duration-200 hover:rounded hover:bg-hover-bg22 xl:text-xl">
                            <RiLogoutCircleRLine />
                            <Link to="/login">Sair</Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}