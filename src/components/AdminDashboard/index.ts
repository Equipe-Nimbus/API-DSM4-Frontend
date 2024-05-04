import DashboardAdmin from "./AdminDashboardRoot";
import DashboardCard from "./DashboardCard";
import GraficoAlertaPorEstado from "./GraficoAlertaPorEstado";
import GraficoAlertaPorParametro from "./GraficoAlertaPorParametro";
import GraficoEstacoesAtivas from "./GraficoEstacoesAtivas";


export const AdminDashboard = {
    Root: DashboardAdmin,
    Card: DashboardCard,
    EstacoesAtivas: GraficoEstacoesAtivas,
    AlertasPorEstado: GraficoAlertaPorEstado,
    AlertasPorParametro: GraficoAlertaPorParametro
}