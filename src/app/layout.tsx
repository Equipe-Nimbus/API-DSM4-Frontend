import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.css";
import { ToastProvider } from "@contexts/ToastContext";
import { AuthProvider } from "@contexts/AuthContext"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nimbus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>

  );
}
