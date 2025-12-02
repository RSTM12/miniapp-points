import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "DONUT GENESIS",
  description: "Mint Exclusive NFT",
  openGraph: {
    title: "DONUT GENESIS",
    description: "Mint Exclusive NFT",
    url: "https://donut-based.vercel.app",
    siteName: "Donut Mint",
    images: [{
      url: "https://donut-based.vercel.app/donut.jpg"
    }],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://donut-based.vercel.app/donut.jpg",
    "fc:frame:image:aspect_ratio": "1:1",
    "fc:frame:button:1": "OPEN APP 🍩",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": "https://donut-based.vercel.app",
    "fc:frame:post_url": "https://donut-based.vercel.app",
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
