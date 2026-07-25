import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import StoreProvider from "@/redux/StoreProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadatos de la aplicación (aparecen en la pestaña del navegador y en buscadores).
export const metadata: Metadata = {
  title: "NovaShop | Tienda en línea",
  description:
    "Tienda en línea de productos desarrollada con Next.js, TypeScript y Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        {/* StoreProvider activa Redux en TODA la app */}
        <StoreProvider>
          {/* Barra de navegación fija en todas las páginas */}
          <Navbar />
          {/* Contenedor principal: aquí se renderiza cada página */}
          <main className="flex-1">{children}</main>
          {/* Buzón de notificaciones de Sonner (mensajes de confirmación) */}
          <Toaster position="top-right" richColors />
        </StoreProvider>
      </body>
    </html>
  );
}
