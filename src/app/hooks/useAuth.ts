// app/hooks/useAuth.ts
'use client'
import { useState, useEffect } from 'react';

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check for authentication status, e.g., by checking cookies or local storage
    const authToken = document.cookie.split('; ').find(row => row.startsWith('authToken='));
    if (authToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return { isAuthenticated };
}
