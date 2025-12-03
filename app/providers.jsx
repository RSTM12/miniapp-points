"use client";

import { useState, useEffect } from "react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { base, optimism } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected, coinbaseWallet } from "wagmi/connectors";

const config = createConfig({
  chains: [base, optimism],
  transports: {
    [base.id]: http(),
    [optimism.id]: http(),
  },
  connectors: [
    // Urutan penting: Injected duluan!
    injected(), 
    coinbaseWallet({ 
      appName: 'Donut Genesis',
      preference: 'smartWalletOnly'
    }),
  ],
  ssr: true, // Wajib true biar gak blank
});

const queryClient = new QueryClient();

export function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ini obat anti-blank screen yang terbukti ampuh
  if (!mounted) {
    return <div style={{ height: "100vh", backgroundColor: "#fff" }} />;
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
