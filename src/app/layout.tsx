import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar"; 
import Footer from "@/components/layout/Footer"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eventos Académicos - PUCE Manabí",
  description: "Plataforma oficial de eventos de Ingeniería de Software.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-slate-50`}
      >
        {/* Barra de Navegación Fija */}
        <Navbar />
        
        {/* Contenido Principal (Empuja el footer hacia abajo si hay poco contenido) */}
        <div className="flex-1">
          {children}
        </div>

        {/* Pie de Página */}
        <Footer />
      </body>
    </html>
  );
}