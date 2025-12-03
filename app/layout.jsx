import "./globals.css";
import { Providers } from "./providers";

// 👇 GANTI DENGAN DOMAIN BARU KAMU
const APP_URL = "https://rstm.online"; 

export const metadata = {
  title: "DONUT GENESIS",
  description: "Mint Exclusive NFT",
  openGraph: {
    title: "DONUT GENESIS",
    description: "Mint Exclusive NFT",
    url: APP_URL,
    siteName: "Donut Mint",
    images: [{ url: `${APP_URL}/donut.jpg` }],
  },
  other: {
    // 👇 INI KUNCI UTAMA: Menunjuk ke Manifest agar HP tidak blank
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: `${APP_URL}/donut.jpg`,
      button: {
        title: "BUKA APP 🍩",
        action: {
          type: "launch_frame",
          name: "Donut Genesis",
          url: APP_URL,
          splashImageUrl: `${APP_URL}/donut.jpg`,
          splashBackgroundColor: "#000000",
        },
      },
    }),
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">{children}</body>
    </html>
  );
}
