import { DashboardGeral } from "@lib/models/Dashboard";
import api from "@services/api";
import { AxiosResponse } from "axios";

class DashboardRequets {
    async getDashboardGeral(): Promise<AxiosResponse<DashboardGeral>> {
        const response = await api.get("/dashboard/geral")
        return response
    }
}

const dashboardRequests = new DashboardRequets()
export default dashboardRequests;