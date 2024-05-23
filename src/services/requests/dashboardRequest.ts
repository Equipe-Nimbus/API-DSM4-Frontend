import { DashboardEstacao, DashboardGeral } from "@lib/models/Dashboard";
import { MedicaoRelatorio } from "@lib/models/Medicao";
import { FiltroRelatorioMedicoesSchema } from "@lib/models/Relatorios";
import api from "@services/api";
import { AxiosResponse } from "axios";

//import de placeholder para dados mockados
import { medicoesRelatorioPlaceholder } from "../../lib/dashboardPlaceholderData"

class DashboardRequets {
    async getDashboardGeral(): Promise<AxiosResponse<DashboardGeral>> {
        const response = await api.get("/dashboard/geral")
        return response
    }

    async getDashboardEstacoes(id: string): Promise<AxiosResponse<DashboardEstacao>> {
        const response = await api.get(`dashboard/estacao/${id}`)
        return response
    }

    //dados mockados, substituir por chamada a api
    async getRelatorioMedicoes(id: string, filtros: FiltroRelatorioMedicoesSchema): Promise<MedicaoRelatorio[]> {
        return medicoesRelatorioPlaceholder
    }
}

const dashboardRequests = new DashboardRequets()
export default dashboardRequests;