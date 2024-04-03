export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-bg-98 p-8">
            <div className="flex flex-col gap-8">
                {children}
            </div>
        </div>
    );
}