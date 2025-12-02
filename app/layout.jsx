import "./globals.css";
import { Providers } from "./providers";

// ⚠️ GANTI LINK DI BAWAH INI DENGAN LINK VERCEL KAMU YANG BARU
// Contoh: "https://donut-genesis.vercel.app"
// (Jangan pakai tanda slash '/' di belakang)
const APP_URL = "https://donut-genesis-vercel.app";

export const metadata = {
  title: "DONUT GENESIS",
  description: "Mint Exclusive NFT",
  openGraph: {
    title: "DONUT GENESIS",
    description: "Mint Exclusive NFT",
    url: APP_URL,
    siteName: "Donut Mint",
    images: [{ 
      // Menggabungkan link website + nama file gambar
      url: APP_URL + "/donut.jpg" 
    }],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": APP_URL + "/donut.jpg",
    "fc:frame:image:aspect_ratio": "1:1",
    
    // Tombol:
    "fc:frame:button:1": "BUKA APP 🍩",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": APP_URL,
    
    // Post URL diarahkan ke home agar aman
    "fc:frame:post_url": APP_URL,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">{children}</body>
    </html>
  );
}
