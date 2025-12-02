import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "DONUT GENESIS",
  description: "Mint Exclusive NFT",
  openGraph: {
    title: "DONUT GENESIS",
    description: "Mint Exclusive NFT",
    // 👇 GANTI MANUAL
    url: "https://donut-genesis-vercel.app", 
    siteName: "Donut Mint",
    images: [{ 
      // 👇 GANTI MANUAL (JANGAN LUPA /donut.jpg DI BELAKANG)
      url: "https://donut-genesis.vercel.app/donut.jpg" 
    }],
  },
  other: {
    "fc:frame": "vNext",
    // 👇 GANTI MANUAL (JANGAN LUPA /donut.jpg DI BELAKANG)
    "fc:frame:image": "https://donut-genesis.vercel.app/donut.jpg",
    "fc:frame:image:aspect_ratio": "1:1",
    
    "fc:frame:button:1": "BUKA APP 🍩",
    "fc:frame:button:1:action": "link",
    // 👇 GANTI MANUAL
    "fc:frame:button:1:target": "https://donut-genesis.vercel.app",
    
    // 👇 GANTI MANUAL
    "fc:frame:post_url": "https//donut-genesis.vercel.app",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">{children}</body>
    </html>
  );
}
