import { AxiosResponse } from "axios";
import { AlertaListagemGetOutput, AlertaListagemGetParams, CadastroAlertaSchema } from "@lib/models/Alerta";
import api from "@services/api";
import parserAlertasFromServer from "@lib/parseAlertasData";

class AlertaRequests {
    async get({ pagina, tamanhoPagina, nome = '' }: AlertaListagemGetParams): Promise<AlertaListagemGetOutput> {
        const response = await api.get(`/alerta/listarGeral/paginada?pagina=${pagina}&tamanhoPagina=${tamanhoPagina}&nome=${nome}`)
            .then((response) => {
                const { alertas } = response.data;
                const alertasFormatados = parserAlertasFromServer(alertas);
                return { ...response.data, alertas: alertasFormatados };
            })
            .catch((error) => {
                throw error;
            });
        return response;
    }

    async create(body: CadastroAlertaSchema): Promise<AxiosResponse> {
        const response = await api.post("/alerta/cadastrar", body)
        return response
    }
}

const alertaRequests = new AlertaRequests()
export default alertaRequests;