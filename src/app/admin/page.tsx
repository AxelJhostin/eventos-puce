import { getAdminEvents } from "@/services/eventService";
import DeleteEventButton from "@/components/admin/DeleteEventButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon, EyeIcon, PencilIcon, BarChart3 } from "lucide-react"; // Agregamos BarChart3
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusButton from "@/components/admin/StatusButton";

// Esto evita que la página se guarde en caché y siempre muestre los datos reales
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const events = await getAdminEvents();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Cabecera del Dashboard con Icono */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-puce-blue flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-puce-gold" />
            Panel de Control
          </h1>
          <p className="text-slate-500">Métricas y gestión de eventos en tiempo real.</p>
        </div>
        <Link href="/nuevo-evento">
          <Button className="bg-puce-gold text-puce-blue hover:bg-yellow-400 font-bold gap-2 shadow-md">
            <PlusIcon className="w-4 h-4" /> Nuevo Evento
          </Button>
        </Link>
      </div>

      {/* Tabla de Datos + Analytics */}
      <div className="border border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[250px]">Evento</TableHead>
              <TableHead>Estado</TableHead>
              
              {/* 👇 NUEVAS COLUMNAS DE ANALYTICS (Estilizadas) */}
              <TableHead className="text-center text-slate-700 font-bold bg-blue-50/50">👁️ Vistas</TableHead>
              <TableHead className="text-center text-slate-700 font-bold bg-green-50/50">🖱️ Clics</TableHead>
              <TableHead className="text-center text-slate-700 font-bold">Conv. %</TableHead>
              
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length > 0 ? (
              events.map((event) => {
                // Lógica de cálculo de conversión dentro del mapeo
                const conversionRate = event.views > 0 
                    ? ((event.clicks / event.views) * 100).toFixed(1) 
                    : "0.0";
                
                return (
                  <TableRow key={event.id} className="hover:bg-slate-50/50 transition-colors">
                    
                    {/* 1. Título y Fecha */}
                    <TableCell className="font-medium text-slate-900">
                      <div className="truncate max-w-[240px]" title={event.title}>{event.title}</div>
                      <div className="text-xs text-slate-400 font-normal">{new Date(event.event_date).toLocaleDateString()}</div>
                    </TableCell>

                    {/* 2. Estado (Pendiente/Activo) */}
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold border ${
                          event.status === 'approved' 
                            ? 'bg-green-100 text-green-700 border-green-200' 
                            : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                      }`}>
                          {event.status === 'approved' ? 'ACTIVO' : 'PENDIENTE'}
                      </span>
                    </TableCell>

                    {/* 3. Columna Vistas */}
                    <TableCell className="text-center font-mono text-slate-600 bg-blue-50/30">
                        {event.views || 0}
                    </TableCell>

                    {/* 4. Columna Clics */}
                    <TableCell className="text-center font-mono text-slate-600 bg-green-50/30 font-bold">
                        {event.clicks || 0}
                    </TableCell>

                    {/* 5. Columna Conversión */}
                    <TableCell className="text-center">
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                            Number(conversionRate) > 10 ? "bg-green-100 text-green-700" : "text-slate-500 bg-slate-100"
                        }`}>
                            {conversionRate}%
                        </span>
                    </TableCell>

                    {/* 6. Acciones */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                          
                          {/* Botón Aprobar/Ocultar */}
                          <StatusButton eventId={event.id} currentStatus={event.status || 'pending'} />
                          
                          {/* Botón Ver */}
                          <Link href={`/eventos/${event.slug}`} target="_blank">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-puce-blue" title="Ver Evento">
                              <EyeIcon className="w-4 h-4" />
                            </Button>
                          </Link>

                          {/* Botón Editar */}
                          <Link href={`/admin/editar/${event.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600" title="Editar">
                              <PencilIcon className="w-4 h-4" />
                            </Button>
                          </Link>
                          
                          {/* Botón Borrar (ligeramente más pequeño) */}
                          <div className="scale-90">
                             <DeleteEventButton eventId={event.id} eventTitle={event.title} />
                          </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                  No hay datos registrados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}