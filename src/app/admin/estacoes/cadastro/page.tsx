'use client';
import { useContext, useEffect, useState } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cadastroEstacaoSchema } from "@lib/validations/estacao/cadastroEstacaoSchema";
import Input from "@components/Input";
import Select, { Option } from "@components/Select";
import { Button } from "@components/Button";
import estados from "@lib/models/estados";
import estacaoRequests from "@services/requests/estacaoRequests";
import { ToastContext } from "@contexts/ToastContext";
import enderecoRequests from "@services/requests/enderecoRequests";
import ReactInputMask from "react-input-mask";
import { useRouter } from "next/navigation";
import parametroRequests from "@services/requests/parametroRequest";
import { ListagemParametroSchema } from "@lib/models/Parametro";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CadastroEstacaoSchema } from "@lib/models/Estacao";
import FormEstacao from "@components/FormEstacao";


export default function CadastroEstacao() {

    return (
        <>
            <div className="bg-bg-100 p-4 rounded-md drop-shadow">
                <h1 className="text-text-on-background text-base font-medium">Nova Estação</h1>
            </div>
            <FormEstacao />
        </>
    )
}