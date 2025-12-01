export const metadata = {
  title: "MiniApp Points",
  description: "Farcaster Mini App for mining points",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
