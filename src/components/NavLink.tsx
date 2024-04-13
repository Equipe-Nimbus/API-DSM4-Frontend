import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link href={href}>
            <div className={`flex items-center px-2 py-2 gap-2 rounded-md border border-bg-100 hover:border-secondary-54 duration-200 cursor-pointer ${isActive ? "bg-primary-74/20" : ""}`}>
                {children}
            </div>
        </Link>
    )
}