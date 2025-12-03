"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export function Providers({ children }) {
  return (
    <PrivyProvider
      // 👇 PASTE APP ID KAMU DI SINI (Contoh: "clx...")
      appId="cmipl0tph003bl70c1vk6wajs"
      config={{
        appearance: {
          theme: "dark",
          accentColor: "#676FFF",
          showWalletLoginFirst: false,
        },
        // Pastikan 'farcaster' sudah diaktifkan di Dashboard Privy
        loginMethods: ["farcaster", "wallet"],
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
