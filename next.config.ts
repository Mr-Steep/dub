import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Aggressive compression + long-cache for static assets.
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  async headers() {
    return [
      {
        // Long-term cache for everything served from /public.
        source: "/:path((?:.*\\.(?:webp|webm|mp4|svg|png|jpg|jpeg|ico|woff2)))",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
