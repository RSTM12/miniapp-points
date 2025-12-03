import { injected } from "wagmi/connectors";
import sdk from "@farcaster/frame-sdk";

// Ini adalah fungsi manual untuk mengambil Provider dari Farcaster
// Kita tidak mengandalkan auto-detection, kita ambil paksa.
export function farcasterFrameConnector() {
  return injected({
    target: () => {
      if (typeof window === "undefined") return undefined;
      
      // Coba ambil dari SDK resmi
      if (sdk && sdk.wallet && sdk.wallet.ethProvider) {
        return sdk.wallet.ethProvider;
      }
      
      // Fallback: Coba ambil dari window jika SDK belum siap
      if (window.farcaster && window.farcaster.wallet) {
        return window.farcaster.wallet.ethereumProvider;
      }

      return undefined;
    },
  });
}
