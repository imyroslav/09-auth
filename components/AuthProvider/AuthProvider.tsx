"use client";

import { getUser, checkSession } from "../../lib/api/clientApi";
import React, { useEffect } from "react";
import { useAuthStore } from "../../lib/store/authStore";

export type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
  
  useEffect(() => {
  
    const fetchUser = async () => {
  
      const isAuthenticated = await checkSession();

      if (isAuthenticated) {
        const user = await getUser();
        
        if (user) setUser(user);
      } else {
        clearIsAuthenticated();
      }
    };
fetchUser()
  }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;