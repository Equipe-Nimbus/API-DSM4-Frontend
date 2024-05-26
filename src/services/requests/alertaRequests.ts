import { AxiosResponse } from "axios";
import { Alerta, AlertaListagemGetOutput, AlertaListagemGetParams, CadastroAlertaSchema, OcorrenciaAlerta, OcorrenciaAlertaListagemGetOutput, OcorrenciaAlertaListagemGetParams } from "@lib/models/Alerta";
import api from "@services/api";
import { parserAlertaFromServer, parserAlertasArrayFromServer } from "@lib/parseAlertasData";

class AlertaRequests {
    async get({ pagina, tamanhoPagina, nome = '' }: AlertaListagemGetParams): Promise<AlertaListagemGetOutput> {
        const response = await api.get(`/alerta/listarGeral/paginada?pagina=${pagina}&tamanhoPagina=${tamanhoPagina}&nome=${nome}`)
            .then((response) => {
                const { alertas } = response.data;
                const alertasFormatados = parserAlertasArrayFromServer(alertas);
                return { ...response.data, alertas: alertasFormatados };
            })
            .catch((error) => {
                throw error;
            });
        return response;
    }

    async getById(id: number): Promise<Alerta> {
        const response = await api.get(`/alerta/listarEspecifico/${id}`)
        const alerta = response.data;
        const alertaFormatado = parserAlertaFromServer(alerta);
        return alertaFormatado; 
    }

    async create(body: CadastroAlertaSchema): Promise<AxiosResponse> {
        const response = await api.post("/alerta/cadastrar", body)
        return response
    }

    async update(body: Alerta): Promise<AxiosResponse> {
        const response = await api.put("/alerta/atualizar", body)
        return response
    }

    async delete(id: number): Promise<AxiosResponse> {
        const response = await api.delete(`/alerta/deletar/${id}`);
        return response;
    }

    async getOcorrenciasAlertas({ dataInicio, dataFim, pagina, tamanhoPagina }: OcorrenciaAlertaListagemGetParams): Promise<AxiosResponse<OcorrenciaAlertaListagemGetOutput>> {
        const response = await api.get(`/ocorrenciaAlerta/listar/${dataInicio}/${dataFim}/${pagina}/${tamanhoPagina}`)
        return response
    }
}

const alertaRequests = new AlertaRequests()
export default alertaRequests;