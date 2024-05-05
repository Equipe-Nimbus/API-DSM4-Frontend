import { Option } from "@components/Select";
import { CadastroParametroSchema, ListagemParametroSchema, Parametro, ParametroAtualizacao, ParametroListagemGetOutput, ParametroListagemGetParams } from "@lib/models/Parametro";
import mapearParametrosSelecao from "@lib/parametrosSelecao";
import api from "@services/api";
import { AxiosResponse } from "axios";

export class ParametroRequests {

    async get({ pagina, tamanhoPagina, nome = '', unidade=''}: ParametroListagemGetParams): Promise<AxiosResponse<ParametroListagemGetOutput>> {
        const response = await api.get(`/tipoParametro/listarGeral/paginada?pagina=${pagina}&tamanhoPagina=${tamanhoPagina}&nome=${nome}&unidade=${unidade}`)
        return response;
    }

    async getById(id: number): Promise<AxiosResponse<Parametro>> {
        const response = await api.get(`/tipoParametro/listarEspecifico/${id}`)
        return response;
    }

    async create(body: CadastroParametroSchema): Promise<AxiosResponse> {
        const Response = await api.post("/tipoParametro/cadastrar", body);
        return Response;
    }

    async update(body: ParametroAtualizacao): Promise<AxiosResponse> {
        const Response = await api.put("/tipoParametro/atualizar", body);
        return Response;
    }

    async delete(id: number): Promise<AxiosResponse> {
        const response = await api.delete(`/tipoParametro/deletar/${id}`)
        return response
    }

    async getSelectParametros(): Promise<{parametrosSelecao: Option[], parametrosResgatados: ListagemParametroSchema[]}> {
        const response = await api.get<ListagemParametroSchema[]>(`/tipoParametro/listarParaSelecao`);
        const parametrosResgatados = response.data;
        const parametrosSelecao = mapearParametrosSelecao(parametrosResgatados);
        return {parametrosSelecao, parametrosResgatados};
    }

    async getSelectParametrosPorEstacao(idEstacao: string): Promise<Option[]> {
        const response = await api.get<ListagemParametroSchema[]>(`/tipoParametro/listarParaSelecao/${idEstacao}`);
        const parametrosResgatados = response.data;
        const parametrosSelecao = mapearParametrosSelecao(parametrosResgatados);
        return parametrosSelecao;
    }
}

const parametroRequests = new ParametroRequests();  
export default parametroRequests;