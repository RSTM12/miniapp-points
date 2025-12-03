import "./globals.css";
import { Providers } from "./providers";

// 👇 GANTI DENGAN DOMAIN BARU KAMU (WAJIB HTTPS)
const APP_URL = "https://rstm.online"; 

export const metadata = {
  title: "Donut Genesis",
  description: "Mint Exclusive NFT",
  other: {
    // Kunci agar tombol muncul: Menunjuk ke Manifest
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: `${APP_URL}/donut.jpg`,
      button: {
        title: "OPEN APP 🍩",
        action: {
          type: "launch_frame",
          name: "Donut App",
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
      <body className="bg-white text-black">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
