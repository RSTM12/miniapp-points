import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Farcaster Mini App",
  description: "Native Transaction Demo",
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://placehold.co/600x400",
    "fc:frame:button:1": "Open App",
    "fc:frame:action": "url",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
