import "./globals.css";
import { Providers } from "./providers";

// 1. GANTI LINK INI DENGAN LINK VERCEL KAMU YANG BARU
// (Pastikan pakai tanda kutip dua seperti contoh)
const APP_URL = "https://donut-genesis.vercel.app"; 

// 2. Link gambar (Otomatis menggabungkan link di atas dengan nama file)
const IMAGE_URL = APP_URL + "/donut.jpg";

export const metadata = {
  title: "DONUT GENESIS",
  description: "Mint Exclusive NFT",
  openGraph: {
    title: "DONUT GENESIS",
    description: "Mint Exclusive NFT",
    url: APP_URL,
    siteName: "Donut Mint",
    images: [{ url: IMAGE_URL }],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": IMAGE_URL,
    "fc:frame:image:aspect_ratio": "1:1",
    
    // Tombol:
    "fc:frame:button:1": "BUKA APP 🍩",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": APP_URL,
    
    // Ini pakai tanda tambah (+) biar gak error
    "fc:frame:post_url": APP_URL + "/api/frame",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
