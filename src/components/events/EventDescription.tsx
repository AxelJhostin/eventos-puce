import { Event } from '@/types';

export default function EventDescription({ event }: { event: Event }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold text-puce-blue mb-4">Sobre este evento</h2>
      <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-wrap">
        {event.description}
      </p>
      
      {/* Sección Dinámica de Requisitos */}
      {event.requirements && (
        <div className="mt-8 pt-8 border-t border-slate-100">
          <h3 className="font-bold text-slate-900 mb-2">Requisitos</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            {event.requirements.split(/[\n•.,]+/).map((req: string, index: number) => 
              req.trim().length > 0 && (
                <li key={index}>{req.trim()}</li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}