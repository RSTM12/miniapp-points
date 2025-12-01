import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  // 👇 1. GANTI NAMA APP DI SINI (Muncul di Browser Tab / Preview Link)
  title: "DONUT GENESIS MINTING", 
  
  // 👇 2. GANTI DESKRIPSI DI SINI
  description: "Early For Donut.",
  
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://i.imgur.com/CWDPgYB.jpeg",
    
    // --- SETTING TOMBOL FEED ---
    // 👇 3. GANTI TULISAN DI TOMBOL FEED (Yang diklik user)
    "fc:frame:button:1": "OPEN NOW 🚀",
    
    "fc:frame:button:1:action": "link", 
    // 👇 GANTI INI DENGAN LINK VERCEL KAMU YANG ASLI 👇
    "fc:frame:button:1:target": "https://miniapp-points.vercel.app/", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

