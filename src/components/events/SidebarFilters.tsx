'use client'; // 👈 1. IMPORTANTE: Esto convierte el componente en interactivo

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SidebarFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 2. Estado para guardar lo que el usuario selecciona
  // Inicializamos con lo que ya venga en la URL (para que no se borre al recargar)
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedScope, setSelectedScope] = useState(searchParams.get('scope') || '');

  // 3. Función que se ejecuta al dar click en "Aplicar Filtros"
  const handleApplyFilters = () => {
    // Creamos los parámetros de URL
    const params = new URLSearchParams();

    if (search) params.set('search', search);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedScope) params.set('scope', selectedScope);

    // Empujamos la nueva URL al navegador
    router.push(`/?${params.toString()}`);
  };

  // Función auxiliar para manejar checkboxes como si fueran radios (selección única por ahora)
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(prev => prev === value ? '' : value); // Si ya estaba, lo quita. Si no, lo pone.
  };

  const handleScopeChange = (value: string) => {
    setSelectedScope(prev => prev === value ? '' : value);
  };

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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              // Permitir buscar al dar Enter
              onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
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
                  <Checkbox 
                    id={`cat-${item}`} 
                    className="border-slate-300 data-[state=checked]:bg-puce-blue"
                    checked={selectedCategory.toLowerCase() === item.toLowerCase()}
                    onCheckedChange={() => handleCategoryChange(item.toLowerCase())}
                  />
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
              {['Internacional', 'Nacional', 'Interno'].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`scope-${item}`} 
                    className="border-slate-300 data-[state=checked]:bg-puce-blue"
                    checked={selectedScope.toLowerCase() === item.toLowerCase()}
                    onCheckedChange={() => handleScopeChange(item.toLowerCase())}
                  />
                  <Label htmlFor={`scope-${item}`} className="text-slate-600 font-normal cursor-pointer hover:text-puce-blue">
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* 4. El Botón ahora sí tiene el evento onClick */}
          <Button 
            onClick={handleApplyFilters}
            className="w-full bg-puce-blue hover:bg-puce-dark text-white font-semibold transition-all active:scale-95"
          >
            Aplicar Filtros
          </Button>
          
          {/* Botón extra para limpiar todo */}
          {(search || selectedCategory || selectedScope) && (
             <Button 
               variant="ghost" 
               className="w-full text-slate-500 hover:text-red-500 h-8"
               onClick={() => router.push('/')}
             >
               Limpiar búsqueda
             </Button>
          )}
          
        </CardContent>
      </Card>
    </div>
  );
}