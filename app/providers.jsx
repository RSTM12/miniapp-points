"use client";

import { useState, useEffect } from "react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { base, optimism } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected, coinbaseWallet } from "wagmi/connectors"; // Tambah import coinbaseWallet

const config = createConfig({
  chains: [base, optimism],
  transports: {
    [base.id]: http(),
    [optimism.id]: http(),
  },
  connectors: [
    // 1. Jalur Injected (Standar)
    injected(),
    // 2. Jalur Coinbase (Sangat Penting untuk Farcaster Mobile)
    coinbaseWallet({ 
      appName: 'Donut Genesis',
      preference: 'smartWalletOnly' // Prioritaskan Smart Wallet (bawaan Farcaster)
    }),
  ],
});

const queryClient = new QueryClient();

export function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
