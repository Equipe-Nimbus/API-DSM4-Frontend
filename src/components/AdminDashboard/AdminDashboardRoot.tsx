import { ReactNode } from "react";

export default function DashboardAdmin({ children }: { children: ReactNode }) {
    return (
        <div className="flex gap-5">
            {children}
        </div>
    )
}