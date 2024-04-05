import { CadastroParametroSchema } from "@lib/models/Parametro";
import api from "@services/api";
import { AxiosResponse } from "axios";

export class ParametroRequests {
    async create(body: CadastroParametroSchema): Promise<AxiosResponse> {
        const Response = await api.post("/tipoParametro/cadastrar", body);
        return Response;
    }
}

const parametroRequests = new ParametroRequests();  
export default parametroRequests;