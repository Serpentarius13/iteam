'use client';

import { ReactNode } from "react";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <QueryClientProvider client={client}>
        <SessionProvider>{children}</SessionProvider> <Toaster />
      </QueryClientProvider>
    </>
  );
}
