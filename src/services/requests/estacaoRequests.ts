import { CadastroEstacaoSchema, EstacaoListagemGetOutput, EstacaoListagemGetParams } from "@lib/models/Estacao";
import api from "@services/api";
import { AxiosResponse } from "axios";

class EstacaoRequests {
    async get({ pagina, tamanhoPagina, nome = '', cep = ''}: EstacaoListagemGetParams): Promise<AxiosResponse<EstacaoListagemGetOutput>> {
        const response = await api.get(`/estacao/listarGeral/paginada?pagina=${pagina}&tamanhoPagina=${tamanhoPagina}&nome=${nome}&cep=${cep}`)
        return response;
    }

    async create(body: CadastroEstacaoSchema): Promise<AxiosResponse> {
        const response = await api.post("/estacao/cadastrar", body)
        return response
    }

    async delete(id: number): Promise<AxiosResponse> {
        const response = await api.delete(`/estacao/deletar/${id}`)
        return response
    }
}

const estacaoRequests = new EstacaoRequests()
export default estacaoRequests;