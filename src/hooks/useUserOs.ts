import { useEffect, useState } from 'react';

export const useUserOs = () => {
  const [os, setOs] = useState("unknown");

  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (userAgent.includes("Windows")) {
      setOs("windows");
    } else if (userAgent.includes("Mac")) {
      setOs("mac");
    } else if (userAgent.includes("Linux")) {
      setOs("linux")
    }

  }, []);

  return {
    os,
  }
}