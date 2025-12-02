import "./globals.css";
import { Providers } from "./providers";

// GANTI INI DENGAN URL VERCEL KAMU YANG ASLI
const APP_URL = "https://donut-genesis.vercel.app"; 

export const metadata = {
  title: "DONUT GENESIS #777",
  description: "Mint Exclusive Donut NFT on Base",
  
  // 1. Metadata Standar (Untuk Preview di Twitter/Discord/WA)
  openGraph: {
    title: "DONUT GENESIS #777",
    description: "Mint Exclusive Donut NFT on Base",
    images: ["https://i.imgur.com/CWDPgYB.jpeg"], 
  },

  // 2. Metadata KHUSUS FARCASTER (Agar jadi Mini App)
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://i.imgur.com/CWDPgYB.jpeg",
    "fc:frame:image:aspect_ratio": "1:1", // Agar gambar kotak penuh (Retro style)
    
    // Tombol Peluncur Mini App
    "fc:frame:button:1": "OPEN APP 🍩",
    "fc:frame:button:1:action": "link", // Aksi 'link' akan membuka App/Webview
    "fc:frame:button:1:target": https://donut-genesis.vercel.app, // Link tujuan saat tombol ditekan
    
    // Opsional: Link post URL (kadang dibutuhkan validator)
    "fc:frame:post_url": `${https://donut-genesis.vercel.app}/api/frame`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white"> {/* Background default putih agar tidak glitch */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
