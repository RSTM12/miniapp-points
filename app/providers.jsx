"use client";

import { useState, useEffect } from "react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { base } from "wagmi/chains"; // Cuma pakai Base biar ringan
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected } from "wagmi/connectors";

// Config Minimalis Anti-Crash
const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [
    injected(), // Hanya injected standar
  ],
});

const queryClient = new QueryClient();

export function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Jika belum siap, return null (jangan render apapun)
  if (!mounted) return null;

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
