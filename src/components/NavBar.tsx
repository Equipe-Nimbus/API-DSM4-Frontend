'use client'
import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AiOutlineCloud } from "react-icons/ai";
import { RiArrowUpSFill, RiArrowDownSFill, RiLogoutCircleLine } from "react-icons/ri";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(true);
    const pathname = usePathname();

    return (
        <>
            <aside className="fixed w-fit h-screen min-w-fit py-8 px-4 flex flex-col justify-between bg-bg-100">
                <div className="flex flex-col gap-8">
                    <div className="flex items-center justify-center gap-1 py-2">
                        <span>
                            <AiOutlineCloud className="text-primary-65" size={34} />
                        </span>
                        <span className="text-primary-65 text-2xl font-semibold">Nimbus</span>
                    </div>
                    <div className="flex flex-col gap-3">
                        <NavLink href="/admin">
                            <Image src="/home-icon.svg" alt="home icon" width={24} height={24} />
                            <span>Home</span>
                        </NavLink>
                        <div
                            className={`flex items-center justify-between px-2 py-2 gap-2 rounded-md border border-bg-100 hover:border-secondary-54 duration-200 cursor-pointer ${""}`}
                            onClick={() => { setIsOpen(!isOpen) }}>
                            <Image src="/dashboard-icon.svg" alt="dashboard icon" width={24} height={24} />
                            <span>Gerenciamento</span>
                            {isOpen ?
                                <div>
                                    <RiArrowUpSFill size={16} />
                                </div> :
                                <div>
                                    <RiArrowDownSFill size={16} />
                                </div>
                            }
                        </div>
                        {isOpen && (
                            <div className="flex flex-col gap-1 ml-2">
                                <NavLink href="/admin/estacoes/listagem">
                                    <Image src="/station-icon.svg" alt="station icon" width={24} height={24} />
                                    <span>Estações</span>
                                </NavLink>
                                <NavLink href="/admin/parametros/listagem">
                                    <Image src="/parameter-icon.svg" alt="parameter icon" width={24} height={24} />
                                    <span>Parâmetros</span>
                                </NavLink>
                                <NavLink href="/admin/alertas/listagem">
                                    <Image src="/alert-icon.svg" alt="alert icon" width={24} height={24} />
                                    <span>Alertas</span>
                                </NavLink>
                                <NavLink href="/admin/usuarios/listagem">
                                    <Image src="/user-icon.svg" alt="user icon" width={24} height={24} />
                                    <span>Usuários</span>
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
                <div className={`flex items-center px-2 py-2 gap-2 rounded-md border border-bg-100 hover:border-secondary-54 duration-200 cursor-pointer text-neutral-47`}>
                    <RiLogoutCircleLine size={24}/>
                    <span>Sair</span>
                </div>
            </aside>
        </>
    )
}