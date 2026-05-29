import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productionBackendUrl =
  "https://food-ai-backend-497531627370.asia-southeast1.run.app";
const localBackendUrl = "http://localhost:8000";

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Proxy tất cả /api/backend/* đến backend tương ứng môi trường.
  // Local dùng BACKEND_URL trong .env.local; deploy dùng Cloud Run hoặc env trên hosting.
  async rewrites() {
    const backendUrl =
      process.env.BACKEND_URL ??
      (process.env.NODE_ENV === "production"
        ? productionBackendUrl
        : localBackendUrl);
    return [
      {
        source: "/api/backend/:path*",
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
