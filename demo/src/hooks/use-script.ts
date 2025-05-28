import { useEffect, useState } from 'react';

export const useScript = (url: string) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    setTimeout(() => {
      setIsInitialized(true);
    }, 1);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);

  return isInitialized;
};
