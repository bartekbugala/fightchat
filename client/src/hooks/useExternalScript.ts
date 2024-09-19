import { useEffect, useState } from 'react';

export const useExternalScript = (url: string) => {
  // eslint-disable-next-line
  let [state, setState] = useState(url ? 'loading' : 'idle');

  useEffect(() => {
    if (!url) {
      setState('idle');
      return;
    }

    // eslint-disable-next-line
    let script: any = document.querySelector(`script[src="${url}"]`);

    // eslint-disable-next-line
    const handleScript = (e: any) => {
      setState(e.type === 'load' ? 'ready' : 'error');
    };

    if (!script) {
      script = document.createElement('script');
      script.type = 'application/javascript';
      script.src = url;
      script.async = true;
      document.body.appendChild(script);
      script.addEventListener('load', handleScript);
      script.addEventListener('error', handleScript);
    }

    script.addEventListener('load', handleScript);
    script.addEventListener('error', handleScript);

    return () => {
      script.removeEventListener('load', handleScript);
      script.removeEventListener('error', handleScript);
    };
  }, [url]);

  return state;
};

export default useExternalScript;
