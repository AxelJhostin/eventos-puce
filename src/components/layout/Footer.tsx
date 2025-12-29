import { FacebookIcon, InstagramIcon, TwitterIcon, LinkedinIcon, MapPinIcon, PhoneIcon, MailIcon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-puce-blue text-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* COLUMNA 1: Sobre Nosotros */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-wider">PUCE Manabí</h3>
            <p className="text-sm leading-relaxed text-blue-100">
              Formamos profesionales de excelencia con valores cristianos y humanistas, comprometidos con la transformación de la sociedad.
            </p>
          </div>

          {/* COLUMNA 2: Enlaces Rápidos */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Accesos Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-puce-gold transition-colors">Campus Virtual</a></li>
              <li><a href="#" className="hover:text-puce-gold transition-colors">Biblioteca</a></li>
              <li><a href="#" className="hover:text-puce-gold transition-colors">Cronograma Académico</a></li>
              <li><a href="#" className="hover:text-puce-gold transition-colors">Admisiones</a></li>
            </ul>
          </div>

          {/* COLUMNA 3: Contacto (Datos Reales) */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPinIcon className="w-5 h-5 text-puce-gold" />
                <span>Campus Portoviejo / Campus Chone</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="w-5 h-5 text-puce-gold" />
                <span>(PBX) 05 3700750</span>
              </li>
              <li className="flex items-center gap-2">
                <MailIcon className="w-5 h-5 text-puce-gold" />
                <span>info@pucem.edu.ec</span>
              </li>
            </ul>
          </div>

          {/* COLUMNA 4: Social */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Síguenos</h3>
            <div className="flex gap-4">
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-puce-gold hover:text-puce-blue transition-all">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-puce-gold hover:text-puce-blue transition-all">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-puce-gold hover:text-puce-blue transition-all">
                <LinkedinIcon size={20} />
              </a>
            </div>
          </div>

        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-white/10 bg-puce-dark py-6 text-center text-sm">
        <p>© 2025 Pontificia Universidad Católica del Ecuador - Sede Manabí. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}