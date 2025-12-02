import "./globals.css";
import { Providers } from "./providers";

// 👇 GANTI DENGAN LINK VERCEL KAMU YANG AKTIF
const APP_URL = "https://donut-genesis.vercel.app";

// 👇 FIX: Menggunakan tanda (+) agar tidak error syntax
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
    "fc:frame:button:1": "BUKA APP 🍩",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": APP_URL,
    // 👇 FIX: Menggunakan tanda (+) agar aman
    "fc:frame:post_url": APP_URL + "/api/frame",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">{children}</body>
    </html>
  );
}
