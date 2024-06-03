import { Option } from "@components/Select";
import { parseCidadesToSelect } from "@lib/parseCidadeToSelect";
import googleMapsClient from "@services/googleMaps";
import ibge from "@services/ibgeLocalidades";
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

    async getCidadesPorEstado(uf: string): Promise<Option[]> {
        const { data } = await ibge.get(`/estados/${uf}/municipios`)
        const cidadesDoEstado = parseCidadesToSelect(data)
        return cidadesDoEstado;
    }
}

const enderecoRequests = new EnderecoRequests()
export default enderecoRequests;