import "./globals.css";
import { Providers } from "./providers";

// 👇 GANTI DENGAN DOMAIN BARU KAMU (CONTOH: https://donatkeren.com)
const APP_URL = "https://rstm.online"; 

export const metadata = {
  title: "Donut Genesis",
  description: "Mint Exclusive NFT",
  openGraph: {
    title: "Donut Genesis",
    description: "Mint Exclusive NFT",
    url: APP_URL,
    siteName: "Donut Mint",
    images: [{
      // Pastikan file donut.jpg ada di folder public
      url: APP_URL + "/donut.jpg",
    }],
  },
  other: {
    // Pengaturan Frame v2 (JSON Stringify adalah standar resmi)
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: APP_URL + "/donut.jpg",
      button: {
        title: "OPEN APP 🍩",
        action: {
          type: "launch_frame",
          name: "Donut Genesis",
          url: APP_URL,
          splashImageUrl: APP_URL + "/donut.jpg",
          splashBackgroundColor: "#000000",
        },
      },
    }),
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
