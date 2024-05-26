import { DashboardEstacao, DashboardGeral } from "@lib/models/Dashboard";
import { MedicaoRelatorio } from "@lib/models/Medicao";
import { FiltroRelatorioMedicoesSchema, FiltroRelatorioMinMax, ParametroRelatorioMinMax } from "@lib/models/Relatorios";
import api from "@services/api";
import { AxiosResponse } from "axios";
import { parseMedicaoArrayFromServer } from "@lib/parseMedicaoData";

//import de placeholder
import {relatorioMinMaxPlaceholder} from '@lib/dashboardPlaceholderData'
class DashboardRequets {
    async getDashboardGeral(): Promise<AxiosResponse<DashboardGeral>> {
        const response = await api.get("/dashboard/geral")
        return response
    }

    async getDashboardEstacoes(id: string): Promise<AxiosResponse<DashboardEstacao>> {
        const response = await api.get(`dashboard/estacao/${id}`)
        return response
    }

    async getRelatorioMedicoes(id: string, filtros: FiltroRelatorioMedicoesSchema): Promise<MedicaoRelatorio[]> {
        const { dataInicio, dataFim } = filtros 
        const { data } = await api.get(`/relatorio/medicoes/${dataInicio}/${dataFim}/${id}`)
        const medicoes = parseMedicaoArrayFromServer(data)
        return medicoes
    }

    //retornando dados simulados, substituir pela chamada da API
    async getRelatorioMinMax(id: string, { dataInicio, dataFim }: FiltroRelatorioMinMax): Promise<ParametroRelatorioMinMax[]> {
        return relatorioMinMaxPlaceholder
    }
}

const dashboardRequests = new DashboardRequets()
export default dashboardRequests;