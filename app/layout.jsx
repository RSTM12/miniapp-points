import "./globals.css"; // Baris ini WAJIB ada paling atas
import { Providers } from "./providers";

export const metadata = {
  title: "Donut NFT Mint",
  description: "Mint your exclusive Neon Donut NFT",
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "[https://i.imgur.com/9C8jX8b.png](https://i.imgur.com/9C8jX8b.png)",
    "fc:frame:button:1": "Mint Now",
    "fc:frame:action": "tx",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

