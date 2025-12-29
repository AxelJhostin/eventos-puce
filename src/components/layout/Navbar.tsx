import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCapIcon, Menu, X, Home, Calendar, BookOpen, Users, Lock } from "lucide-react"; // Importamos iconos nuevos
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import Image from "next/image";

export default function Navbar() {
  const navLinks = [
    { name: "Inicio", href: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Eventos", href: "/#eventos", icon: <Calendar className="w-5 h-5" /> },
    { name: "Investigación", href: "https://pucem.edu.ec/", external: true, icon: <BookOpen className="w-5 h-5" /> },
    { name: "Nosotros", href: "https://pucem.edu.ec/", external: true, icon: <Users className="w-5 h-5" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* --- 1. LOGO (Visible siempre) --- */}
          <Link href="/" className="flex items-center z-50 transition-opacity hover:opacity-90">
            <Image 
              src="/logo-puce.png" 
              alt="Logo PUCE Manabí" 
              width={200}  // Un ancho base estimado
              height={60}  // Una altura base estimada
              className="h-12 w-auto object-contain" // Esto hace que se ajuste perfecto sin estirarse
              priority // Carga la imagen rápido porque es importante
            />
          </Link>

          {/* --- 2. MENÚ ESCRITORIO (Solo visible en PC > 768px) --- */}
          {/* Si esto sale en celular, es que Tailwind no está detectando 'md'. Pero confía en la clase 'hidden' */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              link.external ? (
                <a 
                  key={link.name} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm font-medium text-slate-600 hover:text-puce-blue transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-sm font-medium text-slate-600 hover:text-puce-blue transition-colors"
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* --- 3. BOTÓN REGISTRO (Solo PC) --- */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/nuevo-evento">
              <Button className="bg-puce-gold hover:bg-yellow-500 text-puce-blue font-bold shadow-md hover:scale-105 transition-transform">
                Registrar Evento
              </Button>
            </Link>
          </div>

          {/* --- 4. MENÚ MÓVIL (Solo Celular) --- */}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-puce-blue hover:bg-blue-50">
                  <Menu className="h-8 w-8" />
                </Button>
              </SheetTrigger>
              
              {/* CAMBIO CLAVE: bg-puce-blue para fondo azul institucional */}
              <SheetContent side="right" className="w-[300px] bg-puce-blue border-l-slate-700 p-0 text-white">
                
                {/* Cabecera del Menú Móvil */}
                <div className="p-6 border-b border-white/10 bg-puce-dark/50">
                  <SheetTitle className="text-left text-white flex items-center gap-2">
                    <GraduationCapIcon className="h-5 w-5 text-puce-gold" />
                    <span className="font-bold tracking-wider">MENÚ PRINCIPAL</span>
                  </SheetTitle>
                </div>
                
                {/* Lista de Enlaces */}
                <div className="flex flex-col p-4 gap-2">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.name}>
                        {link.external ? (
                        <a 
                            href={link.href}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-200 hover:bg-white/10 hover:text-white transition-all group"
                        >
                            <span className="text-puce-gold group-hover:text-white transition-colors">{link.icon}</span>
                            <span className="font-medium text-lg">{link.name}</span>
                        </a>
                        ) : (
                        <Link 
                            href={link.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-200 hover:bg-white/10 hover:text-white transition-all group"
                        >
                            <span className="text-puce-gold group-hover:text-white transition-colors">{link.icon}</span>
                            <span className="font-medium text-lg">{link.name}</span>
                        </Link>
                        )}
                    </SheetClose>
                  ))}
                </div>

                {/* Footer del Menú (Botones de Acción) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-puce-dark/30 backdrop-blur-sm border-t border-white/10 space-y-3">
                     <SheetClose asChild>
                        <Link href="/nuevo-evento" className="block w-full">
                            <Button className="w-full bg-puce-gold hover:bg-yellow-400 text-puce-blue font-bold h-12 text-lg shadow-lg">
                            Registrar Evento
                            </Button>
                        </Link>
                     </SheetClose>
                     
                     <SheetClose asChild>
                        <Link href="/admin" className="block w-full">
                            <Button variant="outline" className="w-full border-white/20 text-black hover:bg-white/10 hover:text-white font-medium gap-2">
                            <Lock className="w-4 h-4" /> Acceso Admin
                            </Button>
                        </Link>
                     </SheetClose>
                </div>

              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </nav>
  );
}