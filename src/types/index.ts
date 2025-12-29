export type EventCategory = 'ponencia' | 'feria' | 'concurso' | 'articulo';
export type EventScope = 'interno' | 'nacional' | 'internacional';

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  requirements: string | null;
  category: EventCategory;
  scope: EventScope;
  event_date: string | Date;
  location: string | null;
  image_url: string | null;
  registration_url: string | null;
  social_url: string | null;
  created_at: Date;
  status: 'approved' | 'pending' | string | null;
  views: number;
  clicks: number;
}

export interface GetEventsFilters {
  search?: string;
  category?: string;
  scope?: string;
}