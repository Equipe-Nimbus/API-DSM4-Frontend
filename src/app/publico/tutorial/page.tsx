'use client';
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { Button } from "@components/Button";
import Input from "@components/Input";
import { RiSearch2Line } from "react-icons/ri";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiFillWarning, AiOutlinePlus } from "react-icons/ai";
import { ActionsDrodown } from "@components/ActionsDropdown";
import { ModalCadastro } from "@components/ModalCadastro";
import { Dialog } from "@components/Dialog";
import { ToastContext } from "@contexts/ToastContext";

export default function Tutorial() {
    return (
        <>
            <div className="bg-bg-100 p-4 rounded-md drop-shadow">
                <h1 className="text-text-on-background text-base font-medium">Tutorial Sobre Sensores Climáticos</h1>
            </div>
            <div className="bg-bg-100 p-4 rounded-md drop-shadow">
                <h2 className="text-text-on-background text-base font-medium">Sensores Climáticos:</h2>
            </div>
            <div className="bg-bg-100 p-4 rounded-md drop-shadow">
                <p className="text-text-on-background text-base font-medium">Temperatura:
                    Um sensor de temperatura é um dispositivo que mede a temperatura do ambiente ou
                    de um objeto e converte essa informação em
                    dados que podem ser utilizados para monitoramento, controle ou registro.
                </p>
                <p className="text-text-on-background text-base font-medium">Pressão:
                    Um sensor de pressão, também conhecido como barômetro, é um dispositivo usado para
                    medir a pressão atmosférica. A pressão atmosférica é a força exercida pelo peso da coluna de ar acima de um
                    ponto específico na superfície da Terra. Medir essa pressão é crucial em meteorologia
                    porque ela influencia e é influenciada por vários fenômenos climáticos.
                </p>
            </div>
        </>
    )
}