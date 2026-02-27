let refreshPromise: Promise<boolean | null> | null = null;

interface CustomRequestInit extends RequestInit {
  _isRetry?: boolean;
}

export const customFetch = async (url: string, options: CustomRequestInit = {}) => {
  // 1. Initial Response
  let response = await fetch(url, options);
  // 2. Handle Unauthorized Exceptions
  if (response.status === 401 && !options._isRetry) {
    if (!refreshPromise) {
      refreshPromise = (async () => {
        try {
          const res = await fetch('http://localhost:5000/auth/refresh', {
            method: 'POST',
            credentials: 'include',
          });
          return res.ok;
        } catch (e) {
          return null;
        } finally {
          refreshPromise = null;
        }
      })();
    }

    const success = await refreshPromise;

    if (success) {
      const { _isRetry, ...restOptions } = options;
      return fetch(url, {
        ...restOptions,
        _isRetry: true,
      } as CustomRequestInit);
    } else {
      window.dispatchEvent(new Event('auth-failure'));
      window.location.href = '/signin'
    }
  }
  return response;
}