"use client";

import { SessionProvider } from "next-auth/react";

interface AuthContextProps {
  children: React.ReactNode;
}

export default function AuthWrapper({ children }: AuthContextProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
