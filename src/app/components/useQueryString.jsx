'use client';
import { useState, useEffect } from 'react';

const useQueryString = (key, defaultValue = null) => {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get(key) || defaultValue;
  });

  useEffect(() => {
    const handleUrlChange = () => {
      const queryParams = new URLSearchParams(window.location.search);
      setValue(queryParams.get(key) || defaultValue);
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('pushstate', handleUrlChange);
    window.addEventListener('replacestate', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('pushstate', handleUrlChange);
      window.removeEventListener('replacestate', handleUrlChange);
    };
  }, [key, defaultValue]);

  return value;
};

export default useQueryString;
