
"use client";

import React, { createContext, useEffect, useState, Dispatch, SetStateAction } from "react";
import type { AppUser } from "@/lib/definitions";
import { usePathname, useRouter } from "next/navigation";

interface AuthContextType {
  user: AppUser | null;
  setUser: Dispatch<SetStateAction<AppUser | null>>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // This effect runs once on the client after hydration
    setLoading(true);
    try {
      const storedUser = localStorage.getItem("gp_current_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // If no user is stored and we are not on an auth page, redirect to login
        if (!['/login', '/signup'].includes(pathname)) {
            router.push('/login');
        }
      }
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      setUser(null);
      // Force redirect if there's a parsing error
      router.push('/login');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  const value = { user, setUser, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
