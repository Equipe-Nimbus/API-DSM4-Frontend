import { AxiosResponse } from "axios";
import { CadastroAlertaSchema } from "@lib/models/Alerta";
import api from "@services/api";

class AlertaRequests {
    async create(body: CadastroAlertaSchema): Promise<AxiosResponse> {
        const response = await api.post("/alerta/cadastrar", body)
        return response
    }
}

const alertaRequests = new AlertaRequests()
export default alertaRequests;