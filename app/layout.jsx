import "./globals.css";
import { Providers } from "./providers";

// 👇 TULIS LINK VERCEL KAMU YANG BENAR DI SINI (Jangan salah ketik!)
const APP_URL = "https://donut-genesis.vercel.app/"; 

export const metadata = {
  title: "DONUT GENESIS",
  description: "Mint Exclusive NFT",
  openGraph: {
    title: "DONUT GENESIS",
    description: "Mint Exclusive NFT",
    url: APP_URL,
    siteName: "Donut Mint",
    images: [{ 
      url: `${APP_URL}/donut.jpg` // Pastikan donut.jpg ada di folder public
    }],
    type: "website",
  },
  other: {
    // Versi Frame
    "fc:frame": "vNext",
    
    // Gambar (Wajib Full URL)
    "fc:frame:image": `${APP_URL}/donut.jpg`,
    "fc:frame:image:aspect_ratio": "1:1",
    
    // Tombol Buka App
    "fc:frame:button:1": "BUKA APP 🍩",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": APP_URL,
    
    // 👇 TRIK: Arahkan post_url ke halaman utama juga biar gak 404
    "fc:frame:post_url": APP_URL, 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">{children}</body>
    </html>
  );
}
