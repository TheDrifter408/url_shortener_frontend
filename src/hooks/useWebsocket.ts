import { useCallback, useEffect, useRef, useState } from 'react';

interface UseWebSocketProps {
  url: string;
  protocols?: string | string[],
  reconnectionAttempts?: number
}

export const useWebsocket = <T>({ url, protocols = "", reconnectionAttempts = 5 }: UseWebSocketProps) => {
  const socketRef = useRef<WebSocket | null>(null);
  const connectionCounterRef = useRef(0);
  const reconnectionTimeoutRef = useRef<number | null>(null);

  const [message, setMessage] = useState<T | null>(null);

  const [error, setError] = useState<string | null>(null);

  const [socketState, setSocketState] = useState<number>(WebSocket.CONNECTING);

  const connect = useCallback(() => {
    if (reconnectionTimeoutRef.current) {
      window.clearTimeout(reconnectionTimeoutRef.current);
    }

    const socket = new WebSocket(url, protocols);

    socketRef.current = socket;

    socket.onopen = () => {
      setSocketState(WebSocket.OPEN);
      connectionCounterRef.current = 0;
    }

    socket.onclose = (event) => {
      setSocketState(WebSocket.CLOSED);

      // Don't reconnect if it was a intentional close
      if (event.wasClean) {
        return;
      }

      if (connectionCounterRef.current < reconnectionAttempts) {
        const delay = Math.min(1000 * Math.pow(2, connectionCounterRef.current), 30000);

        console.warn(`Websocket closed. Reconnecting in ${delay}ms....`);

        reconnectionTimeoutRef.current = window.setTimeout(() => {
          connectionCounterRef.current += 1;
          connect();
        }, delay);
      }
    };

    socket.onmessage = (event) => {
      try {
        setMessage(event.data);
      } catch {
        setError(event.data);
      }
    }

    socket.onerror = () => {
      setSocketState(WebSocket.CLOSED);
    }

  }, [url, protocols, reconnectionAttempts])

  useEffect(() => {
    connect();

    if (reconnectionTimeoutRef.current) window.clearTimeout(reconnectionTimeoutRef.current);
    socketRef.current?.close();

  }, [connect]);

  const send = useCallback((data: T) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    }
  }, []);

  return {
    message,
    error,
    socketState,
    send,
  }

}