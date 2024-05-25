import { AxiosResponse } from "axios";
import { Alerta, AlertaListagemGetOutput, AlertaListagemGetParams, CadastroAlertaSchema, OcorrenciaAlerta } from "@lib/models/Alerta";
import api from "@services/api";
import { parserAlertaFromServer, parserAlertasArrayFromServer } from "@lib/parseAlertasData";
import { FiltroHistoricoAlertasSchema } from "@lib/models/Relatorios";

//imports de placeholder para simular retorno de dados
import { ultimosAlertasPlaceholder } from '@lib/dashboardPlaceholderData'

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

    //dados de placeholder para simular retorno de dados, substituir por chamada real
    async getOcorrenciasAlertas({ dataInicio, dataFim }: FiltroHistoricoAlertasSchema): Promise<OcorrenciaAlerta[]> {
        
        return ultimosAlertasPlaceholder
    }
}

const alertaRequests = new AlertaRequests()
export default alertaRequests;