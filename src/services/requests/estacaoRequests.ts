import { CadastroEstacaoSchema } from "@lib/validations/estacao/cadastroEstacaoSchema";
import api from "@services/api";
import { AxiosResponse } from "axios";

class EstacaoRequests {
    async create(body: CadastroEstacaoSchema): Promise<AxiosResponse> {
        const response = await api.post("/estacao/cadastrar", body)
        return response
    }
}

const estacaoRequests = new EstacaoRequests()
export default estacaoRequests;