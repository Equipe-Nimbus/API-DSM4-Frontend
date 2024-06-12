import { Option } from "@components/Select";
import api from "@services/api";
import { parseEstadosToSelect } from "@lib/parseLozalizacoesToSelect";
import googleMapsClient from "@services/googleMaps";
import apiViaCep from "@services/viaCep";
import { AxiosResponse } from "axios";
import dotenv from 'dotenv';

dotenv.config();

class EnderecoRequests {
    async get(cep: string): Promise<AxiosResponse> {
        const response = await apiViaCep.get(`${cep}/json/`)
        return response
    }

    async getLatLong(endereco: string): Promise<AxiosResponse> {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        
        if(!apiKey) {
            throw new Error('Erro de sistema: Não foi possível codificar o endereço')
        }

        const response = await googleMapsClient.get(``, {
            params: {
                address: endereco,
                key: apiKey
            }
        })
        return response;
    }

    async getLocalizacoesCadastradas(): Promise<{localizacoes: AxiosResponse, estados: Option[]}> {
        const response = await api.get(`/relatorio/localizacoes`)
        const { data } = response
        const estados = parseEstadosToSelect(data) as Option[]
        return { localizacoes: response, estados};
    }
}

const enderecoRequests = new EnderecoRequests()
export default enderecoRequests;