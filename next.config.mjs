/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Obat error pino-pretty untuk versi .mjs
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
