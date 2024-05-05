'use client'
import 'leaflet/dist/leaflet.css'

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

import "leaflet-defaulticon-compatibility";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { EstacaoListagemPublic } from "@lib/models/Estacao";
import { LatLngExpression } from 'leaflet';
import { useEffect, useState } from 'react';


interface MapaEstacoesProps {
    estacoes: EstacaoListagemPublic[];
}

export default function MapaEstacoes({ estacoes }: MapaEstacoesProps) {
    const [centerPosition, setCenterPosition] = useState<LatLngExpression>(definirPosicaoInicial());

    function definirPosicaoInicial(): LatLngExpression {
        if (estacoes && estacoes.length > 0) {
            return [estacoes[0].latitudeEstacao, estacoes[0].longitudeEstacao];
        }

        return [-23.1621937, -45.7978744];
    }

    return (
        <MapContainer center={centerPosition} zoom={13} style={{ height: 300, width: "100%", borderRadius: 10 }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {estacoes?.map((estacao) => (
                <Marker position={[estacao.latitudeEstacao, estacao.longitudeEstacao]} key={estacao.idEstacao}>
                    <Popup>
                        <strong>{estacao.nomeEstacao}</strong>
                        <p>{`${estacao.ruaAvenidaEstacao}, ${estacao.numeroEnderecoEstacao} - ${estacao.bairroEstacao} - ${estacao.cidadeEstacao} - ${estacao.estadoEstacao}`}</p>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}