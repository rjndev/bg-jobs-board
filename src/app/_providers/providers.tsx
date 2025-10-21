"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
    
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

export function Providers({ children}: Props) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}> 
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
}