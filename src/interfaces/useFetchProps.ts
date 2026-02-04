import type { HttpMethod } from '@/constants/httpMethods';

export interface UseFetchProps {
  url: string;
  method: HttpMethod;
  body?: string;
  params?: Record<string, string>;
  authenticated?: boolean
}