import { DashboardEstacao, DashboardGeral } from "@lib/models/Dashboard";
import { MedicaoRelatorio } from "@lib/models/Medicao";
import { FiltroRelatorioMedicoesSchema, FiltroRelatorioAlertasPorLocal, RelatorioAlertasPorEstado, RelatorioAlertasPorCidade, ParametroRelatorioMinMax, FiltroRelatorioMinMax } from "@lib/models/Relatorios";
import api from "@services/api";
import { AxiosResponse } from "axios";
import { parseMedicaoArrayFromServer } from "@lib/parseMedicaoData";

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

    async getRelatorioMinMax(id: string, { dataInicio, dataFim }: FiltroRelatorioMinMax): Promise<AxiosResponse<ParametroRelatorioMinMax[]>> {
        const response = await api.get(`/relatorio/minmax/${dataInicio}/${dataFim}/${id}`)
        return response;
    }

    async getRelatorioAlertasPorEstado(filtro: FiltroRelatorioAlertasPorLocal): Promise<AxiosResponse<RelatorioAlertasPorEstado>> {
        const response = await api.post(`/relatorio/quantidadeAlerta`, filtro)
        return response
    }

    async getRelatorioAlertasPorCidade(filtro: FiltroRelatorioAlertasPorLocal): Promise<AxiosResponse<RelatorioAlertasPorCidade>> {
        const response = await api.post(`/relatorio/quantidadeAlerta`, filtro)
        return response
    }
}

const dashboardRequests = new DashboardRequets()
export default dashboardRequests;