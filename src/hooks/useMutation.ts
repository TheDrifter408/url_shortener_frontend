import type { HttpMethod } from '@/constants/httpMethods';
import type { UseFetchProps } from '@/interfaces/useFetchProps';
import { useState } from 'react';

interface UseMutationProps extends Omit<UseFetchProps, 'params' | 'body' | 'authenticated'> {
  method: Exclude<HttpMethod, 'GET'>;
}

export const useMutation = <T, R>({ url, method }: UseMutationProps) => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutateFn = async (body?: T): Promise<R | undefined> => {
    setPending(true);
    setError(null);

    try {
      const isFormData = body instanceof FormData;

      const headers: Record<string, string> = {}

      if (!isFormData) {
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(url,{
        method,
        headers,
        body: isFormData ? body : JSON.stringify(body),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return await response.json();

    } catch (e: unknown) {
      if (e instanceof Error) {
        if (e.name !== 'AbortError') {
          setError(e.message);
        }
      } else {
        setError('Something went wrong');
      }
      throw e;
    } finally {
      setPending(false);
    }
  }
  return {
    mutateFn,
    pending,
    error,
  }
}