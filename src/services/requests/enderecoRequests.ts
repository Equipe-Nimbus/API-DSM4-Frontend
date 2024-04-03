import apiViaCep from "@services/viaCep";
import { AxiosResponse } from "axios";

class EnderecoRequests {
    async get(cep: string): Promise<AxiosResponse> {
        const response = await apiViaCep.get(`${cep}/json/`)
        return response
    }
}

const enderecoRequests = new EnderecoRequests()
export default enderecoRequests;