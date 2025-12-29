import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar"; 
import Footer from "@/components/layout/Footer"; 
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 👇 DEFINICIÓN DE LA URL BASE (SEO)
// Esto usa tu variable de entorno o un valor por defecto si no existe aún
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eventospucemanabi.vercel.app';

export const metadata: Metadata = {
  // 1. Base para resolver rutas relativas (imágenes, enlaces)
  metadataBase: new URL(baseUrl),

  // 2. Título inteligente (plantilla)
  title: {
    default: "PUCE Manabí - Eventos Académicos",
    template: "%s | PUCE Manabí" // Ejemplo: "Feria de Software | PUCE Manabí"
  },

  // 3. Descripción optimizada para Google
  description: "Plataforma oficial de gestión de eventos académicos. Descubre e inscríbete en congresos, talleres y seminarios de la Pontificia Universidad Católica del Ecuador Sede Manabí.",
  
  // 4. Palabras clave para buscadores
  keywords: ["eventos academicos ecuador", "congresos manabi", "talleres puce", "educación continua", "portoviejo eventos", "universidad catolica manabi"],
  
  // 5. Autoría
  authors: [{ name: "DevSky Solutions" }],
  creator: "PUCE Manabí",

  // 6. Configuración para redes sociales (Open Graph)
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: baseUrl,
    siteName: "Eventos PUCE Manabí",
    title: "PUCE Manabí - Eventos Académicos",
    description: "Plataforma de gestión de eventos académicos de la PUCE Sede Manabí.",
  },

  // 7. Instrucciones para robots (Googlebot, etc.)
  robots: {
    index: true,
    follow: true,
  }
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
          <Toaster richColors position="top-center" />
        </div>

        {/* Pie de Página */}
        <Footer />
      </body>
    </html>
  );
}