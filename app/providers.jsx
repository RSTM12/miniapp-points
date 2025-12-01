"use client";

import { createConfig, http, WagmiProvider } from "wagmi";
import { base, optimism } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected } from "wagmi/connectors";

// 1. Konfigurasi Client Wagmi (Mesin Blockchain)
const config = createConfig({
  chains: [base, optimism], // Kita dukung Base & Optimism
  transports: {
    [base.id]: http(),
    [optimism.id]: http(),
  },
  connectors: [
    injected(), // Ini penting: Mendeteksi Wallet bawaan Farcaster
  ],
});

const queryClient = new QueryClient();

export function Providers({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
