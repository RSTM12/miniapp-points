"use client";

import { useState, useEffect } from "react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { base, optimism } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected } from "wagmi/connectors";
import sdk from "@farcaster/frame-sdk"; // Import SDK

// --- KONEKTOR MANUAL KHUSUS FARCASTER ---
const farcasterConnector = () => {
  return injected({
    target: () => {
      // Kita cek apakah kita sedang di dalam Farcaster?
      if (typeof window !== 'undefined') {
        // Ambil provider langsung dari SDK Farcaster
        // Ini adalah "Jembatan" yang dicari-cari selama ini
        return sdk.wallet.getEthereumProvider();
      }
      return undefined;
    },
  });
};
// ----------------------------------------

const config = createConfig({
  chains: [base, optimism],
  transports: {
    [base.id]: http(),
    [optimism.id]: http(),
  },
  connectors: [
    farcasterConnector(), // Pakai konektor buatan kita
  ],
});

const queryClient = new QueryClient();

export function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
