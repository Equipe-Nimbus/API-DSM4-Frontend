import { Option } from "@components/Select";
import { CadastroParametroSchema, ListagemParametroSchema, ParametroListagemGetParams } from "@lib/models/Parametro";
import mapeiaParametrosSelecao from "@lib/parametrosSelecao";
import api from "@services/api";
import { AxiosResponse } from "axios";

export class ParametroRequests {

    async get({ pagina, tamanhoPagina, nome = '', unidade='', fator='', offset=''}: ParametroListagemGetParams): Promise<AxiosResponse<ParametroListagemGetParams>> {
        const response = await api.get(`/tipoParametro/listarGeral/paginada?pagina=${pagina}&tamanhoPagina=${tamanhoPagina}&nome=${nome}&unidade=${unidade}&fator=${fator}&offset=${offset}`)
        return response;
    }

    async create(body: CadastroParametroSchema): Promise<AxiosResponse> {
        const Response = await api.post("/tipoParametro/cadastrar", body);
        return Response;
    }

    async delete(id: number): Promise<AxiosResponse> {
        const response = await api.delete(`/tipoParametro/deletar/${id}`)
        return response
    }

    async getSelectParametros(): Promise<{parametrosSelecao: Option[], parametrosResgatados: ListagemParametroSchema[]}> {
        const response = await api.get<ListagemParametroSchema[]>("/tipoParametro/listarParaSelecao");
        const parametrosResgatados = response.data;
        const parametrosSelecao = mapeiaParametrosSelecao(parametrosResgatados);
        return {parametrosSelecao, parametrosResgatados};
    }
}

const parametroRequests = new ParametroRequests();  
export default parametroRequests;