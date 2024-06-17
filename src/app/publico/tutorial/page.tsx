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
import Image from "next/image";

export default function Tutorial() {
    return (
        <>
            <div className="bg-bg-100 p-4 rounded-md drop-shadow">
                <h1 className="text-text-on-background text-base font-medium">Sobre os Sensores Climáticos</h1>
            </div>
            <div className="flex flex-col gap-20 bg-bg-100 p-4 rounded-md drop-shadow">
                <section className="flex gap-20 py-12 items-center justify-center">
                    <Image src="/sensor-temperatura-umidade.png" alt="station icon" width={200} height={108} />
                    <div className="flex flex-col gap-4 max-w-2xl">
                        <h2 className="text-secondary-65 text-2.5xl font-light">Temperatura e Umidade</h2>
                        <p className="text-text-on-background text-base font-medium text-justify">
                            Um sensor de temperatura é um dispositivo que mede a temperatura do ambiente ou
                            de um objeto e converte essa informação em dados que podem ser utilizados para monitoramento, controle ou registro.
                        </p>
                        <p className="text-text-on-background text-base font-medium text-justify">
                            Um higometro ou sensor de umidade é um instrumento usado para medir a umidade do ar, a medida é normalmente feita a partir da corrente elétrica de minerais que mudam sua voltagem de acordo com a umidade do ar, mas também existem métodos usando cabelo ou termometros, essa medição é importante para caracterizar um clima local, prever chuvas e outros fenomenos, além de poder prever incêndios.
                        </p>
                        <p className="text-text-on-background text-base font-medium text-justify flex gap-1">
                            <strong>Prevenção de:</strong>
                            ondas de calor e frio, formação de gelo, precipitação e neblinas.
                        </p>
                    </div>
                </section>
                <hr />
                <section className="flex gap-20 py-12 items-center justify-center">
                    <div className="flex flex-col gap-4 max-w-2xl">
                        <h2 className="text-secondary-65 text-2.5xl font-light">Pressão</h2>
                        <p className="text-text-on-background text-base font-medium text-justify">
                            Um sensor de pressão, também conhecido como barômetro, é um dispositivo usado para medir a pressão atmosférica. A pressão atmosférica é a força exercida pelo peso da coluna de ar acima de um ponto específico na superfície da Terra. Medir essa pressão é crucial em meteorologia porque ela influencia e é influenciada por vários fenômenos climáticos.
                        </p>
                        <p className="text-text-on-background text-base font-medium text-justify flex gap-1">
                            <strong>Prevenção de:</strong>
                            tempestades, ciclones e frentes frias
                        </p>
                    </div>
                    <Image src="/sensor-pressao.png" alt="station icon" width={200} height={108} />
                </section>
                <hr />
                <section className="flex gap-20 py-12 items-center justify-center">
                    <Image src="/sensor-velocidade-vento.png" alt="station icon" width={200} height={108} />
                    <div className="flex flex-col gap-4 max-w-2xl">
                        <h2 className="text-secondary-65 text-2.5xl font-light">Velocidade do vento</h2>
                        <p className="text-text-on-background text-base font-medium text-justify">
                            Um anêmometro ou sensor de velocidade do vento é uma ferramente para medir a velocidade dos ventos, normalmente medida pela velocidade de rotação de hélices, mas também existe a medição por temperatura de fios e pulsos ultrassônicos, essa medição é importante para prever e indentificar mudanças e padrões que podem influenciar a formação de outros fenomenos meterológicos.
                        </p>
                        <p className="text-text-on-background text-base font-medium text-justify flex gap-1">
                            <strong>Prevenção de:</strong>
                            tempestades, furacões e riscos de incêndios florestais.
                        </p>
                    </div>
                </section>
                <hr />
                <section className="flex gap-20 py-12 items-center justify-center">
                    <div className="flex flex-col gap-4 max-w-2xl">
                        <h2 className="text-secondary-65 text-2.5xl font-light">Direção do vento</h2>
                        <p className="text-text-on-background text-base font-medium text-justify">
                            Os sensores de direção de vento medem a movimentação do ar em relação a pontos de referência,
                            como pontos cardeias, são importantes para entender como o vento influencia as condições locais e regionais, como frentes frias e tempestades.
                        </p>
                        <p className="text-text-on-background text-base font-medium text-justify flex gap-1">
                            <strong>Prevenção de:</strong>
                            caminho de tempestades e furacões.
                        </p>
                    </div>
                    <Image src="/sensor-direcao-vento.png" alt="station icon" width={200} height={108} />
                </section>
                <hr />
                <section className="flex gap-20 py-12 items-center justify-center">
                    <Image src="/pluviometro.png" alt="station icon" width={150} height={108} />
                    <div className="flex flex-col gap-4 max-w-2xl">
                        <h2 className="text-secondary-65 text-2.5xl font-light">Pluviômetro</h2>
                        <p className="text-text-on-background text-base font-medium text-justify">
                            Um pluviometro basculante é um instrumento metereológico projetado para medir a quantidade de precipitação de um lugar em determinado tempo, consiste de um funil, um mecânismo e um sensor que verifica o movimento do mecânismo, esses dados são extremamente importantes pois ajudam a entender padrões climaticos e prever eventos extremos e monitorar recursos hidricos.
                        </p>
                        <p className="text-text-on-background text-base font-medium text-justify flex gap-1">
                            <strong>Prevenção de:</strong>
                            chuvas intensas, enchentes e deslizamentos de terra.
                        </p>
                    </div>
                </section>
            </div>
        </>
    )
}