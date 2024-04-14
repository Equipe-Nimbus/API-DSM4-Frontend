import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
    const pathname = usePathname();
    const hrefParts = href.split('/');
    const pathParts = pathname.split('/');
    const isActive = pathParts[1] === hrefParts[1] && pathParts[2] === hrefParts[2];

    return (
        <Link href={href}>
            <div className={`flex items-center px-2 py-2 gap-2 rounded-md border border-bg-100 hover:border-secondary-54 duration-200 cursor-pointer ${isActive ? "bg-primary-74/20" : ""}`}>
                {children}
            </div>
        </Link>
    )
}