import NavBar from "@components/NavBar";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-bg-98 flex overflow-x-hidden">
            <div className="w-fit min-w-fit h-screen fixed flex-shrink-0 z-10">
                <NavBar />
            </div>
            <div className="flex flex-col p-8 gap-8 w-full pl-64 overflow-auto">
                {children}
            </div>
        </div>
    );
}