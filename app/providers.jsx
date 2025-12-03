"use client";

import { useState, useEffect } from "react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { base, optimism } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected, coinbaseWallet } from "wagmi/connectors";

// Kita siapkan 2 jalur: Injected (Umum) & Coinbase (Spesifik Farcaster)
const config = createConfig({
  chains: [base, optimism],
  transports: {
    [base.id]: http(),
    [optimism.id]: http(),
  },
  connectors: [
    injected(),
    coinbaseWallet({ 
      appName: 'Donut Genesis',
      preference: 'smartWalletOnly'
    }),
  ],
});

const queryClient = new QueryClient();

export function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // OBAT LAYAR HITAM:
  // Jika belum siap, tampilkan layar putih bersih (jangan null/crash)
  if (!mounted) {
    return <div style={{ minHeight: "100vh", backgroundColor: "#fff" }} />;
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
