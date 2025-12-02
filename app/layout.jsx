import "./globals.css";
import { Providers } from "./providers";

// 👇 GANTI BAGIAN INI DENGAN LINK VERCEL KAMU YANG BARU 👇
// Contoh: "https://donut-genesis.vercel.app"
const APP_URL = "https://donut-genesis.vercel.app/"; 

const IMAGE_URL = "https://i.imgur.com/9C8jX8b.png";

export const metadata = {
  title: "DONUT GENESIS #777",
  description: "Exclusive NFT Collection on Base",
  
  openGraph: {
    title: "DONUT GENESIS #777",
    description: "Exclusive NFT Collection on Base",
    url: APP_URL,
    siteName: "Donut Mint",
    images: [
      {
        url: IMAGE_URL,
        width: 1000,
        height: 1000,
        alt: "Donut NFT Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  other: {
    "fc:frame": "vNext",
    "fc:frame:image": IMAGE_URL,
    "fc:frame:image:aspect_ratio": "1:1",
    
    // Tombol di Feed Farcaster:
    "fc:frame:button:1": "BUKA APP 🍩",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": APP_URL, // Ini otomatis mengikuti link di atas
    
    // Cadangan agar validator tidak error
    "fc:frame:post_url": `${APP_URL}/api/frame`, 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
