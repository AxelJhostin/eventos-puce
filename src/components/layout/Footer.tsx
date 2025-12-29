import Link from "next/link";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-puce-blue text-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* COLUMNA 1: Sobre Nosotros */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4">
              <Image 
                src="/logo-puce-azul.png" 
                alt="Logo PUCE Manabí" 
                width={180} 
                height={60}
                className="h-16 w-auto object-contain" // Ajusta la altura si lo ves muy grande o pequeño
              />
            </div>
            <p className="text-sm leading-relaxed text-blue-100">
              Formamos profesionales de excelencia con valores cristianos y humanistas, comprometidos con la transformación de la sociedad.
            </p>
          </div>

          {/* COLUMNA 2: Enlaces Rápidos (Con URLs reales) */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Accesos Rápidos</h3>
            <ul className="space-y-2 text-sm">
              {/* Usamos Link de Next.js para rutas internas si las tuviéramos, o <a> para externas */}
              <li>
                  <a href="https://pucem.edu.ec/" target="_blank" rel="noopener noreferrer" className="hover:text-puce-gold transition-colors">
                    Web Oficial
                  </a>
              </li>
              <li>
                  <a href="https://pucem.edu.ec/grado" target="_blank" rel="noopener noreferrer" className="hover:text-puce-gold transition-colors">
                    Oferta Académica
                  </a>
              </li>
              <li>
                  {/* Este es el link clave que pediste */}
                  <a href="https://pucem.edu.ec/grado" target="_blank" rel="noopener noreferrer" className="hover:text-puce-gold transition-colors font-bold text-white">
                    Admisiones
                  </a>
              </li>
              <li>
                  <Link href="/admin" className="hover:text-puce-gold transition-colors">
                    Acceso Administrativo
                  </Link>
              </li>
            </ul>
          </div>

          {/* COLUMNA 3: Contacto (Con tu número celular y PBX) */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-puce-gold shrink-0" />
                <span>Campus Portoviejo / Campus Chone</span>
              </li>
              
              {/* Teléfono Celular (WhatsApp Link) */}
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-puce-gold shrink-0" />
                <a href="https://wa.me/593999482280" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
                  +593 99 948 2280
                </a>
              </li>

              {/* PBX Fijo */}
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-puce-gold shrink-0" />
                <span>(PBX) 05 3700750</span>
              </li>

              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-puce-gold shrink-0" />
                <a href="mailto:info@pucem.edu.ec" className="hover:text-white">info@pucem.edu.ec</a>
              </li>
            </ul>
          </div>

          {/* COLUMNA 4: Social (Con tus links) */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Síguenos</h3>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/pucemanabi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-puce-gold hover:text-puce-blue transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/pucemanabi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-puce-gold hover:text-puce-blue transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="bg-white/10 p-2 rounded-full hover:bg-puce-gold hover:text-puce-blue transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-white/10 bg-puce-dark py-6 text-center text-sm">
        <p>© {new Date().getFullYear()} Pontificia Universidad Católica del Ecuador - Sede Manabí. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}