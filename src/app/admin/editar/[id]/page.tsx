import { getEventById } from "@/services/eventService";
import { updateEvent } from "@/lib/actions";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    return notFound();
  }

  // Truco para pasar el ID a la server action
  const updateEventWithId = updateEvent.bind(null, event.id);

  // Formatear fecha para el input datetime-local (YYYY-MM-DDTHH:MM)
  // Ajustamos a zona horaria local quitando el offset Z
  const dateValue = new Date(event.event_date).toISOString().slice(0, 16);

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-puce-blue">Editar Evento</h1>
        <Link href="/admin">
           <Button variant="outline">Cancelar y Volver</Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="bg-slate-50 border-b">
          <CardTitle>Modificar datos de: {event.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          
          <form action={updateEventWithId} className="space-y-6">
            
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input name="title" id="title" defaultValue={event.title} required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input name="slug" id="slug" defaultValue={event.slug} required className="bg-slate-50 font-mono" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Categoría</Label>
                <Select name="category" defaultValue={event.category}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ponencia">Ponencia</SelectItem>
                    <SelectItem value="feria">Feria</SelectItem>
                    <SelectItem value="concurso">Concurso</SelectItem>
                    <SelectItem value="articulo">Artículo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Ámbito</Label>
                <Select name="scope" defaultValue={event.scope}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="interno">Interno</SelectItem>
                    <SelectItem value="nacional">Nacional</SelectItem>
                    <SelectItem value="internacional">Internacional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Fecha</Label>
                <Input name="event_date" type="datetime-local" defaultValue={dateValue} required />
              </div>
              <div className="space-y-2">
                <Label>Ubicación</Label>
                <Input name="location" defaultValue={event.location || ''} />
              </div>
            </div>

            <div className="space-y-2">
               <Label>Imagen URL</Label>
               <Input name="image_url" defaultValue={event.image_url || ''} />
            </div>

            <div className="space-y-2">
               <Label>Link Inscripción</Label>
               <Input name="registration_url" defaultValue={event.registration_url || ''} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="social_url">Instagram / Red Social del Evento</Label>
              <Input 
                name="social_url" 
                id="social_url" 
                placeholder="https://instagram.com/..." 
                defaultValue={event.social_url || ''}
              />
            </div>

            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea name="description" defaultValue={event.description || ''} className="min-h-[150px]" required />
            </div>

            <div className="space-y-2">
               <Label>Requisitos</Label>
               <Textarea name="requirements" defaultValue={event.requirements || ''} />
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Button type="submit" className="bg-puce-gold text-puce-blue hover:bg-yellow-400 font-bold">
                Guardar Cambios
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </main>
  );
}