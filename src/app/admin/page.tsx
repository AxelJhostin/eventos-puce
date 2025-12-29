import { getAdminEvents } from "@/services/eventService";
import DeleteEventButton from "@/components/admin/DeleteEventButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon, EyeIcon, PencilIcon } from "lucide-react";
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
      
      {/* Cabecera del Dashboard */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-puce-blue">Panel de Administración</h1>
          <p className="text-slate-500">Gestiona los eventos registrados en la plataforma.</p>
        </div>
        <Link href="/nuevo-evento">
          <Button className="bg-puce-gold text-puce-blue hover:bg-yellow-400 font-bold gap-2">
            <PlusIcon className="w-4 h-4" /> Nuevo Evento
          </Button>
        </Link>
      </div>

      {/* Tabla de Datos */}
      <div className="border border-slate-200 rounded-lg shadow-sm bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[300px]">Título</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Ámbito</TableHead>
              {/* 👇 NUEVA COLUMNA: ESTADO */}
              <TableHead>Estado</TableHead> 
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length > 0 ? (
              events.map((event) => (
                <TableRow key={event.id}>
                  {/* Título y Slug */}
                  <TableCell className="font-medium text-slate-900">
                    {event.title}
                    <div className="text-xs text-slate-400 font-normal">{event.slug}</div>
                  </TableCell>
                  
                  {/* Fecha */}
                  <TableCell>
                    {new Date(event.event_date).toLocaleDateString('es-EC')}
                  </TableCell>
                  
                  {/* Categoría */}
                  <TableCell>
                    <span className="capitalize px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                      {event.category}
                    </span>
                  </TableCell>
                  
                  {/* Ámbito */}
                  <TableCell className="capitalize text-slate-600">{event.scope}</TableCell>

                  {/* 👇 NUEVA CELDA: ETIQUETA DE ESTADO */}
                  <TableCell>
                     <span className={`px-2 py-1 rounded-full text-xs font-bold border ${
                        event.status === 'approved' 
                          ? 'bg-green-100 text-green-700 border-green-200' 
                          : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                     }`}>
                        {event.status === 'approved' ? 'PUBLICADO' : 'PENDIENTE'}
                     </span>
                  </TableCell>

                  {/* 👇 CELDA DE ACCIONES (Con el nuevo botón StatusButton) */}
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                        
                        {/* 1. Botón Aprobar/Ocultar */}
                        <StatusButton eventId={event.id} currentStatus={event.status || 'pending'} />

                        {/* 2. Botón Ver (web pública) */}
                        <Link href={`/eventos/${event.slug}`} target="_blank">
                          <Button variant="outline" size="sm" title="Ver en la web">
                            <EyeIcon className="w-4 h-4" />
                          </Button>
                        </Link>

                        {/* 3. Botón Editar */}
                        <Link href={`/admin/editar/${event.id}`}>
                          <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700" title="Editar">
                            <PencilIcon className="w-4 h-4" />
                          </Button>
                        </Link>
                        
                        {/* 4. Botón Borrar */}
                        <DeleteEventButton eventId={event.id} eventTitle={event.title} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                  No hay eventos registrados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}