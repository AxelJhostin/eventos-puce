'use client';

import { incrementClick } from "@/lib/actions";
import { ReactNode } from "react";

interface TrackedLinkProps {
  eventId: string;
  href: string;
  className?: string;
  children: ReactNode;
}

export default function TrackedLink({ eventId, href, className, children }: TrackedLinkProps) {
  const handleClick = () => {
    // 🔥 Dispara la señal al servidor (Fire and Forget)
    // No usamos 'await' para no retrasar al usuario ni un milisegundo.
    incrementClick(eventId);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}