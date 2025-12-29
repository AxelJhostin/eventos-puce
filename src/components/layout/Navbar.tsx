import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCapIcon } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-puce-blue p-2 rounded-lg text-white group-hover:bg-blue-900 transition-colors">
               <GraduationCapIcon className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-puce-blue leading-none">PUCE</span>
              <span className="text-xs font-bold text-slate-400 tracking-[0.2em]">MANABÍ</span>
            </div>
          </Link>

          {/* Enlaces de Navegación (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-puce-blue transition-colors">
              Inicio
            </Link>
            {/* Baja a la sección de eventos */}
            <Link href="/#eventos" className="text-sm font-medium text-slate-600 hover:text-puce-blue transition-colors">
              Eventos
            </Link>
            {/* Links externos */}
            <a href="https://pucem.edu.ec/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-600 hover:text-puce-blue transition-colors">
              Investigación
            </a>
            <a href="https://pucem.edu.ec/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-600 hover:text-puce-blue transition-colors">
              Nosotros
            </a>
          </div>

          {/* Botones de Acción */}
          <div className="flex items-center gap-4">
            {/* 🗑️ ELIMINADO: El link de "Iniciar Sesión" ya no está aquí */}
            
            {/* Este botón lo mantenemos si quieres que sea fácil registrar, 
                pero recuerda que al dar clic pedirá clave de admin ahora. 
                Si prefieres ocultarlo también, bórralo y entra solo por /admin */}
            <Link href="/nuevo-evento">
              <Button className="bg-puce-gold hover:bg-yellow-500 text-puce-blue font-bold shadow-md hover:scale-105 transition-transform">
                Registrar Evento
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}