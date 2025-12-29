'use client';

import { incrementView } from "@/lib/actions";
import { useEffect, useRef } from "react";

export default function ViewTracker({ eventId }: { eventId: string }) {
  // Usamos useRef para asegurarnos de que solo se dispare UNA vez por visita
  const hasCounted = useRef(false);

  useEffect(() => {
    if (!hasCounted.current) {
      incrementView(eventId);
      hasCounted.current = true;
    }
  }, [eventId]);

  return null; // Este componente es invisible, no renderiza nada visual
}