import { Option } from "@components/Select";
import { CadastroParametroSchema, ListagemParametroSchema } from "@lib/models/Parametro";
import mapearParametrosSelecao from "@lib/parametrosSelecao";
import api from "@services/api";
import { AxiosResponse } from "axios";

export class ParametroRequests {
    async create(body: CadastroParametroSchema): Promise<AxiosResponse> {
        const Response = await api.post("/tipoParametro/cadastrar", body);
        return Response;
    }

    async getSelectParametros(): Promise<{parametrosSelecao: Option[], parametrosResgatados: ListagemParametroSchema[]}> {
        const response = await api.get<ListagemParametroSchema[]>("/tipoParametro/listarParaSelecao");
        const parametrosResgatados = response.data;
        const parametrosSelecao = mapearParametrosSelecao(parametrosResgatados);
        return {parametrosSelecao, parametrosResgatados};
    }

    async getSelectParametrosPorEstacao(idEstacao: number): Promise<Option[]> {
        const response = await api.get<ListagemParametroSchema[]>(`/tipoParametro/listarParaSelecao/${idEstacao}`);
        const parametrosResgatados = response.data;
        const parametrosSelecao = mapearParametrosSelecao(parametrosResgatados);
        return parametrosSelecao;
    }
}

const parametroRequests = new ParametroRequests();  
export default parametroRequests;