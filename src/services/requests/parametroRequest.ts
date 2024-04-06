import { Option } from "@components/Select";
import { CadastroParametroSchema, ListagemParametroSchema } from "@lib/models/Parametro";
import mapeiaParametrosSelecao from "@lib/parametrosSelecao";
import api from "@services/api";
import { AxiosResponse } from "axios";

export class ParametroRequests {
    async create(body: CadastroParametroSchema): Promise<AxiosResponse> {
        const Response = await api.post("/tipoParametro/cadastrar", body);
        return Response;
    }

    async getSelectEstacoes(): Promise<{parametrosSelecao: Option[], parametrosResgatados: ListagemParametroSchema[]}> {
        const response = await api.get<ListagemParametroSchema[]>("/tipoParametro/listarParaSelecao");
        const parametrosResgatados = response.data;
        const parametrosSelecao = mapeiaParametrosSelecao(parametrosResgatados);
        return {parametrosSelecao, parametrosResgatados};
    }
}

const parametroRequests = new ParametroRequests();  
export default parametroRequests;