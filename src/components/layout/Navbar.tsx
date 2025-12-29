import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MenuIcon, GraduationCapIcon } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* LOGO E IDENTIDAD */}
        <div className="flex items-center gap-2">
          {/* Aquí podrías poner el logo SVG real después */}
          <div className="bg-puce-blue text-white p-2 rounded-lg">
            <GraduationCapIcon size={24} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-puce-blue font-extrabold text-xl tracking-tight">PUCE</span>
            <span className="text-slate-500 font-light text-sm tracking-widest">MANABÍ</span>
          </div>
        </div>

        {/* NAVEGACIÓN (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          <Link href="/" className="hover:text-puce-blue transition-colors">
            Inicio
          </Link>
          <Link href="#" className="text-puce-blue font-bold">
            Eventos
          </Link>
          <Link href="#" className="hover:text-puce-blue transition-colors">
            Investigación
          </Link>
          <Link href="#" className="hover:text-puce-blue transition-colors">
            Nosotros
          </Link>
        </nav>

        {/* ACCIONES */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden md:flex text-slate-600 hover:text-puce-blue hover:bg-blue-50">
            Iniciar Sesión
          </Button>
          <Link href="/nuevo-evento">
            <Button className="bg-puce-gold hover:bg-yellow-500 text-puce-blue font-bold shadow-md">
              Registrar Evento
            </Button>
          </Link>
          
          {/* Botón Menú Móvil (Solo visible en celular) */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </div>

      </div>
      
      {/* Barra decorativa inferior */}
      <div className="h-1 w-full bg-gradient-to-r from-puce-blue via-[#0055aa] to-puce-gold"></div>
    </header>
  );
}