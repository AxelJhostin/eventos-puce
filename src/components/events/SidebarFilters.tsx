import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SidebarFilters() {
  return (
    <div className="space-y-6">
      {/* Tarjeta de Búsqueda */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-puce-blue">Buscar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input 
              placeholder="Nombre del evento..." 
              className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-puce-blue"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tarjeta de Filtros */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-puce-blue">Filtros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Grupo 1: Tipo de Evento */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-slate-900">Tipo de Evento</h4>
            <div className="space-y-2">
              {['Ponencia', 'Feria', 'Concurso', 'Artículo'].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox id={`cat-${item}`} className="border-slate-300 data-[state=checked]:bg-puce-blue data-[state=checked]:border-puce-blue" />
                  <Label htmlFor={`cat-${item}`} className="text-slate-600 font-normal cursor-pointer hover:text-puce-blue">
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Grupo 2: Ámbito */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-slate-900">Ámbito</h4>
            <div className="space-y-2">
              {['Internacional', 'Nacional', 'Interno PUCE'].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox id={`scope-${item}`} className="border-slate-300 data-[state=checked]:bg-puce-blue data-[state=checked]:border-puce-blue" />
                  <Label htmlFor={`scope-${item}`} className="text-slate-600 font-normal cursor-pointer hover:text-puce-blue">
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <Button className="w-full bg-puce-blue hover:bg-puce-dark text-white font-semibold">
            Aplicar Filtros
          </Button>
          
        </CardContent>
      </Card>
    </div>
  );
}