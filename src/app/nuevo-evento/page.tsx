'use client';

import { createEvent } from "@/lib/actions"; // Importamos nuestra función
import { useFormStatus } from "react-dom"; // Hook para saber si se está enviando
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Componente pequeño para el botón de Submit (necesario para usar useFormStatus)
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="bg-puce-gold text-puce-blue hover:bg-yellow-400 font-bold px-8 transition-all"
    >
      {pending ? "Publicando..." : "Publicar Evento"}
    </Button>
  );
}

export default function NewEventPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-puce-blue">Publicar Nuevo Evento</h1>
          <p className="mt-2 text-slate-600">Completa la información para difundir tu actividad.</p>
        </div>

        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="bg-slate-50 border-b border-slate-100">
            <CardTitle className="text-xl text-slate-800">Información General</CardTitle>
            <CardDescription>Los campos marcados con * son obligatorios.</CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            {/* ⚠️ AQUÍ ESTÁ LA MAGIA: action={createEvent} */}
            <form action={createEvent} className="space-y-8">
              
              {/* Título y Slug */}
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Título del Evento *</Label>
                  <Input name="title" id="title" placeholder="Ej: Feria de Innovación" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug">URL Amigable (Slug) *</Label>
                  <Input name="slug" id="slug" placeholder="ej: feria-innovacion-2025" className="bg-slate-50 font-mono text-sm" required />
                  <p className="text-[0.8rem] text-slate-500">Debe ser único y sin espacios (usa guiones).</p>
                </div>
              </div>

              {/* Clasificación */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Categoría *</Label>
                  <Select name="category" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ponencia">Ponencia / Charla</SelectItem>
                      <SelectItem value="feria">Feria</SelectItem>
                      <SelectItem value="concurso">Concurso / Hackathon</SelectItem>
                      <SelectItem value="articulo">Artículo / Publicación</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Ámbito *</Label>
                  <Select name="scope" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el alcance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interno">Interno (Solo PUCE)</SelectItem>
                      <SelectItem value="nacional">Nacional</SelectItem>
                      <SelectItem value="internacional">Internacional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Fecha y Lugar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="event_date">Fecha y Hora de Inicio *</Label>
                  <Input name="event_date" id="event_date" type="datetime-local" required min={new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación / Lugar *</Label>
                  <Input name="location" id="location" placeholder="Ej: Auditorio Campus Portoviejo" required />
                </div>
              </div>

              {/* Multimedia */}
              <div className="space-y-2">
                <Label htmlFor="image_url">URL de la Imagen (Portada)</Label>
                <Input name="image_url" id="image_url" placeholder="https://..." />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="registration_url">Enlace de Inscripción</Label>
                <Input name="registration_url" id="registration_url" placeholder="https://forms..." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social_url">Instagram / Red Social del Evento</Label>
                <Input 
                  name="social_url" 
                  id="social_url" 
                  placeholder="https://instagram.com/..." 
                  // En el archivo de editar, recuerda poner: defaultValue={event.social_url || ''}
                />
              </div>

              {/* Descripción */}
              <div className="space-y-2">
                <Label htmlFor="description">Descripción Detallada *</Label>
                <Textarea 
                  name="description"
                  id="description" 
                  placeholder="Describe de qué trata el evento..." 
                  className="min-h-[150px]"
                  required
                />
              </div>

              {/* REQUISITOS */}
              <div className="space-y-2">
                <Label htmlFor="requirements">Requisitos para asistir</Label>
                <Textarea 
                  name="requirements"
                  id="requirements" 
                  placeholder="Ej: Traer laptop, Ser alumno regular, Cédula de identidad..." 
                  className="min-h-[80px]"
                />
                <p className="text-xs text-slate-500">Escribe cada requisito separado por comas o puntos.</p>
              </div>

              {/* Botones */}
              <div className="pt-4 flex gap-4 justify-end">
                <Button variant="outline" type="button" onClick={() => window.history.back()}>
                    Cancelar
                </Button>
                <SubmitButton />
              </div>

            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}