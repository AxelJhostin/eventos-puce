import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NewEventPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Encabezado */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-puce-blue">Publicar Nuevo Evento</h1>
          <p className="mt-2 text-slate-600">Completa la información para difundir tu actividad en la comunidad PUCE.</p>
        </div>

        {/* El Formulario */}
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="bg-slate-50 border-b border-slate-100">
            <CardTitle className="text-xl text-slate-800">Información General</CardTitle>
            <CardDescription>Los campos marcados con * son obligatorios.</CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <form className="space-y-8">
              
              {/* 1. Título y Slug */}
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Título del Evento *</Label>
                  <Input id="title" placeholder="Ej: Feria de Innovación Tecnológica 2025" required className="text-lg" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug">URL Amigable (Slug) *</Label>
                  <Input id="slug" placeholder="ej: feria-innovacion-2025" className="bg-slate-50 font-mono text-sm" />
                  <p className="text-[0.8rem] text-slate-500">Esta será la dirección web del evento.</p>
                </div>
              </div>

              {/* 2. Clasificación */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Categoría *</Label>
                  <Select>
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
                  <Select>
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

              {/* 3. Fecha y Lugar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Fecha y Hora de Inicio *</Label>
                  <Input id="date" type="datetime-local" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación / Lugar *</Label>
                  <Input id="location" placeholder="Ej: Auditorio Campus Portoviejo" />
                </div>
              </div>

              {/* 4. Multimedia */}
              <div className="space-y-2">
                <Label htmlFor="image">URL de la Imagen (Portada)</Label>
                <Input id="image" placeholder="https://..." />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="link">Enlace de Inscripción / Más info</Label>
                <Input id="link" placeholder="https://forms.office.com/..." />
              </div>

              {/* 5. Descripción */}
              <div className="space-y-2">
                <Label htmlFor="description">Descripción Detallada *</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe de qué trata el evento, agenda, requisitos..." 
                  className="min-h-[150px]"
                />
              </div>

              {/* Botones de Acción */}
              <div className="pt-4 flex gap-4 justify-end">
                <Button variant="outline" type="button">Cancelar</Button>
                <Button type="submit" className="bg-puce-gold text-puce-blue hover:bg-yellow-400 font-bold px-8">
                  Publicar Evento
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}