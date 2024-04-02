import apiViaCep from "@services/viaCep";
import { AxiosResponse } from "axios";

class EnderecoRequests {
    async get(cep: string): Promise<AxiosResponse> {
        const response = await apiViaCep.get(`${cep}/json/`)
        return response
    }
}

const usuarioRequests = new EnderecoRequests()
export default usuarioRequests;