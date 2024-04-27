import { IconType } from "react-icons";

interface DashboardCardProps {
    icon: IconType;
    title: string;
    value: number | string;
}

export default function DashboardCard({ icon: Icon, title, value }: DashboardCardProps) {
    return (
        <div className="flex flex-col gap-3 p-4 w-fit min-w-52 bg-bg-100 rounded-md drop-shadow">
            <Icon size={30} className="text-primary-65"/>
            <span className="font-medium text-text-on-background-disabled">{title}</span>
            <span className="text-2xl font-semibold text-text-on-background">{value}</span>
        </div>
    )
}