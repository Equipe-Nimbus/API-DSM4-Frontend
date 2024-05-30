'use client';
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { Button } from "@components/Button";
import Input from "@components/Input";
import { RiSearch2Line } from "react-icons/ri";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiltroAlertaSchema, filtroAlertaSchema } from "@lib/validations/alerta/filtroAlertaSchema";
import alertaRequests from "@services/requests/alertaRequests";
import { Alerta, AlertaListagem } from "@lib/models/Alerta";
import { AiFillWarning, AiOutlinePlus } from "react-icons/ai";
import { ActionsDrodown } from "@components/ActionsDropdown";
import { ModalCadastro } from "@components/ModalCadastro";
import FormAlerta from "@components/FormAlerta";
import { Dialog } from "@components/Dialog";
import { ToastContext } from "@contexts/ToastContext";

export default function Tutorial() {
    return (
        <>
            <div className="bg-bg-100 p-4 rounded-md drop-shadow">
                <h1 className="text-text-on-background text-base font-medium">Tutorial Sobre Sensores Climáticos</h1>
            </div>
        </>
    )
}