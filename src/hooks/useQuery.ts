import type { UseFetchProps } from '@/interfaces/useFetchProps';
import { useCallback, useEffect, useState } from 'react';

export const useQuery = <T>({ url, params, authenticated = false }: Omit<UseFetchProps, 'body' | 'method'>) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fetchFn = useCallback(
    async (abortController: AbortController) => {
      setLoading(true);
      setError(null);

      try {
        //1. Build the query string
        const queryParams = params ? `?${new URLSearchParams(params)}` : '';
        const fullURL = `${url}${queryParams}`;

        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        }

        //2. Perform the fetch
        const response = await fetch(fullURL, {
          method: 'GET',
          signal: abortController.signal, // Connect the abort signal
          headers,
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        setData(result.data);

      } catch (e: unknown) {
        if (e instanceof Error) {
          if (e.name !== 'AbortError') {
            setError(e.message);
          }
        } else {
          setError('An unknown error occured');
        }
      } finally {
        setLoading(false);
      }
    },
    // Stringify objects to prevent infinite loops in dependency arrays
    [url, JSON.stringify(params), authenticated]
  )

  useEffect(() => {
    const abortController = new AbortController();
    fetchFn(abortController);
    // Cancel the request if the component unmounts or inputs change
    return () => abortController.abort();

  }, [fetchFn]);
  return {
    loading,
    data,
    error,
  }
}